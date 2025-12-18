import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-(--breakpoint-xl) w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        
        {/* Colonne gauche */}
        <div className="my-auto">
          <Badge
            variant="secondary"
            className="rounded-full py-1 border-border"
          >
            <Link href="/www.unbienimmo.com" className="flex items-center">
              unbienimmo.com
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Badge>

          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-semibold leading-[1.2] tracking-[-0.035em]">
            Professionnels, rejoignez un site immobilier indépendant
          </h1>

          <p className="mt-6 max-w-[60ch] text-lg ">
            Reprenez le contrôle de vos données et diffusez vos biens en toute sécurité et sérénité !
Unbienimmo.com est un site d’annonces immobilières complètement indépendant des grands réseaux
d’agences immobilières.
Notre interface vous permet de diffuser vos biens directement, sans l’utilisation de passerelles payantes.
Notre offre commerciale est claire et propose des conditions d’abonnement souples.

          </p>

          <div className="mt-12 flex items-center gap-4">
         

<Button
  asChild
  variant="outline"
  size="lg"
  className="rounded-full text-base shadow-none"
>
  <Link href="/offres" className="flex items-center">
    <CirclePlay className="mr-2 h-5 w-5" />
    Nos offres commerciales
  </Link>
</Button>


            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <Link href="/contact" className="flex items-center">
              <CirclePlay className="mr-2 h-5 w-5" />
              Nous contacter
              </Link>
            </Button>
          </div>
        </div>

        {/* Colonne droite - Image */}
        <div className="relative w-full aspect-video lg:aspect-auto lg:w-[1000px] lg:h-[calc(100vh-4rem)] rounded-xl overflow-hidden">
          <Image
            src="/maisonrouge.jpg"
            alt="Maison rouge"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </div>
  );
}
