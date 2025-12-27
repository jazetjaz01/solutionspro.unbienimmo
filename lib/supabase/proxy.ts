import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 1. INITIALISATION DU CLIENT SUPABASE
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Utilisez votre clé Anon ici
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 2. RÉCUPÉRATION DE L'UTILISATEUR (Indispensable pour la sécurité)
  // On utilise getUser() qui est plus sûr que getClaims() pour la vérification middleware
  const { data: { user } } = await supabase.auth.getUser();

  // 3. PROTECTION DES ROUTES /APP
  // Si l'utilisateur tente d'accéder au dashboard sans être connecté
  if (request.nextUrl.pathname.startsWith("/app") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// 4. CONFIGURATION DU MATCHER (L'étape CRUCIALE pour Stripe)
export const config = {
  matcher: [
    /*
     * Ce "matcher" permet d'exécuter le middleware sur toutes les routes SAUF :
     * - api/webhook/stripe : pour éviter l'erreur 405 et les problèmes de redirection
     * - _next/static, _next/image : fichiers internes Next.js
     * - favicon.ico, les images (png, jpg, etc)
     */
    '/((?!api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};