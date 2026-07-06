import { Exercise } from '@/data/types'
import { Color1, Color2, Color3, Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  umfang: number
  x: number
  länge: number
}

export const exercise3150: Exercise<DATA> = {
  title: 'Ebene Figur',
  source: '2024 Pflichtteil Aufgabe 1A',
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
          <image href="/content/Mathe_2BFS2/300.png" height="230" width="328" />
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
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Der Umfang soll <InlineMath math={`${data.umfang} \\text{ cm}`} />{' '}
            betragen. Geben Sie dazu eine Gleichung an und berechnen Sie{' '}
            <InlineMath math="x" />.
          </p>
        )
      },
      solution({ data }) {
        const xVal = (data.umfang - 2 * data.länge) / 4
        return (
          <>
            <p>Der Umfang ist die Summe aller einzelnen Seitenlängen:</p>
            {buildEquation([
              [
                <>
                  <InlineMath math="U" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`x+x+x+x+${data.länge}+${data.länge}`} />
                </>,
              ],
              [
                <></>,
                <>
                  <Color4>
                    <span className="inline-block scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math="U" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`4x+${2 * data.länge}`} />
                </>,
              ],
              [
                <></>,
                <>
                  <Color4>
                    <span className="inline-block scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Der Umfang soll {data.umfang} cm betragen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math={String(data.umfang)} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`4x+${2 * data.länge}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`${data.umfang - 2 * data.länge}`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="4x" />
                </>,
              ],
              [
                <>
                  <InlineMath math="x" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={String(xVal)} />
                </>,
              ],
            ])}
            <p>
              Die Länge beträgt <InlineMath math={`x=${xVal}`} /> cm.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Nun soll <InlineMath math={`x=${data.x}\\,\\text{cm}`} /> sein.
            Berechnen Sie die Höhe und geben Sie das Ergebnis als Wurzel an.
          </p>
        )
      },
      solution({ data }) {
        const sum = data.x * data.x * 2
        return (
          <>
            <p>Im rechtwinkligen Dreieck gilt der Satz des Pythagoras:</p>
            {buildEquation([
              [
                <>
                  <InlineMath math="h^{2}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="x^{2}+x^{2}" />
                </>,
              ],
              [
                <></>,
                <>
                  <Color4>
                    <span className="inline-block scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Wert für x einsetzen
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math="h^{2}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${data.x}^{2}+${data.x}^{2}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math="h^{2}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${data.x * data.x}+${data.x * data.x}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math="h^{2}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${sum}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math="h" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`\\sqrt{${sum}}`} />
                </>,
              ],
            ])}
          </>
        )
      },
    },
    {
      points: 1,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Bestimmen Sie einen Term, der <InlineMath math="x" /> und{' '}
            <InlineMath math="h" /> enthält und mit dem die Fläche dieser Figur
            berechnet werden kann.
          </p>
        )
      },
      // --- Lösung Teil 3 (Flächenterm in x und h) ---
      solution({ data }) {
        return (
          <>
            <p>
              Die Fläche setzt sich aus einem Rechteck in der Mitte und zwei
              Dreiecken zusammen. Die beiden Dreiecke ergeben zusammen ein
              Quadrat mit der Seitenlänge <InlineMath math="x" />.
            </p>
            {buildEquation([
              [
                <></>,
                <>
                  <Color4>
                    <span className="inline-block scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Fläche: zwei Dreiecke + Rechteck
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math="A" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <Color2>
                    <InlineMath math="\dfrac{x\cdot x}{2}" />
                  </Color2>
                  <span> + </span>
                  <Color3>
                    <InlineMath math={`${data.länge} \\cdot  h`} />
                  </Color3>
                  <span> + </span>
                  <Color2>
                    <InlineMath math="\dfrac{x\cdot x}{2}" />
                  </Color2>
                </>,
              ],
              [
                <></>,
                <>
                  <Color4>
                    <span className="inline-block scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Zusammenfassen</span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math="A" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <Color2>
                    <InlineMath math="\dfrac{x^{2}}{2}" />
                  </Color2>
                  <span> + </span>
                  <Color3>
                    <InlineMath math={`${data.länge}\\cdot h`} />
                  </Color3>
                  <span> + </span>
                  <Color2>
                    <InlineMath math="\dfrac{x^{2}}{2}" />
                  </Color2>
                </>,
              ],
              [
                <>
                  <InlineMath math="A" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <Color2>
                    <InlineMath math="x^{2}" />
                  </Color2>
                  <span> + </span>
                  <Color3>
                    <InlineMath math={`${data.länge}\\cdot h`} />
                  </Color3>
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
