import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Container, Dot, Eyebrow } from '@/components/site'
import { cn } from '@/lib/utils'
import { useContent, useCopy } from '../i18n/useContent'
import { groupOrder, projectMeta, type Discipline, type GroupKey } from '../data/site'
import { Reveal } from '../components/Reveal'

type Filter = GroupKey | 'all'
const discTone: Record<Discipline, 'ai' | 'fs' | 'muted'> = { ai: 'ai', fs: 'fs', app: 'muted' }

export function ProjectsPage() {
  const { projects } = useContent()
  const c = useCopy()
  const t = c.projects
  const [filter, setFilter] = useState<Filter>('all')

  const inGroup = (g: GroupKey) => projects.filter((p) => projectMeta[p.slug]?.group === g)
  const counts = Object.fromEntries(groupOrder.map((g) => [g, inGroup(g).length])) as Record<GroupKey, number>
  const max = Math.max(...Object.values(counts))
  const shown = groupOrder.filter((g) => filter === 'all' || g === filter)
  const filters: [Filter, string, number][] = [['all', t.all, projects.length], ...groupOrder.map((g): [Filter, string, number] => [g, t.groups[g].name, counts[g]])]

  return (
    <Container>
      <Reveal className="flex flex-col gap-4 pt-16 pb-8">
        <Link to="/" className="w-fit font-semibold text-chart-1 hover:underline">{t.home}</Link>
        <Eyebrow>{t.label}</Eyebrow>
        <h1 className="text-5xl leading-none font-extrabold tracking-tighter md:text-6xl rtl:leading-tight rtl:tracking-normal">{t.title(projects.length)}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.lead}</p>
      </Reveal>

      <Reveal role="img" aria-label={`${t.distAria}: ${groupOrder.map((g) => `${t.groups[g].name} ${counts[g]}`).join(', ')}`}>
        <Card className="gap-3 p-6">
          {groupOrder.map((g) => (
            <div key={g} className="grid grid-cols-6 items-center gap-3 text-sm font-semibold">
              <span className="col-span-2 md:col-span-1">{t.groups[g].name}</span>
              <Progress value={(counts[g] / max) * 100} className="col-span-3 md:col-span-4" />
              <span className="font-mono font-normal text-muted-foreground">{counts[g]}</span>
            </div>
          ))}
        </Card>
      </Reveal>

      <div className="flex flex-wrap items-center gap-2 pt-8 pb-4">
        <ToggleGroup aria-label={t.filterAria} value={[filter]} onValueChange={(v) => setFilter((v[0] as Filter | undefined) ?? 'all')} spacing={2} className="flex-wrap">
          {filters.map(([id, label, n]) => (
            <ToggleGroupItem
              key={id}
              value={id}
              variant="outline"
              className="h-9 rounded-full bg-card px-3.5 aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {label}
              <small className="font-mono text-xs opacity-60">{n}</small>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <span className="flex w-full gap-3.5 text-sm text-muted-foreground md:ms-auto md:w-auto">
          <span className="flex items-center gap-1.5"><Dot tone="ai" />{t.legend.ai}</span>
          <span className="flex items-center gap-1.5"><Dot tone="fs" />{t.legend.fs}</span>
          <span className="flex items-center gap-1.5"><Dot tone="muted" />{t.legend.app}</span>
        </span>
      </div>

      <div className="flex flex-col gap-4 pb-24">
        {shown.map((g) => (
          <Reveal key={g}>
            <section aria-labelledby={`group-${g}`}>
              <Card className="gap-0 py-0">
                <div className="flex flex-wrap items-baseline gap-3 px-6 py-4">
                  <b id={`group-${g}`} className="text-xl font-extrabold">{t.groups[g].name}</b>
                  <span className="font-mono text-xs text-muted-foreground">{t.groups[g].note}</span>
                </div>
                {inGroup(g).map((p) => {
                  const meta = projectMeta[p.slug]
                  return (
                    <Link key={p.slug} to={`/projects/${p.slug}`} className="grid grid-cols-4 items-center gap-2 border-t px-6 py-4 transition-colors hover:bg-muted md:grid-cols-12 md:gap-6">
                      <span className="col-span-3 flex min-w-0 flex-col gap-1 md:col-span-4">
                        <b className="flex items-center gap-2"><Dot tone={discTone[meta.discipline]} />{p.title}</b>
                        <small className="ps-4 text-sm text-muted-foreground">{p.role}</small>
                      </span>
                      <p className="text-sm leading-normal text-foreground/80 max-md:hidden md:col-span-5">{p.blurb}</p>
                      <span className="font-mono text-xs text-muted-foreground max-md:hidden md:col-span-2">{p.period}</span>
                      <span className="justify-self-end md:col-span-1">
                        <Badge variant="outline" className={cn('rounded-full', meta.evidence ? 'border-chart-3/50 text-chart-3' : 'text-muted-foreground')}>
                          {meta.evidence ? t.evidence[meta.evidence] : t.writeUp}
                        </Badge>
                      </span>
                    </Link>
                  )
                })}
              </Card>
            </section>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
