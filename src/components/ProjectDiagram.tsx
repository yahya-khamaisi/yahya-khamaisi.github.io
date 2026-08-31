import { Fragment } from 'react'
import { projectDiagrams } from '../data/diagrams'

const DEFAULT_NOTE =
  'Representative architecture — illustrative, not production data or an exact copy of internal tooling.'

export function ProjectDiagram({ slug }: { slug: string }) {
  const diagram = projectDiagrams[slug]
  if (!diagram) return null

  return (
    <figure className="pdiagram">
      <figcaption className="pdiagram__caption">{diagram.caption}</figcaption>
      <div className="pdiagram__flow" role="img" aria-label={diagram.caption}>
        {diagram.columns.map((col, i) => (
          <Fragment key={col.label}>
            {i > 0 && <span className="pdiagram__arrow" aria-hidden="true" />}
            <div className="pdiagram__col">
              <span className="pdiagram__col-label">{col.label}</span>
              {col.nodes.map((node) => (
                <div
                  key={node.label}
                  className={`pdiagram__node${node.accent ? ' is-accent' : ''}`}
                >
                  <b>{node.label}</b>
                  {node.sub && <span>{node.sub}</span>}
                </div>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
      <p className="pdiagram__note">{diagram.footnote ?? DEFAULT_NOTE}</p>
    </figure>
  )
}
