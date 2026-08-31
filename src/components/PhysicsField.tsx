import { useEffect, useRef } from 'react'
import { useTheme } from '../theme/ThemeProvider'

type Dot = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  mass: number
  link: number
}

export function PhysicsField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolved } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let dots: Dot[] = []
    const mouse = { x: -9999, y: -9999, down: false }
    let last = performance.now()

    const color =
      resolved === 'dark'
        ? {
            dot: 'rgba(210, 218, 235, 0.55)',
            line: 'rgba(180, 195, 230, 0.11)',
            glow: 'rgba(170, 190, 255, 0.08)',
          }
        : {
            dot: 'rgba(40, 55, 90, 0.35)',
            line: 'rgba(40, 60, 110, 0.08)',
            glow: 'rgba(60, 90, 160, 0.05)',
          }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(72, Math.floor((w * h) / 22000))
      dots = Array.from({ length: count }, (_, i) => {
        const r = 1.2 + Math.random() * 2.2
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r,
          mass: r * r,
          link: 90 + (i % 5) * 12,
        }
      })
    }

    function step(now: number) {
      const dt = Math.min(32, now - last) / 16.67
      last = now

      ctx!.clearRect(0, 0, w, h)

      // soft lighting wash that follows pointer
      if (mouse.x > 0) {
        const light = ctx!.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          280,
        )
        light.addColorStop(0, color.glow)
        light.addColorStop(1, 'transparent')
        ctx!.fillStyle = light
        ctx!.fillRect(0, 0, w, h)
      }

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]

        // mouse gravity / repulsion
        if (mouse.x > 0) {
          const dx = mouse.x - a.x
          const dy = mouse.y - a.y
          const dist = Math.hypot(dx, dy) || 1
          const reach = mouse.down ? 280 : 180
          if (dist < reach) {
            const force = ((reach - dist) / reach) * (mouse.down ? 0.085 : -0.04)
            a.vx += (dx / dist) * force * dt
            a.vy += (dy / dist) * force * dt
          }
        }

        // soft collisions
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy) || 1
          const min = a.r + b.r + 2
          if (dist < min) {
            const push = ((min - dist) / min) * 0.05
            const nx = dx / dist
            const ny = dy / dist
            a.vx -= nx * push
            a.vy -= ny * push
            b.vx += nx * push
            b.vy += ny * push
          }

          // link lines
          const linkDist = Math.min(a.link, b.link)
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * (resolved === 'dark' ? 0.14 : 0.1)
            ctx!.strokeStyle =
              resolved === 'dark'
                ? `rgba(180, 195, 230, ${alpha})`
                : `rgba(40, 60, 110, ${alpha})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }

        a.vx *= 0.992
        a.vy *= 0.992
        a.x += a.vx * dt
        a.y += a.vy * dt

        // wrap edges
        if (a.x < -20) a.x = w + 20
        if (a.x > w + 20) a.x = -20
        if (a.y < -20) a.y = h + 20
        if (a.y > h + 20) a.y = -20

        // lit particle
        const g = ctx!.createRadialGradient(a.x - 0.6, a.y - 0.6, 0, a.x, a.y, a.r * 2.2)
        g.addColorStop(0, resolved === 'dark' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.9)')
        g.addColorStop(0.45, color.dot)
        g.addColorStop(1, 'transparent')
        ctx!.fillStyle = g
        ctx!.beginPath()
        ctx!.arc(a.x, a.y, a.r * 2.2, 0, Math.PI * 2)
        ctx!.fill()
      }

      raf = requestAnimationFrame(step)
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onDown() {
      mouse.down = true
    }
    function onUp() {
      mouse.down = false
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
      mouse.down = false
    }

    resize()
    raf = requestAnimationFrame(step)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [resolved])

  return (
    <canvas
      ref={canvasRef}
      className="physics-field"
      aria-hidden="true"
    />
  )
}
