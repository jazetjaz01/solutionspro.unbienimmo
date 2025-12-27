import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

const EssentielPage = () => {
  const plan = {
    name: "Pack Professionnel",
    price: 99,
    description: "Abonnement mensuel sans engagement",
    features: [
      "Jusqu'à 25 annonces simultanées",
      "Diffusion annonces sans passerelle",
      "Espace client multi-utilisateurs",
      "Annonces géolocalisées",
      "Engagement durée minimum 1 mois",
      "Souscription immédiate",
    ],
  };

  return (
    <div className="min-h-screen bg-white font-inherit flex flex-col">
      {/* SECTION PRINCIPALE / HERO */}
      <div className="flex-grow flex flex-col items-center py-20 px-6">
        <div className="max-w-3xl mb-16 text-center space-y-6">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-orange-600">
            Offre unbienimmo.com
          </p>
          <h1 className="text-4xl md:text-7xl font-semibold tracking-[0.1em]">
            Pack Professionnel<span className="text-orange-600">.</span>
          </h1>
          <p className="text-lg font-light text-gray-500 leading-relaxed max-w-xl mx-auto">
            La solution parfaite pour une agence avec plusieurs collaborateurs souhaitant une visibilité immédiate sur{" "}
            <a 
              href="https://www.unbienimmo.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold tracking-[0.1em] text-orange-500 hover:underline decoration-orange-500 underline-offset-4 transition-all"
            >
              unbienimmo.com
            </a>.
          </p>
        </div>

        {/* CARTE DE PRESENTATION CENTRALE */}
        <div className="w-full max-w-2xl border border-gray-200 bg-white p-8 md:p-16 shadow-sm">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2">
                Détail du pack
              </h3>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-900">
                {plan.description}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-orange-600 tracking-[0.2em]">{plan.price}€</span>
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">/ HT</span>
              </div>
            </div>
          </div>

          <Separator className="mb-12 bg-gray-100" />

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 mb-16">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-bold text-gray-600">
                <Check className="h-4 w-4 text-orange-600 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          {/* BOUTON D'ACTION */}
          <Link href="/souscrire-essentiel" className="w-full">
            <Button
              className="w-full h-20 rounded-none uppercase text-[12px] tracking-[0.4em] font-bold bg-gray-900 text-white hover:bg-orange-600 transition-all duration-300 group"
            >
              <span className="flex items-center gap-3">
                Je souscris <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </Link>

          <p className="mt-6 text-center text-[9px] uppercase tracking-widest text-gray-400">
            Activation immédiate après paiement sécurisé
          </p>
        </div>

        {/* ARGUMENTS DE REASSURANCE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 max-w-5xl w-full border-t border-gray-100 pt-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <ShieldCheck className="h-8 w-8 text-gray-300" strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Sans engagement</h4>
            <p className="text-xs text-gray-500 font-light italic">Liberté totale, résiliation en un clic.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Zap className="h-8 w-8 text-gray-300" strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Mise en ligne flash</h4>
            <p className="text-xs text-gray-500 font-light italic">Vos annonces visibles immédiatement.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <Globe className="h-8 w-8 text-gray-300" strokeWidth={1} />
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Multi-plateforme</h4>
            <p className="text-xs text-gray-500 font-light italic">Optimisé pour desktop, tablette et mobile.</p>
          </div>
        </div>
      </div>

      {/* FOOTER / CGV */}
      <footer className="w-full py-12 border-t border-gray-100 bg-gray-50/50 flex flex-col items-center space-y-4">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold">
          © © 2026 unbienimmo.com 
        </p>
        <Link 
          href="/cgv" 
          className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-orange-600 font-bold transition-colors"
        >
          Conditions Générales de Vente
        </Link>
      </footer>
    </div>
  );
};

export default EssentielPage;