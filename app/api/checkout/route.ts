import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Initialisation de Supabase avec la clé SERVICE_ROLE (ADMIN)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // /!\ JAMAIS côté client
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // L'événement qui nous intéresse : le paiement réussi de l'abonnement
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) return NextResponse.json({ error: "No metadata" });

    const email = metadata.user_email;
    const companyName = metadata.company_name;
    const siret = metadata.company_siret;

    try {
      // 1. CRÉATION DU COMPTE AUTH (Admin)
      // Cela envoie automatiquement un email de bienvenue/mot de passe à l'utilisateur
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        email_confirm: true, // On confirme l'email car il vient de payer
        user_metadata: { full_name: companyName },
      });

      if (authError) throw authError;

      // 2. CRÉATION DU PROFIL DANS LA TABLE PROFESSIONALS
      const { error: proError } = await supabaseAdmin
        .from("professionals")
        .insert({
          owner_id: authUser.user.id,
          name: companyName,
          email: email,
          siret: siret,
          type: metadata.company_type || "agence",
          is_active: true,
          is_verified: true, // On peut considérer qu'un pro qui paye est vérifié
        });

      if (proError) throw proError;

      // 3. (Optionnel) ENVOI D'UN EMAIL POUR DÉFINIR LE MOT DE PASSE
      // Supabase peut envoyer un lien de récupération automatique
      await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: email,
      });

      console.log(`✅ Compte créé pour ${email}`);

    } catch (error: any) {
      console.error("❌ Erreur Webhook:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}