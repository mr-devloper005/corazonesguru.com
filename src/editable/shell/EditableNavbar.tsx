'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const brandName = slot4BrandConfig.siteName
  const navVars = { '--editable-nav-bg': '#2f2118', '--editable-nav-text': '#fff4e6', '--editable-nav-active': '#fff4e6', '--editable-nav-active-text': '#2f2118', '--editable-cta-bg': '#f1763d', '--editable-cta-text': '#fff8ef', '--editable-search-bg': '#493629', '--editable-border': 'rgba(246,201,150,0.28)', '--editable-container': '1280px' } as CSSProperties
  const navItems = useMemo(() => [...globalContent.nav.primaryLinks], [])

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] shadow-[0_10px_30px_rgba(32,18,12,0.18)]">
      <nav className="mx-auto flex min-h-[64px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-[#3b271c] shadow-sm transition-transform group-hover:-rotate-2">
            <img src="/favicon.png?v=20260413" alt={brandName} className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[210px] truncate text-xl font-black tracking-normal [font-family:Georgia,serif]">{brandName}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center lg:flex">
          <label className="relative flex w-full max-w-lg items-center rounded-full border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-4 py-2.5 shadow-inner">
            <Search className="h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search articles, essays, authors..." className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-current/45" />
          </label>
        </form>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'text-white/78 hover:bg-white/8 hover:text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <span className="hidden max-w-[150px] truncate rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black text-white/90 sm:inline-flex">{session.name}</span>
              <button type="button" onClick={logout} className="hidden rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-sm font-black hover:bg-white/8 sm:inline-flex"><LogIn className="h-4 w-4" /> Log in</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-black text-[var(--editable-cta-text)] shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Join free</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] bg-white/10 p-2 xl:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-4 py-4 xl:hidden">
          <form action="/search" className="mb-4 flex rounded-2xl border border-[var(--editable-border)] bg-[var(--editable-search-bg)] px-3 py-2">
            <Search className="mt-1 h-4 w-4 opacity-55" />
            <input name="q" type="search" placeholder="Search articles" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--editable-border)] bg-white/8 px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-2xl bg-[var(--editable-cta-bg)] px-4 py-3 text-left text-sm font-black text-[var(--editable-cta-text)]">Logout {session.name}</button>
            ) : (
              <Link href="/signup" onClick={() => setOpen(false)} className="rounded-2xl bg-[var(--editable-cta-bg)] px-4 py-3 text-sm font-black text-[var(--editable-cta-text)]">Join free</Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
