// exercise9011.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  values: number[]
  labels: string[]
  minIndex: number
  noSmartphone: number
}

export const exercise9011: Exercise<DATA> = {
  title: 'Teil 1: Balkendiagramm',
  source: '2025',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const labels = ['6-9 Jahre', '10-12 Jahre', '13-15 Jahre', '16-18 Jahre']
    const values = [
      rng.randomIntBetween(15, 35),
      rng.randomIntBetween(75, 90),
      rng.randomIntBetween(88, 96),
      rng.randomIntBetween(90, 98),
    ]
    const minIndex = values.indexOf(Math.min(...values))
    const noSmartphone = 100 - values[1]

    return { values, labels, minIndex, noSmartphone }
  },

  originalData: {
    labels: ['6-9 Jahre', '10-12 Jahre', '13-15 Jahre', '16-18 Jahre'],
    values: [21, 86, 95, 96],
    minIndex: 0,
    noSmartphone: 14,
  },

  constraint({ data }) {
    return data.values.length === 4
  },

  intro({ data }) {
    return (
      <>
        <p>
          Bei einer Umfrage wurden Kinder und Jugendliche befragt, ob sie ein
          Smartphone besitzen.
        </p>
        <svg viewBox="0 0 328 250">
          <text x="75" y="20" fontSize="13">
            Smartphone-Besitz in Prozent
          </text>

          <line x1="45" y1="210" x2="305" y2="210" stroke="black" />
          <line x1="45" y1="30" x2="45" y2="210" stroke="black" />

          {Array.from({ length: 11 }, (_, i) => i * 10).map(v => (
            <g key={v}>
              <line
                x1="42"
                y1={210 - v * 1.6}
                x2="45"
                y2={210 - v * 1.6}
                stroke="black"
              />
              <text x="18" y={214 - v * 1.6} fontSize="10">
                {v}
              </text>
            </g>
          ))}

          {data.values.map((v, i) => {
            const x = 70 + i * 62
            const h = v * 1.6
            return (
              <g key={i}>
                <rect x={x} y={210 - h} width="28" height={h} fill="#888" />
                <text x={x + 5} y={205 - h} fontSize="11">
                  {v}
                </text>
                <text x={x - 12} y="230" fontSize="9">
                  {data.labels[i]}
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
            Bestimmen Sie, in welcher Altersgruppe es die wenigsten Smartphones
            gab und wie viel Prozent der Befragten in dieser Altersgruppe ein
            Smartphone hatten.
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Die wenigsten Smartphones gab es in der Altersgruppe{' '}
            <b>{data.labels[data.minIndex]}</b>. Dort hatten{' '}
            <b>{data.values[data.minIndex]} %</b> ein Smartphone.
          </p>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie, wie viel Prozent der befragten Kinder und Jugendlichen
            in der Altersgruppe 10 – 12 Jahre kein Smartphone hatten.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`100\\%-${data.values[1]}\\%=${data.noSmartphone}\\%`} />
            <p>
              In der Altersgruppe 10 – 12 Jahre hatten <b>{data.noSmartphone} %</b>{' '}
              kein Smartphone.
            </p>
          </>
        )
      },
    },
  ],
}