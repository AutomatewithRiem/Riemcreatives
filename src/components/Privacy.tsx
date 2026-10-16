import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
export default function LegalPage() {
 return <main className="legal-page"><div className="legal-page__card"><Link className="legal-page__back" to="/">← Back to home</Link><h1 className="legal-page__title">Privacy notice</h1><p className="legal-page__updated">Updated October 16, 2026</p><div className="legal-page__body"><h2>About this portfolio</h2><p>This site presents the work and experience of Riemeiereyoung V. Lumapay.</p>
<h2>Contacting me</h2><p>The contact form prepares a draft in your own email app. It does not automatically send a message or store your form submission on a site server. If you choose to send the draft, your email provider handles delivery.</p>
<h2>Browser preferences</h2><p>This site stores theme, accessibility and performance preferences in your browser. You can remove these through your browser settings.</p>
<h2>External links</h2><p>Project files open on Google Drive. External services have their own privacy practices. Email me with questions about information you send directly.</p><h2>Contact</h2><p><a href={`mailto:${profile.email}`}>{profile.email}</a></p></div></div></main>
}
