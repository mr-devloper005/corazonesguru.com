import Link from 'next/link'
import { ArrowRight, Search, Zap, Globe, Shield, Server, BarChart3, Lock } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
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

export function EditableHomeHero(_props: HomeSectionProps) {
  const heroLines = pagesContent.home.hero.title
  const heroTitle = heroLines.length > 1 ? heroLines : [heroLines.join(' ')]

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#050505]">
      {/* Animated ribbon gradients like Cerebrium */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[15%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(ellipse,rgba(130,40,100,0.35),transparent_70%)] blur-xl" />
        <div className="absolute right-[5%] top-[20%] h-[500px] w-[120px] rotate-[25deg] rounded-full bg-[linear-gradient(180deg,#ff3d8b,#a020f0,#ff3d8b)] opacity-30 blur-2xl" />
        <div className="absolute right-[15%] top-[10%] h-[600px] w-[80px] rotate-[35deg] rounded-full bg-[linear-gradient(180deg,#d946ef,#ff3d8b,#9333ea)] opacity-25 blur-xl" />
        <div className="absolute right-[25%] top-[5%] h-[550px] w-[60px] rotate-[40deg] rounded-full bg-[linear-gradient(180deg,#ff3d8b,#6b21a8)] opacity-20 blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,61,139,0.08),transparent_60%)]" />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] gap-12 px-4 pb-20 pt-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-32">
        <div className="max-w-2xl">
          {heroTitle.map((line, i) => (
            <h1 key={i} className={`text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] ${i === heroTitle.length - 1 ? '' : ''}`}>
              {line.includes('scales') ? (
                <>
                  {line.split('scales')[0]}
                  <span className="text-[#ff3d8b]">scales</span>
                  {line.split('scales')[1]}
                </>
              ) : line}
            </h1>
          ))}

          <p className="mt-8 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            {pagesContent.home.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={pagesContent.home.hero.primaryCta.href} className="inline-flex items-center justify-center rounded-sm bg-[#ff3d8b] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#e6357d]">
              {pagesContent.home.hero.primaryCta.label}
            </Link>
            <Link href={pagesContent.home.hero.secondaryCta.href} className="inline-flex items-center justify-center rounded-sm border border-white/[0.12] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/80 transition hover:bg-white/[0.04]">
              {pagesContent.home.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse,rgba(255,61,139,0.12),transparent_70%)]" />
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 12)
  if (!railPosts.length) return null

  const partnerLabels = railPosts.slice(0, 8).map((p) => {
    const content = p?.content && typeof p.content === 'object' ? p.content as Record<string, unknown> : {}
    const cat = (typeof content.category === 'string' && content.category) || p?.tags?.[0] || 'Featured'
    return cat
  })

  return (
    <section className="relative border-y border-white/[0.06] bg-[#050505]">
      {/* Partner/topic marquee rail like Cerebrium logos */}
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {partnerLabels.map((label, i) => (
            <span key={i} className="shrink-0 text-[15px] font-bold uppercase tracking-[0.12em] text-white/25 transition hover:text-white/50">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Flowing ribbon visual + cards */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-0 h-full w-[600px] rotate-[15deg]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,61,139,0.15),rgba(168,85,247,0.12),transparent)] blur-sm" />
          </div>
          <div className="absolute left-[30%] top-0 h-full w-[400px] rotate-[20deg]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(217,70,239,0.1),transparent)] blur-sm" />
          </div>
          {/* Pink squares scattered */}
          {[
            { top: '20%', left: '25%' }, { top: '35%', left: '40%' }, { top: '50%', left: '55%' },
            { top: '25%', left: '35%' }, { top: '45%', left: '30%' }, { top: '60%', left: '50%' },
            { top: '30%', left: '65%' }, { top: '55%', left: '70%' },
          ].map((pos, i) => (
            <div key={i} className="absolute h-4 w-4 rounded-sm bg-[#ff3d8b]/60" style={pos} />
          ))}
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className={dc.layout.rail}>
            {railPosts.map((post) => (
              <Link key={post.id} href={postHref(primaryTask, post, primaryRoute)} className="group w-[200px] shrink-0 snap-start">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#111]">
                  <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:opacity-90 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <h3 className="absolute bottom-3 left-3 right-3 line-clamp-2 text-sm font-semibold leading-tight text-white">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featured = posts.slice(0, 6)
  if (!featured.length) return null

  const features = [
    { icon: Zap, title: 'Instant publishing', desc: 'Content goes live in milliseconds with zero cold starts and automatic global distribution.' },
    { icon: Globe, title: 'Global delivery', desc: 'Multi-region infrastructure ensures your content loads fast for readers everywhere.' },
    { icon: Shield, title: 'Enterprise security', desc: 'SOC 2 compliant with data residency controls and hardened container isolation.' },
    { icon: Server, title: 'Auto-scaling', desc: 'Handle traffic spikes automatically without manual intervention or capacity planning.' },
    { icon: BarChart3, title: '99.999% uptime', desc: 'Multi-region failovers route traffic to the best alternative within your constraints.' },
    { icon: Lock, title: 'Data isolation', desc: 'Every workload runs in a hardened, isolated environment without compromising performance.' },
  ]

  return (
    <section className="relative bg-white text-[#0a0a2e]">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#ff3d8b]/30 to-transparent" />
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Production speed without the production complexity</p>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.02em] text-[#0a0a2e]">
              Built for teams, designed for scale.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f4f0ff]">
                  <f.icon className="h-5 w-5 text-[#6b21a8]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0a0a2e]">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Post cards grid */}
        <div className="mt-20">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Latest from the platform</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((post, index) => {
              const href = postHref(primaryTask, post, primaryRoute)
              if (index === 0) {
                return (
                  <Link key={post.id} href={href} className="group relative col-span-full min-h-[400px] overflow-hidden rounded-xl bg-[#0a0a2e] text-white xl:col-span-2">
                    <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a2e] via-[#0a0a2e]/60 to-transparent" />
                    <div className="relative flex min-h-[400px] flex-col justify-end p-8 sm:p-10">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Featured</span>
                      <h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">{post.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">{getExcerpt(post, 160)}</p>
                    </div>
                  </Link>
                )
              }
              return (
                <Link key={post.id} href={href} className="group overflow-hidden rounded-xl border border-[#e5e5e5] bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff3d8b]">Article</span>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.01em] text-[#0a0a2e]">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#777]">{getExcerpt(post, 100)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((s) => s.posts).length ? timeSections.flatMap((s) => s.posts) : posts.slice(6)
  const topPosts = categoryPosts.slice(0, 12)

  return (
    <section className="relative bg-[#050505]">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Explore the archive</p>
            <h2 className={`${dc.type.sectionTitle} mt-5 text-white`}>Everything published, always accessible.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/40">Browse every article, resource, and update through a streamlined discovery experience. Find what matters fast.</p>
            <form action="/search" className="mt-8 flex max-w-md overflow-hidden rounded-sm border border-white/[0.1] bg-white/[0.04]">
              <input name="q" placeholder="Search all content..." className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30" />
              <button className="flex items-center gap-2 bg-[#ff3d8b] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white"><Search className="h-4 w-4" /></button>
            </form>
          </div>

          <div className="grid gap-3">
            {topPosts.slice(0, 6).map((post, index) => (
              <Link key={post.id} href={postHref(primaryTask, post, primaryRoute)} className="group flex items-center gap-5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 transition hover:bg-white/[0.05]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#ff3d8b]/10 text-[13px] font-bold text-[#ff3d8b]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-1 text-sm font-semibold text-white/90">{post.title}</h3>
                  <p className="mt-1 line-clamp-1 text-[13px] text-white/35">{getExcerpt(post, 80)}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition group-hover:text-[#ff3d8b]" />
              </Link>
            ))}
          </div>
        </div>

        {topPosts.length > 6 ? (
          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {topPosts.slice(6, 12).map((post) => (
              <Link key={post.id} href={postHref(primaryTask, post, primaryRoute)} className="group overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] transition hover:-translate-y-1 hover:border-white/[0.1]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                  <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:opacity-80 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 text-base font-semibold leading-tight text-white/90">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/35">{getExcerpt(post, 100)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#ff3d8b]">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,61,139,0.08),transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">{pagesContent.home.cta.badge}</p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.08] tracking-[-0.02em] text-white">{pagesContent.home.cta.title}</h2>
          <p className="mt-6 text-base leading-7 text-white/45 sm:text-lg">{pagesContent.home.cta.description}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={pagesContent.home.cta.primaryCta.href} className="inline-flex items-center justify-center rounded-sm bg-[#ff3d8b] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#e6357d]">
              {pagesContent.home.cta.primaryCta.label}
            </Link>
            <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center justify-center rounded-sm border border-white/[0.12] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/70 transition hover:bg-white/[0.04]">
              {pagesContent.home.cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
