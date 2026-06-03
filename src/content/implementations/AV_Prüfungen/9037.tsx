// exercise9037.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kontext = 'sport' | 'haustiere' | 'verkehr' | 'faecher' | 'freizeit'

interface DATA {
  kontext: Kontext
  title: string
  labels: string[]
  values: number[]
  mostIndex: number
  leastIndex: number
  targetA: number
  targetB: number
  combineA: number
  combineB: number
  total: number
  difference: number
  combined: number
}

function getContext(kontext: Kontext) {
  if (kontext === 'haustiere') {
    return {
      intro: 'In Ihrer Klasse wurde eine Umfrage zu Haustieren gemacht.',
      title: 'Haustiere in der Klasse',
      labels: ['Hund', 'Katze', 'Kaninchen', 'Hamster', 'Fisch', 'Vogel'],
      unit: 'Nennungen',
    }
  }

  if (kontext === 'verkehr') {
    return {
      intro:
        'In Ihrer Klasse wurde gefragt, wie die Schüler/innen zur Schule kommen.',
      title: 'Weg zur Schule',
      labels: ['Auto', 'Fahrrad', 'Bus', 'Bahn', 'Zu Fuß', 'Roller'],
      unit: 'Nennungen',
    }
  }

  if (kontext === 'faecher') {
    return {
      intro: 'In Ihrer Klasse wurde eine Umfrage zu Lieblingsfächern gemacht.',
      title: 'Lieblingsfächer in der Klasse',
      labels: ['Mathe', 'Deutsch', 'Englisch', 'Sport', 'Physik', 'Geschichte'],
      unit: 'Nennungen',
    }
  }

  if (kontext === 'freizeit') {
    return {
      intro: 'In Ihrer Klasse wurde eine Umfrage zur Freizeit gemacht.',
      title: 'Freizeitaktivitäten',
      labels: ['Gaming', 'Sport', 'Musik', 'Lesen', 'Treffen', 'Fernsehen'],
      unit: 'Nennungen',
    }
  }

  return {
    intro:
      'In Ihrer Klasse wurde eine Umfrage zur beliebtesten Sportart gemacht.',
    title: 'Die beliebteste Sportart in Ihrer Klasse',
    labels: [
      'Volleyball',
      'Tischtennis',
      'Fußball',
      'Basketball',
      'Rugby',
      'Handball',
    ],
    unit: 'Nennungen',
  }
}

export const exercise9037: Exercise<DATA> = {
  title: 'Teil 1: Diagramm auswerten',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'sport',
      'haustiere',
      'verkehr',
      'faecher',
      'freizeit',
    ])

    const context = getContext(kontext)

    let values = Array.from({ length: 6 }, () => rng.randomIntBetween(1, 9))

    while (new Set(values).size !== values.length) {
      values = Array.from({ length: 6 }, () => rng.randomIntBetween(1, 9))
    }

    const mostIndex = values.indexOf(Math.max(...values))
    const leastIndex = values.indexOf(Math.min(...values))

    let targetA = rng.randomIntBetween(0, 5)
    let targetB = rng.randomIntBetween(0, 5)
    while (targetA === targetB) targetB = rng.randomIntBetween(0, 5)

    let combineA = rng.randomIntBetween(0, 5)
    let combineB = rng.randomIntBetween(0, 5)
    while (combineA === combineB) combineB = rng.randomIntBetween(0, 5)

    const total = values.reduce((sum, v) => sum + v, 0)
    const difference = Math.abs(values[targetA] - values[targetB])
    const combined = values[combineA] + values[combineB]

    return {
      kontext,
      title: context.title,
      labels: context.labels,
      values,
      mostIndex,
      leastIndex,
      targetA,
      targetB,
      combineA,
      combineB,
      total,
      difference,
      combined,
    }
  },

  originalData: {
    kontext: 'sport',
    title: 'Die beliebteste Sportart in Ihrer Klasse',
    labels: [
      'Volleyball',
      'Tischtennis',
      'Fußball',
      'Basketball',
      'Rugby',
      'Handball',
    ],
    values: [7, 2, 8, 3, 1, 4],
    mostIndex: 2,
    leastIndex: 4,
    targetA: 0,
    targetB: 3,
    combineA: 0,
    combineB: 5,
    total: 25,
    difference: 4,
    combined: 11,
  },

  constraint({ data }) {
    return (
      data.values.length === data.labels.length &&
      data.values.reduce((sum, v) => sum + v, 0) === data.total
    )
  },

  intro({ data }) {
    const maxY = 10
    const chartX = 48
    const chartY = 35
    const chartW = 270
    const chartH = 150
    const barW = 24
    const gap = 20

    return (
      <>
        <p>{getContext(data.kontext).intro}</p>

        <svg viewBox="0 0 365 265">
          <text x="185" y="20" fontSize="13" textAnchor="middle">
            {data.title}
          </text>

          <line
            x1={chartX}
            y1={chartY}
            x2={chartX}
            y2={chartY + chartH}
            stroke="black"
          />
          <line
            x1={chartX}
            y1={chartY + chartH}
            x2={chartX + chartW}
            y2={chartY + chartH}
            stroke="black"
          />

          <text
            x="16"
            y="115"
            fontSize="10"
            textAnchor="middle"
            transform="rotate(-90 16 115)"
          >
            Anzahl
          </text>

          {Array.from({ length: maxY + 1 }, (_, i) => (
            <g key={i}>
              <line
                x1={chartX - 4}
                y1={chartY + chartH - i * (chartH / maxY)}
                x2={chartX}
                y2={chartY + chartH - i * (chartH / maxY)}
                stroke="black"
              />
              <text
                x={chartX - 10}
                y={chartY + chartH - i * (chartH / maxY) + 4}
                fontSize="10"
                textAnchor="end"
              >
                {i}
              </text>
            </g>
          ))}

          {data.values.map((value, i) => {
            const x = chartX + 18 + i * (barW + gap)
            const h = value * (chartH / maxY)
            const y = chartY + chartH - h

            return (
              <g key={data.labels[i]}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  fill="#999"
                  stroke="black"
                />

                <text
                  x={x + barW / 2}
                  y={y - 5}
                  fontSize="10"
                  textAnchor="middle"
                >
                  {value}
                </text>

                <text
                  x={x + barW / 2}
                  y={chartY + chartH + 20}
                  fontSize="8"
                  textAnchor="middle"
                >
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
      points: 14,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Entnehmen Sie aus dem Schaubild, welche Kategorie am häufigsten
            genannt wurde und wie oft sie genannt wurde.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Der höchste Balken gehört zu:</p>
            <p>
              <b>
                {data.labels[data.mostIndex]} mit {data.values[data.mostIndex]}{' '}
                Nennungen.
              </b>
            </p>
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Berechnen Sie, wie viele Schüler/innen insgesamt an der Umfrage
            teilgenommen haben.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Alle Werte werden addiert:</p>
            <InlineMath math={`${data.values.join('+')}=${data.total}`} />
            <p>
              Es haben <b>{data.total} Schüler/innen</b> teilgenommen.
            </p>
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Berechnen Sie den Unterschied zwischen {data.labels[data.targetA]}{' '}
            und {data.labels[data.targetB]}.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Der Unterschied wird durch Subtraktion berechnet:</p>
            <InlineMath
              math={`${Math.max(
                data.values[data.targetA],
                data.values[data.targetB],
              )}-${Math.min(
                data.values[data.targetA],
                data.values[data.targetB],
              )}=${data.difference}`}
            />
            <p>
              Der Unterschied beträgt <b>{data.difference}</b>.
            </p>
          </>
        )
      },
    },
  ],
}
