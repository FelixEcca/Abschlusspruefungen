import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { InlineMath } from 'react-katex'

interface DATA {
  untergrenze: number
  obergrenze: number
  höchststeuer: number
  einkommen: number
  guess: number
  bool: boolean
}

export const exercise3159: Exercise<DATA> = {
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
      intro() {
        return null
      },
      task() {
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
              Bis zu einem Einkommen von{' '}
              <InlineMath math={`${data.untergrenze * 10000}\\,\\text{€}`} />{' '}
              beträgt der Steuersatz <InlineMath math={`0\\,\\%`} />.
            </p>
            <p>
              Ab <InlineMath math={`${data.untergrenze * 10000}\\,\\text{€}`} />{' '}
              steigt der Steuersatz linear mit dem Einkommen an.
            </p>
            <p>
              Ab einem Einkommen von{' '}
              <InlineMath math={`${data.obergrenze * 10000}\\,\\text{€}`} />{' '}
              bezahlt man den Höchststeuersatz{' '}
              <InlineMath math={`${data.höchststeuer * 10}\\,\\%`} />.
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
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
              Alex behauptet: „Bei einem Einkommen von{' '}
              <InlineMath math={`${data.einkommen}\\,\\text{€}`} /> muss man an
              den Staat Futura{' '}
              {data.bool ? (
                <InlineMath
                  math={`${pp((data.einkommen * steuer) / 100)}\\,\\text{€}`}
                />
              ) : (
                <InlineMath math={`${data.guess}\\,\\text{€}`} />
              )}{' '}
              Steuern bezahlen.“
              <br /> B€teilen Sie, ob Alex recht hat.
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
              Bestimme den Steuersatz bei einem Einkommen von{' '}
              <InlineMath math={`${data.einkommen}\\,\\text{€}`} />.
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
                strokeDasharray="5,5"
              />
            </svg>

            <p>
              Der Steuersatz beträgt etwa{' '}
              <InlineMath math={`${steuer}\\,\\%`} />.
            </p>

            <p>Berechne die fälligen Steuern mit dem Dreisatz:</p>
            {buildEquation([
              [
                <>
                  <InlineMath math={'\\text{Steuerbetrag } S'} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={'\\text{Einkommen } E\\;\\cdot\\;p'} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\frac{${data.einkommen}\\cdot ${steuer}}{100}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`${pp((data.einkommen * steuer) / 100)}\\,\\text{€}`}
                  />
                </>,
              ],
            ])}

            <p>
              Man müsste{' '}
              <InlineMath
                math={`${pp((data.einkommen * steuer) / 100)}\\,\\text{€}`}
              />{' '}
              Steuern bezahlen. Damit hat Alex{' '}
              {data.bool ? <>recht.</> : <>nicht recht.</>}
            </p>
          </>
        )
      },
    },
  ],
}
