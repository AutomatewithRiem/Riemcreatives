import type { CSSProperties } from 'react'
import { projectPreviews } from '@/data/project-previews'

/** Real portfolio previews, presented as a drop-and-rise sequence on an obsidian circuit surface. */
export default function ProjectPageStack() {
  return <div className="project-stack" aria-hidden="true">
    <div className="project-stack__aura" />
    <div className="project-stack__ground">
      <svg className="project-stack__circuits" viewBox="0 0 320 220" fill="none">
        <defs><pattern id="chip-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="currentColor" strokeWidth=".5"/></pattern></defs>
        <path fill="url(#chip-grid)" d="M0 0H320V220H0z"/>
        <g stroke="currentColor" strokeWidth="1.2"><path d="M0 40H65L95 70H130M0 150H70L105 115H130M320 50H252L220 82H190M320 180H250L220 150H190M100 0V30L145 75M215 220V180L175 140"/><rect x="128" y="75" width="64" height="64" rx="5"/><rect x="137" y="84" width="46" height="46" rx="2"/></g>
        <path className="project-stack__signal" d="M0 40H65L95 70H130M320 50H252L220 82H190M0 150H70L105 115H130M320 180H250L220 150H190" stroke="#d6adff" strokeWidth="2" strokeDasharray="4 90"/>
        <g className="project-stack__nodes" fill="currentColor">{[[65,40],[70,150],[252,50],[250,180],[100,30],[215,180]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="2.5"/>)}</g>
      </svg>
      <span className="project-stack__impact" />
    </div>
    <div className="project-stack__scene">
      {projectPreviews.map((page, i) => <div className={`project-stack__page${i < 2 ? ' project-stack__page--crm' : ''}`} key={page.image} style={{ '--page': i, '--delay': `${i * 5 - projectPreviews.length * 5}s` } as CSSProperties}>
        <div className="project-stack__chrome"><span>{page.kind}</span></div>
        <div className="project-stack__viewport"><img src={page.image} alt="" loading="lazy" decoding="async" /></div>
        <div className="project-stack__caption"><span>{page.title}</span><small>{String(i+1).padStart(2,'0')} / {String(projectPreviews.length).padStart(2, '0')}</small></div>
      </div>)}
    </div>
  </div>
}
