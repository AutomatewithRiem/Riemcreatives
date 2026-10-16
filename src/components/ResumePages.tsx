import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, CheckCircle } from '@/components/slab'
import { profile } from '@/data/profile'
import { projectPreviews } from '@/data/project-previews'
import ProjectsShowcase from './ProjectsShowcase'

const PORTFOLIO = 'https://drive.google.com/drive/folders/17AuRvto-oqrAgaaXED7a20bb4FQP2ToT?usp=sharing'
const RESUME = '/riem-lumapay-resume.pdf'

function Page({ eyebrow, title, intro, children, feature }: { eyebrow: string; title: string; intro: string; children: ReactNode; feature?: ReactNode }) {
  return <section className={`pgrid resume-page${feature ? ' resume-page--projects' : ''}`} aria-label={eyebrow}>
    <header className="pgrid__head"><span className="pgrid__eyebrow">{eyebrow}</span><h1 className="pgrid__title">{title}</h1><p className="pgrid__lede">{intro}</p></header>
    {feature}
    <div className="home__glass resume-sheet">{children}</div>
  </section>
}
function Action({ href, children }: { href: string; children: ReactNode }) {
  return <a className="resume-action" href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} weight="bold" /></a>
}
const projects = [
  { n: '01', name: 'Dental Implant Lead-to-Consultation Automation', stack: 'HighLevel · Zapier · Google Sheets · Slack', image: '/dental-flow.svg', summary: 'A connected lead journey from first inquiry to consultation booking.', details: [
    'Mapped a three-stage lead journey with inquiry intake, email follow-up, consultation booking and Lost status handling.',
    'Reused opportunities for returning Lost leads, protected booked leads and removed them from reminder workflows after booking.',
    'Connected three webhook-driven Zaps to create or reuse tracker rows by Contact ID, validate appointment data and send Slack booking alerts.',
    'Completed a live inquiry-to-booking test: one opportunity, one tracker row, email receipt, booking updates, a Slack alert and stopped reminders. Documented Spam placement and other production limitations.',
  ] },
  { n: '02', name: 'Car Rental CRM & Automation System', stack: 'HighLevel · Calendars · Custom fields · Workflows', image: '/rental-flow.svg', summary: 'A rental process with clear stages and human checkpoints.', details: [
    'Mapped booking request, confirmation, active rental, return inspection, completion and Lost / Cancelled handling.',
    'Built a six-stage opportunity pipeline, a rental calendar for multiple vehicles, custom rental fields and six purpose-built workflows.',
    'Automated booking messages, confirmations, timed return reminders and completion follow-up, with human checkpoints for deposits and vehicle inspection.',
  ] },
]
export function Projects() {
  const { hash } = useLocation()
  useEffect(() => {
    if (!/^#project-0[1-6]$/.test(hash)) return
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
      target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      target?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [hash])
  return <Page feature={<ProjectsShowcase />} eyebrow="Selected projects" title="Ideas turned into connected systems." intro="Explore my work in HighLevel CRM, funnel design, and workflow automation.">
    {projects.map(p => <article className="resume-project" id={`project-${p.n}`} tabIndex={-1} key={p.n}>
      <div className="resume-project__visual"><span className="resume-index">PROJECT {p.n}</span><img src={p.image} alt={`${p.name}: illustrative process overview`} /></div>
      <div className="resume-project__copy"><span className="resume-kicker">{p.stack}</span><h2>{p.name}</h2><p>{p.summary}</p><ul className="resume-list">{p.details.map(d=><li key={d}><CheckCircle size={18} aria-hidden="true" /><span>{d}</span></li>)}</ul><Action href={PORTFOLIO}>View project portfolio</Action></div>
    </article>)}
    <section className="funnel-gallery" aria-label="Funnel designs"><header><span className="resume-kicker">Funnel design</span><h2>Landing pages built to guide the next step.</h2></header><div className="funnel-gallery__grid">{projectPreviews.slice(2).map((p, i) => <a id={`project-0${i + 3}`} href={p.full} target="_blank" rel="noopener noreferrer" key={p.image}><img src={p.image} alt={`${p.title} landing page preview`} loading="lazy"/><span>{p.title}<ArrowUpRight size={16}/></span><small>Open full page</small></a>)}</div></section>
    <p className="resume-footnote">Process illustrations summarize the projects described in my resume.</p>
  </Page>
}
export function Showcase() {
  const p = projects[0]
  return <Page eyebrow="Project showcase" title="A connected consultation journey." intro="Dental implant lead management, built with HighLevel and three webhook-driven Zaps.">
    <img className="resume-showcase" src={p.image} alt="Inquiry to email follow-up to consultation booking" />
    <div className="resume-columns"><div><span className="resume-kicker">The build</span><h2>One lead journey. Connected tools.</h2><p>Inquiry intake and follow-up live in HighLevel. Contact ID links the CRM to a Google Sheets tracker. Appointment validation and Slack booking alerts connect the handoff.</p><Action href={PORTFOLIO}>Explore the project files</Action></div><div><span className="resume-kicker">Tested outcome</span><h2>Booking updates, reminders stopped.</h2><ul className="resume-list">{p.details.slice(1).map(d=><li key={d}><CheckCircle size={18} aria-hidden="true"/><span>{d}</span></li>)}</ul></div></div>
  </Page>
}
const skills = [
  ['HighLevel CRM', 'CRM and sub-account setup, pipelines, opportunities, forms, surveys, custom fields, calendars, email follow-up, conditional logic and troubleshooting.'],
  ['App integrations', 'Webhooks, API-key connections, MCP tools and workflow configuration with Zapier, Make and n8n. Google Sheets synchronization and Slack alerts.'],
  ['AI-assisted workflows', 'Hands-on Zapier AI agent projects for lead follow-up, overdue invoice reminders, lead research and content repurposing.'],
  ['Funnels & websites', 'HighLevel funnels, landing pages, lead capture and calendar integration. AI-assisted website building with Lovable and HighLevel AI Website Builder.'],
  ['A2P setup assistance', 'Setup assistance within HighLevel alongside CRM, automation and website services.'],
  ['Process design & documentation', 'Business process mapping, pain-point identification, CRM architecture, workflow planning, human checkpoints and system documentation.'],
]
export function Services() {
  return <Page eyebrow="Services" title="Practical systems for everyday work." intro="CRM, automation, app integration, funnels and websites, grounded in your business process.">
    <div className="resume-method"><span className="resume-kicker">How I approach a build</span><div><p><b>01 / Map</b><span>Understand the process and identify the pain points.</span></p><p><b>02 / Connect</b><span>Build the CRM, workflows and app integrations.</span></p><p><b>03 / Check</b><span>Test the journey, document it and keep human checkpoints.</span></p></div></div>
    <div className="resume-skills">{skills.map(([title,desc],i)=><article key={title}><span className="resume-index">0{i+1}</span><div><h2>{title}</h2><p>{desc}</p></div></article>)}</div>
    <div className="resume-footer"><p>Have a process you want to simplify?</p><Link className="resume-action" to="/contact">Let’s talk<ArrowUpRight size={16}/></Link></div>
  </Page>
}
export function About() {
  return <Page eyebrow="About" title="Hi, I’m Riem." intro="HighLevel CRM & AI Automation Specialist · Cebu, Philippines">
    <div className="resume-about"><div><span className="resume-kicker">Riemeiereyoung V. Lumapay</span><h2>I connect the tools.<br/><span>You keep work moving.</span></h2><p>I build CRM pipelines, email follow-up, booking workflows, funnels and websites. I connect business applications through Zapier, Make, n8n, webhooks, API-key integrations and MCP tools.</p><p>Three years in Amazon product research and virtual assistance give me practical knowledge of ecommerce operations and business processes. I use Codex and Claude Code in VS Code to support coding, prototyping and troubleshooting.</p><div className="resume-facts"><p><b>1 year</b><span>Funnel Design</span></p><p><b>6 months</b><span>HighLevel CRM, Automation & AI Automation</span></p><p><b>3 years</b><span>Amazon research & virtual assistance</span></p></div><div className="resume-links"><Action href={RESUME}>Download resume</Action><Action href={PORTFOLIO}>Project portfolio</Action></div></div><img className="resume-portrait" src={profile.avatarSrc} alt={profile.name} /></div>
  </Page>
}
export function Background() {
  return <Page eyebrow="Experience & references" title="Built on practical operations." intro="Hands-on project work and three years supporting ecommerce businesses.">
    <div className="resume-timeline"><article><span className="resume-kicker">Hands-on project experience · 1 year</span><h2>Funnel Design</h2><p>Sales funnels and landing pages with lead capture forms and calendar integration.</p></article><article><span className="resume-kicker">Hands-on project experience · 6 months</span><h2>HighLevel CRM, Automation & AI Automation</h2><p>CRM systems, pipelines, calendars, forms and email automation for lead and appointment management. App integration through webhooks, API-key connections and MCP-enabled tools, plus AI automation for lead follow-up, invoice reminders, research and content tasks.</p></article><article><span className="resume-kicker">Private client work · 3 years</span><h2>Amazon Product Researcher / Virtual Assistant</h2><p>Product and market research to identify opportunities and support business decisions. Daily ecommerce support, remote assistance and practical process improvement.</p></article></div>
    <div className="resume-reference"><span className="resume-kicker">Professional references</span><h2>Ryan Otwell</h2><p>Professional reference for my first Amazon Product Researcher / Virtual Assistant role: one year of experience.</p><h2>Sigal Lechno</h2><p>Professional reference for Amazon product research and virtual assistance.</p><a className="resume-action" href="mailto:slechno21@gmail.com">slechno21@gmail.com<ArrowUpRight size={16}/></a><h2>Roger</h2><p>Professional reference for Amazon product research and virtual assistance.</p><a className="resume-action" href="mailto:rmuscarello@marketfinds365.com">rmuscarello@marketfinds365.com<ArrowUpRight size={16}/></a><div className="resume-links"><Action href={RESUME}>View resume & references</Action></div></div>
  </Page>
}
