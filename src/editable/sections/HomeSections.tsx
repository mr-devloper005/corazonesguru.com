import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, FileText, PenLine, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { slot4BrandConfig } from '@/editable/theme/brand.config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function WriterStudioCard() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] rounded-[1.25rem] border border-[#ead1b7] bg-[#fffdf8] p-5 shadow-[0_28px_70px_rgba(49,30,19,0.22)]">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff6b57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffc043]" />
        <span className="h-3 w-3 rounded-full bg-[#25c976]" />
      </div>
      <div className="mt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9b5a38]">Article title</p>
        <div className="mt-2 rounded-xl border border-[#ead1b7] bg-white px-4 py-3 text-lg font-black text-[#24150f]">How careful writing earns repeat readers</div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-[#b86f37] px-4 py-2 text-xs font-black text-white">Rewrite headline</span>
          <span className="rounded-lg border border-[#ead1b7] px-4 py-2 text-xs font-black text-[#7c5743]">Tighten intro</span>
        </div>
        <p className="mt-5 text-[11px] font-black uppercase tracking-[0.2em] text-[#9b5a38]">Reader promise</p>
        <div className="mt-2 rounded-xl border border-[#ead1b7] bg-[#fff8ee] p-4 text-sm leading-6 text-[#6d5648]">A practical essay for writers who want stronger structure, clearer claims, and a headline readers trust.</div>
      </div>
      <div className="absolute -right-8 top-24 hidden w-64 rounded-[1.1rem] border border-[#f1763d] bg-[#fffaf3] p-4 shadow-[0_20px_50px_rgba(49,30,19,0.18)] sm:block">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#f1763d]">Suggested sections</p>
        {['Lead with the claim', 'Add evidence readers can use', 'Close with the next action'].map((item) => (
          <p key={item} className="mt-3 text-sm font-bold leading-5 text-[#4e382c]">{item}</p>
        ))}
      </div>
    </div>
  )
}

function MiniPoster({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block w-[250px] shrink-0 ${dc.motion.fade}`}>
      <article className="relative overflow-hidden rounded-[1.25rem] border border-[#ead9c6] bg-white p-3 shadow-[0_16px_42px_rgba(47,29,22,0.10)] transition duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(32,18,12,0.82)_100%)]" />
          <span className="absolute left-3 top-3 rounded-full bg-[#fff8ee] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#8b4d2b] shadow-sm">Article</span>
          <h3 className="absolute bottom-4 left-4 right-4 line-clamp-3 text-xl font-black leading-tight tracking-normal text-white [font-family:Georgia,serif]">{post.title}</h3>
        </div>
      </article>
    </Link>
  )
}

function FeatureTile({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const dark = index === 0
  return (
    <Link href={href} className={`group min-h-[250px] overflow-hidden rounded-[1.25rem] border border-[#ead9c6] ${dark ? 'bg-[#20120c] text-[#fff3df]' : 'bg-[#fffdf8] text-[#24150f]'} p-7 shadow-[0_18px_54px_rgba(47,29,22,0.09)] transition duration-300 hover:-translate-y-1`}>
      <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${dark ? 'text-[#f6c996]' : 'text-[#f1763d]'}`}>{index === 0 ? 'Series pick' : "Editor's note"}</p>
      <h3 className="mt-4 line-clamp-3 text-3xl font-black leading-tight tracking-normal [font-family:Georgia,serif]">{post.title}</h3>
      <p className={`mt-4 line-clamp-3 text-sm leading-7 ${dark ? 'text-white/70' : 'text-[#6d5648]'}`}>{getExcerpt(post, 145)}</p>
      <span className={`mt-6 inline-flex items-center gap-2 text-sm font-black ${dark ? 'text-[#f6c996]' : 'text-[#f1763d]'}`}>Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
    </Link>
  )
}

function IndexPill({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group relative overflow-hidden rounded-[1.15rem] border border-[#ead9c6] bg-[#fffdf8] p-5 shadow-[0_12px_30px_rgba(47,29,22,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(47,29,22,0.12)]">
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#f1763d]">Read {String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight tracking-normal text-[#24150f] [font-family:Georgia,serif]">{post.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#6d5648]">{getExcerpt(post, 120)}</p>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ') || `Read the latest ${taskLabel(primaryTask).toLowerCase()}.`
  return (
    <section className="relative overflow-hidden bg-[#20120c] text-[#fff3df]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c996]">{pagesContent.home.hero.badge}</p>
          <h1 className={`${dc.type.heroTitle} mt-5 max-w-3xl`}>{heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={primaryRoute} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f1763d] px-8 py-3.5 text-sm font-black text-white transition hover:bg-[#ff8957]">Read latest <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a6043] px-8 py-3.5 text-sm font-black text-[#fff3df] transition hover:bg-white/8">Start writing</Link>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-5 text-sm sm:grid-cols-4">
            {[['539K+', 'writers'], ['1.4M+', 'articles'], ['4.1K+', 'series'], ['17+', 'years']].map(([value, label]) => (
              <div key={label}>
                <p className="text-2xl font-black text-[#f6c996] [font-family:Georgia,serif]">{value}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/52">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <WriterStudioCard />
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 12)
  if (!railPosts.length) return null
  return (
    <section className="border-t border-[#ead9c6] bg-[#fff8ee]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={`${dc.type.eyebrow} text-[#f1763d]`}>Fresh from the archive</p>
          <h2 className={`${dc.type.sectionTitle} mt-3`}>Articles people are opening now</h2>
        </div>
        <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {railPosts.map((post) => <MiniPoster key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 5)
  if (!featured.length) return null
  return (
    <section className={`${pal.warmBg} border-t border-[#ead9c6]`}>
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.35fr] lg:items-start">
          <div>
            <p className={`${dc.type.eyebrow} text-[#f1763d]`}>Publish your way</p>
            <h2 className={`${dc.type.sectionTitle} mt-3`}>Four ways to put your work out there</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[#6d5648]">A single article, a recurring column, a research note, or a serialized essay collection. The interface stays calm around the writing.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Essays', 'Guides', 'Opinion', 'Series'].map((item) => (
                <div key={item} className="rounded-[1rem] border border-[#ead9c6] bg-[#fffdf8] p-4 text-sm font-black text-[#4e382c]">{item}</div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.slice(0, 4).map((post, index) => (
              <FeatureTile key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts.slice(5)
  const picks = categoryPosts.slice(0, 8)
  return (
    <section className="border-t border-[#ead9c6] bg-[#fffdf8]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className={`${dc.type.eyebrow} text-[#f1763d]`}>Search, save, continue</p>
            <h2 className={`${dc.type.sectionTitle} mt-3`}>Find the article that answers the next question</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#6d5648]">Use the search page for titles, ideas, authors, or phrases. The archive is tuned for readers who know the feeling they want, even before they know the headline.</p>
            <form action="/search" className="mt-8 flex max-w-lg rounded-full border border-[#ead9c6] bg-white p-2 shadow-sm">
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold outline-none" />
              <button className="inline-flex items-center gap-2 rounded-full bg-[#20120c] px-5 py-3 text-sm font-black text-white"><Search className="h-4 w-4" /> Search</button>
            </form>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {picks.map((post, index) => <IndexPill key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative overflow-hidden border-t border-[#3f2a1c] bg-[#20120c] text-[#fff3df]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c996]">Your turn</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-5xl font-black leading-tight tracking-normal [font-family:Georgia,serif]">Publish something today.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">Create a local account, read the newest articles, or send the editors a note about the next piece you want to shape.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f1763d] px-8 py-3.5 text-sm font-black text-white">Start writing free <PenLine className="h-4 w-4" /></Link>
          <Link href="/article" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8a6043] px-8 py-3.5 text-sm font-black text-[#fff3df]">Browse articles <BookOpen className="h-4 w-4" /></Link>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            [FileText, 'Article-first archive'],
            [Sparkles, 'Editorial polish'],
            [CheckCircle2, `Brand from env: ${slot4BrandConfig.siteName}`],
          ].map(([Icon, label]) => (
            <div key={String(label)} className="rounded-[1rem] border border-white/10 bg-white/[0.06] p-4 text-sm font-bold text-white/74">
              <Icon className="mx-auto mb-3 h-5 w-5 text-[#f6c996]" />
              {label as string}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
