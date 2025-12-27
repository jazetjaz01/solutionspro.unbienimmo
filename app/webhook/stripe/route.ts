import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (metadata) {
      const supabase = createAdminClient();

      // 1. Création de l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: metadata.user_email,
        email_confirm: true,
        user_metadata: { full_name: metadata.company_name }
      });

      if (authError && !authError.message.includes("already registered")) {
        console.error("Erreur Auth:", authError.message);
        return NextResponse.json({ error: authError.message }, { status: 500 });
      }

      // Récupération de l'ID (soit le nouveau, soit l'existant)
      let userId = authData.user?.id;
      if (!userId) {
          const { data: existingUser } = await supabase.from("professionals").select("owner_id").eq("email", metadata.user_email).single();
          userId = existingUser?.owner_id;
      }

      if (userId) {
        // 2. Insertion/Mise à jour dans votre table 'professionals'
        const { error: dbError } = await supabase.from("professionals").upsert({
          owner_id: userId,
          name: metadata.company_name,
          email: metadata.user_email,
          siret: metadata.company_siret,
          type: metadata.company_type || "agence",
          is_active: true,
          is_verified: true
        });

        if (dbError) console.error("Erreur DB:", dbError.message);

        // 3. Envoi du mail de mot de passe
        await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: metadata.user_email,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}