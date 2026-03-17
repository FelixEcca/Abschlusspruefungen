// exercise3057.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  d: number
  e: number
  c: number
  b: number
  f: number
  wireLengthCm: number
  materialCost: number
  wirePricePerMeter: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3057: Exercise<DATA> = {
  title: 'Ähnliche Dreiecke',
  source: 'Prüfung 2022 / Aufgabe 2C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const templates = [
      { a: 2.4, d: 2, e: 1, c: 2.8 },
      { a: 3.6, d: 3, e: 1.5, c: 4.2 },
      { a: 4.8, d: 4, e: 2, c: 5.6 },
      { a: 6, d: 5, e: 2.5, c: 7 },
    ]
    const t = rng.randomItemFromArray(templates)

    const b = round2((t.c * t.e) / t.d)
    const f = round2((t.a * t.d) / (t.d + t.e))
    const wireLengthCm = round2(t.a + t.c + b + t.d + t.e + f)
    const wirePricePerMeter = rng.randomItemFromArray([32, 35, 38, 40])
    const materialCost = round2((wireLengthCm / 100) * wirePricePerMeter)

    return {
      ...t,
      b,
      f,
      wireLengthCm,
      materialCost,
      wirePricePerMeter,
    }
  },

  originalData: {
    a: 2.4,
    d: 2,
    e: 1,
    c: 2.8,
    b: round2((2.8 * 1) / 2),
    f: round2((2.4 * 2) / 3),
    wireLengthCm: round2(2.4 + 2.8 + 1.4 + 2 + 1 + 1.6),
    materialCost: round2((11.2 / 100) * 38),
    wirePricePerMeter: 38,
  },

  constraint({ data }) {
    return (
      data.a > 0 &&
      data.d > 0 &&
      data.e > 0 &&
      data.c > 0 &&
      data.b > 0 &&
      data.f > 0
    )
  },

  intro({ data }) {
    const { a, d, e, c } = data

    return (
      <>
        <svg viewBox="0 0 260 240">
          <image
            href="/content/BW_2BFS/3057.png"
            height="240"
            width="260"
          />
        </svg>

        <p>
          Es gilt: <InlineMath math={'f \\text{ und } a \\text{ verlaufen parallel}'} />.
        </p>
        <p>
          Gegeben sind{' '}
          <InlineMath math={`a = ${pp(a)}\\,\\mathrm{cm}`} />,{' '}
          <InlineMath math={`d = ${pp(d)}\\,\\mathrm{cm}`} />,{' '}
          <InlineMath math={`e = ${pp(e)}\\,\\mathrm{cm}`} /> und{' '}
          <InlineMath math={`c = ${pp(c)}\\,\\mathrm{cm}`} />.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie die fehlenden Seitenlängen b und f.</p>
          </>
        )
      },
      solution({ data }) {
        const { a, d, e, c, b, f } = data

        return (
          <>
            <p>Wegen der Parallelen sind die entstehenden Dreiecke ähnlich.</p>
            <InlineMath math={`\\frac{d}{d+e} = \\frac{c}{c+b}`} />
            <br />
            <InlineMath
              math={`\\frac{${pp(d)}}{${pp(d + e)}} = \\frac{${pp(c)}}{${pp(
                c,
              )}+b}`}
            />
            <br />
            <InlineMath math={`b = ${pp(b)}\\,\\mathrm{cm}`} />
            <br />
            <br />
            <InlineMath math={`\\frac{f}{a} = \\frac{d}{d+e}`} />
            <br />
            <InlineMath
              math={`\\frac{f}{${pp(a)}} = \\frac{${pp(d)}}{${pp(d + e)}}`}
            />
            <br />
            <InlineMath math={`f = ${pp(f)}\\,\\mathrm{cm}`} />
          </>
        )
      },
    },
    {
      points: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { wirePricePerMeter } = data
        return (
          <>
            <p>Diese Figur soll aus vergoldetem Draht hergestellt werden.</p>
            <p>
              Ein Meter Draht kostet{' '}
              <InlineMath math={`${pp(wirePricePerMeter)}`} /> €. Bestimmen Sie die
              Materialkosten pro Figur.
            </p>
          </>
        )
      },
      solution({ data }) {
        const {
          a,
          d,
          e,
          c,
          b,
          f,
          wireLengthCm,
          materialCost,
          wirePricePerMeter,
        } = data

        return (
          <>
            <p>Benötigt werden alle gezeichneten Drahtstrecken:</p>
            <InlineMath
              math={`l = ${pp(a)} + ${pp(d + e)} + ${pp(c + b)} + ${pp(f)}`}
            />
            <br />
            <InlineMath
              math={`l = ${pp(wireLengthCm)}\\,\\mathrm{cm} = ${pp(
                wireLengthCm / 100,
              )}\\,\\mathrm{m}`}
            />
            <br />
            <InlineMath
              math={`K = ${pp(wireLengthCm / 100)}\\cdot ${pp(
                wirePricePerMeter,
              )}`}
            />
            <span> €</span>
            <br />
            <InlineMath math={`K \\approx ${pp(materialCost)}`} />
            <span> €</span>
          </>
        )
      },
    },
  ],
}