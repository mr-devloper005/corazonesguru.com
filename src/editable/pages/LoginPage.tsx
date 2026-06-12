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
      <main className="bg-[var(--editable-page-bg,#fff7ee)] text-[var(--editable-page-text,#2f1d16)]">
        <section className="mx-auto grid min-h-[calc(100vh-14rem)] max-w-[1120px] items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_0.95fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b76737]">Member access</p>
            <h1 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">Welcome back to a calmer publishing space.</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[#665146]">Continue where you left off: drafts in progress, saved article lanes, and personalized reading flows. This template login is local-only and built for UI testing, but the experience mirrors a real article membership portal.</p>
            <div className="mt-7 border border-[#d9c8b8] bg-white/75 p-4 text-sm leading-7 text-[#5e4e46]">
              <p className="font-black">Inside your account:</p>
              <p>Read article queues, continue saved searches, and move between archive pages without resetting your session preferences.</p>
            </div>
          </div>
          <div className="border border-[#d9c8b8] bg-[#fffdf9] p-6 shadow-[0_20px_48px_rgba(36,23,17,0.08)] sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm opacity-70">New here? <Link href="/signup" className="font-black underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
