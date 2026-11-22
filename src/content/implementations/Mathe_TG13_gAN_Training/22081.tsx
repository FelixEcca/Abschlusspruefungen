import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, polynomial, coord, vec, add, Vec } from './math'

interface DATA {
  a: number
  k: number
  red: number
  blue: number
  point: Vec
}
export const exercise22081: Exercise<DATA> = {
  title: 'Gemischter Pflichtteil-Check: Analysis, Stochastik und Vektoren',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 3),
      k: rng.randomIntBetween(1, 3),
      red: rng.randomIntBetween(2, 4),
      blue: rng.randomIntBetween(2, 4),
      point: [
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
      ],
    }
  },
  originalData: { a: 1, k: 1, red: 3, blue: 2, point: [1, 0, -1] },
  intro() {
    return (
      <p>
        Bearbeiten Sie die drei Aufgaben ohne Hilfsmittel. Wählen Sie Ihren
        Lösungsweg selbst und begründen Sie die entscheidenden Schritte.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      task({ data }) {
        return (
          <p>
            Bestimmen Sie den Hochpunkt des Graphen von{' '}
            <InlineMath
              math={String.raw`f(x)=${polynomial([
                [data.k, 3],
                [-3 * data.k * data.a ** 2, 1],
              ])}`}
            />
            .
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`f'(x)=${3 * data.k}(x^2-${data.a ** 2})=0\Rightarrow x=\pm${data.a}`}
              />
              .
            </p>
            <p>
              <InlineMath math={String.raw`f''(x)=${6 * data.k}x`} /> ist an der
              negativen Stelle negativ. Somit ist{' '}
              <InlineMath
                math={String.raw`H(-${data.a}\mid${2 * data.k * data.a ** 3})`}
              />{' '}
              der Hochpunkt.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <p>
            Aus {data.red} roten und {data.blue} blauen Kugeln wird zweimal ohne
            Zurücklegen gezogen. Berechnen Sie die Wahrscheinlichkeit für zwei
            rote Kugeln.
          </p>
        )
      },
      solution({ data }) {
        const n = data.red + data.blue
        return (
          <p>
            <InlineMath
              math={String.raw`P(RR)=\frac{${data.red}}{${n}}\cdot\frac{${data.red - 1}}{${n - 1}}=${frac(data.red * (data.red - 1), n * (n - 1))}`}
            />
            . Nach dem ersten Zug sind Zähler und Nenner des roten Zweigs um 1
            kleiner.
          </p>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        return (
          <p>
            Bestimmen Sie den Abstand zwischen{' '}
            <InlineMath
              math={String.raw`A(${coord(data.point)}),\ B(${coord(add(data.point, [1, 2, 2]))})`}
            />
            .
          </p>
        )
      },
      solution() {
        return (
          <p>
            <InlineMath
              math={String.raw`\overrightarrow{AB}=${vec([1, 2, 2])},\quad |AB|=\sqrt{1^2+2^2+2^2}=3`}
            />
            .
          </p>
        )
      },
    },
  ],
}
