// exercise3063.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  leftPart: number
  totalHeight: number
  extra: number
  x: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3063: Exercise<DATA> = {
  title: 'Strahlensatzfigur',
  source: 'Prüfung 2022 / Aufgabe 4C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const x = rng.randomItemFromArray([2, 2.5, 3, 4, 5])
    const extra = rng.randomItemFromArray([1, 2, 3])
    const leftPart = rng.randomItemFromArray([4, 5, 6])
    const totalHeight = round2((leftPart * (x + extra)) / x)
    return { leftPart, totalHeight, extra, x }
  },

  originalData: {
    leftPart: 5,
    totalHeight: 10,
    extra: 2,
    x: round2(Math.sqrt(10)),
  },

  constraint({ data }) {
    return data.x > 0
  },

  intro({ data }) {
    return (
      <>
        <p>Gegeben sind eine Strahlensatzfigur und eine Gleichung:</p>

        <svg viewBox="0 0 328 180">
          <image href="/content/BW_2BFS/3063.png" height="180" width="328" />
        </svg>

        <InlineMath
          math={`\\frac{${pp(data.leftPart)}\\,\\mathrm{cm}}{x\\,\\mathrm{cm}} = \\frac{${pp(
            data.totalHeight,
          )}\\,\\mathrm{cm}}{x + ${pp(data.extra)}\\,\\mathrm{cm}}`}
        />
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Beschriften Sie die Strahlensatzfigur so, dass diese zur Gleichung passt.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die kleinere Höhe wird mit{' '}
              <InlineMath math={`${pp(data.leftPart)}\\,\\mathrm{cm}`} />,
              die größere Höhe mit{' '}
              <InlineMath math={`${pp(data.totalHeight)}\\,\\mathrm{cm}`} />
              beschriftet.
            </p>
            <p>
              Die Grundstrecken lauten <InlineMath math={'x\\,\\mathrm{cm}'} /> und{' '}
              <InlineMath math={`x + ${pp(data.extra)}\\,\\mathrm{cm}`} />.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Bestimmen Sie die Länge der Strecke x.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`\\frac{${pp(data.leftPart)}}{x} = \\frac{${pp(
                data.totalHeight,
              )}}{x + ${pp(data.extra)}}`}
            />
            <br />
            <InlineMath
              math={`${pp(data.leftPart)}\\cdot (x + ${pp(data.extra)}) = ${pp(
                data.totalHeight,
              )}x`}
            />
            <br />
            <InlineMath
              math={`${pp(data.leftPart)}x + ${pp(
                data.leftPart * data.extra,
              )} = ${pp(data.totalHeight)}x`}
            />
            <br />
            <InlineMath
              math={`${pp(data.leftPart * data.extra)} = ${pp(
                data.totalHeight - data.leftPart,
              )}x`}
            />
            <br />
            <InlineMath math={`x = ${pp(data.x)}\\,\\mathrm{cm}`} />
          </>
        )
      },
    },
  ],
}