import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'


export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 overflow-hidden rounded-xl bg-[#111] text-white shadow-[0_18px_70px_rgba(0,0,0,0.6)]">
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">{label}</span>
          <h3 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/50">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
            Read article <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group w-[160px] shrink-0 snap-start overflow-hidden rounded-lg border border-white/[0.06] bg-[#111] transition hover:-translate-y-1 hover:border-white/[0.12]">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-sm bg-[#ff3d8b]/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff3d8b]">{getEditableCategory(post)}</p>
        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-tight text-white/85">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 transition hover:bg-white/[0.05]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff3d8b]/10 text-[13px] font-bold text-[#ff3d8b]">{index + 1}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff3d8b]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight text-white/85">{post.title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition hover:-translate-y-1 hover:border-white/[0.1] sm:grid-cols-[220px_minmax(0,1fr)]">
      <div className="relative aspect-[16/12] overflow-hidden rounded-lg bg-[#111] sm:aspect-auto sm:min-h-[190px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff3d8b]">Article {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 text-xl font-semibold leading-tight tracking-[-0.01em] text-white/90 sm:text-2xl">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/40">{getEditableExcerpt(post, 180)}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#ff3d8b]">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Link>
  )
}
