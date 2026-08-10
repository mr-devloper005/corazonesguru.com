'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const brandName = slot4BrandConfig.siteName
  const navVars = {
    '--editable-nav-bg': 'rgba(5,5,5,0.85)',
    '--editable-nav-text': '#f0f0f0',
    '--editable-nav-active': '#ff3d8b',
    '--editable-nav-active-text': '#ffffff',
    '--editable-cta-bg': '#ff3d8b',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': 'rgba(255,255,255,0.06)',
    '--editable-border': 'rgba(255,255,255,0.08)',
    '--editable-container': '1280px',
  } as CSSProperties
  const navItems = useMemo(() => [...globalContent.nav.primaryLinks], [])

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[64px] w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden">
            <img src="/favicon.png?v=20260413" alt={brandName} className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden text-[15px] font-bold tracking-[-0.01em] text-white sm:block">{brandName}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`px-4 py-2 text-[13px] font-medium tracking-[0.06em] uppercase transition ${active ? 'text-white' : 'text-white/55 hover:text-white/85'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <form action="/search" className="hidden lg:block">
            <label className="relative flex items-center rounded-sm border border-white/[0.08] bg-[var(--editable-search-bg)] px-3 py-2">
              <Search className="h-3.5 w-3.5 text-white/40" />
              <input name="q" type="search" placeholder="Search..." className="w-32 min-w-0 bg-transparent px-2 text-[13px] text-white outline-none placeholder:text-white/30" />
            </label>
          </form>

          {session ? (
            <>
              <span className="hidden max-w-[150px] truncate rounded-sm border border-white/[0.08] px-4 py-2 text-[13px] font-medium tracking-[0.06em] uppercase text-white/80 sm:inline-flex">{session.name}</span>
              <button type="button" onClick={logout} className="hidden rounded-sm bg-[var(--editable-cta-bg)] px-5 py-2 text-[13px] font-semibold tracking-[0.06em] uppercase text-white sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-sm border border-white/[0.12] px-5 py-2 text-[13px] font-medium tracking-[0.08em] uppercase text-white/80 transition hover:bg-white/[0.05] sm:inline-flex">
                Log in
              </Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-sm bg-[var(--editable-cta-bg)] px-5 py-2 text-[13px] font-semibold tracking-[0.08em] uppercase text-white sm:inline-flex">
                Sign up
              </Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-sm border border-white/[0.08] bg-white/[0.05] p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/[0.06] bg-[#080808] px-4 py-5 lg:hidden">
          <form action="/search" className="mb-4 flex items-center rounded-sm border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
            <Search className="h-4 w-4 text-white/40" />
            <input name="q" type="search" placeholder="Search..." className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none" />
          </form>
          <div className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...navItems].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-sm px-4 py-3 text-[13px] font-medium tracking-[0.06em] uppercase text-white/70 transition hover:bg-white/[0.04] hover:text-white">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="mt-2 rounded-sm bg-[#ff3d8b] px-4 py-3 text-left text-[13px] font-semibold tracking-[0.06em] uppercase text-white">Logout {session.name}</button>
            ) : (
              <Link href="/signup" onClick={() => setOpen(false)} className="mt-2 rounded-sm bg-[#ff3d8b] px-4 py-3 text-[13px] font-semibold tracking-[0.06em] uppercase text-white">Sign up</Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
