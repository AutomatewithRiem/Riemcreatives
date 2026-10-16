import { useEffect, useRef } from 'react'
import { motionReduced, A11Y_EVENT } from '@/lib/a11y'

type Neuron = { x: number; y: number; phase: number; radius: number }
type Edge = { a: number; b: number; phase: number }

/** Decorative knowledge graph: drifting neurons and slow traveling signals. */
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !ctx) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let nodes: Neuron[] = [],
      edges: Edge[] = []
    let width = 0,
      height = 0,
      raf = 0,
      last = 0,
      elapsed = 0
    let dark = true,
      reduced = false,
      low = false
    const color = (alpha: number) => `rgba(${dark ? '174, 123, 246' : '106, 55, 174'}, ${alpha})`
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const points = nodes.map((n) => ({
        x: n.x + Math.sin(t * 0.16 + n.phase) * 12,
        y: n.y + Math.cos(t * 0.13 + n.phase) * 10,
      }))
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i],
          a = points[e.a],
          b = points[e.b]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = color(dark ? 0.15 : 0.12)
        ctx.lineWidth = 0.7
        ctx.stroke()
        if (i % 3 === 0) {
          const progress = (t * 0.14 + e.phase) % 1
          const alpha = Math.sin(progress * Math.PI) * 0.7
          const x = a.x + (b.x - a.x) * progress,
            y = a.y + (b.y - a.y) * progress
          ctx.beginPath()
          ctx.arc(x, y, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = color(alpha)
          ctx.fill()
        }
      }
      nodes.forEach((n, i) => {
        const p = points[i],
          pulse = (Math.sin(t * (0.65 + (i % 4) * 0.08) + n.phase) + 1) / 2
        const r = n.radius + pulse * 0.7
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5)
        halo.addColorStop(0, color(0.16 + pulse * 0.13))
        halo.addColorStop(1, color(0))
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = color(0.25 + pulse * 0.5)
        ctx.fill()
      })
    }
    const tick = (now: number) => {
      if (document.hidden || reduced || low) return
      if (now - last >= 1000 / 30) {
        elapsed += Math.min(now - last, 70) / 1000
        last = now
        draw(elapsed)
      }
      raf = requestAnimationFrame(tick)
    }
    const sync = () => {
      cancelAnimationFrame(raf)
      dark = document.documentElement.dataset.theme === 'dark'
      reduced = media.matches || motionReduced()
      low = document.documentElement.dataset.perf === 'low'
      canvas.dataset.motion = reduced || low ? 'static' : 'animated'
      draw(elapsed)
      last = performance.now()
      if (!document.hidden && !reduced && !low) raf = requestAnimationFrame(tick)
    }
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(28, Math.min(110, Math.round((width * height) / 14500)))
      const cols = Math.ceil(Math.sqrt((count * width) / height)),
        rows = Math.ceil(count / cols)
      nodes = Array.from({ length: count }, (_, i) => ({
        x: (((i % cols) + 0.18 + Math.random() * 0.64) * width) / cols,
        y: ((Math.floor(i / cols) + 0.18 + Math.random() * 0.64) * height) / rows,
        phase: Math.random() * Math.PI * 2,
        radius: 1.2 + Math.random() * 1.4,
      }))
      const seen = new Set<string>()
      edges = []
      nodes.forEach((n, i) => {
        const nearest = nodes
          .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
          .filter((m) => m.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 3)
        nearest.forEach(({ j, d }) => {
          const key = [Math.min(i, j), Math.max(i, j)].join(':')
          if (d > Math.max(width / cols, height / rows) * 1.85 || seen.has(key)) return
          seen.add(key)
          edges.push({ a: i, b: j, phase: Math.random() })
        })
      })
      sync()
    }
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-a11y-motion', 'data-perf'],
    })
    window.addEventListener('resize', resize)
    window.addEventListener(A11Y_EVENT, sync)
    document.addEventListener('visibilitychange', sync)
    media.addEventListener('change', sync)
    resize()
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener(A11Y_EVENT, sync)
      document.removeEventListener('visibilitychange', sync)
      media.removeEventListener('change', sync)
      ctx.clearRect(0, 0, width, height)
    }
  }, [])
  return <canvas ref={ref} className="neural-background" aria-hidden="true" />
}
