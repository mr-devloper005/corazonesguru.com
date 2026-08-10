import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#050505] text-white">
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <article>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">About {slot4BrandConfig.siteName}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/45">{pagesContent.about.description}</p>
              <div className="mt-10 space-y-5 border-t border-white/[0.06] pt-8 text-sm leading-8 text-white/40">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <aside className="grid gap-4 lg:content-start">
              {pagesContent.about.values.map((value) => (
                <div key={value.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                  <h2 className="text-lg font-semibold text-white/90">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/40">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
