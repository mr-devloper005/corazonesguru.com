import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { slot4BrandConfig } from '@/editable/theme/brand.config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#050505', '--editable-footer-text': '#f0f0f0' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const brandName = slot4BrandConfig.siteName
  const year = new Date().getFullYear()
  const siteLinks = globalContent.footer?.columns?.[1]?.links || [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]

  return (
    <footer style={footerVars} className="border-t border-white/[0.06] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden">
              <img src="/favicon.png?v=20260413" alt={brandName} className="h-7 w-7 object-contain" />
            </span>
            <span className="text-[15px] font-bold text-white">{brandName}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Explore</h3>
          <div className="mt-5 grid gap-3">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-[#ff3d8b]">
                {task.label} <ArrowUpRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{globalContent.footer?.columns?.[1]?.title || 'Site'}</h3>
          <div className="mt-5 grid gap-3">
            {siteLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/55 transition hover:text-[#ff3d8b]">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Connect</h3>
          <div className="mt-5 grid gap-3">
            <Link href="/signup" className="text-sm font-medium text-white/55 transition hover:text-[#ff3d8b]">Create account</Link>
            <Link href="/login" className="text-sm font-medium text-white/55 transition hover:text-[#ff3d8b]">Sign in</Link>
            <Link href="/search" className="text-sm font-medium text-white/55 transition hover:text-[#ff3d8b]">Search</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-4 py-6 text-center text-[12px] font-medium tracking-[0.04em] text-white/25">
        &copy; {year} {brandName}. {globalContent.footer?.bottomNote || 'All rights reserved.'}
      </div>
    </footer>
  )
}
