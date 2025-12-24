"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 bg-white font-sans">
      
      {/* HEADER DE SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">
            Actualités
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-gray-900 italic">
            Lectures recommandées
          </h2>
        </div>
        
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[200px] rounded-none border-gray-100 uppercase text-[10px] tracking-widest font-bold h-12">
            <SelectValue placeholder="Filtrer par" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-gray-100">
            <SelectItem value="recommended" className="text-[10px] uppercase tracking-widest">Recommandés</SelectItem>
            <SelectItem value="latest" className="text-[10px] uppercase tracking-widest">Récents</SelectItem>
            <SelectItem value="popular" className="text-[10px] uppercase tracking-widest">Populaires</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GRILLE D'ARTICLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <article key={i} className="group flex flex-col items-start">
            
            {/* IMAGE / VIGNETTE */}
            <div className="relative aspect-[16/10] bg-gray-50 w-full mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 group-hover:scale-105 transition-transform duration-700 ease-out" />
              {/* Remplacer par <Image /> une fois vos assets prêts */}
            </div>

            {/* METADATA */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-900 border-b border-gray-900">
                Immobilier
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-gray-400">
                4 min de lecture
              </span>
            </div>

            {/* TITRE & DESCRIPTION */}
            <div className="space-y-4 flex-grow">
              <h3 className="text-2xl font-light tracking-tight text-gray-900 leading-snug group-hover:italic transition-all">
                Comment l'indépendance transforme la diffusion de vos mandats
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-2">
                Découvrez pourquoi reprendre le contrôle de vos données est devenu l'enjeu majeur des agences en 2026.
              </p>
            </div>

            {/* ACTION */}
            <Link 
              href="#" 
              className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 group-hover:text-gray-900 transition-colors"
            >
              Lire la suite 
              <ArrowRight className="h-3 w-3 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </Link>
          </article>
        ))}
      </div>

      {/* BOUTON VOIR TOUT */}
      <div className="mt-24 pt-12 border-t border-gray-50 flex justify-center">
        <Button 
          variant="outline" 
          className="rounded-none border-gray-900 h-16 px-12 uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-gray-900 hover:text-white transition-all"
        >
          Voir tous les articles
        </Button>
      </div>
    </div>
  );
};

export default Blog;