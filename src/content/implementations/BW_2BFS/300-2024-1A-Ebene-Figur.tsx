import { Exercise } from '@/data/types'
import { Color1, Color2, Color3, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  umfang: number
  x: number
  länge: number
}

export const exercise300: Exercise<DATA> = {
  title: 'Ebene Figur',
  source: '2024 Hauptprüfung Hauptteil Aufgabe 1',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      umfang: rng.randomIntBetween(8, 17) * 2,
      x: rng.randomIntBetween(2, 7),
      länge: rng.randomIntBetween(2, 5),
    }
  },
  originalData: { umfang: 22, x: 5, länge: 3 },
  constraint({ data }) {
    data.umfang > 4 * data.x + 2
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Gegeben ist die symmetrische Figur.</p>
        <svg viewBox="0 0 328 260">
          <image href="/content/BW_2BFS/300.png" height="230" width="328" />
          <text x={70} y={175} fontSize={20} textAnchor="right" stroke="black">
            {data.länge} cm
          </text>
          <text x={200} y={55} fontSize={20} textAnchor="right" stroke="black">
            {data.länge} cm
          </text>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 2,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Der Umfang soll {data.umfang} cm betragen. Geben Sie dazu eine
              Gleichung an und berechnen Sie x.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Der Umfang ist die Summer aller einzelnen Seitenlängen:</p>
            {buildEquation([
              [
                <>U</>,
                <>=</>,
                <>
                  x + x + x + x + {data.länge} + {data.länge}
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [<>U</>, <>=</>, <>4x + {2 * data.länge}</>],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Der Umfang soll {data.umfang} cm betragen.
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>{data.umfang}</>,
                <>=</>,
                <>4x + {2 * data.länge}</>,
                <>| − {2 * data.länge}</>,
              ],
              [
                <>{data.umfang - 2 * data.länge}</>,
                <>=</>,
                <>4x</>,
                <>| : 4</>,
              ],
              [<>x</>, <>=</>, <>{pp((data.umfang - 2 * data.länge) / 4)}</>],
            ])}
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
        return (
          <>
            <p>
              Nun soll x = {data.x} cm sein. Berechnen Sie die Höhe und geben
              Sie das Ergebnis als Wurzel an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Im rechtwinkligen Dreieck können wir h mit dem Satz des Pythagoras
              berechnen:
            </p>
            {buildEquation([
              [<>h²</>, <>=</>, <>x² + x²</>],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Länge für x einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>h²</>,
                <>=</>,
                <>
                  {data.x}² + {data.x}²
                </>,
              ],
              [
                <>h²</>,
                <>=</>,
                <>
                  {data.x * data.x} + {data.x * data.x}
                </>,
              ],
              [<>h²</>, <>=</>, <>{data.x * data.x * 2}</>, <>| √</>],
              [<>h</>, <>=</>, <>{buildSqrt(data.x * data.x * 2)}</>],
            ])}
          </>
        )
      },
    },
    {
      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Bestimmen Sie einen Term, der x und h enthält und mit dem die
              Fläche dieser Figur berechnet werden kann.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Fläche setzt sich aus einem Rechteck in der Mitte und zwei
              Dreiecken zusammen.
            </p>
            <p>
              Beachte, dass die Dreiecke zusammengesetzt ein Quadrat mit der
              Seitenlänge x ergeben.
            </p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/BW_2BFS/300_2.png"
                height="230"
                width="328"
              />
              <text
                x={70}
                y={195}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.länge} cm
              </text>
              <text
                x={210}
                y={55}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                {data.länge} cm
              </text>
            </svg>
            {buildEquation([
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Fläche der zwei grünen Dreiecke und ein oranges Rechteck
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>A</>,
                <>=</>,
                <>
                  <Color2>{buildInlineFrac(<>x · x</>, <>2</>)}</Color2> +{' '}
                  <Color3>{data.länge} · h</Color3> +{' '}
                  <Color2>{buildInlineFrac(<>x · x</>, <>2</>)}</Color2>
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                <>A</>,
                <>=</>,
                <>
                  <Color2>{buildInlineFrac(<>x²</>, <>2</>)}</Color2> +{' '}
                  <Color3>{data.länge} · h</Color3> +{' '}
                  <Color2>{buildInlineFrac(<>x²</>, <>2</>)}</Color2>
                </>,
              ],
              [
                <>A</>,
                <>=</>,
                <>
                  <Color2>x²</Color2> + <Color3>{data.länge} · h</Color3>
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
