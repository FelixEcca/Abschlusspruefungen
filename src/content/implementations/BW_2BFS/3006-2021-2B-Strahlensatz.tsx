import { Exercise } from '@/data/types'
import { Color1, Color2, Color3 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  case: number
  schatten: number
  tim: number
  entfernung: number
  case2: number
}

export const exercise3006: Exercise<DATA> = {
  title: 'Strahlensatz',
  source: '2021 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      case: rng.randomIntBetween(1, 4),
      schatten: rng.randomIntBetween(6, 12),
      tim: rng.randomIntBetween(150, 200) / 100,
      entfernung: rng.randomIntBetween(2, 5),
      case2: rng.randomIntBetween(1, 3),
    }
  },
  originalData: { case: 1, schatten: 8, tim: 1.8, entfernung: 3, case2: 1 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        Der Schatten eines Baumes ist {pp(data.schatten)} lang. Tim ist{' '}
        {pp(data.tim)} m groß, er stellt sich {pp(data.entfernung)} vom Ende des
        Schattens entfernt. Die Enden beider Schatten fallen nun zusammen.{' '}
        {data.case == 1 && (
          <p>Seine Freundin Sarah macht eine Skizze von der Situation.</p>
        )}
        {data.case == 2 && (
          <p>Sein Kumpel Lukas macht eine Skizze von der Situation.</p>
        )}
        {data.case == 3 && (
          <p>Seine Freundin Sophie macht eine Skizze von der Situation.</p>
        )}
        {data.case == 4 && (
          <p>Sein Kumpel Robert macht eine Skizze von der Situation.</p>
        )}
        <svg viewBox="0 0 328 250">
          <image href="/content/BW_2BFS/3006.png" height="250" width="328" />
          <text
            x={190}
            y={230}
            fontSize={20}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.schatten)} m
          </text>
          <text
            x={290}
            y={240}
            fontSize={20}
            textAnchor="middle"
            stroke="black"
          >
            {pp(data.entfernung)} m
          </text>
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
              Tim möchte mit Hilfe eines Strahlensatzes die Baumhöhe h
              <sub>Baum</sub> bestimmen. Er stellt folgende Gleichung auf:
            </p>
            {data.case2 == 1 && (
              <>
                {buildInlineFrac(
                  <>{pp(data.schatten)}</>,
                  <>
                    h<sub>Baum</sub>
                  </>,
                )}{' '}
                ={' '}
                {buildInlineFrac(
                  <>{pp(data.tim)} m</>,
                  <>{pp(data.entfernung)} m </>,
                )}
              </>
            )}
            {data.case2 == 2 && (
              <>
                {buildInlineFrac(
                  <>{pp(data.schatten)}</>,
                  <>
                    h<sub>Baum</sub>
                  </>,
                )}{' '}
                ={' '}
                {buildInlineFrac(
                  <>{pp(data.entfernung)} m </>,
                  <>{pp(data.tim)} m</>,
                )}
              </>
            )}
            {data.case2 == 3 && (
              <>
                {buildInlineFrac(
                  <>
                    h<sub>Baum</sub>
                  </>,
                  <>{pp(data.schatten + data.entfernung)}</>,
                )}{' '}
                ={' '}
                {buildInlineFrac(
                  <>{pp(data.entfernung)} m </>,
                  <>{pp(data.tim)} m</>,
                )}
              </>
            )}

            <p>
              Korrigieren Sie den Fehler, den er gemacht hat und berechnen Sie h
              <sub>Baum</sub>.
            </p>
          </>
        )
      },
      solution({ data }) {
        const baum =
          Math.round(100 * ((data.tim * data.schatten) / data.entfernung)) / 100
        return (
          <>
            {data.case2 == 1 && (
              <>
                <p>
                  Tim hat den Bruch auf der rechten Seite falsch aufgestellt.
                </p>
                {buildInlineFrac(
                  <>
                    h<sub>Baum</sub>
                  </>,
                  <>{pp(data.schatten)} m</>,
                )}{' '}
                ={' '}
                <Color3>
                  {buildInlineFrac(
                    <>{pp(data.entfernung)} m </>,
                    <>{pp(data.tim)} m</>,
                  )}
                </Color3>
              </>
            )}
            {data.case2 == 2 && (
              <>
                <p>
                  Tim hat den Bruch auf der linken Seite falsch aufgestellt.
                </p>
                <Color3>
                  {buildInlineFrac(
                    <>{pp(data.schatten)} m</>,
                    <>
                      h<sub>Baum</sub>
                    </>,
                  )}
                </Color3>{' '}
                ={' '}
                {buildInlineFrac(
                  <>{pp(data.tim)} m</>,
                  <>{pp(data.entfernung)} m </>,
                )}
              </>
            )}
            {data.case2 == 3 && (
              <>
                <p>Tim hat die falsche Länge verwendet.</p>
                {buildInlineFrac(
                  <>
                    h<sub>Baum</sub>
                  </>,
                  <>
                    <Color3>{pp(data.schatten + data.entfernung)} m</Color3>
                  </>,
                )}{' '}
                ={' '}
                {buildInlineFrac(
                  <>{pp(data.tim)} m</>,
                  <>{pp(data.entfernung)} m </>,
                )}
              </>
            )}
            <p>Richtig ist:</p>
            {buildEquation([
              [
                <>
                  {buildInlineFrac(
                    <>
                      h<sub>Baum</sub>
                    </>,
                    <>{pp(data.schatten)} m</>,
                  )}
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.tim)} m</>,
                    <>{pp(data.entfernung)} m </>,
                  )}
                </>,
                <>| · {pp(data.schatten)} m</>,
              ],
              [
                <>
                  h<sub>Baum</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.tim)} m</>,
                    <>{pp(data.entfernung)} m </>,
                  )}{' '}
                  · {pp(data.schatten)} m
                </>,
              ],
              [
                <>
                  h<sub>Baum</sub>
                </>,
                <>=</>,
                <>{pp(baum)} m</>,
              ],
            ])}
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
            {data.case == 1 && (
              <p>
                Sarah ist kleiner als Tim. Begründen Sie, ob Sarah weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
            {data.case == 2 && (
              <p>
                Lukas ist kleiner als Tim. Begründen Sie, ob Lukas weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
            {data.case == 3 && (
              <p>
                Sophie ist größer als Tim. Begründen Sie, ob Sophie weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
            {data.case == 4 && (
              <p>
                Robert ist kleiner als Tim. Begründen Sie, ob Robert weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 1 && (
              <p>
                Da Sarahs Schatten kürzer ist, muss sie weiter vom Baum
                wegstehen, damit beide Schatten am Ende aufeinander zeigen.
              </p>
            )}
            {data.case == 2 && (
              <p>
                Da Lukas Schatten kürzer ist, muss er weiter vom Baum wegstehen,
                damit beide Schatten am Ende aufeinander zeigen.
              </p>
            )}
            {data.case == 3 && (
              <p>
                Da Roberts Schatten länger ist, muss er weiter vom Baum
                wegstehen, damit beide Schatten am Ende aufeinander zeigen.
              </p>
            )}
            {data.case == 4 && (
              <p>
                Da Sophies Schatten länger ist, muss sie weiter vom Baum
                wegstehen, damit beide Schatten am Ende aufeinander zeigen.
              </p>
            )}
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
              Berechnen Sie den Winkel, unter dem die Sonnenstrahlen auf den
              Boden treffen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const winkel = Math.round(Math.atan(data.tim / data.entfernung))
        return (
          <>
            <p>Im rechtwinkligen Dreieck gilt:</p>
            <p>tan(α) = {buildInlineFrac(<>1,8 m</>, <>3 m</>)}</p>
            <p>Löse die Gleichung:</p>
            {buildEquation([
              [
                <>tan(α)</>,
                <>=</>,
                <>{buildInlineFrac(<>1,8 m</>, <>3 m</>)}</>,
                <>
                  | tan<sup>-1</sup>()
                </>,
              ],
              [
                <>α</>,
                <>=</>,
                <>
                  tan<sup>-1</sup>
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(<>1,8 m</>, <>3 m</>)}
                  <span className="inline-block  scale-y-[2]">)</span>
                </>,
              ],
              [<>α</>, <>{winkel % 1 == 0 ? '=' : '≈'}</>, <>{winkel}</>],
            ])}
          </>
        )
      },
    },
  ],
}
