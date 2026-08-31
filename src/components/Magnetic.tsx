import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

export function Magnetic({
  children,
  className = '',
  strength = 16,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let cx = 0
    let cy = 0

    const tick = () => {
      cx += (target.current.x - cx) * 0.18
      cy += (target.current.y - cy) * 0.18
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ willChange: 'transform' } as CSSProperties}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        target.current.x = (x / rect.width) * strength
        target.current.y = (y / rect.height) * strength
      }}
      onMouseLeave={() => {
        target.current.x = 0
        target.current.y = 0
      }}
    >
      {children}
    </div>
  )
}
