import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing keys" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("❌ Erreur Webhook Stripe:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      console.error("❌ Aucune métadonnée trouvée");
      return NextResponse.json({ error: "No metadata" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    try {
      // 1. CRÉATION DE L'UTILISATEUR AUTH
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: metadata.user_email,
        email_confirm: true,
        user_metadata: { 
          company_name: metadata.company_name,
          pack: metadata.pack_subscribed 
        },
      });

      // Gestion si l'utilisateur existe déjà
      let userId = authUser.user?.id;
      if (authError) {
        if (authError.message.includes("already registered")) {
          const { data: existingUser } = await supabaseAdmin.from("professionals").select("owner_id").eq("email", metadata.user_email).single();
          userId = existingUser?.owner_id;
          console.log("ℹ️ Utilisateur déjà existant, mise à jour des données...");
        } else {
          throw authError;
        }
      }

      if (userId) {
        // 2. INSERTION DANS LA TABLE 'professionals' 
        // J'ai mappé exactement selon votre tableau (name, type, email, siret, owner_id)
        const { error: dbError } = await supabaseAdmin.from("professionals").upsert({
          owner_id: userId,
          name: metadata.company_name, // Colonne 'name' (NO NULL)
          email: metadata.user_email,
          siret: metadata.company_siret,
          type: metadata.company_type || "agence", // Colonne 'type' (NO NULL)
          is_active: true,
          is_verified: true,
          country: "FR",
        });

        if (dbError) throw dbError;

        // 3. ENVOI DU LIEN POUR LE MOT DE PASSE
        await supabaseAdmin.auth.admin.generateLink({
          type: 'recovery',
          email: metadata.user_email,
        });

        console.log(`✅ Succès total pour ${metadata.user_email}`);
      }
    } catch (error: any) {
      console.error("❌ Erreur lors du traitement post-paiement:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}