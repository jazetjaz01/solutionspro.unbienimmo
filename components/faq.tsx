"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "Quels types de professionnels peuvent diffuser sur la plateforme ?",
    answer:
      "unbienimmo.com est exclusivement dédié aux experts du secteur : agences immobilières indépendantes, syndics, notaires, promoteurs, aménageurs et constructeurs. Cette spécialisation garantit une audience qualifiée et un environnement professionnel cohérent.",
  },
  {
    question: "Comment fonctionne la diffusion sans passerelle payante ?",
    answer:
      "Nous prônons l'indépendance de vos données. Vous pouvez importer vos annonces directement via nos outils de gestion ou par flux automatisés. En supprimant les intermédiaires de diffusion coûteux, nous vous permettons de réduire vos frais fixes tout en gardant un contrôle total sur vos annonces.",
  },
  {
    question: "La géolocalisation est-elle précise pour tous les types de biens ?",
    answer:
      "Oui, notre technologie de géolocalisation avancée permet de situer précisément vos mandats ou vos programmes neufs. Cela offre aux futurs acquéreurs une expérience de recherche optimisée par quartier, facilitant ainsi la prise de contact avec les professionnels locaux.",
  },
  {
    question: "Pourquoi choisir une plateforme indépendante ?",
    answer:
      "En choisissant unbienimmo.com, vous soutenez un écosystème qui n'appartient ni à un grand réseau de franchises, ni à des fonds d'investissement. Notre neutralité garantit que vos données ne sont pas utilisées pour favoriser un réseau concurrent et que nos tarifs restent stables et transparents.",
  },
  {
    question: "Comment sont gérés les leads et les contacts ?",
    answer:
      "Chaque demande effectuée sur l'un de vos biens vous est transmise directement et sans délai. Nous ne conservons aucune commission sur vos transactions.Vous restez le seul interlocuteur de vos clients.",
  },
];

const FAQ = () => {
  return (
    // On ajoute 'w-full' et on s'assure que le centrage flex n'est pas perturbé par le contenu
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-6 py-24 bg-white font-inherit">
      
      {/* On fixe la largeur du bloc ici pour empêcher tout mouvement latéral */}
      <div className="w-full max-w-5xl mx-auto">
        
        <div className="space-y-4 mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">
            Aide & Support
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[0.2em] leading-[1.1]">
            Questions fréquentes
          </h2>
        </div>

        {/* L'accordéon doit prendre 100% de son parent fixé à 3xl */}
        <Accordion type="single" collapsible className="w-full border-t border-gray-100" defaultValue="question-0">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={index} value={`question-${index}`} className="border-b border-gray-100 w-full">
              <AccordionTrigger className="text-left text-lg  py-6 hover:no-underline hover:text-gray-600 transition-colors">
                {/* On enveloppe le texte pour éviter qu'il ne pousse les bords */}
                <span className="pr-4">{question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-base   leading-relaxed pb-6 max-w-full">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;