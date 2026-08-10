'use client'

import { Zap, FileText, Shield, Mail } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const contactLanes = [
  {
    icon: Zap,
    title: 'General inquiries',
    body: 'Questions about the platform, features, pricing, or getting started with your team.',
  },
  {
    icon: FileText,
    title: 'Content partnerships',
    body: 'Discuss syndication, sponsored content, or collaborative publishing opportunities.',
  },
  {
    icon: Shield,
    title: 'Security & compliance',
    body: 'Report issues, request compliance documentation, or ask about our security practices.',
  },
  {
    icon: Mail,
    title: 'Enterprise',
    body: 'Custom deployments, SLA requirements, dedicated support, and enterprise features.',
  },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#050505] text-white">
        <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <header className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 text-base leading-8 text-white/45">{pagesContent.contact.description}</p>
          </header>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1fr]">
            <div className="grid content-start gap-4 sm:grid-cols-2">
              {contactLanes.map((lane) => (
                <article key={lane.title} className="min-h-[150px] rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <lane.icon className="h-5 w-5 text-[#ff3d8b]" />
                  <h2 className="mt-4 text-lg font-semibold text-white/90">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/40">{lane.body}</p>
                </article>
              ))}
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
