'use client'

import { FileText, Mail, MessageSquareText, PenLine } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: PenLine, title: 'Pitch an article', body: 'Send a working headline, a short angle, and why readers need it now.' },
    { icon: FileText, title: 'Fix or update a piece', body: 'Share corrections, source updates, broken links, or context that improves an existing article.' },
    { icon: MessageSquareText, title: 'Contributor support', body: 'Ask about author profiles, local login testing, article formatting, or series planning.' },
  ]

  return (
    <EditableSiteShell>
      <main className="bg-[#fff8ee] text-[#24150f]">
        <section className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f1763d]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight tracking-normal [font-family:Georgia,serif] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6d5648]">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.25rem] border border-[#ead9c6] bg-[#fffdf8] p-5 shadow-[0_12px_30px_rgba(47,29,22,0.06)]">
                  <lane.icon className="h-5 w-5 text-[#f1763d]" />
                  <h2 className="mt-3 text-2xl font-black tracking-normal [font-family:Georgia,serif]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#6d5648]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-[#ead9c6] bg-[#fffdf8] p-7 shadow-[0_24px_70px_rgba(49,30,19,0.12)]">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#20120c] text-[#fff3df]"><Mail className="h-5 w-5" /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f1763d]">Editorial inbox</p>
                <h2 className="text-3xl font-black tracking-normal [font-family:Georgia,serif]">{pagesContent.contact.formTitle}</h2>
              </div>
            </div>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
