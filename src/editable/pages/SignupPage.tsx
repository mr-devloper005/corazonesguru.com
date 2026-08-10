import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#050505] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1120px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_0.95fr] lg:px-8">
          <div className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-8">
            <h1 className="text-3xl font-semibold">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/40">Already have an account? <Link href="/login" className="font-semibold text-[#ff3d8b] hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">Platform access</p>
            <h2 className="mt-5 max-w-xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">Start publishing and reading at scale.</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/40">Create an account to unlock the full platform experience: content browsing, reader-oriented navigation, and profile-aware features.</p>
            <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-sm leading-7 text-white/40">
              <p className="font-semibold text-white/70">What this unlocks</p>
              <p>Session-aware navigation, member state in the navbar, and fast transitions between content sections and detail views.</p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
