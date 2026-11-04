import { useEffect, useState, type CSSProperties } from 'react'
import { carouselProjects } from '@/data/carousel-projects'
import { A11Y_EVENT, motionReduced } from '@/lib/a11y'

/** One rotating collection, with the complete static grid always available below. */
export default function ProjectSpinner({ onChoose }: { onChoose: (href: string) => void }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const count = carouselProjects.length
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches || motionReduced())
    sync(); media.addEventListener('change', sync); window.addEventListener(A11Y_EVENT, sync)
    return () => { media.removeEventListener('change', sync); window.removeEventListener(A11Y_EVENT, sync) }
  }, [])
  useEffect(() => {
    if (paused || interacting || focused || reduced) return
    const timer = setInterval(() => { if (!document.hidden) setActive(i => (i + 1) % count) }, 3000)
    return () => clearInterval(timer)
  }, [paused, interacting, focused, reduced, count])
  const step = (direction: number) => setActive(i => (i + direction + count) % count)
  return <section className="project-spinner" aria-label="Spinning project carousel" aria-roledescription="carousel">
    <header><h2>Explore my projects</h2><p>Browse the spinning carousel, or scroll down to see every project individually.</p></header>
    <div className="project-spinner__stage" onPointerEnter={() => setInteracting(true)} onPointerLeave={() => setInteracting(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
      {carouselProjects.map((item, i) => {
        const offset = ((i - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2)
        const visible = Math.abs(offset) <= 3
        return <button key={item.href} className="project-spinner__card" type="button" data-active={offset === 0} aria-hidden={!visible} tabIndex={visible ? 0 : -1} aria-label={`Open ${item.title}`} style={{ '--spin-angle': `${offset * 45}deg`, opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' } as CSSProperties} onClick={() => onChoose(item.href)}>
          <img src={item.image} alt="" loading="lazy" /><span>{item.title}</span><small>{item.kind}</small>
        </button>
      })}
    </div>
    <div className="project-spinner__controls"><button type="button" onClick={() => step(-1)} aria-label="Previous project">← Previous</button><span>{active + 1} / {count}</span><button type="button" onClick={() => step(1)} aria-label="Next project">Next →</button><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Resume spinning' : 'Pause spinning'}</button></div>
    <p className="project-spinner__current">{carouselProjects[active].title}</p>
  </section>
}
