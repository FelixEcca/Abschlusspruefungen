// exercise9014.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'ausflug' | 'klassenfahrt' | 'projektwoche' | 'schulfest'

interface DATA {
  kontext: Kontext
  total: number
  fleisch: number
  vegetarisch: number
  keinFisch: number
  vegan: number
  gesuchtIndex: number
}

function sectorPath(
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number,
) {
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  const large = end - start > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
}

function getContext(k: Kontext) {
  if (k === 'klassenfahrt') return 'Sie planen das Essen für die Klassenfahrt.'
  if (k === 'projektwoche') return 'Sie planen das Essen für die Projektwoche.'
  if (k === 'schulfest') return 'Sie planen das Essen für das Schulfest.'
  return 'Sie planen das Essen für den Ausflug.'
}

export const exercise9014: Exercise<DATA> = {
  title: 'Teil 2: Diagramm',
  source: '2025',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'ausflug',
      'klassenfahrt',
      'projektwoche',
      'schulfest',
    ])
    const total = rng.randomItemFromArray([40, 60, 80, 100, 120])
    const fleisch = rng.randomItemFromArray([60, 65, 70, 75])
    const vegetarisch = rng.randomItemFromArray([10, 12.5, 15, 20])
    const keinFisch = rng.randomItemFromArray([7.5, 10, 12.5])
    const vegan = 100 - fleisch - vegetarisch - keinFisch
    const gesuchtIndex = rng.randomItemFromArray([1, 2, 3])

    return {
      kontext,
      total,
      fleisch,
      vegetarisch,
      keinFisch,
      vegan,
      gesuchtIndex,
    }
  },

  originalData: {
    kontext: 'ausflug',
    total: 80,
    fleisch: 75,
    vegetarisch: 12.5,
    keinFisch: 10,
    vegan: 2.5,
    gesuchtIndex: 1,
  },

  constraint({ data }) {
    return (
      data.vegan > 0 &&
      data.fleisch + data.vegetarisch + data.keinFisch + data.vegan === 100
    )
  },

  intro({ data }) {
    const values = [
      { label: 'mit Fleisch', value: data.fleisch },
      { label: 'vegetarisch', value: data.vegetarisch },
      { label: 'kein Fisch', value: data.keinFisch },
      { label: 'vegan', value: data.vegan },
    ]

    let start = -Math.PI / 2

    return (
      <>
        <p>{getContext(data.kontext)}</p>
        <p>
          Eine Umfrage mit insgesamt {data.total} Personen hat folgende
          Essensvorlieben ergeben.
        </p>

        <svg viewBox="0 0 328 230">
          {values.map((v, i) => {
            const end = start + (v.value / 100) * 2 * Math.PI
            const path = sectorPath(164, 110, 80, start, end)
            const mid = (start + end) / 2
            const lx = 164 + 112 * Math.cos(mid)
            const ly = 110 + 112 * Math.sin(mid)
            start = end
            return (
              <g key={v.label}>
                <path
                  d={path}
                  fill={i % 2 === 0 ? '#ddd' : '#aaa'}
                  stroke="black"
                />
                <text x={lx} y={ly} fontSize="12" textAnchor="middle">
                  {v.label}
                </text>
                <text x={lx} y={ly + 14} fontSize="12" textAnchor="middle">
                  {pp(v.value)} %
                </text>
              </g>
            )
          })}
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Entnehmen Sie dem Diagramm, wie viel Prozent der befragten Personen
            gerne Fleisch essen.
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Dem Diagramm entnimmt man: <b>{pp(data.fleisch)} %</b> essen gerne
            Fleisch.
          </p>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        const labels = ['Fleisch', 'vegetarisch', 'keinen Fisch', 'vegan']
        return (
          <p>
            Berechnen Sie, wie viele der befragten Personen{' '}
            {labels[data.gesuchtIndex]} essen.
          </p>
        )
      },
      solution({ data }) {
        const values = [
          data.fleisch,
          data.vegetarisch,
          data.keinFisch,
          data.vegan,
        ]
        const p = values[data.gesuchtIndex]
        const count = (data.total * p) / 100
        return (
          <>
            <InlineMath
              math={`${pp(data.total)}\\cdot \\frac{${pp(p)}}{100}=${pp(
                count,
              )}`}
            />
            <p>
              Das sind <b>{pp(count)} Personen</b>.
            </p>
          </>
        )
      },
    },
  ],
}
