"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight, Building2, Mail, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

const PACKS = [
  { id: "essentiel", name: "Essentiel", price: 49 },
  { id: "professionnel", name: "Professionnel", price: 99 },
  { id: "expert", name: "Expert", price: 199 },
];

export default function SubscriptionForm() {
  const [loading, setLoading] = useState(false);
  const [selectedPack, setSelectedPack] = useState("essentiel");
  
  // Données de la société
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    siret: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          name: formData.companyName,
          siret: formData.siret,
          packName: selectedPack,
          type: "agence", // Par défaut
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Envoi vers Stripe
      }
    } catch (error) {
      console.error("Erreur de redirection:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-5xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* ÉTAPE 1 : INFOS SOCIÉTÉ */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">1. Votre société</h2>
            <p className="text-sm text-gray-500 mt-2 italic underline underline-offset-4 decoration-orange-500">
                Ces informations seront utilisées pour créer votre compte professionnel.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-[10px] uppercase tracking-widest font-bold">Nom de l'agence</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="companyName" placeholder="Ex: Agence du Centre" className="pl-10 rounded-none h-12" required value={formData.companyName} onChange={handleInputChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="contact@agence.com" className="pl-10 rounded-none h-12" required value={formData.email} onChange={handleInputChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siret" className="text-[10px] uppercase tracking-widest font-bold">Numéro SIRET</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="siret" placeholder="14 chiffres" className="pl-10 rounded-none h-12" required value={formData.siret} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>

        {/* ÉTAPE 2 : CHOIX DU PACK */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">2. Choisissez votre pack</h2>
          
          <div className="space-y-4">
            {PACKS.map((pack) => (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack.id)}
                className={cn(
                  "p-6 border cursor-pointer transition-all flex justify-between items-center group",
                  selectedPack === pack.id 
                    ? "border-orange-500 bg-orange-50/30" 
                    : "border-gray-200 hover:border-gray-400"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-5 h-5 border rounded-full flex items-center justify-center transition-colors",
                    selectedPack === pack.id ? "border-orange-500 bg-orange-500" : "border-gray-300"
                  )}>
                    {selectedPack === pack.id && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold">Pack {pack.name}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-tighter mt-1 italic">Sans engagement</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold tracking-tighter text-orange-600 italic">{pack.price}€</span>
                  <span className="text-[10px] font-bold text-gray-400 ml-1">/HT</span>
                </div>
              </div>
            ))}
          </div>

          <Button 
            disabled={loading}
            className="w-full h-16 rounded-none bg-gray-900 text-white uppercase text-[11px] tracking-[0.3em] font-bold hover:bg-orange-600 transition-all group"
          >
            {loading ? "Chargement..." : "Accéder au paiement sécurisé"}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </Button>
          
          <p className="text-center text-[9px] uppercase tracking-widest text-gray-400">
             Transaction sécurisée par Stripe. <br/> Facture disponible après validation.
          </p>
        </div>

      </div>
    </form>
  );
}