import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#ff3d8b]/10">
        <SearchX className="h-6 w-6 text-[#ff3d8b]" />
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white/90">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/40">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-sm border border-white/[0.1] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70 transition hover:bg-white/[0.04]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} from the master panel will appear here automatically. The page layout stays ready even when the feed is empty.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
