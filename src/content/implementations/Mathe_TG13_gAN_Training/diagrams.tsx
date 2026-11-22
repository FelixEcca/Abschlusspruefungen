import { ProbabilityTree as ExamProbabilityTree } from '../Mathe_TG13_gAN_Pruefungen/diagrams'

export function StoppingTree({
  limit,
  success,
  failure,
}: {
  limit: number
  success: string
  failure: string
}) {
  return (
    <svg
      viewBox={String.raw`0 0 ${limit * 75 + 100} ${limit * 60 + 50}`}
      className="my-3 w-full"
      role="img"
      aria-label="Baumdiagramm: Nach einem Treffer endet das Experiment, nach einer Niete geht es bis zur Höchstzahl weiter"
    >
      {Array.from({ length: limit }, (_, i) => {
        const x = 25 + i * 75,
          y = 25 + i * 60
        return (
          <g key={i}>
            <path
              d={String.raw`M${x} ${y}h65 M${x} ${y}l75 60`}
              fill="none"
              stroke="#475569"
            />
            <text x={x + 72} y={y + 4} fontSize="13">
              T
            </text>
            <text x={x + 20} y={y - 6} fontSize="11">
              {plainProbability(success)}
            </text>
            <text x={x + 5} y={y + 40} fontSize="11">
              {plainProbability(failure)}
            </text>
            <text x={x + 62} y={y + 57} fontSize="13">
              N
            </text>
          </g>
        )
      })}
      <text x="8" y="20" fontSize="12">
        Start
      </text>
    </svg>
  )
}

export function Triangle({
  a = 'A',
  b = 'B',
  c = 'C',
  extra = false,
  fourth = 'P',
}: {
  a?: string
  b?: string
  c?: string
  extra?: boolean
  fourth?: string
}) {
  return (
    <svg
      viewBox="0 0 340 220"
      className="my-3 w-full"
      role="img"
      aria-label={
        extra
          ? 'Dreieck mit ergänztem Parallelogramm, schematisch'
          : 'Rechtwinkliges Dreieck, schematisch'
      }
    >
      <path
        d="M45 175H235L45 45Z"
        fill="#eff6ff"
        stroke="#334155"
        strokeWidth="2"
      />
      <path d="M45 156H64V175" fill="none" stroke="#334155" />
      <text x="24" y="196">
        {a}
      </text>
      <text x="239" y="196">
        {b}
      </text>
      <text x="31" y="35">
        {c}
      </text>
      {extra && (
        <>
          <path
            d="M45 45H235V175"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <text x="241" y="45">
            {fourth}
          </text>
        </>
      )}
      <text x="130" y="215" fontSize="11" fill="#64748b">
        nicht maßstäblich
      </text>
    </svg>
  )
}

export function Solid({
  kind,
  a,
  b,
  h,
}: {
  kind: 'prism' | 'pyramid'
  a: number
  b: number
  h: string
}) {
  return (
    <svg
      viewBox="0 0 350 255"
      className="my-3 w-full"
      role="img"
      aria-label={
        kind === 'prism'
          ? 'Dreiecksprisma mit Grundseiten und Höhe, schematisch'
          : 'Pyramide mit rechtwinkliger Dreiecksgrundfläche und Höhe, schematisch'
      }
    >
      <path
        d="M55 190H260L130 230Z"
        fill="#eff6ff"
        stroke="#334155"
        strokeWidth="2"
      />
      {kind === 'prism' ? (
        <path
          d="M55 65H260L130 105Z M55 65V190 M260 65V190 M130 105V230"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
        />
      ) : (
        <>
          <path
            d="M55 190L145 35L260 190 M145 35L130 230"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />
          <path d="M145 35V207" stroke="#2563eb" strokeDasharray="5 4" />
        </>
      )}
      <text x="8" y="130" fontSize="14">
        {h}
      </text>
      <text x="140" y="185" fontSize="14">
        {a}
      </text>
      <text x="54" y="232" fontSize="14">
        {b}
      </text>
      {kind === 'pyramid' && (
        <text x="153" y="115" fontSize="14">
          h = ?
        </text>
      )}
      <text x="205" y="251" fontSize="11" fill="#64748b">
        nicht maßstäblich
      </text>
    </svg>
  )
}

const plainProbability = (value: string) =>
  value.replace(/(-?)\\frac\{(\d+)\}\{(\d+)\}/g, '$1$2/$3')

export function ProbabilityTree({
  first,
  second,
}: {
  first: { label: string; probability: string }[]
  second: { label: string; probability: string }[][]
}) {
  const format = (branch: { label: string; probability: string }) => ({
    ...branch,
    probability: plainProbability(branch.probability),
  })
  return (
    <ExamProbabilityTree
      first={first.map(format)}
      second={second.map(row => row.map(format))}
    />
  )
}
