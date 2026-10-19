import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { projectPreviews } from '@/data/project-previews'
import { A11Y_EVENT, motionReduced } from '@/lib/a11y'

/** Reflective three-page carousel with manual controls and an accessible motion fallback. */
export default function ProjectsShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [still, setStill] = useState(false)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setStill(media.matches || motionReduced() || document.documentElement.dataset.perf === 'low')
    sync(); media.addEventListener('change', sync); window.addEventListener(A11Y_EVENT, sync)
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-perf', 'data-a11y-motion'] })
    return () => { media.removeEventListener('change', sync); window.removeEventListener(A11Y_EVENT, sync); observer.disconnect() }
  }, [])
  useEffect(() => {
    if (paused || hovered || focused || still) return
    const timer = window.setInterval(() => { if (!document.hidden) setActive(i => (i + 1) % projectPreviews.length) }, 4200)
    return () => clearInterval(timer)
  }, [paused, hovered, focused, still])
  const step = (n: number) => setActive(i => (i + n + projectPreviews.length) % projectPreviews.length)
  return <section className="projects-showcase" aria-label="Featured project carousel" aria-roledescription="carousel" onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <div className="projects-showcase__stage">
      <div className="projects-showcase__glow" />
      {projectPreviews.map((page, i) => {
        const offset = ((i - active + projectPreviews.length + Math.floor(projectPreviews.length / 2)) % projectPreviews.length) - Math.floor(projectPreviews.length / 2)
        const distance = Math.abs(offset)
        return <Link to={`/projects#project-0${i + 1}`} key={page.image} className={`projects-showcase__page${i < 2 ? ' projects-showcase__page--crm' : ''}`} data-center={offset === 0} tabIndex={distance < 2 ? 0 : -1} aria-hidden={distance >= 2} aria-label={`View ${page.title} project details`} style={{ '--offset': offset, '--distance': distance, zIndex: 5 - distance, opacity: distance < 2 ? 1 : 0, pointerEvents: distance < 2 ? 'auto' : 'none' } as CSSProperties} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
          <div className="projects-showcase__image"><img src={page.image} alt="" /></div><span>{page.title}<small>{page.kind} ↗</small></span>
        </Link>
      })}
    </div>
    <div className="projects-showcase__footer">
      <div className="projects-showcase__arrows"><button type="button" onClick={() => step(-1)} aria-label="Previous featured project">←</button><button type="button" onClick={() => step(1)} aria-label="Next featured project">→</button></div>
      <div className="projects-showcase__dots" aria-label="Choose featured project">{projectPreviews.map((p, i) => <button key={p.image} type="button" aria-label={`Show ${p.title}`} aria-pressed={i === active} onClick={() => setActive(i)} />)}</div>
      <button className="projects-showcase__pause" type="button" onClick={() => setPaused(p => !p)} aria-pressed={paused}>{paused ? 'Play' : 'Pause'}</button>
    </div>
    <p className="projects-showcase__hint">Select a page to explore the project.</p>
  </section>
}
