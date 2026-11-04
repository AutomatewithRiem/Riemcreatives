import { Link } from 'react-router-dom'
import { carouselProjects } from '@/data/carousel-projects'

/** Every project remains visible in the page flow, with no carousel or hidden slides. */
export default function ProjectsShowcase() {
  return <section className="all-projects" aria-labelledby="all-projects-title">
    <header className="all-projects__head"><h2 id="all-projects-title">All projects</h2><p>{carouselProjects.length} individual items. Select any project to explore its details.</p></header>
    <ul className="all-projects__grid">{carouselProjects.map(item => <li key={item.href}><Link className="all-projects__card" to={item.href}>
      <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
      <span className="all-projects__kind">{item.kind}</span><h3>{item.title}</h3><span className="all-projects__action">View project ↗</span>
    </Link></li>)}</ul>
  </section>
}
