"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* ICONE SUCCÈS */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle2 className="h-20 w-20 text-green-500 stroke-[1.5]" />
            <div className="absolute inset-0 bg-green-100 rounded-full scale-150 -z-10 animate-pulse opacity-50" />
          </div>
        </div>

        {/* TEXTE PRINCIPAL */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Paiement confirmé !
          </h1>
          <p className="text-gray-500 font-light leading-relaxed">
            Merci de votre confiance. Votre abonnement professionnel sur 
            <span className="font-medium text-gray-900"> unbienimmo.com</span> est désormais actif.
          </p>
        </div>

        {/* INSTRUCTIONS POST-PAIEMENT */}
        <div className="bg-gray-50 border border-gray-100 p-8 space-y-6 text-left">
          <div className="flex gap-4">
            <Mail className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Vérifiez vos emails</h3>
              <p className="text-xs text-gray-500 mt-1 italic">
                Nous venons de vous envoyer un lien sécurisé pour définir votre mot de passe et finaliser votre profil.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <ShieldCheck className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900">Accès sécurisé</h3>
              <p className="text-xs text-gray-500 mt-1 italic">
                Une fois votre mot de passe configuré, vous pourrez diffuser vos premières annonces immédiatement.
              </p>
            </div>
          </div>
        </div>

        {/* ACTION FINALE */}
        <div className="pt-4">
          <Link href="https://mail.google.com" target="_blank">
            <Button className="w-full h-16 rounded-none uppercase text-[10px] tracking-[0.3em] font-bold bg-gray-900 hover:bg-orange-600 transition-all group">
              Ouvrir ma boîte mail <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="mt-6 text-[9px] uppercase tracking-widest text-gray-400">
            Une question ? Contactez notre support à pro@unbienimmo.com
          </p>
        </div>
      </div>
    </div>
  );
}