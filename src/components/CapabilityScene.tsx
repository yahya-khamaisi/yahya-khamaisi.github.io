import { useEffect, useRef } from 'react'
import type { Domain, DomainId, Flow } from '../data/systems'
import { useTheme } from '../theme/ThemeProvider'

type Node = {
  id: DomainId
  label: string
  sub: string
  x: number
  y: number
  vx: number
  vy: number
  homeX: number
  homeY: number
  r: number
  phase: number
}

type Packet = {
  from: DomainId
  to: DomainId
  t: number
  speed: number
}

type Props = {
  domains: Domain[]
  flows: Flow[]
  focusId: DomainId | null
  onFocusChange: (id: DomainId | null) => void
  ariaLabel: string
  variant?: 'industry' | 'research'
}

export function CapabilityScene({
  domains,
  flows,
  focusId,
  onFocusChange,
  ariaLabel,
  variant = 'industry',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef(focusId)
  const onFocusRef = useRef(onFocusChange)
  const domainsRef = useRef(domains)
  const flowsRef = useRef(flows)
  const { resolved } = useTheme()

  focusRef.current = focusId
  onFocusRef.current = onFocusChange
  domainsRef.current = domains
  flowsRef.current = flows

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999, active: false }
    let nodes: Node[] = []
    let packets: Packet[] = []
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let t0 = performance.now()
    let spawnAcc = 0

    const research = variant === 'research'
    const palette =
      resolved === 'dark'
        ? {
            bg0: research ? '#0c0e0c' : '#0b0b0c',
            bg1: research ? '#121612' : '#121216',
            ink: '#f3f3f4',
            muted: '#9a9aa3',
            dim: 'rgba(220,220,230,0.06)',
            lineHot: research
              ? 'rgba(190,220,180,0.5)'
              : 'rgba(210,220,255,0.55)',
            glow: research
              ? 'rgba(170,210,160,0.18)'
              : 'rgba(190,205,255,0.22)',
            glowHot: research
              ? 'rgba(190,230,175,0.4)'
              : 'rgba(210,225,255,0.45)',
            soft: research ? '#273028' : '#2a2d38',
            rim: 'rgba(255,255,255,0.35)',
            packet: research
              ? 'rgba(210,245,200,0.95)'
              : 'rgba(240,245,255,0.95)',
          }
        : {
            bg0: research ? '#f2f4f1' : '#f4f4f5',
            bg1: research ? '#e8ece6' : '#ececf0',
            ink: '#121214',
            muted: '#5c5c66',
            dim: 'rgba(20,20,30,0.05)',
            lineHot: research
              ? 'rgba(50,110,60,0.5)'
              : 'rgba(40,70,140,0.55)',
            glow: research
              ? 'rgba(70,130,80,0.16)'
              : 'rgba(80,110,180,0.18)',
            glowHot: research
              ? 'rgba(50,120,70,0.32)'
              : 'rgba(60,100,180,0.35)',
            soft: research ? '#d4dbd2' : '#d7d9e0',
            rim: 'rgba(255,255,255,0.7)',
            packet: research
              ? 'rgba(40,110,60,0.85)'
              : 'rgba(40,70,140,0.85)',
          }

    function layout() {
      const defs = domainsRef.current
      const rect = wrap!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(280, rect.width)
      h = Math.max(320, Math.min(560, rect.width * 0.52))
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodes = defs.map((def, i) => ({
        id: def.id,
        label: def.label,
        sub: def.sub,
        x: def.hx * w,
        y: def.hy * h,
        vx: 0,
        vy: 0,
        homeX: def.hx * w,
        homeY: def.hy * h,
        r: Math.min(def.r, w < 360 ? def.r * 0.82 : def.r),
        phase: i * 1.1,
      }))
    }

    function hitNode(x: number, y: number): Node | null {
      let best: Node | null = null
      let bestDist = Infinity
      for (const n of nodes) {
        const d = Math.hypot(n.x - x, n.y - y)
        if (d < n.r + 12 && d < bestDist) {
          best = n
          bestDist = d
        }
      }
      return best
    }

    function edgeList() {
      return flowsRef.current
    }

    function isHotEdge(from: DomainId, to: DomainId, focus: DomainId | null) {
      if (!focus) return true
      return from === focus || to === focus
    }

    function isHotNode(id: DomainId, focus: DomainId | null) {
      if (!focus) return true
      if (id === focus) return true
      return edgeList().some(
        (f) =>
          (f.from === focus && f.to === id) || (f.to === focus && f.from === id),
      )
    }

    function spawnPackets(focus: DomainId | null) {
      const list = edgeList()
      const candidates = focus
        ? list.filter((f) => f.from === focus || f.to === focus)
        : list
      if (!candidates.length) return
      const edge = candidates[Math.floor(Math.random() * candidates.length)]
      packets.push({
        from: edge.from,
        to: edge.to,
        t: 0,
        speed: 0.008 + Math.random() * 0.01,
      })
      if (packets.length > 24) packets.shift()
    }

    function step(now: number) {
      const dt = Math.min(32, now - t0) / 16.67
      t0 = now
      const time = now / 1000
      const focus = focusRef.current
      const edges = edgeList()

      ctx!.clearRect(0, 0, w, h)

      const bg = ctx!.createLinearGradient(0, 0, w, h)
      bg.addColorStop(0, palette.bg0)
      bg.addColorStop(1, palette.bg1)
      ctx!.fillStyle = bg
      ctx!.fillRect(0, 0, w, h)

      const lightX = mouse.active ? mouse.x : w * 0.55
      const lightY = mouse.active ? mouse.y : h * 0.35
      const light = ctx!.createRadialGradient(
        lightX,
        lightY,
        12,
        lightX,
        lightY,
        Math.max(w, h) * 0.65,
      )
      light.addColorStop(0, focus ? palette.glowHot : palette.glow)
      light.addColorStop(1, 'transparent')
      ctx!.fillStyle = light
      ctx!.fillRect(0, 0, w, h)

      if (!reduced) {
        for (const n of nodes) {
          const hot = isHotNode(n.id, focus)
          const pull = focus === n.id ? 1.35 : hot ? 1 : 0.55
          const breathe = Math.sin(time * 1.2 + n.phase) * (hot ? 3.2 : 1.1)
          const targetX = n.homeX + Math.cos(time * 0.7 + n.phase) * (hot ? 7 : 2.5)
          const targetY = n.homeY + breathe

          let ax = (targetX - n.x) * 0.045 * pull
          let ay = (targetY - n.y) * 0.045 * pull

          if (mouse.active) {
            const dx = n.x - mouse.x
            const dy = n.y - mouse.y
            const dist = Math.hypot(dx, dy) || 1
            if (dist < 140) {
              const force = ((140 - dist) / 140) * 0.85
              ax += (dx / dist) * force
              ay += (dy / dist) * force
            }
          }

          if (focus && focus !== n.id && isHotNode(n.id, focus)) {
            const hub = nodes.find((x) => x.id === focus)
            if (hub) {
              const dx = hub.x - n.x
              const dy = hub.y - n.y
              const dist = Math.hypot(dx, dy) || 1
              ax += (dx / dist) * 0.012
              ay += (dy / dist) * 0.012
            }
          }

          n.vx = (n.vx + ax * dt) * 0.88
          n.vy = (n.vy + ay * dt) * 0.88
          n.x += n.vx * dt
          n.y += n.vy * dt
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]
            const b = nodes[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.hypot(dx, dy) || 1
            const min = a.r + b.r + 16
            if (dist < min) {
              const push = ((min - dist) / min) * 0.08
              const nx = dx / dist
              const ny = dy / dist
              a.vx -= nx * push
              a.vy -= ny * push
              b.vx += nx * push
              b.vy += ny * push
            }
          }
        }

        spawnAcc += dt
        if (spawnAcc > (focus ? 8 : 14)) {
          spawnAcc = 0
          spawnPackets(focus)
        }
      }

      const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Partial<
        Record<DomainId, Node>
      >

      for (const edge of edges) {
        const a = byId[edge.from]
        const b = byId[edge.to]
        if (!a || !b) continue
        const hot = isHotEdge(edge.from, edge.to, focus)
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2 + Math.sin(time + a.phase) * (hot ? 5 : 2)

        ctx!.strokeStyle = hot ? palette.lineHot : palette.dim
        ctx!.lineWidth = hot ? 1.7 : 1
        ctx!.beginPath()
        ctx!.moveTo(a.x, a.y)
        ctx!.quadraticCurveTo(mx, my, b.x, b.y)
        ctx!.stroke()

        if (hot && (focus || !reduced)) {
          ctx!.fillStyle = focus ? palette.ink : palette.muted
          ctx!.font = `600 10px "IBM Plex Sans", sans-serif`
          ctx!.textAlign = 'center'
          ctx!.globalAlpha = focus ? 0.9 : 0.5
          ctx!.fillText(edge.label, mx, my - 8)
          ctx!.globalAlpha = 1
        }
      }

      if (!reduced) {
        packets = packets.filter((p) => p.t < 1)
        for (const p of packets) {
          const a = byId[p.from]
          const b = byId[p.to]
          if (!a || !b) continue
          if (!isHotEdge(p.from, p.to, focus)) {
            p.t = 1
            continue
          }
          p.t += p.speed * dt
          const t = Math.min(1, p.t)
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2 + Math.sin(time + a.phase) * 5
          const ox = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * mx + t * t * b.x
          const oy = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * my + t * t * b.y
          const pulse = ctx!.createRadialGradient(ox, oy, 0, ox, oy, 7)
          pulse.addColorStop(0, palette.packet)
          pulse.addColorStop(1, 'transparent')
          ctx!.fillStyle = pulse
          ctx!.beginPath()
          ctx!.arc(ox, oy, 7, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      for (const n of nodes) {
        const hot = isHotNode(n.id, focus)
        const selected = focus === n.id
        ctx!.globalAlpha = hot ? 1 : 0.28

        ctx!.fillStyle =
          resolved === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.12)'
        ctx!.beginPath()
        ctx!.ellipse(n.x, n.y + n.r * 0.85, n.r * 0.72, 6, 0, 0, Math.PI * 2)
        ctx!.fill()

        const aura = ctx!.createRadialGradient(
          n.x,
          n.y,
          n.r * 0.2,
          n.x,
          n.y,
          n.r * (selected ? 2 : 1.7),
        )
        aura.addColorStop(0, selected ? palette.glowHot : palette.glow)
        aura.addColorStop(1, 'transparent')
        ctx!.fillStyle = aura
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r * (selected ? 2 : 1.7), 0, Math.PI * 2)
        ctx!.fill()

        const body = ctx!.createRadialGradient(
          n.x - n.r * 0.35,
          n.y - n.r * 0.4,
          n.r * 0.1,
          n.x,
          n.y,
          n.r,
        )
        body.addColorStop(0, palette.rim)
        body.addColorStop(0.35, palette.soft)
        body.addColorStop(1, resolved === 'dark' ? '#0e0f14' : '#b8bbc6')
        ctx!.fillStyle = body
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r * (selected ? 1.05 : 1), 0, Math.PI * 2)
        ctx!.fill()

        if (selected) {
          ctx!.strokeStyle = palette.lineHot
          ctx!.lineWidth = 1.5
          ctx!.beginPath()
          ctx!.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2)
          ctx!.stroke()
        }

        ctx!.fillStyle =
          resolved === 'dark' ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.55)'
        ctx!.beginPath()
        ctx!.ellipse(
          n.x - n.r * 0.28,
          n.y - n.r * 0.32,
          n.r * 0.2,
          n.r * 0.12,
          -0.5,
          0,
          Math.PI * 2,
        )
        ctx!.fill()

        ctx!.fillStyle = palette.ink
        ctx!.font = `600 ${selected ? 13 : 12}px "Syne", sans-serif`
        ctx!.textAlign = 'center'
        ctx!.fillText(n.label, n.x, n.y + n.r + 16)
        ctx!.fillStyle = palette.muted
        ctx!.font = `500 10px "IBM Plex Sans", sans-serif`
        ctx!.fillText(n.sub, n.x, n.y + n.r + 30)
        ctx!.globalAlpha = 1
      }

      ctx!.fillStyle = palette.muted
      ctx!.font = `500 11px "IBM Plex Sans", sans-serif`
      ctx!.textAlign = 'left'
      ctx!.fillText(
        focus ? 'Click again to clear' : 'Click a node to focus paths',
        12,
        h - 12,
      )

      raf = requestAnimationFrame(step)
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      canvas!.style.cursor = hitNode(mouse.x, mouse.y) ? 'pointer' : 'crosshair'
    }

    function onLeave() {
      mouse.active = false
      canvas!.style.cursor = 'crosshair'
    }

    function onClick(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      const hit = hitNode(e.clientX - rect.left, e.clientY - rect.top)
      if (!hit) {
        onFocusRef.current(null)
        return
      }
      onFocusRef.current(focusRef.current === hit.id ? null : hit.id)
    }

    layout()
    raf = requestAnimationFrame(step)
    const ro = new ResizeObserver(layout)
    ro.observe(wrap)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [resolved, variant])

  return (
    <div className="capability-scene" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className="capability-scene__canvas"
        role="img"
        aria-label={ariaLabel}
      />
    </div>
  )
}
