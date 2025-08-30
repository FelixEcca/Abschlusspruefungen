import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  A: number
  B: number
  zero: number
  case: number
  case2: number
  case3: number
  personen: number
}

export const exercise3014: Exercise<DATA> = {
  title: 'Blutgruppen',
  source: '2021 Wahlteil Aufgabe 5A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      A: rng.randomIntBetween(35, 45),
      B: rng.randomIntBetween(15, 35),
      zero: rng.randomIntBetween(15, 40),
      case: rng.randomIntBetween(1, 4),
      case2: rng.randomIntBetween(1, 4),
      case3: rng.randomIntBetween(1, 4),
      personen: rng.randomIntBetween(10, 30) * 100,
    }
  },

  originalData: {
    A: 43,
    B: 11,
    zero: 41,
    case: 1,
    case2: 4,
    case3: 3,
    personen: 2000,
  },
  constraint({ data }) {
    const AB = 100 - (data.A + data.B + data.zero)
    return (
      AB >= 1 &&
      data.case != data.case2 &&
      data.case != data.case3 &&
      data.case2 != data.case3
    )
  },
  intro({ data }) {
    function toY(n: number) {
      return 310 - n * ((310 - 86) / 9)
    }
    const AB = 100 - (data.A + data.B + data.zero)
    return (
      <>
        <p>
          Das Schaubild zeigt, wie groß die relativen Häufigkeiten der
          Blutgruppen in der Bevölkerung sind.
        </p>
        <svg viewBox="0 0 328 338">
          <line
            x1={50}
            y1={310}
            x2={328}
            y2={310}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={315} fontSize={20} textAnchor="right" stroke="black">
            0
          </text>
          <line
            x1={50}
            y1={285}
            x2={328}
            y2={285}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={290} fontSize={20} textAnchor="left" stroke="black">
            0,05
          </text>
          <line
            x1={50}
            y1={260}
            x2={328}
            y2={260}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={265} fontSize={20} textAnchor="right" stroke="black">
            0,1
          </text>
          <line
            x1={50}
            y1={235}
            x2={328}
            y2={235}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={240} fontSize={20} textAnchor="right" stroke="black">
            0,15
          </text>
          <line
            x1={50}
            y1={210}
            x2={328}
            y2={210}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={215} fontSize={20} textAnchor="right" stroke="black">
            0,2
          </text>
          <line
            x1={50}
            y1={185}
            x2={328}
            y2={185}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={190} fontSize={20} textAnchor="right" stroke="black">
            0,25
          </text>
          <line
            x1={50}
            y1={160}
            x2={328}
            y2={160}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={165} fontSize={20} textAnchor="right" stroke="black">
            0,3
          </text>
          <line
            x1={50}
            y1={135}
            x2={328}
            y2={135}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={140} fontSize={20} textAnchor="right" stroke="black">
            0,35
          </text>
          <line
            x1={50}
            y1={110}
            x2={328}
            y2={110}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={115} fontSize={20} textAnchor="right" stroke="black">
            0,4
          </text>
          <line
            x1={50}
            y1={85}
            x2={328}
            y2={85}
            stroke="black"
            strokeWidth={1}
          />
          <text x={0} y={90} fontSize={20} textAnchor="right" stroke="black">
            0,45
          </text>
          <text x={80} y={335} fontSize={20} textAnchor="right" stroke="black">
            A
          </text>
          <text x={140} y={335} fontSize={20} textAnchor="right" stroke="black">
            B
          </text>
          <text x={200} y={335} fontSize={20} textAnchor="right" stroke="black">
            0
          </text>
          <text x={260} y={335} fontSize={20} textAnchor="right" stroke="black">
            AB
          </text>
          <rect
            x={70}
            y={toY(data.A / 5)}
            width={40}
            height={toY(0) - toY(data.A / 5)}
            fill="lightblue"
            stroke="black"
          />
          <rect
            x={130}
            y={toY(data.B / 5)}
            width={40}
            height={toY(0) - toY(data.B / 5)}
            fill="lightblue"
            stroke="black"
          />
          <rect
            x={190}
            y={toY(data.zero / 5)}
            width={40}
            height={toY(0) - toY(data.zero / 5)}
            fill="lightblue"
            stroke="black"
          />
          <rect
            x={250}
            y={toY(AB / 5)}
            width={40}
            height={toY(0) - toY(AB / 5)}
            fill="lightblue"
            stroke="black"
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
              Eine Person wird zufällig ausgewählt. Geben Sie mithilfe des
              Diagramms die Wahrscheinlichkeit an, dass die Person die
              Blutgruppe {data.case == 1 && 'A'} {data.case == 2 && 'B'}{' '}
              {data.case == 3 && '0'} {data.case == 4 && 'AB'} hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        const AB = 100 - (data.A + data.B + data.zero)
        return (
          <>
            <p>
              Das Diagramm zeigt, dass die Wahrscheinlichkeit für Blutgruppe{' '}
              {data.case == 1 && 'A'} {data.case == 2 && 'B'}{' '}
              {data.case == 3 && '0'} {data.case == 4 && 'AB'} bei{' '}
              {data.case == 1 && pp(data.A / 100)}{' '}
              {data.case == 2 && pp(data.B / 100)}{' '}
              {data.case == 3 && pp(data.zero / 100)}{' '}
              {data.case == 4 && pp(AB / 100)}, also {data.case == 1 && data.A}{' '}
              {data.case == 2 && data.B} {data.case == 3 && data.zero}{' '}
              {data.case == 4 && AB} % liegt.
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
              Bestimmen Sie die Wahrscheinlichkeit dafür, dass eine andere
              Person nicht Blutgruppe {data.case == 1 && 'A'}{' '}
              {data.case == 2 && 'B'} {data.case == 3 && '0'}{' '}
              {data.case == 4 && 'AB'} hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        const AB = 100 - (data.A + data.B + data.zero)
        return (
          <>
            <p>Berechne die Wahrscheinlichkeit des Gegenereignisses: </p>
            <p>
              P({data.case == 1 && <>{buildOverline('A')}</>}{' '}
              {data.case == 2 && <>{buildOverline('B')}</>}{' '}
              {data.case == 3 && <>{buildOverline('0')}</>}{' '}
              {data.case == 4 && <>{buildOverline('AB')}</>}) = 1 - P(
              {data.case == 1 && 'A'} {data.case == 2 && 'B'}{' '}
              {data.case == 3 && '0'} {data.case == 4 && 'AB'}){' '}
            </p>
            <p>
              P({data.case == 1 && <>{buildOverline('A')}</>}{' '}
              {data.case == 2 && <>{buildOverline('B')}</>}{' '}
              {data.case == 3 && <>{buildOverline('0')}</>}{' '}
              {data.case == 4 && <>{buildOverline('AB')}</>}) = 1 - P(
              {data.case == 1 && pp(data.A / 100)}{' '}
              {data.case == 2 && pp(data.B / 100)}{' '}
              {data.case == 3 && pp(data.zero / 100)}{' '}
              {data.case == 4 && pp(AB / 100)}){' '}
            </p>
            <p>
              P({data.case == 1 && <>{buildOverline('A')}</>}{' '}
              {data.case == 2 && <>{buildOverline('B')}</>}{' '}
              {data.case == 3 && <>{buildOverline('0')}</>}{' '}
              {data.case == 4 && <>{buildOverline('AB')}</>}) =
              {data.case == 1 && pp(1 - data.A / 100)}{' '}
              {data.case == 2 && pp(1 - data.B / 100)}{' '}
              {data.case == 3 && pp(1 - data.zero / 100)}{' '}
              {data.case == 4 && pp(1 - AB / 100)}{' '}
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
              Zwei Personen werden zufällig ausgewählt. Bestimmen Sie die
              Wahrscheinlichkeit dafür, dass beide Personen Blutgruppe{' '}
              {data.case2 == 1 && 'A'} {data.case2 == 2 && 'B'}{' '}
              {data.case2 == 3 && '0'} {data.case2 == 4 && 'AB'} haben.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Wahrscheinlichkeit dafür, dass eine Personen Blutgruppe{' '}
              {data.case2 == 1 && 'A'} {data.case2 == 2 && 'B'}{' '}
              {data.case2 == 3 && '0'} {data.case2 == 4 && 'AB'} hat, beträgt:
            </p>
            <p>
              P({data.case2 == 1 && <>{'A'}</>} {data.case2 == 2 && <>{'B'}</>}{' '}
              {data.case2 == 3 && <>{'0'}</>} {data.case2 == 4 && <>{'AB'}</>})
              ={data.case2 == 1 && pp(data.A / 100)}{' '}
              {data.case2 == 2 && pp(data.B / 100)}{' '}
              {data.case2 == 3 && pp(data.zero / 100)}{' '}
              {data.case2 == 4 &&
                pp((100 - (data.A + data.B + data.zero)) / 100)}{' '}
            </p>
            <p>
              Die Wahrscheinlichkeit, dass beide Personen Blutgruppe{' '}
              {data.case2 == 1 && 'A'} {data.case2 == 2 && 'B'}{' '}
              {data.case2 == 3 && '0'} {data.case2 == 4 && 'AB'} haben, beträgt:
            </p>
            <p>
              P({data.case2 == 1 && <>{'A,A'}</>}{' '}
              {data.case2 == 2 && <>{'B,B'}</>}{' '}
              {data.case2 == 3 && <>{'0,0'}</>}{' '}
              {data.case2 == 4 && <>{'AB,AB'}</>}) =
              {data.case2 == 1 && (
                <>
                  {pp(data.A / 100)} · {pp(data.A / 100)} ={' '}
                  {pp((data.A * data.A) / 10000)} ={' '}
                  {pp((data.A * data.A) / 100)} %
                </>
              )}{' '}
              {data.case2 == 2 && (
                <>
                  {pp(data.B / 100)} · {pp(data.B / 100)} ={' '}
                  {pp((data.B * data.B) / 10000)} ={' '}
                  {pp((data.B * data.B) / 100)} %
                </>
              )}{' '}
              {data.case2 == 3 && (
                <>
                  {pp(data.zero / 100)} · {pp(data.zero / 100)} ={' '}
                  {pp((data.zero * data.zero) / 10000)} ={' '}
                  {pp((data.zero * data.zero) / 100)} %
                </>
              )}{' '}
              {data.case2 == 4 && (
                <>
                  {pp((100 - (data.A + data.B + data.zero)) / 100)} ·{' '}
                  {pp((100 - (data.A + data.B + data.zero)) / 100)} ={' '}
                  {pp(
                    (((100 - (data.A + data.B + data.zero)) / 100) *
                      (100 - (data.A + data.B + data.zero))) /
                      100,
                  )}{' '}
                  ={' '}
                  {pp(
                    ((100 - (data.A + data.B + data.zero)) / 100) *
                      (100 - (data.A + data.B + data.zero)),
                  )}{' '}
                  %
                </>
              )}{' '}
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
              Eine Schule hat {data.personen} Schülerinnen und Schülern. Wie
              viele Personen mit Blutgruppe {data.case3 == 1 && 'A'}{' '}
              {data.case3 == 2 && 'B'} {data.case3 == 3 && '0'}{' '}
              {data.case3 == 4 && 'AB'} sind darunter zu erwarten?
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Anzahl der Personen mit Blutgruppe {data.case3 == 1 && 'A'}{' '}
              {data.case3 == 2 && 'B'} {data.case3 == 3 && '0'}{' '}
              {data.case3 == 4 && 'AB'} in der Schule beträgt:
            </p>
            <p>
              E = {data.personen} · {pp(data.zero / 100)} ={' '}
              {pp((data.zero / 100) * data.personen)} Personen
            </p>
          </>
        )
      },
    },
  ],
}
