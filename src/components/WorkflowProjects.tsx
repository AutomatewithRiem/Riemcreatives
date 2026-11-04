import { useEffect, useRef, useState } from 'react'
import projects from '@/data/workflow-projects.json'

const filters = ['All', 'HighLevel', 'n8n', 'Zapier', 'Make'] as const

export default function WorkflowProjects() {
  const [filter, setFilter] = useState<string>('All')
  const [selection, setSelection] = useState<{ slug: string; index: number } | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const project = projects.find(p => p.slug === selection?.slug)
  const image = project?.images[selection?.index ?? 0]
  const visible = projects.filter(p => filter === 'All' || p.platforms.includes(filter))

  useEffect(() => {
    if (selection && !dialog.current?.open) dialog.current?.showModal()
  }, [selection])
  useEffect(() => {
    viewport.current?.scrollTo(0, 0)
  }, [selection, zoomed])

  const open = (slug: string, index = 0) => { setZoomed(false); setSelection({ slug, index }) }
  const step = (direction: number) => {
    if (!project || !selection) return
    open(project.slug, (selection.index + direction + project.images.length) % project.images.length)
  }
  const close = () => dialog.current?.close()

  return <section className="workflow-library" id="workflow-projects" aria-labelledby="workflow-library-title">
    <header className="workflow-library__head">
      <h2 id="workflow-library-title">Workflow projects</h2>
      <p>Explore AI agents, CRM journeys and connected operations. Open a project to see every workflow screenshot.</p>
    </header>
    <div className="workflow-library__filters" role="group" aria-label="Filter workflow projects by platform">
      {filters.map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}<span>{value === 'All' ? projects.length : projects.filter(p => p.platforms.includes(value)).length}</span></button>)}
    </div>
    <p className="workflow-library__count" role="status">{visible.length} projects · {visible.reduce((n, p) => n + p.images.length, 0)} images</p>
    <ul className="workflow-library__grid">
      {visible.map(p => <li key={p.slug}>
        <button className="workflow-project__open" type="button" onClick={() => open(p.slug)} aria-haspopup="dialog" aria-label={`View ${p.title}: ${p.images.length} images`}>
          <img src={p.preview} alt={`${p.title} project cover`} width="720" height="720" loading="lazy" decoding="async" />
          <span className="workflow-project__meta">{p.platforms.join(' + ')}<span>{p.images.length} images ↗</span></span>
          <h3>{p.title}</h3>
        </button>
        <p>{p.summary}</p>
      </li>)}
    </ul>
    <dialog ref={dialog} className="workflow-viewer" aria-labelledby="workflow-viewer-title" onClose={() => { setSelection(null); setZoomed(false) }} onClick={event => { if (event.target === event.currentTarget) close() }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
    }}>
      {project && image && selection && <div className="workflow-viewer__inner">
        <header className="workflow-viewer__head"><div><h2 id="workflow-viewer-title">{project.title}</h2><p>{image.caption} · {selection.index + 1} of {project.images.length}</p></div><button type="button" onClick={close} autoFocus aria-label="Close workflow viewer">Close ×</button></header>
        <div className={`workflow-viewer__image${zoomed ? ' is-zoomed' : ''}`} ref={viewport}><img key={image.src} src={image.src} alt={`${project.title}: ${image.caption}`} /></div>
        <div className="workflow-viewer__controls"><button type="button" onClick={() => step(-1)} aria-label="Previous workflow image">← Previous</button><button type="button" aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? 'Fit image' : 'Zoom to full size'}</button><button type="button" onClick={() => step(1)} aria-label="Next workflow image">Next →</button><a href={image.src} target="_blank" rel="noopener noreferrer">Open original ↗</a></div>
        <div className="workflow-viewer__thumbs" role="group" aria-label="Choose workflow image">{project.images.map((item, i) => <button key={item.src} type="button" onClick={() => open(project.slug, i)} aria-label={item.caption} aria-pressed={selection.index === i}><img src={i === 0 ? project.preview : item.src} alt="" loading="lazy" /><span>{item.caption}</span></button>)}</div>
      </div>}
    </dialog>
  </section>
}
