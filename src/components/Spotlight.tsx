import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../i18n/useContent'
import { Sym, type SymName } from './Sym'

type Group = 'sections' | 'projects' | 'skills' | 'experience' | 'research'

type Item = {
  group: Group
  label: string
  hint: string
  icon: SymName
  to: string
  external?: boolean
}

type SpotlightContextValue = { isOpen: boolean; open: () => void; close: () => void }

const SpotlightContext = createContext<SpotlightContextValue | null>(null)

export function SpotlightProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // ⌘K / Ctrl+K toggles from anywhere; "/" opens when not typing.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen((value) => !value)
        return
      }
      const target = event.target as HTMLElement | null
      const typing =
        target?.closest('input, textarea, select, [contenteditable="true"]') != null
      if (event.key === '/' && !typing) {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])
  return <SpotlightContext.Provider value={value}>{children}</SpotlightContext.Provider>
}

export function useSpotlight() {
  const context = useContext(SpotlightContext)
  if (!context) throw new Error('useSpotlight must be used within SpotlightProvider')
  return context
}

function useIndex(): Item[] {
  const { mac, projects, skillGroups, experience, publications, categoryLabels } =
    useContent()
  return useMemo(() => {
    const items: Item[] = mac.sections.map((s) => ({
      group: 'sections',
      label: s.label,
      hint: '',
      icon: s.icon,
      to: s.to,
    }))
    for (const p of projects) {
      items.push({
        group: 'projects',
        label: p.title,
        hint: `${categoryLabels[p.category]} · ${p.stack.slice(0, 2).join(', ')}`,
        icon: 'grid',
        to: `/projects/${p.slug}`,
      })
    }
    const seen = new Set<string>()
    for (const g of skillGroups) {
      for (const tool of g.tools) {
        if (seen.has(tool.name)) continue
        seen.add(tool.name)
        items.push({ group: 'skills', label: tool.name, hint: g.title, icon: 'spark', to: '/skills' })
      }
    }
    for (const job of experience) {
      items.push({
        group: 'experience',
        label: job.company,
        hint: `${job.role} · ${job.period}`,
        icon: 'brief',
        to: '/experience',
      })
    }
    for (const pub of publications) {
      items.push({
        group: 'research',
        label: pub.title,
        hint: pub.venue,
        icon: 'paper',
        to: '/research',
      })
    }
    return items
  }, [mac, projects, skillGroups, experience, publications, categoryLabels])
}

export function Spotlight() {
  const { isOpen, close } = useSpotlight()
  if (!isOpen) return null
  return <SpotlightDialog onClose={close} />
}

function SpotlightDialog({ onClose }: { onClose: () => void }) {
  const { mac } = useContent()
  const index = useIndex()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<Element | null>(null)

  useEffect(() => {
    returnFocus.current = document.activeElement
    inputRef.current?.focus()
    return () => {
      if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus()
    }
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return [
        ...index.filter((i) => i.group === 'sections'),
        ...index.filter((i) => i.group === 'projects').slice(0, 4),
      ]
    }
    return index
      .filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q))
      .slice(0, 12)
  }, [index, query])

  function go(item: Item) {
    onClose()
    navigate(item.to)
  }

  function onKeyDown(event: ReactKeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active])
    }
  }

  return (
    <div className="spot-backdrop" onMouseDown={onClose}>
      <div
        className="spot"
        role="dialog"
        aria-modal="true"
        aria-label={mac.t.search}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <label className="spot-q">
          <Sym name="search" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder={mac.t.spotlightPlaceholder}
            aria-label={mac.t.search}
            aria-controls="spot-results"
            aria-activedescendant={results[active] ? `spot-${active}` : undefined}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
          />
          <kbd>esc</kbd>
        </label>
        <ul className="spot-res" id="spot-results" role="listbox">
          {results.length === 0 && <li className="spot-empty">{mac.t.noResults}</li>}
          {results.map((item, i) => {
            const header =
              i === 0 || results[i - 1].group !== item.group
                ? mac.t.spotlightGroups[item.group]
                : null
            return (
              <li key={`${item.group}-${item.label}`} role="presentation">
                {header && <p className="spot-h">{header}</p>}
                <button
                  type="button"
                  id={`spot-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={`spot-it${i === active ? ' is-on' : ''}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(item)}
                >
                  <span className={`spot-ico spot-ico--${item.group}`}>
                    <Sym name={item.icon} />
                  </span>
                  <span className="spot-label">{item.label}</span>
                  {item.hint && <small>{item.hint}</small>}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
