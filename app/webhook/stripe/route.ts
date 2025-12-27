import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Initialisation de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
  console.log("✅ Webhook reçu !");
  
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("❌ Signature Stripe manquante");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (metadata) {
        console.log("Processing metadata for:", metadata.user_email);
        const supabase = createAdminClient();

        // 1. Création ou récupération de l'utilisateur Auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: metadata.user_email,
          email_confirm: true,
          user_metadata: { company_name: metadata.company_name }
        });

        let userId = authUser.user?.id;

        // Si l'utilisateur existe déjà, on récupère son ID via son email
        if (authError && authError.message.includes("already registered")) {
          const { data: existingUser } = await supabase
            .from("professionals")
            .select("owner_id")
            .eq("email", metadata.user_email)
            .single();
          userId = existingUser?.owner_id;
        } else if (authError) {
          console.error("❌ Erreur Auth Supabase:", authError.message);
          throw authError;
        }

        if (userId) {
          // 2. Insertion/Mise à jour Table Professionals
          // On force le SIRET en String pour correspondre au type 'text' de Supabase
          const { error: dbError } = await supabase.from("professionals").upsert({
            owner_id: userId,
            name: metadata.company_name,
            email: metadata.user_email,
            siret: metadata.company_siret ? String(metadata.company_siret) : null,
            type: metadata.company_type || "agence",
            is_active: true
          });

          if (dbError) {
            console.error("❌ Erreur Database Supabase:", dbError.message);
            throw dbError;
          }

          // 3. Envoi du lien de définition de mot de passe (recovery)
          const { error: linkError } = await supabase.auth.admin.generateLink({
            type: 'recovery',
            email: metadata.user_email,
            options: {
                redirectTo: 'https://solutionspro.unbienimmo.com/reset-password'
            }
          });

          if (linkError) console.error("⚠️ Erreur envoi email:", linkError.message);
          
          console.log("✅ Traitement terminé avec succès pour:", metadata.user_email);
        }
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err: any) {
    console.error(`❌ Erreur Webhook Finale: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}