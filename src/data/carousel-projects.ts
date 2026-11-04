import workflows from './workflow-projects.json'
import { projectPreviews } from './project-previews'

// Keep the compact Home animation unchanged; both interactive carousels show the full collection.
export const carouselProjects = [
  ...workflows.map(p => ({ title: p.title, kind: p.platforms.join(' + '), image: p.preview, href: `/projects#workflow-project-${p.slug}` })),
  ...projectPreviews.map((p, i) => ({ ...p, href: `/projects#project-${String(i + 1).padStart(2, '0')}` })),
]
export const carouselLayers = Array.from({ length: Math.ceil(carouselProjects.length / 7) }, (_, i) => carouselProjects.slice(i * 7, i * 7 + 7))
