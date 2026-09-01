import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => el.classList.add('is-visible')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return
    }

    // Already on screen at mount (including when the page opens scrolled) —
    // show it now rather than waiting on the observer.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)

    // Safety net: never leave content invisible if the observer never fires.
    const failSafe = window.setTimeout(() => {
      reveal()
      observer.disconnect()
    }, 1600)

    return () => {
      window.clearTimeout(failSafe)
      observer.disconnect()
    }
  }, [])

  const style = { transitionDelay: `${delay}ms` } as CSSProperties

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}
