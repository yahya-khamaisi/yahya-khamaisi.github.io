import { useContent } from '../i18n/useContent'
import { Pane } from '../components/Shell'
import { Sym } from '../components/Sym'

export function ResearchPage() {
  const { publications, ui, mac } = useContent()
  return (
    <Pane title={mac.sections[5].label} subtitle={ui.publicationsDesc}>
      <h2 className="group-title">{ui.publicationsTitle}</h2>
      <div className="group">
        {publications.map((pub) => (
          <a
            key={pub.title}
            className="group-row group-row--tall"
            href={pub.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="doc-ic" aria-hidden="true">
              PDF
            </span>
            <span className="grow">
              <b className="block">{pub.title}</b>
              <small className="muted block">{pub.venue}</small>
              {pub.note && <small className="muted block">{pub.note}</small>}
            </span>
            <Sym name="open" className="chev" />
          </a>
        ))}
      </div>
    </Pane>
  )
}
