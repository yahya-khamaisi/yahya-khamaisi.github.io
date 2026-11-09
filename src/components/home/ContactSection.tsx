import { useContent, useCopy } from '../../i18n/useContent'
import { Reveal } from '../Reveal'

export function ContactSection() {
  const { profile } = useContent()
  const c = useCopy()
  return (
    <section id="contact" className="section" style={{ paddingBottom: 96 }}>
      <Reveal className="card contact-card">
        <div className="grid-fade" aria-hidden="true" />
        <span className="sec-num">{c.contact.num}</span>
        <h2 className="h2">
          {c.contact.title[0]} <span className="gradient-text">{c.contact.title[1]}</span>
        </h2>
        <p className="lead">{c.contact.lead}</p>
        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn btn-plain" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-plain" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </Reveal>
    </section>
  )
}
