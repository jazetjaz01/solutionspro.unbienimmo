"use client"

import { useEffect, useState, use, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"

interface Post {
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  slug: string;
}

// 1. Le composant qui gère l'affichage et la récupération des données
function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const supabase = createClient()
  const router = useRouter()
  
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single()

        if (error || !data) {
          console.error("Article introuvable")
          router.push('/actualite')
        } else {
          setPost(data)
        }
      } catch (err) {
        console.error("Erreur serveur:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, supabase, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
      </div>
    )
  }

  if (!post) return null

  return (
    <article className="min-h-screen bg-white font-inherit">
      {/* HEADER / COVER IMAGE */}
      <div className="relative w-full h-[60vh] bg-gray-100">
        {post.image_url ? (
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
            Pas d'image de couverture
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white p-8 md:p-16 shadow-sm border-t-4 border-gray-900">
          
          {/* NAVIGATION RETOUR */}
          <Link 
            href="/actualite" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-gray-900 transition-colors mb-12"
          >
            <ArrowLeft className="h-3 w-3" /> Retour aux articles
          </Link>

          {/* METADATA */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
            <span className="text-gray-900 border-b border-gray-900 pb-1">Immobilier</span>
            <span className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              {new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* TITRE */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[0.2em] text-gray-900  mb-12 leading-[1.1]">
            {post.title}
          </h1>

          {/* CORPS DE L'ARTICLE */}
          <div className="prose prose-gray prose-lg max-w-none">
            <div className="text-gray-900 text-justify text-xl leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* FOOTER DE L'ARTICLE */}
          <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col items-center text-center">
            <p className="text-sm font-serif italic text-gray-400 mb-6">Merci de votre lecture.</p>
            <div className="h-1 w-12 bg-gray-900" />
          </div>
        </div>
      </div>
    </article>
  )
}

// 2. L'export par défaut enveloppé dans Suspense pour le build Vercel
export default function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
      </div>
    }>
      <PostContent params={params} />
    </Suspense>
  )
}