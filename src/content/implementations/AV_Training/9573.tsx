// exercise9573.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Figure = 'rechteck' | 'dreieck' | 'parallelogramm'

interface DATA {
  figure: Figure
  area: number
  known: number
  unit: Unit
  missing: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

function figureName(figure: Figure) {
  if (figure === 'dreieck') return 'Dreieck'
  if (figure === 'parallelogramm') return 'Parallelogramm'
  return 'Rechteck'
}

export const exercise9573: Exercise<DATA> = {
  title: 'Fehlende Länge berechnen',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const figure: Figure = rng.randomItemFromArray([
      'rechteck',
      'dreieck',
      'parallelogramm',
    ])

    const known = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const missing = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])

    const area =
      figure === 'dreieck' ? (known * missing) / 2 : known * missing

    return { figure, area, known, unit, missing }
  },

  originalData: {
    figure: 'rechteck',
    area: 40,
    known: 8,
    unit: 'cm',
    missing: 5,
  },

  constraint({ data }) {
    return data.area > 0 && data.known > 0 && data.missing > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Bei einem {figureName(data.figure)} ist der Flächeninhalt gegeben.
        </p>

        {data.figure === 'rechteck' && (
          <>
            <p>
              Der Flächeninhalt beträgt {pp(data.area)} {data.unit}². Eine Seite
              ist {pp(data.known)} {data.unit} lang.
            </p>
            <p>Berechnen Sie die fehlende Seite.</p>
          </>
        )}

        {data.figure === 'parallelogramm' && (
          <>
            <p>
              Der Flächeninhalt beträgt {pp(data.area)} {data.unit}². Die
              Grundseite ist {pp(data.known)} {data.unit} lang.
            </p>
            <p>Berechnen Sie die Höhe.</p>
          </>
        )}

        {data.figure === 'dreieck' && (
          <>
            <p>
              Der Flächeninhalt beträgt {pp(data.area)} {data.unit}². Die
              Grundseite ist {pp(data.known)} {data.unit} lang.
            </p>
            <p>Berechnen Sie die Höhe.</p>
          </>
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.figure === 'rechteck' && (
          <>
            <p>Beim Rechteck gilt:</p>
            <InlineMath math={`A=a\\cdot b`} />
            <p>Nach der fehlenden Seite umstellen:</p>
            <InlineMath math={`b=A:a`} />
            <br />
            <InlineMath
              math={`b=${pp(data.area)}:${pp(data.known)}=${pp(
                data.missing,
              )}\\,${unitLatex(data.unit)}`}
            />
          </>
        )}

        {data.figure === 'parallelogramm' && (
          <>
            <p>Beim Parallelogramm gilt:</p>
            <InlineMath math={`A=g\\cdot h`} />
            <p>Nach der Höhe umstellen:</p>
            <InlineMath math={`h=A:g`} />
            <br />
            <InlineMath
              math={`h=${pp(data.area)}:${pp(data.known)}=${pp(
                data.missing,
              )}\\,${unitLatex(data.unit)}`}
            />
          </>
        )}

        {data.figure === 'dreieck' && (
          <>
            <p>Beim Dreieck gilt:</p>
            <InlineMath math={`A=\\frac{g\\cdot h}{2}`} />
            <p>Zuerst mal 2 rechnen, dann durch die Grundseite teilen:</p>
            <InlineMath math={`h=\\frac{2\\cdot A}{g}`} />
            <br />
            <InlineMath
              math={`h=\\frac{2\\cdot ${pp(data.area)}}{${pp(
                data.known,
              )}}=${pp(data.missing)}\\,${unitLatex(data.unit)}`}
            />
          </>
        )}

        <p>
          Die fehlende Länge beträgt{' '}
          <b>
            {pp(data.missing)} {data.unit}
          </b>
          .
        </p>
      </>
    )
  },
}