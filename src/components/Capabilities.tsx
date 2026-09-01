import { useState } from 'react'
import type { DomainId } from '../data/systems'
import { useContent } from '../i18n/useContent'
import { Icon } from './Icon'
import { CapabilityScene } from './CapabilityScene'
import { Reveal } from './Reveal'

export function Capabilities() {
  const { systems, home } = useContent()
  const { domains: careerDomains, flows: careerFlows, proof: careerProof } =
    systems
  const cap = home.capabilities
  const [hoverId, setHoverId] = useState<DomainId | null>(null)
  const [pinnedId, setPinnedId] = useState<DomainId | null>(null)
  const focusId = hoverId ?? pinnedId
  const active = careerDomains.find((d) => d.id === focusId) ?? null

  function isNeighbor(focus: DomainId, id: DomainId) {
    if (focus === id) return true
    return careerFlows.some(
      (f) =>
        (f.from === focus && f.to === id) || (f.to === focus && f.from === id),
    )
  }

  function selectDomain(id: DomainId | null) {
    setPinnedId(id)
    setHoverId(null)
  }

  return (
    <div className="capabilities">
      <Reveal delay={80}>
        <article className="build-career">
          <header className="build-career__head">
            <div>
              <h3>{cap.cardTitle}</h3>
              <p>{cap.cardText}</p>
            </div>
            <ul className="build-career__proof">
              {careerProof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </header>

          <div className="capability-panel">
            <CapabilityScene
              domains={careerDomains}
              flows={careerFlows}
              focusId={focusId}
              onFocusChange={selectDomain}
              variant="industry"
              ariaLabel={cap.sceneAria}
            />
            <p className="capability-story" aria-live="polite">
              <span className="capability-story__label">
                {active ? active.label : cap.careerFlowLabel}
              </span>
              {active ? active.story : systems.idleStory}
            </p>
          </div>

          <ul className="pillar-grid pillar-grid--career">
            {careerDomains.map((item) => {
              const isActive = focusId === item.id
              const dimmed =
                focusId !== null && !isNeighbor(focusId, item.id)
              return (
                <li
                  key={item.id}
                  className={`pillar-card${isActive ? ' is-active' : ''}${
                    dimmed ? ' is-dim' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="pillar-card__btn"
                    aria-pressed={pinnedId === item.id}
                    onMouseEnter={() => setHoverId(item.id)}
                    onMouseLeave={() => setHoverId(null)}
                    onFocus={() => setHoverId(item.id)}
                    onBlur={() => setHoverId(null)}
                    onClick={() =>
                      selectDomain(pinnedId === item.id ? null : item.id)
                    }
                  >
                    <span className="pillar-icon" aria-hidden="true">
                      <Icon name={item.icon} />
                    </span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </article>
      </Reveal>
    </div>
  )
}
