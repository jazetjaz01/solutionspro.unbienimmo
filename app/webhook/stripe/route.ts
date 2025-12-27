import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin"; // Import du client Admin

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata) {
      // ON UTILISE LE CLIENT ADMIN ICI
      const supabaseAdmin = createAdminClient();

      // 1. Création de l'utilisateur (Admin)
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: metadata.user_email,
        email_confirm: true,
        user_metadata: { company_name: metadata.company_name }
      });

      if (authUser.user) {
        // 2. Insertion dans la table professionals
        await supabaseAdmin.from("professionals").insert({
          owner_id: authUser.user.id,
          name: metadata.company_name,
          siret: metadata.company_siret,
          email: metadata.user_email,
          is_active: true
        });

        // 3. Envoi de l'email de définition de mot de passe
        await supabaseAdmin.auth.admin.generateLink({
          type: 'recovery',
          email: metadata.user_email,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}