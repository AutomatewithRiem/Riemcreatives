import { useId } from 'react'

/** One transparent illustration, articulated at the elbow and hips. */
export default function ToolsMascot() {
  const id = useId().replace(/:/g, '')
  const arm = 'M 900 690 L 929 610 L 915 445 L 1170 430 L 1210 640 L 1040 805 L 906 795 Z'
  const leftLeg = 'M 439 908 L 579 926 L 607 1020 L 596 1260 L 345 1260 L 353 1078 Z'
  const rightLeg = 'M 707 922 L 835 903 L 883 1015 L 1000 1120 L 1000 1265 L 707 1265 L 684 1030 Z'
  const art = <image href="/riem-robot-mascot-cyborg.png" width="1223" height="1286" />
  return (
    <div className="tools-mascot" role="img" aria-label="A smiling cartoon Riem robot, sitting and waving hello">
      <svg viewBox="0 0 1223 1286" aria-hidden="true" overflow="visible">
        <defs>
          <clipPath id={`${id}-arm`}><path d={arm} /></clipPath>
          <clipPath id={`${id}-left`}><path d={leftLeg} /></clipPath>
          <clipPath id={`${id}-right`}><path d={rightLeg} /></clipPath>
          <mask id={`${id}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="1223" height="1286">
            <rect width="1223" height="1286" fill="white" />
            <path d={arm} fill="black" /><path d={leftLeg} fill="black" /><path d={rightLeg} fill="black" />
          </mask>
        </defs>
        <g mask={`url(#${id}-body)`}>{art}</g>
        <g className="tools-mascot__leg tools-mascot__leg--left"><g clipPath={`url(#${id}-left)`}>{art}</g></g>
        <g className="tools-mascot__leg tools-mascot__leg--right"><g clipPath={`url(#${id}-right)`}>{art}</g></g>
        <g className="tools-mascot__wave"><g clipPath={`url(#${id}-arm)`}>{art}</g></g>
      </svg>
    </div>
  )
}
