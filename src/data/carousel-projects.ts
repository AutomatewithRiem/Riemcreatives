import workflows from './workflow-projects.json'
import { projectPreviews } from './project-previews'

// Existing CRM and integration case studies lead the complete, individually visible collection.
export const carouselProjects = [
  ...[0, 1, 6, 7, 2, 3, 4, 5].map(i => ({ ...projectPreviews[i], title: i === 0 ? 'Dental CRM & integrations' : i === 1 ? 'Car Rental CRM & automation' : projectPreviews[i].title, href: `/projects#project-${String(i + 1).padStart(2, '0')}` })),
  ...workflows.map(p => ({ title: p.title, kind: p.platforms.join(' + '), image: p.preview, href: `/projects#workflow-project-${p.slug}` })),
]
