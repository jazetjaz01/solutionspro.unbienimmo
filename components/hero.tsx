import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden font-inherit">
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-20 px-6 py-20 lg:py-0">
        
        {/* COLONNE GAUCHE : TEXTE & ACTIONS */}
        <div className="flex flex-col justify-center">
          
          {/* PETIT LABEL DE MARQUE */}
          <div className="mb-8">
            <Link 
              href="https://www.unbienimmo.com" 
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 hover:text-gray-900 transition-colors"
            >
              unbienimmo.com
              <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
            </Link>
          </div>

          {/* TITRE ÉDITORIAL */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[0.1em] text-gray-900 leading-[0.95] ">
            L'immobilier <br /> en toute <br /> indépendance.
          </h1>

          {/* PARAGRAPHE ÉPURÉ */}
          <div className="mt-12 space-y-6 max-w-lg">
            <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-900">
              Solutions pour professionnels
            </p>
            <p className="text-lg font-light text-gray-500 leading-relaxed">
              Reprenez le contrôle de vos données. Diffusez vos biens directement, 
              sans passerelles payantes, au sein d'un écosystème conçu pour votre sérénité.
            </p>
          </div>

          {/* ACTIONS MONOLITHIQUES */}
          <div className="mt-16 flex flex-col sm:flex-row gap-6">
            <Button
              asChild
              className="h-16 px-12 rounded-none bg-gray-900 text-white hover:bg-black uppercase text-[10px] tracking-[0.3em] font-bold transition-all shadow-2xl"
            >
              <Link href="/offres" className="flex items-center gap-3">
                Nos offres <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-16 px-12 rounded-none border-gray-100 hover:border-gray-900 text-gray-400 hover:text-gray-900 uppercase text-[10px] tracking-[0.3em] font-bold transition-all bg-transparent"
            >
              <Link href="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>

        {/* COLONNE DROITE : IMAGE "GALERIE" */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full group">
          {/* Cadre décoratif minimaliste */}
          <div className="absolute -inset-4 border border-gray-50 pointer-events-none group-hover:inset-0 transition-all duration-700" />
          
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/maisonrouge.jpg"
              alt="Maison rouge"
              fill
              className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              priority
            />
          </div>
          
          {/* Overlay discret */}
          <div className="absolute bottom-8 left-8">
            <p className="text-[9px] uppercase tracking-[0.5em] text-white mix-blend-difference font-bold opacity-50">
              Esthétique & Performance
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}