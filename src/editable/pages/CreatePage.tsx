import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, ImageIcon, ListChecks, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/create',
    title: pagesContent.create.metadata.title,
    description: pagesContent.create.metadata.description,
  })
}

const taskIcon = [PenLine, ListChecks, ImageIcon, FileText]

export default function CreatePage() {
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <EditableSiteShell>
      <main className="bg-[#050505] px-4 py-12 text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-xl border border-white/[0.06] bg-[#111] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">
                {pagesContent.create.hero.badge}
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                {pagesContent.create.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-8 text-white/40">
                {pagesContent.create.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                  Login to create <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-sm border border-white/[0.1] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70">
                  Create account
                </Link>
              </div>
            </div>
            <div className="border-t border-white/[0.06] bg-[#0a0a0a] p-6 lg:border-l lg:border-t-0 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {tasks.map((task, index) => {
                  const Icon = taskIcon[index % taskIcon.length]
                  return (
                    <div key={task.key} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <Icon className="h-5 w-5 text-[#ff3d8b]" />
                      <h2 className="mt-4 text-lg font-semibold">{task.label}</h2>
                      <p className="mt-3 text-xs leading-6 text-white/35">
                        Create a polished {task.label.toLowerCase()} entry with title, summary, media, and related details.
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <form className="mt-8 grid gap-5 rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-8 lg:grid-cols-2">
            <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Title
              <input className="rounded-sm border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm font-medium normal-case tracking-normal text-white outline-none placeholder:text-white/25" placeholder="Add post title" />
            </label>
            <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Target URL
              <input className="rounded-sm border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm font-medium normal-case tracking-normal text-white outline-none placeholder:text-white/25" placeholder="https://example.com" />
            </label>
            <label className="grid gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 lg:col-span-2">
              Description
              <textarea className="min-h-36 rounded-sm border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm font-medium normal-case tracking-normal text-white outline-none placeholder:text-white/25" placeholder="Write the post content here..." />
            </label>
            <div className="lg:col-span-2">
              <button type="button" className="rounded-sm bg-[#ff3d8b] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
                Save draft locally
              </button>
              <p className="mt-3 text-xs text-white/25">
                This editable page is ready for your final create flow styling and field changes.
              </p>
            </div>
          </form>
        </section>
      </main>
    </EditableSiteShell>
  )
}
