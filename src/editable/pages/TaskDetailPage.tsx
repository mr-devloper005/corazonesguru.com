import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Rss, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const formatPlainText = (raw: string) => {
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  return raw.split(/\n{2,}/).map((part) => `<p>${part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('')
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const summaryText = (post: SitePost) => stripHtml(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || '')
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const authorOf = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.author) || asText(content.authorName) || asText(content.name) || 'Editorial Team'
}
const readingTimeFor = (post: SitePost) => {
  const text = `${post.title} ${summaryText(post)} ${getBody(post)}`.replace(/<[^>]*>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(2, Math.ceil(words / 220))
}
const takeawaysFor = (post: SitePost) => {
  const content = getContent(post)
  const direct = content.takeaways || content.keyTakeaways || content.highlights
  if (Array.isArray(direct)) return direct.map((item) => String(item).trim()).filter(Boolean).slice(0, 4)
  const summary = summaryText(post)
  const category = categoryOf(post, 'Article')
  return [
    summary || `${post.title} provides a clear overview of the latest ${category.toLowerCase()} developments.`,
    'The content is structured for quick context first, then deeper reading.',
    'Readers can continue into related content from the same page.',
  ].slice(0, 3)
}
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = { '--detail-bg': '#050505', '--detail-text': '#f0f0f0', '--detail-surface': '#111111', '--detail-accent': '#ff3d8b' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-sm border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70 transition hover:bg-white/[0.06]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  const author = authorOf(post)
  const readTime = readingTimeFor(post)
  const takeaways = takeawaysFor(post)
  return (
    <div className="bg-[#0a0a0a] text-[#e0e0e0]">
      <section className="mx-auto grid max-w-[1040px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,680px)_274px] lg:px-8 lg:py-12">
        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff3d8b]">
            <Link href="/" className="hover:underline">Home</Link><span className="text-white/20">/</span><Link href="/article" className="hover:underline">Articles</Link><span className="text-white/20">/</span><span className="text-white/40">{categoryOf(post, 'Article')}</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-light leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff3d8b]/20 text-sm font-semibold text-[#ff3d8b]">{author.slice(0, 1).toUpperCase()}</div>
              <div className="min-w-0 text-sm">
                <p className="truncate font-semibold text-white/80">{author}</p>
                <p className="mt-0.5 text-xs text-white/30">{readTime} min read</p>
              </div>
            </div>
          </div>
          {images[0] ? <figure className="mt-5 overflow-hidden rounded-lg"><img src={images[0]} alt="" className="max-h-[560px] w-full object-cover" /><figcaption className="mt-2 text-[11px] text-white/25">Image: {categoryOf(post, 'Article')}</figcaption></figure> : null}
          <section className="mt-8 rounded-lg border border-white/[0.06] bg-white/[0.03] p-5">
            <h2 className="mb-3 inline-block rounded-sm bg-[#ff3d8b] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">Key takeaways</h2>
            <ul className="ml-4 list-disc space-y-2 text-base leading-7 marker:text-[#ff3d8b]">{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <BodyContent post={post} articleStyle />
          {related.length ? <section className="mt-10 border-t border-white/[0.08] pt-5"><h2 className="text-lg font-semibold text-white/80">Related articles</h2><div className="mt-4 grid gap-2">{related.slice(0, 4).map((item) => <Link key={item.id || item.slug} href={buildPostUrl('article', item.slug)} className="text-sm leading-6 text-white/50 hover:text-[#ff3d8b]">→ {item.title}</Link>)}</div></section> : null}
          <section className="mt-8 rounded-lg border border-white/[0.06] bg-white/[0.03] p-5"><h2 className="text-lg font-semibold text-white/80">Our editorial process</h2><p className="mt-3 text-sm leading-7 text-white/40">At {slot4BrandConfig.siteName}, every article is designed to keep claims, context, and next reads easy to find. Content is structured for clarity and depth.</p></section>
          <EditableComments slug={post.slug} comments={comments} />
        </article>
        <ArticleSidebar related={related} />
      </section>
    </div>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-xl bg-[#1a1a1a] ring-1 ring-white/[0.06]">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 text-white/20" />}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Business listing</p>
              <h1 className="mt-3 text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/40">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1120px] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
      <aside className="rounded-xl border border-white/[0.06] bg-[#111] p-7 lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">Classified notice</p>
        <h1 className="mt-4 text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="rounded-sm border border-white/[0.1] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70">Email</a> : null}
        </div>
      </aside>
      <article className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-xl border border-white/[0.06] bg-[#111] p-7 lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff3d8b]"><Camera className="h-4 w-4" /> Image story</div>
          <h1 className="mt-6 text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">{post.title}</h1>
          <p className="mt-5 text-base leading-8 text-white/40">{summaryText(post)}</p>
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-5 space-y-5 md:columns-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-xl border border-white/[0.06] bg-[#111]">
              <img src={image} alt="" className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-5 text-sm text-white/35">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[1120px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-xl border border-white/[0.06] bg-[#111] p-7 sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-xl bg-[#ff3d8b]/10"><Bookmark className="h-9 w-9 text-[#ff3d8b]" /></div>
        <h1 className="mt-7 text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">{post.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-white/40">{summaryText(post)}</p>
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Open resource <ExternalLink className="h-4 w-4" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[1120px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-[#ff3d8b]/10"><FileText className="h-12 w-12 text-[#ff3d8b]" /></div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">PDF resource</p>
            <h1 className="mt-3 text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl">{post.title}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#111] p-4">
              <span className="text-sm font-semibold">Document preview</span>
              <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-white">Download <Download className="h-4 w-4" /></Link>
            </div>
            <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[1120px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:px-8 lg:py-16">
      <aside className="rounded-xl border border-white/[0.06] bg-[#111] p-8 text-center lg:sticky lg:top-24 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-[#1a1a1a] ring-1 ring-white/[0.06]">
          {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 text-white/20" />}
        </div>
        <h1 className="mt-6 text-3xl font-light leading-[1.08] tracking-[-0.02em]">{post.title}</h1>
        {role ? <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff3d8b]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="rounded-xl border border-white/[0.06] bg-[#111] p-7 sm:p-10">
        <BodyContent post={post} />
        <ImageStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" post={post} related={related} />
      </article>
    </section>
  )
}

function ArticleSidebar({ related }: { related: SitePost[] }) {
  return (
    <aside className="min-w-0 space-y-9 lg:sticky lg:top-24 lg:self-start">
      <section className="rounded-xl border border-white/[0.06] bg-[#111]">
        <div className="p-5">
          <h2 className="text-center text-lg font-semibold">Join our readers</h2>
          <p className="mt-4 text-sm leading-7 text-white/35">Get notified about new articles, guides, and platform updates delivered to your inbox.</p>
          <form action="/signup" className="mt-4 flex overflow-hidden rounded-sm border border-white/[0.1]"><input name="email" type="email" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/25" /><button className="bg-[#ff3d8b] px-4 text-[13px] font-semibold text-white">Join</button></form>
        </div>
      </section>
      {related.length ? <section><h2 className="text-lg font-semibold text-white/80">Latest reads</h2><div className="mt-4 grid gap-3">{related.slice(0, 3).map((item) => { const image = getImages(item)[0]; return <Link key={item.id || item.slug} href={buildPostUrl('article', item.slug)} className="grid grid-cols-[1fr_96px] overflow-hidden rounded-lg border border-white/[0.06] bg-[#111]"><div className="min-w-0 p-3"><h3 className="line-clamp-3 text-sm font-semibold leading-5 text-white/80">{item.title}</h3><p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ff3d8b]">Article</p></div>{image ? <img src={image} alt="" className="h-full min-h-24 w-24 object-cover opacity-60" /> : <div className="flex min-h-24 w-24 items-center justify-center bg-[#1a1a1a]"><FileText className="h-6 w-6 text-white/20" /></div>}</Link> })}</div></section> : null}
      <section className="rounded-xl border border-white/[0.06] bg-[#111]">
        <div className="p-5"><h2 className="flex items-center gap-2 text-lg font-semibold"><Rss className="h-4 w-4 text-[#ff3d8b]" /> Why trust {slot4BrandConfig.siteName}</h2><p className="mt-4 text-sm leading-7 text-white/35">Our content is designed for transparency, with clear context, structured summaries, and honest recommendations.</p><Link href="/about" className="mt-4 inline-flex text-sm font-semibold text-[#ff3d8b]">Learn about our process</Link></div>
      </section>
    </aside>
  )
}

function BodyContent({ post, compact = false, articleStyle = false }: { post: SitePost; compact?: boolean; articleStyle?: boolean }) {
  if (articleStyle) return <div className="article-content article-content--reference mt-8 max-w-none text-base leading-8 text-white/70" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'} text-white/50`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/30"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-medium leading-6 text-white/60">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff3d8b]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-lg object-cover ring-1 ring-white/[0.06]" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111]">
      <div className="flex items-center gap-2 p-4 text-sm font-semibold"><MapPin className="h-4 w-4 text-[#ff3d8b]" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[#ff3d8b] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-sm border border-white/[0.1] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-sm border border-white/[0.1] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm"><span className="font-semibold uppercase tracking-[0.12em] text-white/35">{label}</span><span className="font-semibold text-white/80">{value}</span></div>
}

function RelatedPanel({ task, post: _post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">About this post</p>
          <div className="mt-4 grid gap-3 text-sm text-white/50">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {slot4BrandConfig.siteName}</p>
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white/80">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-lg border border-white/[0.06] bg-[#111] p-3 transition hover:-translate-y-0.5 hover:border-white/[0.1]">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover opacity-60" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#1a1a1a]"><FileText className="h-6 w-6 text-white/20" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-semibold leading-tight text-white/80">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/30">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 text-lg font-semibold"><MessageCircle className="h-5 w-5 text-[#ff3d8b]" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-lg border border-white/[0.06] bg-[#111] p-4">
            <p className="text-sm font-semibold text-white/80">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-white/40">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-white/30">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
