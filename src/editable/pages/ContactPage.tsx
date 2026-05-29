'use client'

import { FileText, Mail, NotebookPen, ShieldCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const contactLanes = [
  {
    icon: NotebookPen,
    title: 'Article pitches',
    body: 'Send draft concepts, outlines, and topical angles for essays, explainers, and feature articles.',
  },
  {
    icon: FileText,
    title: 'Editorial collaboration',
    body: 'Request help with structure, formatting, readability passes, and publication-ready flow.',
  },
  {
    icon: ShieldCheck,
    title: 'Corrections and trust',
    body: 'Report factual issues, attribution updates, or content corrections for published article pages.',
  },
  {
    icon: Mail,
    title: 'Partnership inquiries',
    body: 'Reach out for syndication, sponsored series, or reader-community partnerships tied to article content.',
  },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--editable-page-bg,#fffaf3)] text-[var(--editable-page-text,#241915)]">
        <section className="mx-auto max-w-[1120px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <header className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b76737]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black leading-tight tracking-[-0.06em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 text-base leading-8 text-[#665146]">{pagesContent.contact.description}</p>
          </header>

          <div className="mt-10 grid items-start gap-7 lg:grid-cols-[0.9fr_1fr]">
            <div className="grid content-start gap-4 sm:grid-cols-2">
              {contactLanes.map((lane) => (
                <article key={lane.title} className="min-h-[150px] border border-[#d9c8b8] bg-white/80 p-5 shadow-[0_10px_24px_rgba(36,23,17,0.05)]">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent,#e8742b)]" />
                  <h2 className="mt-3 text-xl font-black tracking-[-0.03em]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#6b5a51]">{lane.body}</p>
                </article>
              ))}
            </div>

            <div className="border border-[#d9c8b8] bg-[#fffdf9] p-6 shadow-[0_20px_48px_rgba(36,23,17,0.08)] sm:p-7">
              <h2 className="text-2xl font-black tracking-[-0.03em]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
