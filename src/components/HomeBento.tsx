import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  Stack,
  Quotes,
  FunnelSimple,
  Gear,
  AddressBook,
  Globe,
  AppWindow,
} from '@/components/slab'

import { aiStack, type StackNode } from '@/data/ai-stack'
import ProjectPageStack from './ProjectPageStack'
import { openProjectGallery } from './ProjectGallery'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Nothing here invents a fact - the funnels, the tools, the clients
 * and the credentials are the same records the views render in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */


const OFFERS = [
  { Icon: FunnelSimple, title: 'HighLevel CRM', note: 'Pipelines & lead management' },
  { Icon: Gear, title: 'Workflow automation', note: 'Follow-up & booking journeys' },
  { Icon: AddressBook, title: 'App integrations', note: 'Zapier · Make · n8n' },
  { Icon: Globe, title: 'Funnels & websites', note: 'Lead capture & calendars' },
  { Icon: AppWindow, title: 'A2P assistance', note: 'HighLevel setup support' },
] as const

const CLIENTS = [
  { name: 'Funnel Design', role: '1 year of experience', work: 'Funnels · Landing pages · Lead capture' },
  { name: 'HighLevel CRM & Automation', role: '6 months of experience', work: 'CRM systems · Workflows · AI automation' },
  { name: 'Amazon product research', role: 'Private client work', work: 'Research · Ecommerce · Operations' },
  { name: 'Virtual assistance', role: 'Three years of experience', work: 'Remote support · Business processes' },
  { name: 'Ryan Otwell', role: 'Professional reference', work: 'First Amazon / VA role · One year' },
  { name: 'Sigal Lechno', role: 'Professional reference', work: 'slechno21@gmail.com' },
  { name: 'Roger', role: 'Professional reference', work: 'rmuscarello@marketfinds365.com' },
]


/** The AI systems as a flat list: every leaf of the Projects tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const AI_BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: real pages unfold through a three-dimensional stack. */}
      <button type="button" onClick={event => openProjectGallery(event.currentTarget)} aria-haspopup="dialog" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="CRM journeys & funnels, brought together." />
        <div className="bento__media"><ProjectPageStack /></div>
      </button>

      {/* About: one human-and-technology portrait. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="I turn everyday tasks into connected workflows." />
        <div className="bento__media bento__portrait" aria-hidden="true">
          <img src="/riem-portrait-tech.png" alt="" loading="lazy" decoding="async" />
        </div>
      </Link>

      {/* AI builds: the systems from the Projects tree, two chip rows
          scrolling against each other. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="Connected Systems" desc="Workflows, integrations and AI tools." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                    <n.Icon size={15} weight="duotone" />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the badge that matters, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Experience" desc="Funnel design, HighLevel CRM & AI automation." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img src="/experience-mark.svg" alt="" width={72} height={72} />
          </span>
          <span className="bento__badge-tag">
            <Medal size={14} weight="fill" />
            1 year in funnel design
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Practical systems for your business." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials: client cards drifting up a clipped column. */}
      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Background" desc="My approach to HighLevel CRM & automation." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <Quotes size={14} weight="fill" />
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
