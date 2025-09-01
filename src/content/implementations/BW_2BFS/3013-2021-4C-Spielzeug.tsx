import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  r2: number
  r1: number
}

export const exercise3013: Exercise<DATA> = {
  title: 'Spielzeug',
  source: '2021 Wahlteil Aufgabe 4C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return { r2: rng.randomIntBetween(5, 12), r1: rng.randomIntBetween(10, 20) }
  },
  originalData: { r2: 9, r1: 15 },
  constraint({ data }) {
    return data.r1 > data.r2
  },
  intro({ data }) {
    return (
      <>
        <p>
          Ein Spielgerät zum Balancieren besteht aus einer kreisrunden Scheibe,
          einer darunter angesetzten Halbkugel H<sub>1</sub> und einer
          kleineren, oberhalb angesetzten Halbkugel H<sub>2</sub>.
        </p>
        <svg viewBox="0 0 328 100">
          <image href="/content/BW_2BFS/3013.png" height="100" width="328" />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechnen Sie den Oberflächeninhalt der Halbkugel H<sub>2</sub>,
              wenn deren Radius {data.r2} cm beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const surfaceArea = Math.round(4 * Math.PI * data.r2 ** 2 * 100) / 100
        return (
          <>
            <p>Berechne die Oberfläche mit der Formel für die Kugelfläche:</p>
            {buildEquation([
              [<>O</>, <>=</>, <> 4πr²</>],
              [<>O</>, <>=</>, <>4· π · ({data.r2} cm)²</>],
              [<>O</>, <>≈</>, <>{pp(surfaceArea)} cm²</>],
            ])}
            <p>
              {' '}
              Damit ist die Oberfläche der <b>Halbkugel</b>:
            </p>
            <p>
              {pp(surfaceArea)} cm² : 2 = {pp(surfaceArea / 2)} cm²
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Geben Sie das Verhältnis des Volumens der Halbkugel H<sub>1</sub>{' '}
              zum Volumen der Halbkugel H<sub>2</sub> an. Es ist r<sub>1</sub> ={' '}
              {data.r1} cm und r<sub>2</sub> = {data.r2} cm
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne das Verhältnis der Volumina:</p>
            <p>
              {buildInlineFrac(
                <>
                  V<sub>1</sub>
                </>,
                <>
                  V<sub>2</sub>
                </>,
              )}{' '}
              ={' '}
              {buildInlineFrac(
                <>
                  {buildInlineFrac(2, 3)} · π · r<sub>1</sub>
                  <sup>3</sup>
                </>,
                <>
                  {buildInlineFrac(2, 3)} · π · r<sub>2</sub>
                  <sup>3</sup>
                </>,
              )}{' '}
              ={' '}
              {buildInlineFrac(
                <>
                  r<sub>1</sub>
                  <sup>3</sup>
                </>,
                <>
                  r<sub>2</sub>
                  <sup>3</sup>
                </>,
              )}{' '}
              = {pp(Math.round((100 * data.r1 ** 3) / data.r2 ** 3) / 100)}{' '}
            </p>
          </>
        )
      },
    },
  ],
}
