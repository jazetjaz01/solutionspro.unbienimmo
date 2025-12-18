import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

const plans = [
  {
    name: "Essentiel",
    price: 49,
    description:
      "Abonnement mensuel ",
    features: [
      "Publication  jusqu'a 5 annonces",
      "Diffusion des annonces sans passerelle",
      "Demande avis de valeurs transmises",
      "Demande de mise en contact vente",
      "Demande de mise en contact location",
    ],
    buttonText: "Je souhaite souscrire à cette offre",
  },
  {
    name: "Professionnel",
    price: 99,
    isRecommended: true,
    description:
      "Abonnement mensuel",
    features: [
      "Publication  jusqu'a 20 annonces",
      "Diffusion des annonces sans passerelle",
      "Demande avis de valeurs transmises",
      "Demande de mise en contact vente",
      "Demande de mise en contact location",
    ],
    buttonText: "Je souhaite souscrire à cette offre",
    isPopular: true,
  },
  {
    name: "Expert",
    price: 190,
    description:
      "Abonnement mensuel",
    features: [
      "Publication  jusqu'a 50 annonces",
      "Diffusion des annonces sans passerelle",
      "Demande avis de valeurs transmises",
      "Demande de mise en contact vente",
      "Demande de mise en contact location",
    ],
   buttonText: "Je souhaite souscrire à cette offre",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 max-w-5xl">
      <h2 className="text-5xl font-semibold text-center tracking-[-0.03em]">
        Nos offres 
      </h2>
      <p className="mt-3 text-lg text-center ">
        Vous trouverez ci-dessous nos offres commerciales à destination des agences immobilières, notaires, syndics et promoteurs.
        Il n'y a pas d'obligation de durée minimale lors de la souscription d'un de nos abonnements. Vous pouvez rompre sans préavis et sans justification votre abonnement. 
      </p>

      <div className="mt-12 sm:mt-16 max-w-(--breakpoint-lg) mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-10 lg:gap-0">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative border p-7 rounded-xl lg:rounded-none lg:first:rounded-l-xl lg:last:rounded-r-xl",
              {
                "border-2 border-primary py-12 rounded-xl!": plan.isPopular,
              }
            )}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Le plus populaire
              </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="mt-2 text-4xl font-semibold">€{plan.price} ht</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <Separator className="my-6" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-6"
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
