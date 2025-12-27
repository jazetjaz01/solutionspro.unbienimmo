import { NextResponse } from "next/server";
import Stripe from "stripe";

// On initialise Stripe ici (les clés secrètes sont nécessaires)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", 
});

const PRICE_IDS: Record<string, string | undefined> = {
  essentiel: process.env.STRIPE_PRICE_ID_ESSENTIEL,
  professionnel: process.env.STRIPE_PRICE_ID_PRO,
  expert: process.env.STRIPE_PRICE_ID_EXPERT,
};

export async function POST(req: Request) {
  try {
    const { email, name, siret, packName, type } = await req.json();

    const priceId = PRICE_IDS[packName.toLowerCase()];
    if (!priceId) {
      return NextResponse.json({ error: "Pack non valide" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        user_email: email,
        company_name: name,
        company_siret: siret,
        company_type: type || "agence",
        pack_subscribed: packName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}