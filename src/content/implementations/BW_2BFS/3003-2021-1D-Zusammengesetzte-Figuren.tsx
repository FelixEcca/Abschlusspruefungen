import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { InlineMath } from 'react-katex'

interface DATA {
  case: number
}

export const exercise3003: Exercise<DATA> = {
  title: 'Zusammengesetzte Figuren',
  source: '2021 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return { case: rng.randomIntBetween(1, 4) }
  },
  originalData: { case: 5 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>Gegeben ist folgende Figur.</p>

        {data.case == 1 && (
          <>
            <svg viewBox="0 0 328 140">
              <image
                href="/content/BW_2BFS/3003_1.png"
                height="140"
                width="328"
              />
            </svg>
          </>
        )}

        {data.case == 2 && (
          <>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/BW_2BFS/3003_2.JPG"
                height="200"
                width="328"
              />
            </svg>
          </>
        )}

        {data.case == 3 && (
          <>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/BW_2BFS/3003_3.JPG"
                height="200"
                width="328"
              />
            </svg>
          </>
        )}

        {data.case == 4 && (
          <>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/BW_2BFS/3003_4.JPG"
                height="200"
                width="328"
              />
            </svg>
          </>
        )}

        {data.case == 5 && (
          <>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/3003_5.JPG"
                height="328"
                width="328"
              />
            </svg>
          </>
        )}
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
              Notieren Sie zwei unterschiedliche Terme zur Berechnung des
              Umfangs der Figur.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Der Umfang setzt sich aus allen einzelnen Seitenlängen zusammen.
            </p>
            {data.case == 1 && (
              <>
                <p>
                  <InlineMath math={`x + x + x + x + y + z`} /> <br></br>oder
                  zusammengefasst:
                  <br />
                  <InlineMath math={`4x + y + z`} />
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  <InlineMath math={`x + x + 2x + y + y + y + z + z`} />{' '}
                  <br></br>oder zusammengefasst:
                  <br />
                  <InlineMath math={`4x + 3y + 2z`} />
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  <InlineMath math={`x + x + x + x + x + x + x + x + x + y`} />{' '}
                  <br></br>oder zusammengefasst:
                  <br />
                  <InlineMath math={`9x + y`} />
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  <InlineMath math={`x + x + x + x + y + z + z`} /> <br></br>
                  oder zusammengefasst:
                  <br />
                  <InlineMath math={`4x + y + 2z`} />
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  <InlineMath math={`x + x + x + y + y + z`} /> <br></br>oder
                  zusammengefasst:
                  <br />
                  <InlineMath math={`3x + 2y + z`} />
                </p>
              </>
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
            {data.case == 1 && (
              <>
                <p>
                  <InlineMath math={`z`} /> ist doppelt so lang wie{' '}
                  <InlineMath math={`y`} />.
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  <InlineMath math={`z`} /> ist dreimal so lang wie{' '}
                  <InlineMath math={`x`} />.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  <InlineMath math={`z`} /> ist viermal so lang wie{' '}
                  <InlineMath math={`y`} />.
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  <InlineMath math={`z`} /> ist dreimal so lang wie{' '}
                  <InlineMath math={`x`} />.
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  <InlineMath math={`x`} /> ist doppelt so lang wie{' '}
                  <InlineMath math={`y`} />.
                </p>
              </>
            )}

            <p>
              Bestimmen Sie einen Term zur Berechnung des Flächeninhalts der
              Figur, der nur die Variable <InlineMath math={`x`} /> enthält.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.case == 1 && (
              <>
                <svg viewBox="0 0 328 140">
                  <image
                    href="/content/BW_2BFS/3003_1_sol.JPG"
                    height="140"
                    width="328"
                  />
                </svg>
              </>
            )}

            {data.case == 2 && (
              <>
                <svg viewBox="0 0 328 200">
                  <image
                    href="/content/BW_2BFS/3003_2_sol.JPG"
                    height="200"
                    width="328"
                  />
                </svg>
              </>
            )}

            {data.case == 3 && (
              <>
                <svg viewBox="0 0 328 200">
                  <image
                    href="/content/BW_2BFS/3003_3_sol.JPG"
                    height="200"
                    width="328"
                  />
                </svg>
              </>
            )}

            {data.case == 4 && (
              <>
                <svg viewBox="0 0 328 200">
                  <image
                    href="/content/BW_2BFS/3003_4_sol.JPG"
                    height="200"
                    width="328"
                  />
                </svg>
              </>
            )}

            {data.case == 5 && (
              <>
                <svg viewBox="0 0 328 328">
                  <image
                    href="/content/BW_2BFS/3003_5_sol.JPG"
                    height="328"
                    width="328"
                  />
                </svg>
              </>
            )}
            {data.case == 1 && (
              <>
                <p>
                  Die Figur lässt sich wie im Bild in mehrere Teile zerlegen.
                </p>
                <p>
                  Die Fläche ist dann die Fläche des Rechtecks, des kleinen
                  Quadrats und des kleinen Dreiecks:
                </p>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      {' '}
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath
                        math={`x \\cdot z + x² + \\frac{x \\cdot x}{2} `}
                      />
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
                        <span style={{ fontSize: 'small' }}>
                          <InlineMath math={`z`} /> ist gleich{' '}
                          <InlineMath math={`2x`} />
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath
                        math={`x \\cdot 2x + x² + \\frac{x\\cdot x}{2} `}
                      />
                    </>,
                  ],
                  [
                    <></>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <b>
                        <InlineMath math={`2x² + x² + \\frac{x²}{2}`} />
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  Die Figur lässt sich wie im Bild in mehrere Teile zerlegen.
                </p>
                <p>
                  Die Fläche ist dann die Fläche des Rechtecks und der drei
                  kleinen Dreiecke:
                </p>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath
                        math={`2x \\cdot z + 3 \\cdot \\frac{x \\cdot x}{2}`}
                      />
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
                        <span style={{ fontSize: 'small' }}>
                          <InlineMath math={`z`} /> ist gleich{' '}
                          <InlineMath math={`3x`} />
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath
                        math={`x \\cdot 3x + 3 \\cdot \\frac{x \\cdot x}{2}`}
                      />
                    </>,
                  ],
                  [
                    <></>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <b>
                        <InlineMath math={`3x² + \\frac{3}{2} x²`} />
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Die Figur lässt sich wie im Bild in mehrere Teile zerlegen.
                </p>
                <p>
                  Die Fläche ist dann die Fläche der kleinen Quadrate und des
                  kleinen Dreiecks:
                </p>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath math={`5x² + \\frac{x \\cdot x}{2}`} />
                    </>,
                  ],

                  [
                    <></>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <b>
                        <InlineMath math={`5x² + \\frac{1}{2} x²`} />
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  Die Figur lässt sich wie im Bild in mehrere Teile zerlegen.
                </p>
                <p>
                  Die Fläche ist dann die Fläche des Quadrats, des kleinen
                  Quadrats und des kleinen Dreiecks:
                </p>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath math={`(2x)² + x² + \\frac{x \\cdot x}{2}`} />
                    </>,
                  ],

                  [
                    <></>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <b>
                        <InlineMath math={`4x² + x² + \\frac{1}{2} x²`} />
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  Die Figur lässt sich wie im Bild in mehrere Teile zerlegen.
                </p>
                <p>
                  Die Fläche ist dann die Fläche des Quadrats und des kleinen
                  Dreiecks:
                </p>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`A`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath math={`x² + \\frac{x \\cdot y}{2}`} />
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
                        <span style={{ fontSize: 'small' }}>
                          <InlineMath math={`y `} /> ist halb so groß wie{' '}
                          <InlineMath math={`x`} />
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <InlineMath math={`x² + x \\cdot \\frac{1}{2} x`} />
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <b>
                        <InlineMath math={`x² + \\frac{1}{4} x²`} />
                      </b>
                    </>,
                  ],
                ])}
              </>
            )}
          </>
        )
      },
    },
  ],
}
