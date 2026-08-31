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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)

    // Safety net: never leave content invisible if the observer never fires
    // (tab opened in the background, layout quirks, very tall elements).
    const failSafe = window.setTimeout(() => {
      el.classList.add('is-visible')
      observer.disconnect()
    }, 2500)

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
