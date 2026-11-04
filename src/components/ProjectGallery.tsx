import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NeuralBackground from './NeuralBackground'
import { carouselProjects } from '@/data/carousel-projects'

export function openProjectGallery(element: HTMLElement) {
  const box = element.getBoundingClientRect()
  window.dispatchEvent(new CustomEvent('open-project-gallery', { detail: { x: box.x + box.width / 2, y: box.y + box.height / 2 } }))
}

export default function ProjectGallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  useEffect(() => {
    const show = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail
      setOrigin({ x: x / innerWidth * 100, y: y / innerHeight * 100 })
      setOpen(true)
    }
    window.addEventListener('open-project-gallery', show)
    return () => window.removeEventListener('open-project-gallery', show)
  }, [])
  useEffect(() => { if (open) dialog.current?.showModal() }, [open])
  const close = () => dialog.current?.close()
  const choose = (href: string) => {
    close()
    setOpen(false)
    navigate(href)
  }
  return open ? <dialog ref={dialog} className="project-gallery" aria-labelledby="project-gallery-title" onClose={() => setOpen(false)} style={{ transformOrigin: `${origin.x}% ${origin.y}%` }}>
    <NeuralBackground />
    <div className="project-gallery__content">
      <header className="project-gallery__header"><div><span className="resume-kicker">{carouselProjects.length} individual items · CRM, AI agents & funnel design</span><h1 id="project-gallery-title">Explore my projects.</h1></div><button type="button" className="project-gallery__close" onClick={close} aria-label="Close project gallery" autoFocus>Close <span aria-hidden="true">×</span></button></header>
      <section className="all-projects" aria-label="All individual projects">
        <p>Select any project below. Every item is shown individually.</p>
        <ul className="all-projects__grid">{carouselProjects.map(item => <li key={item.href}><button className="all-projects__card" type="button" onClick={() => choose(item.href)} aria-label={`Open ${item.title}`}>
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
          <span className="all-projects__kind">{item.kind}</span><h3>{item.title}</h3><span className="all-projects__action">View project ↗</span>
        </button></li>)}</ul>
      </section>
    </div>
  </dialog> : null
}
