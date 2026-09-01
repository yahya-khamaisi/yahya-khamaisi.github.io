import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view on the one-page layout and
 * returns its id — used to light up the matching link in the top bar.
 * Defaults to the first id until something scrolls past the header line,
 * and snaps to the last id once the page bottoms out (short trailing
 * sections may never clear the line on their own).
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [active, setActive] = useState(ids[0] ?? '')
  const key = ids.join(',')

  useEffect(() => {
    const list = key ? key.split(',') : []
    const sections = list
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const pick = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (bottomReached) {
        setActive(sections[sections.length - 1].id)
        return
      }

      const line = offset + 1
      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id
      }
      setActive(current)
    }

    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [key, offset])

  return active
}
