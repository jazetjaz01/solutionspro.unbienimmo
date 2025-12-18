import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "./logo";

const footerSections = [
  {
    title: "Product",
    links: [
      {
        title: "Overview",
        href: "#",
      },
      {
        title: "Features",
        href: "#",
      },
      {
        title: "Solutions",
        href: "#",
      },
      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Pricing",
        href: "#",
      },
      {
        title: "Releases",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        title: "About us",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Press",
        href: "#",
      },
      {
        title: "News",
        href: "#",
      },
      {
        title: "Media kit",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Newsletter",
        href: "#",
      },
      {
        title: "Events",
        href: "#",
      },
      {
        title: "Help centre",
        href: "#",
      },
      {
        title: "Tutorials",
        href: "#",
      },
      {
        title: "Support",
        href: "#",
      },
    ],
  },
  {
    title: "Use cases",
    links: [
      {
        title: "Startups",
        href: "#",
      },
      {
        title: "Enterprise",
        href: "#",
      },
      {
        title: "Government",
        href: "#",
      },
      {
        title: "SaaS",
        href: "#",
      },
      {
        title: "Marketplaces",
        href: "#",
      },
      {
        title: "Ecommerce",
        href: "#",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        title: "Twitter",
        href: "#",
      },
      {
        title: "LinkedIn",
        href: "#",
      },
      {
        title: "Facebook",
        href: "#",
      },
      {
        title: "GitHub",
        href: "#",
      },
      {
        title: "AngelList",
        href: "#",
      },
      {
        title: "Dribbble",
        href: "#",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Terms",
        href: "#",
      },
      {
        title: "Privacy",
        href: "#",
      },
      {
        title: "Cookies",
        href: "#",
      },
      {
        title: "Licenses",
        href: "#",
      },
      {
        title: "Settings",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="   mx-auto px-4 sm:px-6 lg:px-24">
    <div className="min-h-screen flex flex-col">
      
    
      <footer className="border-t">
        <div className="max-w-(--breakpoint-xl) mx-auto">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-10 px-6 xl:px-0">
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-medium">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator />
          <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-x-2 gap-y-4 px-6 xl:px-0">
            {/* Logo */}
         <Logo />

            {/* Copyright */}
            <span className="text-muted-foreground">
            
              <Link href="/" target="_blank">
                Unbienimmo.com site d'annonces immobilières géolocalisées
              </Link>
              . 2026
            </span>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default Footer;
