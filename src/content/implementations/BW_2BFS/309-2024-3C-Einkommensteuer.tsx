import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  untergrenze: number
  obergrenze: number
  höchststeuer: number
  einkommen: number
  guess: number
  bool: boolean
}

export const exercise309: Exercise<DATA> = {
  title: 'Einkommensteuer',
  source: '2024 Wahlteil Aufgabe 3C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      untergrenze: (rng.randomIntBetween(1, 4) * 5) / 10,
      obergrenze: (rng.randomIntBetween(10, 16) * 5) / 10,
      höchststeuer: (rng.randomIntBetween(8, 12) * 5) / 10,
      einkommen: rng.randomIntBetween(3, 11) * 5000,
      guess: rng.randomIntBetween(2, 5) * 2500,
      bool: rng.randomBoolean(),
    }
  },
  originalData: {
    untergrenze: 1,
    obergrenze: 7,
    höchststeuer: 5,
    einkommen: 40000,
    guess: 8000,
    bool: false,
  },
  constraint({ data }) {
    const steuer = Math.round(
      ((data.einkommen - data.untergrenze * 10000) *
        (data.höchststeuer * 10000)) /
        (data.obergrenze * 10000 - data.untergrenze * 10000) /
        1000,
    )
    return (
      data.einkommen / 10000 > data.untergrenze &&
      data.einkommen / 10000 < data.obergrenze &&
      data.guess / 2500 < data.einkommen / 10000 &&
      (data.einkommen * steuer) / 100 != data.guess
    )
  },
  intro({ data }) {
    function toX(n: number) {
      return 30 + n * ((283.5 - 30) / 10)
    }
    function toY(n: number) {
      return 189.5 - n * ((283.5 - 30) / 10)
    }
    return (
      <>
        <p>
          Der Staat Futura hat das im Schaubild dargestellte Modell für die
          Berechnung der Einkommensteuer.
        </p>
        <svg viewBox="0 0 328 210">
          <image href="/content/BW_2BFS/309.png" height="210" width="328" />
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={toX(data.untergrenze)}
            y2={toY(0)}
            stroke="blue"
            strokeWidth={2}
          />

          <line
            x1={toX(data.untergrenze)}
            y1={toY(0)}
            x2={toX(data.obergrenze)}
            y2={toY(data.höchststeuer)}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(11)}
            y1={toY(data.höchststeuer)}
            x2={toX(data.obergrenze)}
            y2={toY(data.höchststeuer)}
            stroke="blue"
            strokeWidth={2}
          />
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
              Beschreiben Sie den Verlauf des dargestellten Zusammenhangs
              zwischen dem Einkommen und dem Steuersatz.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bis zu einem Einkommen von {data.untergrenze * 10000} Euro beträgt
              der Steuersatz 0 %.
            </p>
            <p>
              Ab {data.untergrenze * 10000} Euro steigt der Steuersatz linear
              mit dem Einkommen an.
            </p>
            <p>
              Ab einem Einkommen von {data.obergrenze * 10000} Euro bezahlt man
              den Höchststeuersatz mit {data.höchststeuer * 10} %.
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
        const steuer = Math.round(
          ((data.einkommen - data.untergrenze * 10000) *
            (data.höchststeuer * 10000)) /
            (data.obergrenze * 10000 - data.untergrenze * 10000) /
            1000,
        )
        return (
          <>
            <p>
              Alex behauptet: &quot;Bei einem Einkommen von {data.einkommen} EUR
              muss man an den Staat Futura{' '}
              {data.bool ? (
                <>{pp((data.einkommen * steuer) / 100)}</>
              ) : (
                <>{data.guess}</>
              )}{' '}
              EUR Steuern bezahlen.&quot;<br></br> Beurteilen Sie, ob Alex recht
              hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 30 + n * ((283.5 - 30) / 10)
        }
        function toY(n: number) {
          return 189.5 - n * ((283.5 - 30) / 10)
        }
        const steuer = Math.round(
          ((data.einkommen - data.untergrenze * 10000) *
            (data.höchststeuer * 10000)) /
            (data.obergrenze * 10000 - data.untergrenze * 10000) /
            1000,
        )

        return (
          <>
            <p>
              Bestimme den Steuersatz bei einem Einkommen von {data.einkommen}{' '}
              €.
            </p>
            <svg viewBox="0 0 328 210">
              <image href="/content/BW_2BFS/309.png" height="210" width="328" />
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(data.untergrenze)}
                y2={toY(0)}
                stroke="blue"
                strokeWidth={2}
              />

              <line
                x1={toX(data.untergrenze)}
                y1={toY(0)}
                x2={toX(data.obergrenze)}
                y2={toY(data.höchststeuer)}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(11)}
                y1={toY(data.höchststeuer)}
                x2={toX(data.obergrenze)}
                y2={toY(data.höchststeuer)}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(data.einkommen / 10000)}
                y1={toY(0)}
                x2={toX(data.einkommen / 10000)}
                y2={toY(7)}
                stroke="orange"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
            </svg>
            <p>Der Steuersatz beträgt etwa {steuer} %.</p>
            <p>
              Berechne, wie viel Steuern mit diesem Steuersatz bezahlt werden
              müssen:
            </p>
            {buildEquation([
              [<>P</>, <>=</>, <>G · p</>],
              [
                <></>,
                <>=</>,
                <>
                  {data.einkommen} · {pp(steuer / 100)}
                </>,
              ],
              [<></>, <>=</>, <>{pp((data.einkommen * steuer) / 100)}</>],
            ])}
            <p>
              Man müsste {pp((data.einkommen * steuer) / 100)} € Steuern
              bezahlen. Damit hat Alex{' '}
              {data.bool ? <>recht.</> : <>nicht recht.</>}
            </p>
          </>
        )
      },
    },
  ],
}
