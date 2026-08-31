import { useState } from 'react'
import {
  careerDomains,
  careerFlows,
  careerIdleStory,
  careerProof,
  type DomainId,
} from '../data/systems'
import { Icon } from './Icon'
import { CapabilityScene } from './CapabilityScene'
import { Reveal } from './Reveal'

function isNeighbor(focus: DomainId, id: DomainId) {
  if (focus === id) return true
  return careerFlows.some(
    (f) =>
      (f.from === focus && f.to === id) || (f.to === focus && f.from === id),
  )
}

export function Capabilities() {
  const [hoverId, setHoverId] = useState<DomainId | null>(null)
  const [pinnedId, setPinnedId] = useState<DomainId | null>(null)
  const focusId = hoverId ?? pinnedId
  const active = careerDomains.find((d) => d.id === focusId) ?? null

  function selectDomain(id: DomainId | null) {
    setPinnedId(id)
    setHoverId(null)
  }

  return (
    <section className="section capabilities" id="capabilities">
      <Reveal>
        <div className="section-head">
          <div className="section-kicker">
            <Icon name="spark" />
            <span>How it fits together</span>
          </div>
          <h2>Full-stack AI engineering, end to end</h2>
          <p>
            Applied AI at the centre, with the cloud, data, product, and agent
            layers that get it in front of real users — measurable at every step.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <article className="build-career">
          <header className="build-career__head">
            <div>
              <h3>One system, five layers</h3>
              <p>
                Applied AI, agents, cloud, full stack, and data sit on one map.
                Hover any node to trace how the pieces connect.
              </p>
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
              ariaLabel="Interactive map of the full-stack AI engineering system: applied AI, agents, cloud, full stack, and data"
            />
            <p className="capability-story" aria-live="polite">
              <span className="capability-story__label">
                {active ? active.label : 'Career flow'}
              </span>
              {active ? active.story : careerIdleStory}
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
    </section>
  )
}
