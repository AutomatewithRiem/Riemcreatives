import { Link } from 'react-router-dom'
import { CaretRight, Stack, Coffee } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'
import ProjectPageStack from './ProjectPageStack'
import { openProjectGallery } from './ProjectGallery'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, verified mark, handle and the QuickMenu
 *                (theme + accessibility) - the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats), each named by a glyph so
 *                it reads at a glance
 *   HomeExplore  one shelf card per rail view in a snap row, then the first
 *                testimonial as a video stage
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
        </span>
        <span className="hprofile__handle">
          {profile.handle}
        </span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Projects', to: '/projects', title: 'Connected lead journeys', desc: 'Explore the details.', img: '/dental-flow.svg' },
  { n: '02', label: 'Services', to: '/services', title: 'CRM, funnels & automation', desc: 'Explore the details.', Icon: Stack },
  { n: '03', label: 'Showcase', to: '/showcase', title: 'Dental consultation flow', desc: 'Explore the details.', Icon: Coffee, accent: true },
  { n: '04', label: 'Background', to: '/testimonials', title: 'Ecommerce & operations', desc: 'Explore the details.', img: profile.avatarSrc },
  { n: '05', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}.`, desc: 'Building practical systems from Cebu.', img: profile.avatarSrc },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} aria-haspopup={t.to === '/projects' ? 'dialog' : undefined} onClick={event => { if (t.to === '/projects') { event.preventDefault(); openProjectGallery(event.currentTarget) } }} className={`htile${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              {t.to === '/projects' ? (<span className="htile__media htile__media--stack"><ProjectPageStack /></span>) : 'img' in t ? (
                <span className="htile__media"><img className="htile__img" src={t.img} alt="" loading="lazy" /></span>
              ) : (
                <span className="htile__media htile__glyph"><t.Icon size={52} weight="duotone" aria-hidden="true" /></span>
              )}
              <span className="htile__body">
                <span className="htile__n">{t.n} {t.label}</span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* A header that links carries its chevron on the title itself. */}
      <div className="hsec">
        <h2 className="hsec__title">
          <Link to="/testimonials" className="hsec__link">
            Experience & references
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </h2>
      </div>
      <Link to="/testimonials" className="hproof" aria-label="Read my professional background and references.">
        <span className="hproof__stage">
          <img src={profile.avatarSrc} alt="" loading="lazy" />


        </span>
        <span className="hproof__copy">
          <span className="hproof__title">Three years in Amazon research & virtual assistance.</span>
          <span className="hproof__meta">Private client work · Professional references</span>
        </span>
      </Link>
    </>
  )
}
