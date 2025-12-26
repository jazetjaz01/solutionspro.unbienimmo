"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Vérifiez votre chemin
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Typage simple pour vos articles
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at: string;
}

const Blog = () => {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false }); // Les plus récents en premier

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error("Erreur lors du chargement des articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [supabase]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 bg-white font-inherit">
      
      {/* HEADER DE SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-gray-400">
            Actualités
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[0.1em] text-gray-900 ">
            Lectures recommandées
          </h2>
        </div>
        
        {/* Le filtre pourrait être rendu fonctionnel plus tard avec un .order() dynamique */}
        <Select defaultValue="latest">
          <SelectTrigger className="w-[200px] rounded-none border-gray-100 uppercase text-[10px] tracking-widest font-bold h-12">
            <SelectValue placeholder="Filtrer par" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-gray-100">
            <SelectItem value="latest" className="text-[10px] uppercase tracking-widest">Récents</SelectItem>
            <SelectItem value="popular" className="text-[10px] uppercase tracking-widest">Populaires</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GRILLE D'ARTICLES DYNAMIQUE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {posts.map((post) => (
          <article key={post.id} className="group flex flex-col items-start">
            
            {/* IMAGE / VIGNETTE DYNAMIQUE */}
            <Link href={`/actualite/${post.slug}`} className="w-full">
              <div className="relative aspect-[16/10] bg-gray-50 w-full mb-8 overflow-hidden">
                {post.image_url ? (
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-300">
                    Pas d'image
                  </div>
                )}
              </div>
            </Link>

            {/* METADATA */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-900 border-b border-gray-900">
                Immobilier
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-gray-400">
                {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>

            {/* TITRE & DESCRIPTION DYNAMIQUE */}
            <div className="space-y-4 flex-grow">
              <Link href={`/actualite/${post.slug}`}>
                <h3 className="text-2xl font-light tracking-tight text-gray-900 leading-snug group-hover:italic transition-all">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-2">
                {/* On nettoie le contenu si c'est du HTML ou on prend le début du texte */}
                {post.content.substring(0, 150).replace(/<[^>]*>?/gm, '')}...
              </p>
            </div>

            {/* ACTION */}
            <Link 
              href={`/blog/${post.slug}`} 
              className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 group-hover:text-gray-900 transition-colors"
            >
              Lire la suite 
              <ArrowRight className="h-3 w-3 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </Link>
          </article>
        ))}
      </div>

      {/* BOUTON VOIR TOUT */}
      {posts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-gray-50 flex justify-center">
          <Button 
            variant="outline" 
            className="rounded-none border-gray-900 h-16 px-12 uppercase text-[10px] tracking-[0.4em] font-bold hover:bg-gray-900 hover:text-white transition-all"
          >
            Voir tous les articles
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blog;