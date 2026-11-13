import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GridPattern } from '@/components/ui/grid-pattern'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../../i18n/useContent'
import { Reveal } from '../Reveal'
import { pillButton } from '../site'

export function ContactSection() {
  const { profile } = useContent()
  const c = useCopy()
  return (
    <section id="contact" className="scroll-mt-20 pb-24">
      <Reveal>
        <Card className="relative items-center gap-6 px-6 py-10 text-center md:px-12 md:py-16">
          <GridPattern className="mask-radial-from-0% mask-radial-to-70% mask-radial-at-bottom stroke-border" />
          <span className="relative font-mono text-sm text-chart-1">{c.contact.num}</span>
          <h2 className="relative text-4xl leading-tight font-bold tracking-tighter md:text-6xl rtl:tracking-normal">
            {c.contact.title[0]}{' '}
            <span className="bg-linear-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">{c.contact.title[1]}</span>
          </h2>
          <p className="relative text-lg text-muted-foreground">{c.contact.lead}</p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <a className={cn(buttonVariants({ size: 'lg' }), pillButton)} href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), pillButton)} href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), pillButton)} href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </Card>
      </Reveal>
    </section>
  )
}
