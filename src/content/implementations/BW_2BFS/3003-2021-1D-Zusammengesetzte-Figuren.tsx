import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'

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
                  x + x + x + x + y + z<br></br> oder zusammengefasst:<br></br>
                  4x + y + z
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  x + x + 2x + y + y + y + z + z<br></br> oder zusammengefasst:
                  <br></br>
                  4x + 3y + 2z
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  x + x + x + x + x + x + x + x + x + y<br></br> oder
                  zusammengefasst:<br></br>
                  9x + y
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  x + x + x + x + y + z + z<br></br> oder zusammengefasst:
                  <br></br>
                  4x + y + 2z
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  x + x + x + y + y + z<br></br> oder zusammengefasst:<br></br>
                  3x + 2y + z
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
                <p>z ist doppelt so lang wie y.</p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>z ist dreimal so lang wie x.</p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p></p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>z ist dreimal so lang wie x.</p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>x ist doppelt so lang wie y.</p>
              </>
            )}

            <p>
              Bestimmen Sie einen Term zur Berechnung des Flächeninhalts der
              Figur, der nur die Variable x enthält.
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
                    href="/content/BW_2BFS/3003_1_sol.png"
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
                    <>A</>,
                    <>=</>,
                    <>x · z + x² + {buildInlineFrac(<>x · x</>, <>2</>)}</>,
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
                          z ist gleich 2x
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>A</>,
                    <>=</>,
                    <>x · 2x + x² + {buildInlineFrac(<>x · x</>, <>2</>)}</>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <b>2x² + x² + {buildInlineFrac(<>1</>, <>2</>)} x²</b>
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
                    <>A</>,
                    <>=</>,
                    <>2x · z + 3 · {buildInlineFrac(<>x · x</>, <>2</>)}</>,
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
                          z ist gleich 3x
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <>A</>,
                    <>=</>,
                    <>x · 3x + 3 · {buildInlineFrac(<>x · x</>, <>2</>)}</>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <b>3x² + {buildInlineFrac(<>3</>, <>2</>)} x²</b>
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
                    <>A</>,
                    <>=</>,
                    <>5x² + {buildInlineFrac(<>x · x</>, <>2</>)}</>,
                  ],

                  [
                    <></>,
                    <>=</>,
                    <>
                      <b>5x² + {buildInlineFrac(<>1</>, <>2</>)} x²</b>
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
                    <>A</>,
                    <>=</>,
                    <>(2x)² + x² + {buildInlineFrac(<>x · x</>, <>2</>)}</>,
                  ],

                  [
                    <></>,
                    <>=</>,
                    <>
                      <b>4x² + x² + {buildInlineFrac(<>1</>, <>2</>)} x²</b>
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
                    <>A</>,
                    <>=</>,
                    <>x² + {buildInlineFrac(<>x · y</>, <>2</>)}</>,
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
                          y ist halb so groß wie x
                        </span>
                      </Color4>
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      x² +{' '}
                      {buildInlineFrac(
                        <>x · {buildInlineFrac(<>1</>, <>2</>)} x</>,
                        <>2</>,
                      )}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      <b>x² + {buildInlineFrac(<>1</>, <>4</>)} x²</b>
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
