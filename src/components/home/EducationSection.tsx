import { BorderBeam } from '@/components/ui/border-beam'
import { Card } from '@/components/ui/card'
import { useContent, useCopy } from '../../i18n/useContent'
import { Reveal } from '../Reveal'
import { Eyebrow, SectionHead, ToolBadge } from '../site'

/** "Venue, 2025" → ["Venue", "2025"] so the year can sit in its own column. */
function splitVenue(venue: string): [string, string] {
  const match = venue.match(/^(.*?),?\s*(\d{4})$/)
  return match ? [match[1], match[2]] : [venue, '']
}

export function EducationSection() {
  const { education, publications } = useContent()
  const c = useCopy()
  const ed = c.education
  // Oldest first, so the path reads BSc → MSc → PhD and ends on the beam.
  const degrees = [...education].reverse()
  const papers = [...publications].sort((a, b) => splitVenue(b.venue)[1].localeCompare(splitVenue(a.venue)[1]))

  return (
    <section id="education" className="flex scroll-mt-20 flex-col gap-8 pb-16 md:pb-32">
      <SectionHead num={ed.num} title={ed.title} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {degrees.map((d, i) => {
          const current = d.status === 'in-progress'
          return (
            <Reveal key={d.degree} step={i}>
              <Card className="relative h-full gap-2 p-6">
                <span className="font-mono text-sm text-muted-foreground">
                  {d.period}
                  {current ? ` · ${ed.inProgress}` : ''}
                </span>
                <b className="text-lg">{d.degree}</b>
                <span className="text-sm text-muted-foreground">{d.school}</span>
                {current && <BorderBeam size={120} duration={7} colorFrom="var(--chart-1)" colorTo="var(--chart-2)" />}
              </Card>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="flex flex-wrap items-center gap-2">
        <Eyebrow className="pe-1.5">{ed.researchAreas}</Eyebrow>
        {ed.areas.map(([area, tone]) => (
          <ToolBadge key={area} tone={tone}>{area}</ToolBadge>
        ))}
      </Reveal>

      <Reveal>
        <Card className="gap-0 px-6 py-2">
          {papers.map((paper) => {
            const [venue, year] = splitVenue(paper.venue)
            return (
              <a
                key={paper.href}
                href={paper.href}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-6 gap-4 border-b py-4 transition-colors last:border-b-0 hover:text-chart-1 sm:grid-cols-12"
              >
                <span className="font-mono text-sm text-muted-foreground">{year}</span>
                <span className="col-span-5 flex flex-col gap-1 sm:col-span-11">
                  <b className="font-semibold">{paper.title}</b>
                  <small className="text-sm text-muted-foreground">{venue}</small>
                </span>
              </a>
            )
          })}
        </Card>
      </Reveal>
    </section>
  )
}
