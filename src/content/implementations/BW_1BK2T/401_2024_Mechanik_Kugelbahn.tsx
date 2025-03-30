import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildFrac,
  buildInlineFrac,
} from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  hb: number
  vb: number
}

export const exercise401: Exercise<DATA> = {
  title: 'Kugelbahn',
  source: '2024 Aufgabe 2 Mechanik',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      hb: rng.randomIntBetween(100, 300) / 10,
      vb: (rng.randomIntBetween(5, 12) * 25) / 100,
    }
  },
  originalData: { hb: 12, vb: 1.25 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Eine Eisenkugel mit der Masse m = 30 g wird im Punkt A auf eine
          Kugelbahn gelegt und aus der Ruhe heraus losgelassen, siehe Abbildung
          1. Die Kugel soll die gesamte Bahn durchlaufen, ohne den Kontakt zur
          Bahn zu verlieren. In den Punkten B und C durchläuft die Eisenkugel
          jeweils einen Kreisbogen mit den Radien r<sub>1</sub> und r
          <sub>2</sub>. Die Kugel wird als Massepunkt betrachtet. Die
          Fallbeschleunigung beträgt g = 9,81 {buildInlineFrac(<>m</>, <>s²</>)}
          . Reibungseffekte werden vernachlässigt.
        </p>
        <svg viewBox="0 0 328 120">
          <image href="/content/BW_1BK2T/401.png" height="120" width="328" />
          <text x={300} y={18} fontSize={10} textAnchor="middle" stroke="black">
            h &nbsp;&nbsp;= {pp(data.hb)} cm
          </text>
          <text x={283} y={22} fontSize={8} textAnchor="middle" stroke="black">
            B
          </text>
          <text x={300} y={28} fontSize={10} textAnchor="middle" stroke="black">
            h &nbsp;&nbsp;= 12 cm
          </text>
          <text x={283} y={30} fontSize={8} textAnchor="middle" stroke="black">
            c
          </text>
          <text x={300} y={38} fontSize={10} textAnchor="middle" stroke="black">
            r &nbsp;&nbsp;= 2 cm
          </text>
          <text x={283} y={44} fontSize={8} textAnchor="middle" stroke="black">
            1
          </text>
          <text x={300} y={48} fontSize={10} textAnchor="middle" stroke="black">
            r &nbsp;&nbsp;= 5 cm
          </text>
          <text x={283} y={54} fontSize={8} textAnchor="middle" stroke="black">
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
              Die resultierende Kraft entspricht der Zentrifugalkraft, die die
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
        return (
          <>
            <p>Die Zentrifugalkraft </p>
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
        return <></>
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
        return <></>
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
        return <></>
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
        return <></>
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
        return <></>
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
              Berechnen Sie für einen Neigungswinkel von α = 15° die Verzögerung
              der Eisenkugel auf der schiefen Ebene.
            </p>
          </>
        )
      },
      solution({ data }) {
        return <></>
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
                s = 3 cm
              </text>
              <text
                x={130}
                y={90}
                fontSize={10}
                textAnchor="left"
                stroke="black"
              >
                m&nbsp;&nbsp; = 30 g
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
                m&nbsp;&nbsp; = 20 g
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
                D = 3,5 N/m
              </text>
            </svg>
            <p>Bestimmen Sie die Periodendauer der Schwingung.</p>
          </>
        )
      },
      solution({ data }) {
        return <></>
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
              Zum Zeitpunkt t = s passiert die Kugel samt Prallplatte die
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
        return <></>
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
        return <></>
      },
    },
  ],
}
