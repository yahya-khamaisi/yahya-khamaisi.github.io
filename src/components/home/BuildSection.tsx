import { useContent, useCopy } from '../../i18n/useContent'
import { aiLayers, coverage, layerOrder } from '../../data/site'
import { Reveal } from '../Reveal'

export function BuildSection() {
  const { projects } = useContent()
  const c = useCopy()
  const b = c.build
  const [l0, blue, l1, violet, l2] = b.lead

  return (
    <section id="stack" className="section">
      <Reveal className="sec-head">
        <span className="sec-num">{b.num}</span>
        <h2 className="h2">{b.title}</h2>
        <p className="lead">
          {l0}<span className="tone-fs">{blue}</span>{l1}<span className="tone-ai">{violet}</span>{l2}
        </p>
      </Reveal>

      <Reveal className="card build-card">
        <div className="layers">
          {layerOrder.map((layer, i) => {
            const l = b.layers[layer]
            return (
              <div key={layer} className={`layer${aiLayers.includes(layer) ? ' ai' : ''}`} style={{ animationDelay: `${i * 0.5}s` }}>
                <span className="label">{l.name}</span>
                <b>{l.title}</b>
                <span>{l.tools}</span>
              </div>
            )
          })}
        </div>
        <div className="packet-track" aria-hidden="true"><span className="packet" /></div>
        <div className="req-labels mono" aria-hidden="true"><span>{b.request}</span><span>{b.response}</span></div>

        <div className="coverage">
          <span className="label">{b.coverageLabel}</span>
          {coverage.map((row, i) => {
            const project = projects.find((p) => p.slug === row.slug)
            const labels = (b.coverage[row.slug] ?? '').split('|')
            return (
              <div key={row.slug} className="cov-row">
                <span>{project?.title}</span>
                {row.spans.map(([from, to], j) => (
                  <span
                    key={from}
                    className={`cov-bar grow${row.tone === 'mix' ? '' : ` ${row.tone}`}`}
                    style={{ gridColumn: `${from + 1} / ${to + 2}`, animationDelay: `${i * 0.15 + j * 0.1}s` }}
                  >
                    {labels[j] ?? ''}
                  </span>
                ))}
              </div>
            )
          })}
        </div>
      </Reveal>

      <div className="principles">
        {b.principles.map((p, i) => (
          <Reveal key={p.title} className="card principle" delay={i * 80}>
            <b className={`tone-${p.tone}`}>{p.title}</b>
            <p>{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
