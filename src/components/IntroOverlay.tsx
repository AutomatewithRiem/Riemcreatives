import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { motionReduced } from '@/lib/a11y'
import { ArrowUpRight, CheckCircle, EnvelopeSimple, FlowArrow, CalendarCheck, User, Clock } from '@/components/slab'

// A browser-only illustration of the dental consultation portfolio project.
// No forms, requests, workflow executions or customer data are involved.
const STEPS = [
  { title: 'Inquiry received', detail: 'Lead capture form', tool: 'HighLevel', logo: '/icons/gohighlevel.png', Icon: User },
  { title: 'Create or reuse', detail: 'Opportunity + Contact ID', tool: 'HighLevel CRM', logo: '/icons/gohighlevel.png', Icon: FlowArrow },
  { title: 'Follow up', detail: 'Email + booking link', tool: 'HighLevel', logo: '/icons/gohighlevel.png', Icon: EnvelopeSimple },
  { title: 'Customer books', detail: 'Confirmed consultation', tool: 'Calendar', logo: '/icons/gohighlevel.png', Icon: CalendarCheck },
  { title: 'Stop reminders', detail: 'Protect the booked lead', tool: 'HighLevel', logo: '/icons/gohighlevel.png', Icon: Clock },
  { title: 'Update tracker', detail: 'Match by Contact ID', tool: 'Zapier → Sheets', logo: '/icons/googleworkspace.svg', Icon: FlowArrow },
  { title: 'Notify the team', detail: 'Booking handoff', tool: 'Zapier → Slack', logo: '/icons/slack.svg', Icon: EnvelopeSimple },
] as const
const EDGES = [[0,1],[1,2],[2,3],[3,4],[3,5],[3,6]] as const
const TIMES = [0,700,1400,2600,3400,3800,4200]
const shouldRun = typeof window !== 'undefined' && window.location.pathname === '/' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !motionReduced()
if (shouldRun) document.documentElement.classList.add('is-intro', 'is-intro-head')
const release = () => document.documentElement.classList.remove('is-intro', 'is-intro-head')

export default function IntroOverlay() {
  const [gone, setGone] = useState(!shouldRun)
  const [step, setStep] = useState(-1)
  const [leaving, setLeaving] = useState(false)
  const [paths, setPaths] = useState<string[]>([])
  const graph = useRef<HTMLDivElement>(null)
  const finish = () => { release(); setGone(true) }

  useLayoutEffect(() => {
    if (gone) return
    const el = graph.current
    if (!el) return
    const measure = () => {
      const box = el.getBoundingClientRect()
      const nodes = [...el.querySelectorAll<HTMLElement>('.intro-flow__node')].map(n => n.getBoundingClientRect())
      setPaths(EDGES.map(([from,to]) => {
        const a = nodes[from], b = nodes[to]
        const sameRow = Math.abs(a.top-b.top)<5
        if (sameRow) {
          const x1=a.right-box.left, x2=b.left-box.left, y=a.top+a.height/2-box.top
          return `M${x1},${y} L${x2},${y}`
        }
        const x1=a.left+a.width/2-box.left, y1=a.bottom-box.top
        const x2=b.left+b.width/2-box.left, y2=b.top-box.top
        if (window.innerWidth<=650) {
          const lane=box.width+8
          return `M${a.right-box.left},${a.top+a.height/2-box.top} H${lane} V${y2-11} H${x2} V${y2}`
        }
        const mid=(y1+y2)/2
        return `M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`
      }))
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()
    return () => ro.disconnect()
  }, [gone])

  useEffect(() => {
    if (!shouldRun) { release(); return }
    document.documentElement.classList.add('is-intro', 'is-intro-head')
    const timers = TIMES.map((time,i) => window.setTimeout(()=>setStep(i),time+250))
    timers.push(window.setTimeout(()=>setLeaving(true),5200))
    timers.push(window.setTimeout(()=>{ release(); setGone(true) },5700))
    const onKey = (e: KeyboardEvent) => { if (e.key==='Escape') { release(); setGone(true) } }
    window.addEventListener('keydown',onKey)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('keydown',onKey); release() }
  }, [])

  if (gone) return null
  const status = step<0 ? 'A new inquiry starts the journey.' : step<2 ? 'Capture once. Keep the CRM connected.' : step===2 ? 'Follow-up runs. The customer chooses when to book.' : step===3 ? 'Booking confirmed. Start the handoff.' : step<6 ? 'Stop the reminders. Update the connected tools.' : 'Routine work handled. More room to focus on growth.'
  return <div className={`workflow-intro${leaving?' is-leaving':''}`} role="dialog" aria-modal="true" aria-label="Automation project illustration">
    <div className="intro-flow__top"><span>RIEM LUMAPAY / AUTOMATION IN MOTION</span><button autoFocus onClick={finish}>Skip intro <ArrowUpRight size={14}/></button></div>
    <div className="intro-flow__heading"><h1>{profile.displayName.line1}<br/>{profile.displayName.line2}</h1><p>A consultation journey that takes the repetitive work off your plate.</p></div>
    <div className="intro-flow__graph" ref={graph}>
      <svg className="intro-flow__edges" aria-hidden="true">{paths.map((d,i)=><g key={i}><path d={d}/><path d={d} pathLength={1} className={`intro-flow__signal${step>=EDGES[i][1]?' is-on':''}`}/></g>)}</svg>
      {STEPS.map(({title,detail,tool,logo,Icon},i)=><div key={title} className={`intro-flow__node intro-flow__node--${i}${step>=i?' is-done':''}${step===i?' is-current':''}`}>
        <span className="intro-flow__node-top"><span className="intro-flow__app"><img src={logo} alt=""/></span><span>{tool}</span><CheckCircle className="intro-flow__check" weight="fill" size={17}/></span>
        <span className="intro-flow__node-title"><Icon size={18} weight="duotone"/>{title}</span><span className="intro-flow__detail">{detail}</span>
      </div>)}
    </div>
    <div className="intro-flow__bottom"><p role="status"><span className="intro-flow__pulse"/>{status}</p><span>Portfolio demo · Condensed timing</span></div>
  </div>
}
