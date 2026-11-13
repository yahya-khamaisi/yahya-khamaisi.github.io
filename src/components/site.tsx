import type { ComponentProps, ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/** Page column with the site gutter. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)} {...props} />
}

/** Small uppercase label used above titles and inside cards. */
export function Eyebrow({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('font-mono text-xs tracking-wide text-muted-foreground uppercase rtl:font-sans rtl:tracking-normal', className)} {...props} />
}

export function SectionHead({ num, title, lead }: { num: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-3">
      <span className="font-mono text-sm text-chart-1">{num}</span>
      <h2 className="text-4xl leading-tight font-bold tracking-tighter md:text-5xl rtl:tracking-normal">{title}</h2>
      {lead && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>}
    </Reveal>
  )
}

export type Tone = 'ai' | 'fs'
const toneText: Record<Tone, string> = { ai: 'text-chart-2', fs: 'text-chart-1' }

/** A rounded tag; `tone` colours it violet for AI or blue for full stack. */
export function Tag({ tone, className, ...props }: ComponentProps<typeof Badge> & { tone?: Tone }) {
  return <Badge variant="secondary" className={cn('h-6 rounded-full px-2.5', tone && toneText[tone], className)} {...props} />
}

export function ProofNote({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('text-xs font-medium text-muted-foreground', className)} {...props} />
}

/** Small coloured marker for tool chips and legends. */
export function Dot({ tone, className }: { tone?: Tone | 'muted'; className?: string }) {
  const bg = tone === 'ai' ? 'bg-chart-2' : tone === 'muted' ? 'bg-chart-4' : 'bg-chart-1'
  return <i aria-hidden="true" className={cn('inline-block size-2 shrink-0 rounded-full', bg, className)} />
}

/** Outlined tool badge with a coloured marker. */
export function ToolBadge({ tone, children, className, ...props }: ComponentProps<typeof Badge> & { tone?: Tone }) {
  return (
    <Badge variant="outline" className={cn('h-8 gap-2 rounded-lg px-3 text-sm', className)} {...props}>
      <Dot tone={tone} />
      {children}
    </Badge>
  )
}

/** Shared size for the large pill buttons. */
export const pillButton = 'h-11 rounded-full px-5 text-base font-semibold'
