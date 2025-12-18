import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { SunIcon } from "lucide-react";
import { Suspense } from 'react'
import { AuthButton } from '@/components/auth-button'
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-sarina text-lg  hidden md:block">unbienimmo</span>
          </Link>

        <div className="flex items-center gap-6">
           <NavMenu className="hidden md:block" />
            <Suspense>
            <AuthButton />
            </Suspense>
            
          </div>
      </div>
    </nav>
  );
};

export default Navbar;



 <NavMenu className="hidden md:block" />