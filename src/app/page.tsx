import { supabase } from '@/lib/supabase'
import { Folder } from '@/types/database'
import FolderGrid from '@/components/gallery/FolderGrid'
import SiteHeader from '@/components/gallery/SiteHeader'

async function getFolders(): Promise<Folder[]> {
  const { data, error } = await supabase
    .from('folders')
    .select('*')
    .eq('is_public', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching folders:', error)
    return []
  }

  return data || []
}

export const revalidate = 60

export default async function HomePage() {
  const folders = await getFolders()

  return (
    <div className="min-h-screen bg-charcoal">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Intro text */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-brown mb-4">
            Personal Archive
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-off-white leading-tight mb-6">
            A collection of<br />
            <em className="text-cream">moments & stories</em>
          </h1>
          <p className="text-cream/60 text-sm leading-relaxed font-sans">
            Each folder holds a chapter. Browse through the archive,
            open what calls to you.
          </p>
        </div>

        {/* Folders */}
        {folders.length === 0 ? (
          <div className="text-center py-24 text-cream/40">
            <p className="font-mono text-sm tracking-widest uppercase">
              Nothing here yet
            </p>
          </div>
        ) : (
          <FolderGrid folders={folders} />
        )}
      </main>

      {/* Decorative footer */}
      <footer className="border-t border-cream/10 mt-24 py-8 text-center">
        <p className="font-mono text-xs text-cream/30 tracking-widest uppercase">
          Crony — Personal Archive
        </p>
      </footer>
    </div>
  )
}
