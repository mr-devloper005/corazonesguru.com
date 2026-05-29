import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#fffaf3)] text-[var(--editable-page-text,#241915)]">
        <section className="mx-auto grid max-w-[1120px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.18fr_0.82fr] lg:px-8 lg:py-16">
          <article className="border border-[#dac8b8] bg-[#fffdf9] p-7 shadow-[0_14px_34px_rgba(36,23,17,0.06)] sm:p-9 lg:p-11">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b76737]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">About {slot4BrandConfig.siteName}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#654f43]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 border-t border-[#eadbcf] pt-7 text-sm leading-8 text-[#5f514a]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="border border-[#dac8b8] bg-white/80 p-6 shadow-[0_12px_26px_rgba(36,23,17,0.05)]">
                <h2 className="text-xl font-black tracking-[-0.03em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#6b5a51]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
