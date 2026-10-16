import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
export default function LegalPage() {
 return <main className="legal-page"><div className="legal-page__card"><Link className="legal-page__back" to="/">← Back to home</Link><h1 className="legal-page__title">Portfolio information</h1><p className="legal-page__updated">Updated October 16, 2026</p><div className="legal-page__body"><h2>About this site</h2><p>This portfolio presents my experience and selected projects. Process illustrations are summaries, rather than screenshots of deployed systems.</p>
<h2>Projects and services</h2><p>Past project results describe those projects and are not a guarantee for a future engagement. Scope, timing, fees and delivery arrangements are agreed separately before work begins.</p>
<h2>Credits</h2><p>This site is adapted from the brewed-ops portfolio template. Its license and source attribution are retained in the project. Tool logos belong to their respective owners.</p><h2>Contact</h2><p><a href={`mailto:${profile.email}`}>{profile.email}</a></p></div></div></main>
}
