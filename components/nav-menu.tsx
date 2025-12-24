"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  // Style minimaliste : Typographie 10px, Majuscules, Tracking large
  const minimalTriggerStyle = 
    "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-gray-900 transition-colors bg-transparent";

  // Style pour la ligne de soulignement animée
  const underlineEffect = 
    "relative after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[1px] after:bg-gray-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300";

  return (
    <NavigationMenu {...props} className={cn("max-w-max", props.className)}>
      <NavigationMenuList className="flex-row gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-4">
        
        {/* NOS OFFRES */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(minimalTriggerStyle, underlineEffect)}>
            <Link href="/offres">Nos offres</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* ACTUALITÉ */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(minimalTriggerStyle, underlineEffect)}>
            <Link href="/actualite">Actualité</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* CONTACT */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(minimalTriggerStyle, underlineEffect)}>
            <Link href="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* SEPARATEUR DISCRET (Optionnel) */}
        <div className="hidden lg:block w-px h-4 bg-gray-100 mx-2 self-center" />

        {/* LIEN VERS LE SITE PUBLIC */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={cn(minimalTriggerStyle, underlineEffect)}>
            <Link href="https://www.unbienimmo.com" className="text-gray-900">
              unbienimmo.com
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  );
};