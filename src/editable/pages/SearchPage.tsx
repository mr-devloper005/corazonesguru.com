import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed, type SitePost } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: 'Search posts',
    description: 'Search posts, stories, listings, and useful resources from this site.',
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compact = (value: unknown) =>
  typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim() : ''
const lower = (value: unknown) => compact(value).toLowerCase()
const contentOf = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
const imageOf = (post: SitePost) => {
  const content = contentOf(post)
  const media = Array.isArray(post.media)
    ? post.media.find((item) => item && typeof item.url === 'string')?.url
    : ''
  const gallery = Array.isArray(content.images)
    ? (content.images.find((item) => typeof item === 'string') as string | undefined)
    : ''
  return (
    media ||
    compact(content.featuredImage) ||
    compact(content.image) ||
    compact(content.thumbnail) ||
    gallery ||
    ''
  )
}
const summaryOf = (post: SitePost) => {
  const content = contentOf(post)
  return (
    post.summary ||
    compact(content.summary) ||
    compact(content.description) ||
    compact(content.excerpt) ||
    compact(content.body)
  )
}
const matches = (post: SitePost, query: string, task: string, category: string) => {
  const content = contentOf(post)
  const taskKey = getPostTaskKey(post)
  if (task && taskKey !== task) return false
  const categoryText = lower(content.category)
  const tagsText = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : ''
  if (category && !`${categoryText} ${tagsText}`.includes(category)) return false
  if (!query) return true
  return [
    post.title, post.summary, content.title, content.description, content.body,
    content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '',
  ].some((item) => lower(item).includes(query))
}

function SearchResult({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = imageOf(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'

  return (
    <Link
      href={href}
      className={`group overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] transition hover:-translate-y-1 hover:border-white/[0.1] ${index === 0 ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-[#111]">
          <img src={image} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-sm bg-[#ff3d8b]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {taskLabel}
          </span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? (
          <span className="rounded-sm bg-[#ff3d8b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {taskLabel}
          </span>
        ) : null}
        <h2 className="mt-4 line-clamp-3 text-xl font-semibold leading-tight tracking-[-0.01em] text-white/90">
          {post.title}
        </h2>
        {summary ? (
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/40">
            {stripHtml(summary)}
          </p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#ff3d8b]">
          Open result <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; task?: string; category?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const feed = await fetchSiteFeed(80, { fresh: true, timeoutMs: 5000 })
  const posts = (feed?.posts || []).filter((post) => matches(post, query, task, category)).slice(0, 48)

  return (
    <EditableSiteShell>
      <main className="bg-[#050505] px-4 py-12 text-white sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Search</p>
                <h1 className="mt-3 text-4xl font-light tracking-[-0.02em] sm:text-5xl">
                  Find content faster.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                  Search articles, resources, bookmarks, and profiles from the live platform feed.
                </p>
              </div>
              <form action="/search" className="flex w-full max-w-xl gap-2 overflow-hidden rounded-sm border border-white/[0.1] bg-white/[0.04] p-1.5">
                <Search className="ml-2 mt-2 h-5 w-5 text-white/30" />
                <input name="q" defaultValue={resolved.q || ''} placeholder="Search content..." className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25" />
                <button className="rounded-sm bg-[#ff3d8b] px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Search</button>
              </form>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <SearchResult key={post.id || post.slug} post={post} index={index} />
            ))}
          </div>
          {!posts.length ? (
            <div className="mt-8 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-10 text-center">
              <h2 className="text-2xl font-semibold text-white/80">No matching content found.</h2>
              <p className="mt-3 text-sm text-white/35">Try another keyword or browse the sections from the navbar.</p>
            </div>
          ) : null}
        </section>
      </main>
    </EditableSiteShell>
  )
}
