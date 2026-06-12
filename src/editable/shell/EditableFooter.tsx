import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { slot4BrandConfig } from '@/editable/theme/brand.config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': 'var(--editable-page-bg, #fffaf3)', '--editable-footer-text': 'var(--editable-page-text, #241915)' } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const brandName = slot4BrandConfig.siteName
  const year = new Date().getFullYear()
  const siteLinks = globalContent.footer?.columns?.[1]?.links || [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]

  return (
    <footer style={footerVars} className="border-t border-[#d8c7b8] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden border border-[#d8c7b8] bg-white">
              <img src="/favicon.png?v=20260413" alt={brandName} className="h-9 w-9 object-contain" />
            </span>
            <span className="text-lg font-black tracking-[-0.04em]">{brandName}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 opacity-70">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] opacity-55">Explore</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold opacity-75 hover:opacity-100">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] opacity-55">{globalContent.footer?.columns?.[1]?.title || 'Site'}</h3>
          <div className="mt-4 grid gap-2">
            {siteLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm font-bold opacity-75 hover:opacity-100">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#d8c7b8] px-4 py-5 text-center text-xs font-bold opacity-55">
        © {year} {brandName}. {globalContent.footer?.bottomNote || 'All rights reserved.'}
      </div>
    </footer>
  )
}
