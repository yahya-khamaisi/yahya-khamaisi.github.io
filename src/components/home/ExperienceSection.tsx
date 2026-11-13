import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BorderBeam } from '@/components/ui/border-beam'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../../i18n/useContent'
import { careerSpans } from '../../data/site'
import { Reveal } from '../Reveal'
import { Eyebrow, SectionHead, Tag } from '../site'

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
const barTone = ['bg-linear-to-r from-chart-1 to-chart-2', 'bg-chart-1', 'bg-chart-2', 'bg-chart-1/70', 'bg-chart-1/50']

export function ExperienceSection() {
  const { experience } = useContent()
  const c = useCopy()
  const e = c.experience
  const row = 'grid grid-cols-1 items-center gap-1 md:grid-cols-5 md:gap-4'

  return (
    <section id="experience" className="flex scroll-mt-20 flex-col gap-8 pb-16 md:pb-32">
      <SectionHead num={e.num} title={e.title} />

      <Reveal role="img" aria-label={e.timelineAria}>
        <Card className="gap-3 p-6 md:p-8">
          <div className={row}>
            <span className="max-md:hidden" />
            <div className="grid grid-cols-7 font-mono text-xs text-muted-foreground md:col-span-4">
              {YEARS.map((y) => <span key={y}>{y}</span>)}
            </div>
          </div>
          {experience.map((job, i) => (
            <div key={job.company} className={row}>
              <span className="text-sm font-semibold">{job.company}</span>
              {/* 28 quarters, 2020 Q1 → 2026 Q4 */}
              <div className="grid h-8 grid-cols-28 rounded-lg bg-muted md:col-span-4">
                <span className={cn('animate-in rounded-lg duration-1000 fade-in slide-in-from-left-4 fill-mode-both', barTone[i], careerSpans[i])}>
                  <span className="sr-only">{job.period}</span>
                </span>
              </div>
            </div>
          ))}
        </Card>
      </Reveal>

      <Reveal>
        <Card className="gap-4 p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
            <Eyebrow>{e.evolutionLabel}</Eyebrow>
            <span className="font-mono">
              <span className="text-chart-1">{e.evolutionPath[0]}</span> → <span className="text-chart-1">{e.evolutionPath[1]}</span> →{' '}
              <span className="text-chart-2">{e.evolutionPath[2]}</span>
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {e.eras.map((era, i) => {
              const last = i === e.eras.length - 1
              return (
                <Reveal key={era.when} step={i}>
                  <div className={cn('relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl p-4', last ? 'border bg-card' : 'bg-muted')}>
                    <span className="font-mono text-xs text-muted-foreground">{era.when}</span>
                    <b>{era.title}</b>
                    <span className="flex flex-wrap gap-1">
                      {era.tools.map(([tool, tone]) => (
                        <Tag key={tool} tone={tone} className={last ? 'bg-muted' : 'bg-card'}>{tool}</Tag>
                      ))}
                    </span>
                    {last && <BorderBeam size={80} duration={6} colorFrom="var(--chart-1)" colorTo="var(--chart-2)" />}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Card>
      </Reveal>

      <Reveal>
        <Card className="py-0">
          <Accordion defaultValue={[experience[0]?.company]} className="px-6">
            {experience.map((job, i) => (
              <AccordionItem key={job.company} value={job.company}>
                <AccordionTrigger className="py-5 hover:no-underline">
                  <span className="flex flex-1 flex-col gap-1 text-start md:flex-row md:items-baseline md:gap-6">
                    <span className="font-mono text-sm font-normal text-muted-foreground md:w-48">{job.period}</span>
                    <span className="text-lg font-semibold">{job.role} · {job.company}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 pb-2 md:ps-54">
                    {i < 2 && <span className="text-sm text-muted-foreground">{job.place}</span>}
                    <p className="leading-relaxed text-foreground/80">{job.summary}</p>
                    {job.highlights && (
                      <ul className="flex list-disc flex-col gap-1.5 ps-5 text-sm leading-relaxed text-foreground/80">
                        {job.highlights.map((h) => <li key={h}>{h}</li>)}
                      </ul>
                    )}
                    <span className="flex flex-wrap gap-1.5">
                      {(e.chips[i] ?? []).map((chip) => <Tag key={chip}>{chip}</Tag>)}
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </Reveal>
    </section>
  )
}
