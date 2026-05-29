import type { Metadata } from 'next'
import Link from 'next/link'
import { BookMarked, Clock3, MessageCircle } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Log in', description: `Log in to ${slot4BrandConfig.siteName} for article reading and contributor access.` })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#fff8ee] text-[#24150f]">
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-[1280px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f1763d]">Reader access</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-tight tracking-normal [font-family:Georgia,serif] sm:text-6xl">Welcome back to your article desk.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6d5648]">Sign in to keep testing the reader journey, contributor state, and authenticated navbar.</p>
            <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                [BookMarked, 'Saved reading rhythm'],
                [Clock3, 'Quick return path'],
                [MessageCircle, 'Comment-ready article pages'],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="rounded-[1rem] border border-[#ead9c6] bg-[#fffdf8] p-4 text-sm font-black text-[#4e382c]">
                  <Icon className="mb-3 h-5 w-5 text-[#f1763d]" />
                  {label as string}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-[#ead9c6] bg-[#fffdf8] p-6 shadow-[0_24px_70px_rgba(49,30,19,0.12)] sm:p-8">
            <h2 className="text-3xl font-black tracking-normal [font-family:Georgia,serif]">Log in</h2>
            <p className="mt-2 text-sm leading-7 text-[#6d5648]">Use the account you created on this browser to continue.</p>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[#6d5648]">New here? <Link href="/signup" className="font-black text-[#24150f] underline-offset-4 hover:underline">Create a writer account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
