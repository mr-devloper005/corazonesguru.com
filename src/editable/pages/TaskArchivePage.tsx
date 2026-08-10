import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, CheckCircle2, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, PenLine, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const getSummary = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body))
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Readable editorial cards with room for headlines and excerpts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards highlight company identity, location, contacts, and service details.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-board cards prioritize price, location, condition, and quick action.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with strong visuals and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards stay mostly text-based so saved resources scan quickly.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file context, download intent, and summary.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, short bio, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#050505', '--archive-text': '#f0f0f0', '--archive-surface': '#111111', '--archive-accent': '#ff3d8b' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start lg:px-8 lg:py-16">
          <div className="rounded-xl border border-white/[0.06] bg-[var(--archive-surface)] p-7 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]"><Icon className="h-4 w-4" /> {voice?.eyebrow || 'Archive'}</div>
            <h1 className="mt-5 max-w-4xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/40">{voice?.description || `Read the newest content on ${slot4BrandConfig.siteName}.`}</p>
            <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-7 text-white/40">{deck.promise}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={basePath} className="rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Browse all</Link>
              <Link href="/search" className="rounded-sm border border-white/[0.1] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70">Search</Link>
            </div>
          </div>

          <aside className="grid h-full gap-4">
            <form action={basePath} className="rounded-xl border border-white/[0.06] bg-[#111]/80 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35"><Filter className="h-4 w-4" /> Filter</div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-sm border border-white/[0.08] bg-[#1a1a1a] px-4 text-sm font-medium text-white outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full rounded-sm bg-[#ff3d8b] text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Apply</button>
              <p className="mt-3 text-xs text-white/25">Showing: {categoryLabel}</p>
            </form>
            <div className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff3d8b]"><PenLine className="h-4 w-4" /> Platform</p>
              <h2 className="mt-4 text-2xl font-light leading-tight tracking-[-0.02em]">Discover content without the noise.</h2>
              <p className="mt-3 text-sm leading-7 text-white/35">Browse organized sections with context before the grid begins.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff3d8b]">Features</p>
              <div className="mt-4 grid gap-3 text-sm text-white/50">
                {['Topic filters stay visible', 'Cards begin closer to the hero', 'Summaries remain readable'].map((item) => (
                  <p key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#ff3d8b]" /> {item}</p>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-white/30" />
              <h2 className="mt-4 text-2xl font-semibold text-white/80">No posts found</h2>
              <p className="mt-2 text-sm text-white/35">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-sm border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Previous</Link> : null}
            <span className="rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-sm border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] transition hover:-translate-y-1 hover:border-white/[0.1]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
        <img src={image} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-sm bg-[#ff3d8b]/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff3d8b]">Article {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.01em] text-white/90">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/35">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-white/[0.1] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg bg-[#1a1a1a] ring-1 ring-white/[0.06]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-white/25" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-sm bg-[#ff3d8b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-sm border border-white/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-xl font-semibold leading-tight tracking-[-0.01em] text-white/90">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/35">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs text-white/30 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition hover:-translate-y-1 hover:border-white/[0.1]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[#111] p-5 text-white">
          <span className="rounded-sm bg-[#ff3d8b]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff3d8b]">Classified</span>
          <h2 className="mt-10 text-3xl font-light leading-[1] tracking-[-0.02em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm text-white/40">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-lg object-cover opacity-60" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold leading-tight tracking-[-0.01em] text-white/90">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/35">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#ff3d8b]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition hover:-translate-y-1 hover:border-white/[0.1]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff3d8b]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-base font-semibold leading-tight text-white/85">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-[#ff3d8b]/30 hover:bg-[#ff3d8b]/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-sm border border-white/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5 text-white/30" />
      </div>
      <h2 className="mt-8 text-lg font-semibold leading-tight tracking-[-0.01em] text-white/85">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/35">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-white/[0.1]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-lg bg-[#ff3d8b]/10 p-4"><FileText className="h-8 w-8 text-[#ff3d8b]" /></div>
        <span className="rounded-sm bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{category}</span>
      </div>
      <h2 className="mt-8 text-lg font-semibold leading-tight tracking-[-0.01em] text-white/85">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-white/35">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#ff3d8b]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center transition hover:-translate-y-1 hover:border-white/[0.1]">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] ring-1 ring-white/[0.06]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-white/25" />}
      </div>
      <h2 className="mt-5 text-base font-semibold leading-tight text-white/85">{post.title}</h2>
      {role ? <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff3d8b]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/35">{getSummary(post)}</p>
    </Link>
  )
}
