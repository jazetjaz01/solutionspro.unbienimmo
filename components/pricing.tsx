import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link"; // Import pour la navigation Next.js

const plans = [
  {
    name: " Pack Essentiel",
    price: 49,
    href: "/pack/essentiel", // Lien vers la page dédiée
    description: "Abonnement mensuel sans engagement",
    features: [
      "Jusqu'à 10 annonces",
      "Diffusion annonces sans passerelle",
      "Espace client multi-utilisateurs ",
      "Annonces géolocalisées",
      "Engagement durée minimum 1 mois",
    ],
    buttonText: "Découvrir l'offre",
  },
  {
    name: "Pack Professionnel",
    price: 99,
    href: "/pack/professionnel",
    isPopular: true,
    description: "La solution idéale pour les agences",
    features: [
      "Jusqu'à 25 annonces",
     "Diffusion annonces sans passerelle",
      "Espace client multi-utilisateurs ",
      "Annonces géolocalisées",
      "Engagement durée minimum 1 mois",
    ],
    buttonText: "Découvrir l'offre",
  },
  {
    name: "Pack Expert",
    price: 199,
    href: "/pack/expert",
    description: "Pour un volume d'activité important",
    features: [
      "Jusqu'à 50 annonces",
      "Diffusion annonces sans passerelle",
      "Espace client multi-utilisateurs ",
      "Annonces géolocalisées",
      "Engagement durée minimum 1 mois",
    ],
    buttonText: "Découvrir l'offre",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-24 px-6 font-inherit">
      
      {/* HEADER SECTION */}
      <div className="max-w-3xl mb-24 text-center space-y-8">
        <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">Tarification</p>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[0.1em] text-gray-900">
         Diffusez vos annonces sur unbienimmo.com
        </h2>
        <div className="w-12 h-px bg-gray-900 mx-auto" />
        <p className="text-lg font-light text-gray-500 leading-relaxed italic">
          "Une liberté totale : pas d'engagement de durée, rupture possible sans préavis ni justification."
        </p>
      </div>

      {/* PRICING GRID */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 border border-gray-300">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative p-12 flex flex-col transition-all duration-500",
              plan.isPopular 
                ? "bg-black text-white lg:scale-105 z-10 shadow-[0_0_80px_rgba(0,0,0,0.1)]" 
                : "bg-white text-gray-900 border-r border-gray-100 last:border-r-0"
            )}
          >
            {plan.isPopular && (
              <span className="absolute top-0 left-0 w-full text-center -translate-y-1/2">
                <span className="bg-white text-gray-900 text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-1 border border-gray-900">
                  Recommandé
                </span>
              </span>
            )}

            <h3 className={cn(
              "text-[10px] uppercase tracking-[0.4em] font-bold mb-8",
              plan.isPopular ? "text-white" : "text-gray-400"
            )}>
              {plan.name}
            </h3>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-5xl font-bold text-orange-600 tracking-[0.2em] ">{plan.price}€</span>
              <span className="text-xs uppercase tracking-widest font-bold ">/ HT</span>
            </div>
            
            <p className="text-xs font-medium uppercase tracking-widest mb-10">
              {plan.description}
            </p>

            <Separator className={cn("mb-10", plan.isPopular ? "bg-white/50" : "bg-gray-100")} />

            <ul className="space-y-6 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-bold">
                  <Check className={cn("h-3 w-3", plan.isPopular ? "text-white" : "text-gray-900")} />
                  <span className={plan.isPopular ? "text-white" : "text-gray-600"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* BOUTON AVEC LIEN */}
            <Link href={plan.href} className="w-full mt-12">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-16 rounded-none uppercase text-[10px] tracking-[0.3em] font-bold transition-all",
                  plan.isPopular 
                    ? "bg-white text-gray-900 hover:bg-gray-100 border-none" 
                    : "bg-transparent border-gray-200 hover:border-gray-900 text-gray-400 hover:text-gray-900"
                )}
              >
                <span className="flex items-center gap-2">
                  {plan.buttonText} <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <p className="mt-16 text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold">
        Toutes nos offres sont soumises à la TVA en vigueur.
      </p>
    </div>
  );
};

export default Pricing;