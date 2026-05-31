import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, FileText, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: `Create a local ${slot4BrandConfig.siteName} account for the article publishing demo.` })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#20120c] text-[#fff3df]">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-[1280px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
            <h1 className="text-3xl font-black tracking-normal [font-family:Georgia,serif]">Create account</h1>
            <p className="mt-2 text-sm leading-7 text-white/65">Start a local writer profile for testing article access and signed-in navigation.</p>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/65">Already have an account? <Link href="/login" className="font-black text-white underline-offset-4 hover:underline">Log in</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f6c996]">Writer onboarding</p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black leading-tight tracking-normal [font-family:Georgia,serif] sm:text-6xl">Join the reading room before you publish the next idea.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/68">The site is article-only in tone: essays, guides, explainers, editorial notes, and series. Sign up changes the navbar into your user name and a logout button so the flow feels complete.</p>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                [PenLine, 'Draft-friendly entry'],
                [FileText, 'Article archive access'],
                [CheckCircle2, 'Signed-in navbar state'],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="rounded-[1rem] border border-white/10 bg-white/[0.06] p-4 text-sm font-black text-white/75">
                  <Icon className="mb-3 h-5 w-5 text-[#f6c996]" />
                  {label as string}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
