import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. On crée une réponse par défaut
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. On initialise Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
    }
  );

  // 3. On récupère l'utilisateur
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Protection de la route /app (Dashboard)
  if (request.next_url.pathname.startsWith("/app") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// 5. LE MATCH DE SÉCURITÉ (C'est ici que l'erreur 405 se règle)
export const config = {
  matcher: [
    /*
     * On exécute le middleware partout SAUF sur la route du webhook Stripe
     */
    '/((?!api/webhook/stripe|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};