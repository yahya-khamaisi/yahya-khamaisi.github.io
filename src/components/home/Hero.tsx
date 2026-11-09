import { Link } from 'react-router-dom'
import { useContent, useCopy } from '../../i18n/useContent'
import { marqueeTools } from '../../data/site'
import { Reveal } from '../Reveal'

function MarqueeRow({ tools, ai, reverse }: { tools: string[]; ai?: boolean; reverse?: boolean }) {
  // The list is rendered twice so the loop is seamless; the copy is hidden from assistive tech.
  const item = (name: string, hidden: boolean) => (
    <span key={`${name}-${hidden}`} className="tool" aria-hidden={hidden || undefined}>
      <i className={`tool-dot${ai ? ' ai' : ''}`} />
      {name}
    </span>
  )
  return (
    <div className="marquee-row">
      <div className={`marquee-track${reverse ? ' rev' : ''}`}>
        {tools.map((t) => item(t, false))}
        {tools.map((t) => item(t, true))}
      </div>
    </div>
  )
}

export function Hero() {
  const { profile } = useContent()
  const c = useCopy()
  const h = c.hero
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-copy">
          <Reveal className="chips">
            {h.chips.map((chip, i) => (
              <span key={chip} className="chip">
                {i === 0 && <span className="chip-dot" />}
                {chip}
              </span>
            ))}
          </Reveal>
          <Reveal delay={80}>
            <h1 className="h1">
              {h.lead}
              <span className="rot" aria-label={h.rotating.join(', ')}>
                <span className="rot-in" aria-hidden="true">
                  {[...h.rotating, h.rotating[0]].map((word, i) => (
                    <span key={i}>{word}</span>
                  ))}
                </span>
              </span>
              {h.tail}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">{h.sub}</p>
          </Reveal>
          <Reveal delay={240} className="hero-ctas">
            <Link to="/" state={{ section: 'work' }} className="btn btn-primary">
              {h.primary}
            </Link>
            <Link to="/" state={{ section: 'ask' }} className="btn btn-plain">
              <span className="sparkle" aria-hidden="true">✦</span> {h.secondary}
            </Link>
          </Reveal>
        </div>
        <Reveal delay={120} className="ring">
          <img className="portrait" src={profile.photo} alt={profile.photoAlt} width="900" height="934" />
        </Reveal>
      </section>

      <Reveal className="card proof-strip">
        {h.proof.map((p) => (
          <div key={p.label} className="proof-cell">
            <span className={`proof-value${p.tone ? ` tone-${p.tone}` : ''}`}>{p.value}</span>
            <span className="proof-label">{p.label}</span>
          </div>
        ))}
      </Reveal>

      <div className="marquee" aria-label={h.toolsLabel} role="group">
        <MarqueeRow tools={marqueeTools.ai} ai />
        <MarqueeRow tools={marqueeTools.fs} reverse />
      </div>
    </>
  )
}
