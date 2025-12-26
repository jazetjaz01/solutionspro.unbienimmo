import { MailIcon, MapPinIcon, PhoneIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

const Contact = () => (
  <div className="min-h-screen bg-white font-inherit selection:bg-gray-900 selection:text-white">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
      
      {/* HEADER ÉDITORIAL */}
      <div className="mb-24 border-b border-gray-100 pb-12">
        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-4">
          Nous contacter
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold -tracking-wide text-gray-900 ">
          Parlons de votre <br /> prochain projet.
        </h1>
        <p className="mt-8 text-lg font-light text-gray-500 max-w-xl leading-relaxed">
          Notre équipe dédiée aux professionnels de l'immobilier est à votre disposition pour toutes questions techniques ou commerciales.
        </p>
      </div>

      {/* GRILLE DE CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        
        {/* EMAIL */}
        <div className="group space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-gray-900 transition-all group-hover:w-12" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Email</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-400 font-light">
              Pour toute demande d'assistance ou d'information générale.
            </p>
            <Link
              className="block text-xl font-light text-gray-900 hover:italic transition-all flex items-center gap-2"
              href="mailto:contact@unbienimmo.com"
            >
              contact@unbienimmo.com
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        {/* SIÈGE SOCIAL */}
        <div className="group space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-gray-900 transition-all group-hover:w-12" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Siège Social</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-400 font-light">
              Nos bureaux sont ouverts du lundi au samedi.
            </p>
            <Link
              className="block text-xl font-light text-gray-900 leading-snug hover:italic transition-all"
              href="https://maps.google.com"
              target="_blank"
            >
              Merci Immobilier <br />7 avenue de Banyuls sur Mer <br /> 66100 Perpignan, France
            </Link>
          </div>
        </div>

        {/* TÉLÉPHONE */}
        <div className="group space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-gray-900 transition-all group-hover:w-12" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Téléphone</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-400 font-light">
              Disponibles de 08h00 à 20h00 pour vous accompagner du lundi au samedi
            </p>
            <Link
              className="block text-xl font-light text-gray-900 hover:italic transition-all items-center gap-2"
              href="tel:0616224682"
            >
              0616224682
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER DE PAGE (Optionnel) */}
      <div className="mt-32 pt-12 border-t border-gray-50 flex justify-between items-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300 font-medium">
          UnBienImmo Solutions Professionnelles
        </p>
        <div className="flex gap-8">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">Système en ligne</span>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;