import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export function EditableFooter() {
  const footerVars = { '--editable-footer-bg': '#170d08', '--editable-footer-text': '#fff1df' } as CSSProperties
  const brandName = slot4BrandConfig.siteName
  const year = new Date().getFullYear()

  return (
    <footer style={footerVars} className="border-t border-[#3f2a1c] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.35fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#5c3a23] bg-[#2f2118]">
              <img src="/favicon.png?v=20260413" alt={brandName} className="h-8 w-8 object-contain" />
            </span>
            <span className="text-2xl font-black tracking-normal [font-family:Georgia,serif]">{brandName}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/68">{globalContent.footer.description}</p>
          <div className="mt-8 max-w-xl rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f6c996]">Your turn</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal [font-family:Georgia,serif]">Publish something readers remember.</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">Free account flow, article archive, search, comments, and a warmer editorial interface for the whole site.</p>
          </div>
        </div>

        {globalContent.footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[#f6c996]">{column.title}</h3>
            <div className="mt-4 grid gap-2">
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#3f2a1c] px-4 py-5 text-center text-xs font-bold text-white/45">
        &copy; {year} {brandName}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
