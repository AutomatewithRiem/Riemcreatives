import ProjectSpinner from './ProjectSpinner'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { carouselProjects } from '@/data/carousel-projects'

/** Spinning preview plus a permanently visible grid of every individual item. */
export default function ProjectsShowcase() {
  const navigate = useNavigate()
  return <><ProjectSpinner onChoose={href => navigate(href)} /><section className="all-projects" aria-labelledby="all-projects-title">
    <header className="all-projects__head"><h2 id="all-projects-title">All projects</h2><p>{carouselProjects.length} individual items. Select any project to explore its details.</p></header>
    <ul className="all-projects__grid">{carouselProjects.map(item => <li key={item.href}><Link className="all-projects__card" to={item.href}>
      <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
      <span className="all-projects__kind">{item.kind}</span><h3>{item.title}</h3><span className="all-projects__action">View project ↗</span>
    </Link></li>)}</ul>
  </section></>
}
