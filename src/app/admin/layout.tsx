'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    }
  }, [user, loading, pathname, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <p className="font-mono text-xs tracking-widest uppercase text-cream/30 animate-pulse">
          Loading…
        </p>
      </div>
    )
  }

  if (!user && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#2A2826] flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
