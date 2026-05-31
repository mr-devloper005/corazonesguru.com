import { BookOpen, Layers3, PenLine } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fff8ee] text-[#24150f]">
        <section className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <article>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f1763d]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-normal [font-family:Georgia,serif] sm:text-6xl">About {slot4BrandConfig.siteName}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6d5648]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-5 text-base leading-8 text-[#6d5648]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>

          <aside className="rounded-[1.25rem] border border-[#ead9c6] bg-[#20120c] p-7 text-[#fff3df] shadow-[0_24px_70px_rgba(49,30,19,0.18)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f6c996]">Editorial desk</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-normal [font-family:Georgia,serif]">Designed around the article, not the feed.</h2>
            <div className="mt-8 grid gap-4">
              {[
                [BookOpen, 'Readable pages', 'Article details use broad spacing, related reads, and comment context.'],
                [Layers3, 'Clear archives', 'Cards are grouped for scanning without flattening every story into the same box.'],
                [PenLine, 'Writer access', 'Login and signup flows support a simple local demo for contributor journeys.'],
              ].map(([Icon, title, body]) => (
                <div key={String(title)} className="rounded-[1rem] border border-white/10 bg-white/[0.06] p-4">
                  <Icon className="h-5 w-5 text-[#f6c996]" />
                  <h3 className="mt-3 text-lg font-black">{title as string}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{body as string}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-t border-[#ead9c6] bg-[#fbf4ea]">
          <div className="mx-auto grid max-w-[1280px] gap-5 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[1.25rem] border border-[#ead9c6] bg-[#fffdf8] p-6 shadow-[0_12px_30px_rgba(47,29,22,0.06)]">
                <h2 className="text-2xl font-black tracking-normal [font-family:Georgia,serif]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#6d5648]">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
