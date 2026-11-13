import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useCopy } from '../../i18n/useContent'
import { Reveal } from '../Reveal'
import { Eyebrow, SectionHead, type Tone } from '../site'

function SkillList({ title, rows, tone }: { title: string; rows: [string, string][]; tone: Tone }) {
  return (
    <Reveal>
      <Card className="h-full gap-0 p-6 md:p-8">
        <Eyebrow className={cn('pb-2', tone === 'ai' ? 'text-chart-2' : 'text-chart-1')}>{title}</Eyebrow>
        {rows.map(([skill, where]) => (
          <div key={skill} className="flex items-baseline justify-between gap-3 border-t py-3">
            <b className="font-semibold">{skill}</b>
            <span className="text-end text-sm text-muted-foreground">{where}</span>
          </div>
        ))}
      </Card>
    </Reveal>
  )
}

export function SkillsSection() {
  const s = useCopy().skills

  return (
    <section id="skills" className="flex scroll-mt-20 flex-col gap-8 pb-16 md:pb-32">
      <SectionHead num={s.num} title={s.title} lead={s.lead} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SkillList title={s.aiTitle} rows={s.ai} tone="ai" />
        <SkillList title={s.fsTitle} rows={s.fs} tone="fs" />
      </div>
    </section>
  )
}
