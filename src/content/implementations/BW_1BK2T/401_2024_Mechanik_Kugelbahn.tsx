import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  hb: number
  hc: number
  vb: number
  mass: number
  r1: number
  r2: number
  angle: number
  s: number
  m2: number
  D: number
}

export const exercise401: Exercise<DATA> = {
  title: 'Kugelbahn',
  source: '2024 Aufgabe 2 Mechanik',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      hb: rng.randomIntBetween(100, 300) / 10,
      hc: rng.randomIntBetween(200, 400) / 10,
      vb: (rng.randomIntBetween(5, 12) * 25) / 100,
      mass: rng.randomIntBetween(1, 9) * 10,
      r1: rng.randomIntBetween(2, 8),
      r2: rng.randomIntBetween(4, 10),
      angle: rng.randomIntBetween(10, 30),
      s: rng.randomIntBetween(2, 6),
      m2: rng.randomIntBetween(10, 5) * 10,
      D: rng.randomIntBetween(15, 50) / 10,
    }
  },
  originalData: {
    hb: 12,
    vb: 1.25,
    mass: 30,
    r1: 2,
    r2: 5,
    hc: 18,
    angle: 15,
    s: 3,
    m2: 20,
    D: 3.5,
  },
  constraint({ data }) {
    const vcmax = roundToDigits(Math.sqrt(9.81 * (data.r2 / 100)), 2)
    const vc = roundToDigits(
      Math.sqrt(2 * 9.81 * (data.hb / 100 - data.hc / 100) + data.vb * data.vb),
      2,
    )
    return data.r1 < data.r2 && data.hc > data.hb + 5 && vc < vcmax
  },
  intro({ data }) {
    return (
      <>
        <p>
          Eine Eisenkugel mit der Masse m = {data.mass} g wird im Punkt A auf
          eine Kugelbahn gelegt und aus der Ruhe heraus losgelassen, siehe
          Abbildung 1. Die Kugel soll die gesamte Bahn durchlaufen, ohne den
          Kontakt zur Bahn zu verlieren. In den Punkten B und C durchläuft die
          Eisenkugel jeweils einen Kreisbogen mit den Radien r<sub>1</sub> und r
          <sub>2</sub>. Die Kugel wird als Massepunkt betrachtet. Die
          Fallbeschleunigung beträgt g = 9,81 {buildInlineFrac(<>m</>, <>s²</>)}
          . Reibungseffekte werden vernachlässigt.
        </p>
        <svg viewBox="0 0 328 120">
          <image href="/content/BW_1BK2T/401.png" height="120" width="328" />
          <text x={265} y={18} fontSize={10} textAnchor="left" stroke="black">
            h &nbsp;&nbsp;= {pp(data.hb)} cm
          </text>
          <text x={273} y={22} fontSize={8} textAnchor="left" stroke="black">
            B
          </text>
          <text x={265} y={28} fontSize={10} textAnchor="left" stroke="black">
            h &nbsp;&nbsp;= {pp(data.hc)} cm
          </text>
          <text x={273} y={30} fontSize={8} textAnchor="left" stroke="black">
            c
          </text>
          <text x={265} y={38} fontSize={10} textAnchor="left" stroke="black">
            r &nbsp;&nbsp;= 2 cm
          </text>
          <text x={273} y={44} fontSize={8} textAnchor="left" stroke="black">
            1
          </text>
          <text x={265} y={48} fontSize={10} textAnchor="left" stroke="black">
            r &nbsp;&nbsp;= 5 cm
          </text>
          <text x={273} y={54} fontSize={8} textAnchor="left" stroke="black">
            2
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
              Die Eisenkugel soll im Punkt B die Geschwindigkeit v<sub>B</sub> =
              {pp(data.vb)} {buildInlineFrac(<>m</>, <>s</>)} besitzen.
              Berechnen Sie, in welcher Höhe h<sub>A</sub> die Eisenkugel
              starten muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        const ha = roundToDigits(
          ((9.81 * data.hb) / 100 + 0.5 * data.vb * data.vb) / 9.81,
          2,
        )
        return (
          <>
            <p>
              Berechne die Höhe mithilfe des Energieerhaltungssatzes. In Punkt A
              hat die Kugel nur potentielle Energie. Im Punkt B hat sie
              potentielle, sowie kinetische Energie:
            </p>
            <div>
              <span style={{ fontSize: '0.7em' }}>
                {buildEquation([
                  [
                    <>
                      m · g · h<sub>A</sub>
                    </>,
                    <>=</>,
                    <>
                      m · g · h<sub>B</sub> + {ppFrac(1 / 2)} · m · v
                      <sub>B</sub>²
                    </>,
                    <>| : m</>,
                  ],
                  [
                    <>
                      g · h<sub>A</sub>
                    </>,
                    <>=</>,
                    <>
                      g · h<sub>B</sub> + {ppFrac(1 / 2)} · v<sub>B</sub>²
                    </>,
                    <>| : g</>,
                  ],
                  [
                    <>
                      h<sub>A</sub>
                    </>,
                    <>=</>,
                    <>
                      {buildFrac(
                        <>
                          g · h<sub>B</sub> + {ppFrac(1 / 2)} · v<sub>B</sub>²
                        </>,
                        <>g</>,
                      )}
                    </>,
                  ],
                  [
                    <>
                      h<sub>A</sub>
                    </>,
                    <>=</>,
                    <>
                      {buildFrac(
                        <>
                          9,81 {buildInlineFrac(<>m</>, <>s²</>)} ·{' '}
                          {pp(data.hb / 100)} m + {ppFrac(1 / 2)} ·{' '}
                          <span className="inline-block  scale-y-[2]">(</span>
                          {pp(data.vb)} {buildInlineFrac(<>m</>, <>s</>)}
                          <span className="inline-block  scale-y-[2]">)</span>²
                        </>,
                        <>9,81 {buildInlineFrac(<>m</>, <>s²</>)}</>,
                      )}
                    </>,
                  ],
                  [
                    <>
                      h<sub>A</sub>
                    </>,
                    <>≈</>,
                    <>{pp(ha)} m</>,
                  ],
                ])}
              </span>
            </div>
            <p>
              Die Eisenkugel muss in der Höhe <br></br>h<sub>A</sub> ≈{' '}
              {pp(ha * 100)} cm starten.
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
              Fertigen Sie für die rollende Eisenkugel im Punkt B eine
              vollständige Kräfteskizze.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Kräfteskizze:</p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/BW_1BK2T/401_5.png"
                height="80"
                width="328"
              />
            </svg>
            <p>
              Die resultierende Kraft entspricht der Zentripetalkraft, die die
              Kreisbewegung im Punkt B zustandebringt.
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
              Berechnen Sie die Kraft, mit der die Unterlage im Punkt B auf die
              Eisenkugel wirkt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const fu = roundToDigits(
          (data.mass / 1000) * 9.81 +
            ((data.mass / 1000) * data.vb * data.vb) / (data.r1 / 100),
          2,
        )
        return (
          <>
            <p>
              Die Unterlage muss so viel Kraft ausüben, dass die Gewichtskraft
              der Kugel kompensiert und die Zentripetalkraft für die
              Kreisbewegung aufgebracht wird. Es gilt also:
            </p>
            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>
                      F<sub>U</sub>
                    </>,
                    <>=</>,
                    <>
                      F<sub>G</sub> + F<sub>Z</sub>
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      m · g + m ·{' '}
                      {buildInlineFrac(
                        <>v²</>,
                        <>
                          r<sub>1</sub>
                        </>,
                      )}
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      {pp(data.mass / 1000)} kg · 9,81{' '}
                      {buildInlineFrac(<>m</>, <>s²</>)} +{' '}
                      {pp(data.mass / 1000)} kg ·{' '}
                      {buildInlineFrac(
                        <>
                          <span className="inline-block  scale-y-[2]">(</span>
                          {pp(data.vb)} {buildInlineFrac(<>m</>, <>s</>)}
                          <span className="inline-block  scale-y-[2]">)</span>²
                        </>,
                        <>{pp(data.r1 / 100)} m</>,
                      )}
                    </>,
                  ],
                  [<></>, <>≈</>, <>{pp(fu)} N</>],
                ])}
              </span>
            </div>
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
              Fertigen Sie für die Eisenkugel im Punkt C eine vollständige
              Kräfteskizze an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Kräfteskizze:</p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/BW_1BK2T/401_6.png"
                height="80"
                width="328"
              />
            </svg>
            <p>
              Um Punkt C befindet sich die Kugel auf einer Kreisbahn. Die
              Zentripetalkraft wird durch einen Teil der Gewichtskraft
              aufgebracht.
            </p>
            <p>
              Die Gewichtskraft wird dann im Punkt C vollständig durch die
              Unterlagskraft kompensiert. Die beiden Kräftepfeile sind gleich
              lang.
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
              Damit die Eisenkugel im Punkt C den Kontakt zur Fahrbahn nicht
              verliert, darf sie eine bestimmte Maximalgeschwindigkeit v
              <sub>c, max</sub> nicht überschreiten. Bestimmen Sie die maximal
              mögliche Geschwindigkeit v<sub>c, max</sub> der Eisenkugel.
            </p>
          </>
        )
      },
      solution({ data }) {
        const vcmax = roundToDigits(Math.sqrt(9.81 * (data.r2 / 100)), 2)
        return (
          <>
            <p>
              Damit die Eisenkugel gerade so nicht den Kontakt verliert, gilt F
              <sub>U</sub> = 0 N.
            </p>
            <p>
              Im Punkt C selbst ist dann die Zentripetalkraft der Kreisbewegung
              durch die Gewichtskraft gegeben:
            </p>
            {buildEquation([
              [
                <>
                  F<sub>Z</sub>
                </>,
                <>=</>,
                <>
                  F<sub>G</sub>
                </>,
              ],
              [
                <>
                  m ·{' '}
                  {buildInlineFrac(
                    <>v²</>,
                    <>
                      r<sub>2</sub>
                    </>,
                  )}
                </>,
                <>=</>,
                <>m · g</>,
                <>| : m</>,
              ],
              [
                <>
                  {buildInlineFrac(
                    <>v²</>,
                    <>
                      r<sub>2</sub>
                    </>,
                  )}
                </>,
                <>=</>,
                <>g</>,
                <>
                  | · r<sub>2</sub>
                </>,
              ],
              [
                <>v²</>,
                <>=</>,
                <>
                  g · r<sub>2</sub>
                </>,
                <>| √</>,
              ],
              [
                <>
                  v<sub>c, max</sub>
                </>,
                <>=</>,
                <>
                  {buildSqrt(
                    <>
                      9,81 {buildInlineFrac(<>m</>, <>s²</>)} ·{' '}
                      {pp(data.r2 / 100)} m
                    </>,
                  )}
                </>,
              ],
              [
                <>
                  v<sub>c, max</sub>
                </>,
                <>≈</>,
                <>
                  {pp(vcmax)} {buildInlineFrac(<>m</>, <>s</>)}
                </>,
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
            <p>
              Überprüfen Sie rechnerisch, ob die Eisenkugel im Punkt C den
              Kontakt zur Fahrbahn verliert.
            </p>
          </>
        )
      },
      solution({ data }) {
        const vcmax = roundToDigits(Math.sqrt(9.81 * (data.r2 / 100)), 2)
        const vc = roundToDigits(
          Math.sqrt(
            2 * 9.81 * (data.hb / 100 - data.hc / 100) + data.vb * data.vb,
          ),
          2,
        )
        return (
          <>
            <p>
              Berechne die Geschwindigkeit v<sub>c</sub> mithilfe des
              Energieerhaltungssatzes:{' '}
            </p>
            <div>
              <span style={{ fontSize: '0.6em' }}>
                {buildEquation([
                  [
                    <>
                      E<sub>pot,C</sub> + E<sub>kin,C</sub>
                    </>,
                    <>=</>,
                    <>
                      E<sub>pot,B</sub> + E<sub>kin,B</sub>
                    </>,
                  ],
                  [
                    <>
                      m · g · h<sub>C</sub> + {ppFrac(1 / 2)} · m · v
                      <sub>C</sub>²
                    </>,
                    <>=</>,
                    <>
                      m · g · h<sub>B</sub> + {ppFrac(1 / 2)} · m · v
                      <sub>B</sub>²
                    </>,
                    <>| : m</>,
                  ],
                  [
                    <>
                      g · h<sub>C</sub> + {ppFrac(1 / 2)} · v<sub>C</sub>²
                    </>,
                    <>=</>,
                    <>
                      g · h<sub>B</sub> + {ppFrac(1 / 2)} · v<sub>B</sub>²
                    </>,
                    <>
                      | - g · h<sub>C</sub>
                    </>,
                  ],
                  [
                    <>
                      {ppFrac(1 / 2)} · v<sub>C</sub>²
                    </>,
                    <>=</>,
                    <>
                      g · h<sub>B</sub> - g · h<sub>C</sub> + {ppFrac(1 / 2)} ·
                      v<sub>B</sub>²
                    </>,
                    <>| · 2</>,
                  ],
                  [
                    <>
                      v<sub>C</sub>²
                    </>,
                    <>=</>,
                    <>
                      2 · g · h<sub>B</sub> - 2 · g · h<sub>C</sub> + v
                      <sub>B</sub>²
                    </>,
                    <>| √</>,
                  ],
                  [
                    <>
                      v<sub>C</sub>
                    </>,
                    <>=</>,
                    <>
                      {buildSqrt(
                        <>
                          2 · g · (h<sub>B</sub> - h<sub>C</sub>) + v
                          <sub>B</sub>²
                        </>,
                      )}
                    </>,
                  ],
                  [
                    <>
                      v<sub>C</sub>
                    </>,
                    <>≈</>,
                    <>
                      {pp(vc)} {buildInlineFrac(<>m</>, <>s</>)}
                    </>,
                  ],
                ])}
              </span>
            </div>
            <p>
              Da {pp(vc)} {buildInlineFrac(<>m</>, <>s</>)} kleiner ist als v
              <sub>c, max</sub> ≈ {pp(vcmax)} {buildInlineFrac(<>m</>, <>s</>)}{' '}
              verliert die Kugel nicht den Kontakt.
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
              Zwischen den Punkten D und E bewegt sich die Eisenkugel auf einer
              schiefen Ebene. Abbildung 2 zeigt verschiedene vereinfachte
              Bewegungsdiagramme.
            </p>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/BW_1BK2T/401_2.png"
                height="120"
                width="328"
              />
            </svg>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/BW_1BK2T/401_3.png"
                height="120"
                width="328"
              />
            </svg>
            <p>
              Entscheiden Sie begründet, welches s-t-Diagramm, v-t-Diagramm und
              a-t-Diagramm die Bewegung der Eisenkugel auf der schiefen Ebene
              richtig wiedergibt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Kugel rollt eine schiefe Ebene hinauf, wodurch sie langsamer
              wird.
            </p>
            <ul>
              <li>
                Das passende a-t-Digramm ist damit Nr. 4, da die Beschleunigung
                negativ sein muss.
              </li>
              <li>
                Da die anfänglich positive Geschwindigkeit im Lauf der Zeit
                abnimmt, kommt für das v-t-Diagramm nur Nr. 1 infrage.
              </li>
              <li>
                Das s-t-Diagramm muss einen abflachenden Verlauf darstellen, da
                die langsamer werdende Kugel immer weniger Strecke in gleicher
                Zeit zurücklegt. Das zeigt Diagramm Nr. 5.
              </li>
            </ul>
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
              Fertigen Sie für die Eisenkugel auf der schiefen Ebene eine
              Kräfteskizze mit geeigneter Kräftezerlegung an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <svg viewBox="0 0 328 120">
              <image
                href="/content/BW_1BK2T/401_7.png"
                height="120"
                width="328"
              />
            </svg>
            <p>
              Die Kräfteskizze beinhaltet die Gewichtskraft, welche in die
              Komponente in Richtung der Ebene (F
              <sub>H</sub>) und Komponente senkrecht zur Ebene (F<sub>N</sub>)
              zerlegt wird. Die Kraft, die die Unterlage aufbringen muss (F
              <sub>U</sub>) ist dabei genau so groß wie F<sub>N</sub>.
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
              Berechnen Sie für einen Neigungswinkel von α = {data.angle}° die
              Verzögerung der Eisenkugel auf der schiefen Ebene.
            </p>
          </>
        )
      },
      solution({ data }) {
        const fh = roundToDigits(
          (Math.cos((2 * Math.PI * data.angle) / 360) * 9.81 * data.mass) /
            1000,
          2,
        )
        return (
          <>
            <p>
              Die Verzögerung wird berechnet mit dem Grundgesetz der Mechanik,
              wobei die Verzögerung durch die Hangabtriebskraft verursacht wird:
            </p>
            <p>
              F<sub>H</sub> = m · a
            </p>
            <p>
              Die Kraft F<sub>H</sub> ist dabei eine Komponente der
              Gewichtskraft, die im rechtwinkligen Dreieck mithilfe von α
              berechnet werden kann.
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_1BK2T/401_8.png"
                height="150"
                width="328"
              />
            </svg>
            {buildEquation([
              [
                <>
                  F<sub>H</sub>
                </>,
                <>=</>,
                <>
                  F<sub>G</sub> · cos(α)
                </>,
              ],
              [<></>, <>=</>, <>m · g · cos(α)</>],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.mass / 1000)} kg · 9,81{' '}
                  {buildInlineFrac(<>m</>, <>s²</>)} · cos({pp(data.angle)}°)
                </>,
              ],
              [<></>, <>≈</>, <>{pp(fh)} N</>],
            ])}
            <p>Die Verzögerung beträgt damit:</p>
            <p>
              a ={' '}
              {buildInlineFrac(
                <>
                  F<sub>H</sub>
                </>,
                <>m</>,
              )}{' '}
              ={' '}
              {buildInlineFrac(<>{pp(fh)} N</>, <>{pp(data.mass / 1000)} kg</>)}{' '}
              ≈ {pp(roundToDigits(fh / (data.mass / 1000), 2))}{' '}
              {buildInlineFrac(<>m</>, <>s²</>)}
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
              Nach Verlassen der Bahn am Punkt E fliegt die Eisenkugel der Masse
              m<sub>1</sub> durch die Luft und landet im Punkt F in einer Röhre.
              Die Achse der Röhre verläuft tangential zur Flugbahn in Punkt F.
            </p>
            <p>
              Am unteren Ende ist eine Feder mit magnetischer Prallplatte der
              Masse m<sub>2</sub> befestigt, auf der die Eisenkugel nach dem
              Auftreffen haften bleibt, siehe Abbildung 3.
            </p>
            <p>
              Danach führen Eisenkugel und Prallplatte zusammen eine harmonische
              Schwingung um die sich ergebende Gleichgewichtslage aus.
            </p>
            <p>
              Die Masse der Feder und Reibungseffekte werden vernachlässigt.
            </p>
            <svg viewBox="0 0 328 150">
              <image
                href="/content/BW_1BK2T/401_4.png"
                height="150"
                width="328"
              />
              <text
                x={130}
                y={80}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                s = {data.s} cm
              </text>
              <text
                x={130}
                y={90}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                m&nbsp;&nbsp; = {data.mass} g
              </text>
              <text
                x={140}
                y={94}
                fontSize={7}
                textAnchor="left"
                stroke="black"
              >
                1
              </text>
              <text
                x={130}
                y={100}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                m&nbsp;&nbsp; = {data.m2} g
              </text>
              <text
                x={140}
                y={104}
                fontSize={7}
                textAnchor="left"
                stroke="black"
              >
                2
              </text>
              <text
                x={130}
                y={115}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                D = {data.D} N/m
              </text>
            </svg>
            <p>Bestimmen Sie die Periodendauer der Schwingung.</p>
          </>
        )
      },
      solution({ data }) {
        const T = roundToDigits(
          2 * Math.PI * Math.sqrt((data.mass + data.m2) / 1000 / data.D),
          2,
        )
        return (
          <>
            <p>Für die Periodendauer beim Federpendel gilt:</p>
            {buildEquation([
              [
                <>T</>,
                <>=</>,
                <>2π{buildSqrt(<>{buildInlineFrac(<>m</>, <>D</>)}</>)}</>,
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
                      m bezeichnet die gesamte Masse aus Kugel und Platte
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  2π
                  {buildSqrt(
                    <>
                      {buildInlineFrac(
                        <>{pp((data.mass + data.m2) / 1000)} kg</>,
                        <>
                          {pp(data.D)} {buildInlineFrac(<>N</>, <>m</>)}
                        </>,
                      )}
                    </>,
                  )}
                </>,
              ],
              [<></>, <>≈</>, <>{pp(T)} s</>],
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
            <p>
              Zum Zeitpunkt t = 12 s passiert die Kugel samt Prallplatte die
              Gleichgewichtslage zum ersten Mal.
            </p>
            <p>
              Geben Sie das Elongations-Zeit-Gesetz dieser Schwingung allgemein
              und mit Zahlenwerten an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const omega = roundToDigits(
          Math.sqrt(data.D / ((data.m2 + data.mass) / 1000)),
          2,
        )
        return (
          <>
            <p>
              Die Schwingung kann mithilfe der Winkelfunktionen Sinus und
              Kosinus beschrieben werden. Befindet sich die Feder zum Beginn der
              Betrachtung in der Gleichgewichtslage, beschreibt der Sinus die
              Schwinung korrekt.
            </p>
            <p>
              s(t) = s<sub>Amplitude</sub> · sin(ωt)
            </p>
            <p>
              Dabei ist ω = {buildInlineFrac(<>2π</>, <>T</>)} ={' '}
              {buildInlineFrac(<>D</>, <>m</>)}
            </p>
            <p>
              Mit den Zahlenwerten ergibt sich: <br></br>ω = {pp(omega)} s
              <sup>-1</sup>
            </p>
            <p>
              s(t) = {pp(data.s / 100)} m · sin({pp(omega)} s<sup>-1</sup> · t)
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
              Geben Sie an, in welcher Position die Eisenkugel ihre maximale
              Beschleunigung erfährt.
            </p>
            <p>Berechnen Sie den Betrag der maximalen Beschleunigung.</p>
          </>
        )
      },
      solution({ data }) {
        const omega = roundToDigits(
          Math.sqrt(data.D / ((data.m2 + data.mass) / 1000)),
          2,
        )
        return (
          <>
            <p>
              Die maximale Beschleunigung erfährt die Kugel in den Punkten, wo
              sich die Feder maximal von der Gleichgewichtslage entfernt - an
              den Umkehrpunkten der Schwingung.
            </p>
            <p>Für die Beschleunigung gilt nach Anwenden der Ableitung:</p>
            <p>
              a(t) = s&apos;&apos;(t) = - s<sub>Amplitude</sub> · sin(ωt) · ω²{' '}
            </p>
            <p>
              Da sin(ωt) in den Umkehrpunkten den maximalen Wert (nämlich 1)
              annimmt, gilt:
            </p>
            <p>
              a<sub>max</sub> = s<sub>Amplitude</sub> · ω² ≈{' '}
              {pp(roundToDigits((omega * omega * data.s) / 100, 2))}{' '}
              {buildInlineFrac(<>m</>, <>s²</>)}
            </p>
          </>
        )
      },
    },
  ],
}
