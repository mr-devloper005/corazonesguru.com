import Link from 'next/link'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import type { SitePost, SiteFeedPagination } from '@/lib/site-connector'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { pagesContent } from '@/editable/content/pages.content'

import { ArticleListCard, postHref } from '@/editable/cards/PostCards'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  const voice = taskPageVoices.article
  const page = pagination.page || 1
  const pageHref = (nextPage: number) => `${basePath}?${new URLSearchParams({ ...(category && category !== 'all' ? { category } : {}), page: String(nextPage) }).toString()}`
  return (
    <main className="bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="rounded-xl border border-white/[0.06] bg-[#111] p-7 sm:p-10 lg:p-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">{voice.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">{voice.headline}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/45 sm:text-lg">{voice.description}</p>
          <form action={basePath} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 rounded-sm border border-white/[0.1] bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="rounded-sm bg-[#ff3d8b] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Filter</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {posts.length ? (
          <div className="grid gap-5">
            {posts.map((post, index) => <ArticleListCard key={post.id} post={post} href={postHref('article', post, basePath)} index={index + (page - 1) * pagination.limit} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-8 text-center">
            <h2 className="text-2xl font-semibold">No articles found</h2>
            <p className="mt-3 text-sm leading-7 text-white/40">Try another category or return to all articles.</p>
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pagination.hasPrevPage ? <Link href={pageHref(page - 1)} className="rounded-sm border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Previous</Link> : null}
          <span className="rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Page {page} of {pagination.totalPages || 1}</span>
          {pagination.hasNextPage ? <Link href={pageHref(page + 1)} className="rounded-sm border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Next</Link> : null}
        </div>
      </section>
    </main>
  )
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  const voice = taskPageVoices.article
  return (
    <main className="bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-6 rounded-xl border border-white/[0.06] bg-[#111] p-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-10">
          <div className="min-w-0">
            <Link href="/article" className="inline-flex items-center gap-2 rounded-sm border border-white/[0.1] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70"><ChevronLeft className="h-4 w-4" /> Articles</Link>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">{voice.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">{post?.title || pagesContent.detailPages.article.fallbackTitle}</h1>
          </div>
          <aside className="min-w-0 rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Reading note</p>
            <p className="mt-4 text-sm leading-7 text-white/45">{voice.secondaryNote}</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Contact <ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-8 lg:p-10">
          <p className="text-sm leading-8 text-white/50">{(post?.summary || `Article detail content for ${slug} will render through the editable detail page.`).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}</p>
        </div>
      </section>
    </main>
  )
}
