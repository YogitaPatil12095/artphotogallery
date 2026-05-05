import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Folder, Image } from '@/types/database'
import SiteHeader from '@/components/gallery/SiteHeader'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import Link from 'next/link'

interface PageProps {
  params: { slug: string }
}

async function getFolderData(slug: string): Promise<{ folder: Folder; images: Image[] } | null> {
  const { data: folder, error: folderError } = await supabase
    .from('folders')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .single()

  if (folderError || !folder) return null

  const { data: images, error: imagesError } = await supabase
    .from('images')
    .select('*')
    .eq('folder_id', folder.id)
    .order('sort_order', { ascending: true })

  if (imagesError) return null

  return { folder, images: images || [] }
}

export const revalidate = 60

export default async function FolderPage({ params }: PageProps) {
  const data = await getFolderData(params.slug)

  if (!data) {
    notFound()
  }

  const { folder, images } = data

  return (
    <div className="min-h-screen bg-charcoal">
      <SiteHeader />

      <main className="max-w-screen-2xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="font-mono text-xs tracking-widest uppercase text-cream/40 hover:text-cream/70 transition-colors"
          >
            ← Archive
          </Link>
        </div>

        {/* Folder header */}
        <div className="mb-12 border-b border-cream/10 pb-10">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-brown mb-3">
            Folder
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-off-white mb-4">
            {folder.title}
          </h1>
          {folder.description && (
            <p className="text-cream/50 text-sm max-w-xl leading-relaxed">
              {folder.description}
            </p>
          )}
          <p className="mt-4 font-mono text-xs text-cream/30 tracking-widest uppercase">
            {images.length} image{images.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Gallery */}
        {images.length === 0 ? (
          <div className="text-center py-24 text-cream/30">
            <p className="font-mono text-sm tracking-widest uppercase">
              This folder is empty
            </p>
          </div>
        ) : (
          <GalleryGrid images={images} />
        )}
      </main>

      <footer className="border-t border-cream/10 mt-24 py-8 text-center">
        <p className="font-mono text-xs text-cream/30 tracking-widest uppercase">
          Crony — Personal Archive
        </p>
      </footer>
    </div>
  )
}
