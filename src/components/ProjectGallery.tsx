import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import NeuralBackground from './NeuralBackground'
import { projectPreviews } from '@/data/project-previews'

export function openProjectGallery(element: HTMLElement) {
  const box = element.getBoundingClientRect()
  window.dispatchEvent(new CustomEvent('open-project-gallery', { detail: { x: box.x + box.width / 2, y: box.y + box.height / 2 } }))
}

export default function ProjectGallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  useEffect(() => {
    const show = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail
      setOrigin({ x: x / innerWidth * 100, y: y / innerHeight * 100 })
      setPaused(false); setOpen(true)
    }
    window.addEventListener('open-project-gallery', show)
    return () => window.removeEventListener('open-project-gallery', show)
  }, [])
  useEffect(() => { if (open) dialog.current?.showModal() }, [open])
  const close = () => dialog.current?.close()
  const choose = (index: number) => {
    close()
    setOpen(false)
    navigate(`/projects#project-${String(index + 1).padStart(2, '0')}`)
  }
  return open ? <dialog ref={dialog} className="project-gallery" aria-labelledby="project-gallery-title" onClose={() => setOpen(false)} style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}>
    <NeuralBackground />
    <div className="project-gallery__content">
      <header className="project-gallery__header"><div><span className="resume-kicker">Selected work · CRM & funnel design</span><h1 id="project-gallery-title">Explore my projects.</h1></div><button type="button" className="project-gallery__close" onClick={close} aria-label="Close project gallery" autoFocus>Close <span aria-hidden="true">×</span></button></header>
      <section className="project-orbit" aria-label="Rotating project carousel">
        <div className="project-orbit__controls"><p>Hover to pause · Click a page to explore</p><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button></div>
        <div className="project-orbit__stage" data-paused={paused}>
          <div className="project-orbit__halo" />
          <div className="project-orbit__tilt"><div className="project-orbit__ring">{projectPreviews.map((item, i) => <button className="project-orbit__page" type="button" key={item.image} style={{ '--angle': `${i * 60}deg` } as CSSProperties} onClick={() => choose(i)} aria-label={`Open ${item.title}`}><div className="project-orbit__image"><img src={item.image} alt="" /></div><span>{item.title}</span><small>{item.kind}</small></button>)}</div></div>
        </div>
      </section>
    </div>
  </dialog> : null
}
