import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Local login page for this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#050505] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1120px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_0.95fr] lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff3d8b]">Member access</p>
            <h1 className="mt-5 max-w-xl text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">Welcome back to the platform.</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/40">Continue where you left off: saved content, personalized feeds, and streamlined navigation. This login is local-only and built for UI demonstration.</p>
            <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-7 text-white/40">
              <p className="font-semibold text-white/70">Inside your account:</p>
              <p>Access saved content, continue searches, and navigate between sections without resetting your session.</p>
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[#111] p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-white/40">New here? <Link href="/signup" className="font-semibold text-[#ff3d8b] hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
