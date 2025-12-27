// middleware.ts (À LA RACINE)
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy"; // Import de la fonction corrigée

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Exclure explicitement le webhook Stripe ici !
     */
    '/((?!api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};