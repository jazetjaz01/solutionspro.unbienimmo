import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "./logo";

const footerSections = [
  {
    title: "Plateforme",
    links: [
      { title: "Vue d'ensemble", href: "/dashboard" },
      { title: "Fonctionnalités", href: "#" },
      { title: "Nos offres", href: "/offres" },
      { title: "Diffusion directe", href: "#" },
      { title: "Mises à jour", href: "#" },
    ],
  },
  {
    title: "Société",
    links: [
      { title: "À propos", href: "/qui-sommes-nous" },
      { title: "Indépendance", href: "#" },
      { title: "Presse", href: "#" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { title: "Blog Immobilier", href: "#" },
      { title: "Guide Partenaire", href: "#" },
      { title: "Aide & Support", href: "/faq" },
      { title: "Tutoriels", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { title: "Agences", href: "#" },
      { title: "Notaires", href: "#" },
      { title: "Promoteurs", href: "#" },
      { title: "Syndics", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { title: "LinkedIn", href: "#" },
      { title: "Instagram", href: "#" },
      { title: "Facebook", href: "#" },
      { title: "Twitter (X)", href: "#" },
    ],
  },
  {
    title: "Légal",
    links: [
      { title: "CGU / CGV", href: "/cgv" },
      { title: "Confidentialité", href: "/mentions_legales" },
      { title: "Cookies", href: "#" },
      { title: "RGPD", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* LOGO SECTION HAUTE */}
        <div className="mb-20">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <Logo />
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-900">
                UnBienImmo
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-light text-gray-400">
                Solutions Pro
              </span>
            </div>
          </Link>
        </div>

        {/* GRILLE DES SECTIONS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-16">
          {footerSections.map(({ title, links }) => (
            <div key={title} className="flex flex-col space-y-6">
              <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 border-b border-gray-50 pb-4">
                {title}
              </h6>
              <ul className="space-y-4">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors duration-300 inline-block relative group"
                    >
                      {title}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-24 mb-12 bg-gray-50" />

        {/* BOTTOM BAR ÉPURÉE */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-gray-300 font-bold">
            <span>&copy; 2026 UNBIENIMMO.COM</span>
            <span className="hidden md:block text-gray-100">|</span>
            <span className="text-center md:text-left">
              Annonces Immobilières Géolocalisées
            </span>
          </div>

          <div className="text-[9px] uppercase tracking-[0.4em] text-gray-300">
            Design Minimal Flat v2.0
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;