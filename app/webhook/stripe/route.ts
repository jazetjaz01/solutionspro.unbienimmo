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
        const supabase = createAdminClient();

        // Création Utilisateur Auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email: metadata.user_email,
          email_confirm: true,
          user_metadata: { company_name: metadata.company_name }
        });

        // Insertion Table Professionals
        // Note: On utilise upsert pour éviter l'erreur si l'utilisateur existe déjà
        await supabase.from("professionals").upsert({
          owner_id: authUser.user?.id,
          name: metadata.company_name,
          email: metadata.user_email,
          siret: metadata.company_siret,
          type: metadata.company_type || "agence",
          is_active: true
        });

        // Envoi lien mot de passe
        await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: metadata.user_email,
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err: any) {
    console.error(`❌ Erreur Webhook: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}