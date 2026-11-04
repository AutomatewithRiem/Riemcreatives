import { useEffect, useRef, useState } from 'react'
import projects from '@/data/workflow-projects.json'

const filters = ['All', 'HighLevel', 'n8n', 'Zapier', 'Make'] as const

export default function WorkflowProjects() {
  const [filter, setFilter] = useState<string>('All')
  const [selection, setSelection] = useState<string | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const selected = projects.find(p => p.slug === selection)
  const visible = projects.filter(p => filter === 'All' || p.platforms.includes(filter))

  useEffect(() => {
    if (selection && !dialog.current?.open) dialog.current?.showModal()
  }, [selection])
  useEffect(() => { viewport.current?.scrollTo(0, 0) }, [selection, zoomed])

  const open = (slug: string) => { setZoomed(false); setSelection(slug) }
  const step = (direction: number) => {
    const index = projects.findIndex(p => p.slug === selection)
    open(projects[(index + direction + projects.length) % projects.length].slug)
  }
  const close = () => dialog.current?.close()

  return <section className="workflow-library" id="workflow-projects" aria-labelledby="workflow-library-title">
    <header className="workflow-library__head">
      <h2 id="workflow-library-title">Workflow projects</h2>
      <p>Every workflow image is shown individually. Select any image to view it full size.</p>
    </header>
    <div className="workflow-library__filters" role="group" aria-label="Filter workflow projects by platform">
      {filters.map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}<span>{value === 'All' ? projects.length : projects.filter(p => p.platforms.includes(value)).length}</span></button>)}
    </div>
    <p className="workflow-library__count" role="status">{visible.length} individual images</p>
    <ul className="workflow-library__grid">
      {visible.map(p => <li key={p.slug} tabIndex={-1} id={`workflow-project-${p.slug}`}>
        <button className="workflow-project__open" type="button" onClick={() => open(p.slug)} aria-haspopup="dialog" aria-label={`View ${p.title} full size`}>
          <img src={p.preview} alt={p.title} loading="lazy" decoding="async" />
          <span className="workflow-project__meta">{p.platforms.join(' + ')}<span>View image ↗</span></span>
          <h3>{p.title}</h3>
        </button>
        <p>{p.summary}</p>
      </li>)}
    </ul>
    <dialog ref={dialog} className="workflow-viewer" aria-labelledby="workflow-viewer-title" onClose={() => { setSelection(null); setZoomed(false) }} onClick={event => { if (event.target === event.currentTarget) close() }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
    }}>
      {selected && <div className="workflow-viewer__inner">
        <header className="workflow-viewer__head"><div><h2 id="workflow-viewer-title">{selected.title}</h2><p>{selected.platforms.join(' + ')}</p></div><button type="button" onClick={close} autoFocus aria-label="Close workflow viewer">Close ×</button></header>
        <div className={`workflow-viewer__image${zoomed ? ' is-zoomed' : ''}`} ref={viewport}><img key={selected.image} src={selected.image} alt={selected.title} /></div>
        <div className="workflow-viewer__controls"><button type="button" onClick={() => step(-1)} aria-label="Previous workflow image">← Previous</button><button type="button" aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? 'Fit image' : 'Zoom to full size'}</button><button type="button" onClick={() => step(1)} aria-label="Next workflow image">Next →</button><a href={selected.image} target="_blank" rel="noopener noreferrer">Open original ↗</a></div>
      </div>}
    </dialog>
  </section>
}
