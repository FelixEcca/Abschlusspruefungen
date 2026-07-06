import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  case: number
  schatten: number // Baumschatten-Länge [m]
  tim: number // Tim-Körperhöhe [m]
  entfernung: number // Abstand Tim zum Schattenende [m]
  case2: number // welche (falsche) Gleichung Tim nutzt
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
  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <>
        <p>
          Der Schatten eines Baumes ist{' '}
          <b>
            {' '}
            <InlineMath math={`${pp(data.schatten)} \\text{ m}`} />
          </b>{' '}
          lang. Tim ist{' '}
          <b>
            <InlineMath math={`${pp(data.tim)} \\text{ m}`} />
          </b>{' '}
          groß; er stellt sich{' '}
          <b>
            <InlineMath math={`${pp(data.entfernung)} \\text{ m}`} />
          </b>{' '}
          vom Ende des Schattens entfernt. Die Enden beider Schatten fallen nun
          zusammen.
        </p>

        {data.case === 1 && (
          <p>Seine Freundin Sarah macht eine Skizze von der Situation.</p>
        )}
        {data.case === 2 && (
          <p>Sein Kumpel Lukas macht eine Skizze von der Situation.</p>
        )}
        {data.case === 3 && (
          <p>Seine Freundin Sophie macht eine Skizze von der Situation.</p>
        )}
        {data.case === 4 && (
          <p>Sein Kumpel Robert macht eine Skizze von der Situation.</p>
        )}

        {/* SVG-Beschriftungen bleiben unverändert */}
        <svg viewBox="0 0 328 250">
          <image
            href="/content/Mathe_2BFS2/3006.png"
            height="250"
            width="328"
          />
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
    // a)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Tim möchte mit Hilfe eines Strahlensatzes die Baumhöhe{' '}
              <InlineMath math={'h_{\\text{Baum}}'} /> bestimmen. Er stellt
              folgende Gleichung auf:
            </p>

            {data.case2 === 1 && (
              <BlockMath
                math={`\\dfrac{${pp(data.schatten)}\\,\\text{m}}{h_{\\text{Baum}}}
                = \\dfrac{${pp(data.tim)}\\,\\text{m}}{${pp(data.entfernung)}\\,\\text{m}}`}
              />
            )}
            {data.case2 === 2 && (
              <BlockMath
                math={`\\dfrac{h_{\\text{Baum}}}{${pp(data.schatten)}\\,\\text{m}}
                = \\dfrac{${pp(data.entfernung)}\\,\\text{m}}{${pp(data.tim)}\\,\\text{m}}`}
              />
            )}
            {data.case2 === 3 && (
              <BlockMath
                math={`\\dfrac{h_{\\text{Baum}}}{${pp(data.schatten + data.entfernung)}\\,\\text{m}}
                = \\dfrac{${pp(data.tim)}\\,\\text{m}}{${pp(data.entfernung)}\\,\\text{m}}`}
              />
            )}

            <p>
              Korrigieren Sie den Fehler und berechnen Sie{' '}
              <InlineMath math={'h_{\\text{Baum}}'} />.
            </p>
          </>
        )
      },

      solution({ data }) {
        // richtige Proportion: h_Baum : schatten = tim : entfernung
        const hBaum =
          Math.round(100 * ((data.tim * data.schatten) / data.entfernung)) / 100

        return (
          <>
            {data.case2 === 1 && (
              <>
                <p>Der linke Bruch ist vertauscht (Zähler/Nenner).</p>
                <BlockMath
                  math={`\\dfrac{${pp(data.schatten)}\\,\\text{m}}{h_{\\text{Baum}}}
                = \\dfrac{${pp(data.tim)}\\,\\text{m}}{${pp(data.entfernung)}\\,\\text{m}}`}
                />
              </>
            )}

            {data.case2 === 2 && (
              <>
                <p>Der rechte Bruch ist vertauscht (Zähler/Nenner).</p>
                <BlockMath
                  math={`\\dfrac{h_{\\text{Baum}}}{${pp(data.schatten)}\\,\\text{m}}
                = \\dfrac{${pp(data.entfernung)}\\,\\text{m}}{${pp(data.tim)}\\,\\text{m}}`}
                />
              </>
            )}

            {data.case2 === 3 && (
              <>
                <p>
                  Es wurde die falsche Länge verwendet (Summe statt
                  Baumschatten).
                </p>
                <BlockMath
                  math={`\\dfrac{h_{\\text{Baum}}}{\\color{#d33}{${pp(
                    data.schatten + data.entfernung,
                  )}\\,\\text{m}}}
                  = \\dfrac{${pp(data.tim)}\\,\\text{m}}{${pp(data.entfernung)}\\,\\text{m}}`}
                />
              </>
            )}

            <p>Richtig ist (Strahlensatz):</p>
            <BlockMath
              math={String.raw`
\begin{aligned}
\frac{h_{\text{Baum}}}{${pp(data.schatten)}\,\text{m}}
&= \frac{${pp(data.tim)}\,\text{m}}{${pp(data.entfernung)}\,\text{m}}
\\[6pt]
h_{\text{Baum}} &= \frac{${pp(data.tim)}\cdot ${pp(data.schatten)}}{${pp(
                data.entfernung,
              )}}\,\text{m}
\\[2pt]
&= ${pp(hBaum)}\,\text{m}
\end{aligned}`}
            />
          </>
        )
      },
    },

    // b)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            {data.case === 1 && (
              <p>
                Sarah ist kleiner als Tim. Begründen Sie, ob Sarah weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
            {data.case === 2 && (
              <p>
                Lukas ist kleiner als Tim. Begründen Sie, ob Lukas weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
            {data.case === 3 && (
              <p>
                Sophie ist größer als Tim. Begründen Sie, ob Sophie weiter oder
                weniger weit vom Baum wegstehen muss, um die Baumhöhe zu
                bestimmen.
              </p>
            )}
            {data.case === 4 && (
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
        // Kerngedanke: gleiche Steigung der Sonnenstrahlen ⇒ ähnliche Dreiecke.
        // Kleinere Person → kürzerer Schatten → muss weiter weg stehen, damit Enden zusammenfallen.
        // Größere Person → längerer Schatten → kann näher stehen.
        return (
          <>
            {data.case === 1 && (
              <p>
                Da Sarahs Schatten kürzer ist, muss sie <b>weiter</b> vom Baum
                wegstehen, damit die Schattenenden wieder zusammenfallen.
              </p>
            )}
            {data.case === 2 && (
              <p>
                Da Lukas’ Schatten kürzer ist, muss er <b>weiter</b> vom Baum
                wegstehen, damit die Schattenenden wieder zusammenfallen.
              </p>
            )}
            {data.case === 3 && (
              <p>
                Da Sophie größer ist (längerer Schatten), kann sie <b>näher</b>{' '}
                am Baum stehen, damit die Schattenenden zusammenfallen.
              </p>
            )}
            {data.case === 4 && (
              <p>
                Da Roberts Schatten kürzer ist, muss er <b>weiter</b> vom Baum
                wegstehen, damit die Schattenenden wieder zusammenfallen.
              </p>
            )}
          </>
        )
      },
    },

    // c)
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie den Winkel, unter dem die Sonnenstrahlen auf den Boden
            treffen.
          </p>
        )
      },
      solution({ data }) {
        // Winkel in GRAD (Korrektur ggü. ursprünglicher Radiant-Rundung)
        const alphaDeg = (Math.atan(data.tim / data.entfernung) * 180) / Math.PI
        const alphaRounded = Math.round(alphaDeg)

        return (
          <>
            <p>Im rechtwinkligen Dreieck (Gegenkathete/Hypotenuse):</p>
            <BlockMath
              math={`\\tan(\\alpha) = \\dfrac{${pp(data.tim)}\\,\\text{m}}{${pp(
                data.entfernung,
              )}\\,\\text{m}}`}
            />

            <p>
              Lösen nach&nbsp;
              <InlineMath math="\alpha" />:
            </p>
            <BlockMath
              math={String.raw`
\begin{aligned}
\alpha &= \tan^{-1}\!\left(\dfrac{${pp(data.tim)}}{${pp(data.entfernung)}}\right)\\[2pt]
&\approx ${alphaDeg.toFixed(2)}^{\circ}
\end{aligned}`}
            />

            <p>
              Damit beträgt der Einfallswinkel ungefähr{' '}
              <b>
                <InlineMath math={`${alphaRounded}^{\\circ}`} />
              </b>
              .
            </p>
          </>
        )
      },
    },
  ],
}
