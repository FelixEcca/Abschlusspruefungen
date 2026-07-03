import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

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
        {/* SVG unverändert */}
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
    // a)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Eine Person wird zufällig ausgewählt. Geben Sie mithilfe des
            Diagramms die Wahrscheinlichkeit an, dass die Person die Blutgruppe{' '}
            {data.case == 1 && 'A'}
            {data.case == 2 && 'B'}
            {data.case == 3 && '0'}
            {data.case == 4 && 'AB'} hat.
          </p>
        )
      },
      solution({ data }) {
        const AB = 100 - (data.A + data.B + data.zero)
        const num = [0, data.A, data.B, data.zero, AB][data.case]
        return (
          <>
            <p>Aus dem Diagramm ablesbar:</p>
            <BlockMath
              math={[
                data.case === 1 &&
                  `P(A)=\\tfrac{${num}}{100} = ${pp(num / 100)}\\,=\\,${pp(num)}\\%`,
                data.case === 2 &&
                  `P(B)=\\tfrac{${num}}{100} = ${pp(num / 100)}\\,=\\,${pp(num)}\\%`,
                data.case === 3 &&
                  `P(0)=\\tfrac{${num}}{100} = ${pp(num / 100)}\\,=\\,${pp(num)}\\%`,
                data.case === 4 &&
                  `P(AB)=\\tfrac{${num}}{100} = ${pp(num / 100)}\\,=\\,${pp(num)}\\%`,
              ]
                .filter(Boolean)
                .join('')}
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
          <p>
            Bestimmen Sie die Wahrscheinlichkeit dafür, dass eine andere Person
            nicht Blutgruppe {data.case == 1 && 'A'}
            {data.case == 2 && 'B'}
            {data.case == 3 && '0'}
            {data.case == 4 && 'AB'} hat.
          </p>
        )
      },
      solution({ data }) {
        const AB = 100 - (data.A + data.B + data.zero)
        const num = [0, data.A, data.B, data.zero, AB][data.case]
        const comp = 100 - num
        return (
          <>
            <p>Berechne mit dem Gegenereignis:</p>
            <BlockMath
              math={[
                data.case === 1 &&
                  `\\begin{aligned}
          P(\\overline{A}) &= 1 - P(A) \\\\
                           &= 1 - \\tfrac{${num}}{100} \\\\
                           &= \\tfrac{${comp}}{100} \\\\
                           &= ${pp(comp / 100)}
          \\end{aligned}`,
                data.case === 2 &&
                  `\\begin{aligned}
          P(\\overline{B}) &= 1 - P(B) \\\\
                           &= 1 - \\tfrac{${num}}{100} \\\\
                           &= \\tfrac{${comp}}{100} \\\\
                           &= ${pp(comp / 100)}
          \\end{aligned}`,
                data.case === 3 &&
                  `\\begin{aligned}
          P(\\overline{0}) &= 1 - P(0) \\\\
                           &= 1 - \\tfrac{${num}}{100} \\\\
                           &= \\tfrac{${comp}}{100} \\\\
                           &= ${pp(comp / 100)}
          \\end{aligned}`,
                data.case === 4 &&
                  `\\begin{aligned}
          P(\\overline{AB}) &= 1 - P(AB) \\\\
                            &= 1 - \\tfrac{${num}}{100} \\\\
                            &= \\tfrac{${comp}}{100} \\\\
                            &= ${pp(comp / 100)}
          \\end{aligned}`,
              ]
                .filter(Boolean)
                .join('')}
            />
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
      task({ data }) {
        return (
          <p>
            Zwei Personen werden zufällig ausgewählt. Bestimmen Sie die
            Wahrscheinlichkeit dafür, dass beide Personen Blutgruppe{' '}
            {data.case2 == 1 && 'A'}
            {data.case2 == 2 && 'B'}
            {data.case2 == 3 && '0'}
            {data.case2 == 4 && 'AB'} haben.
          </p>
        )
      },
      solution({ data }) {
        const AB = 100 - (data.A + data.B + data.zero)
        const num = [0, data.A, data.B, data.zero, AB][data.case2]
        const pDec = num / 100
        const p2Dec = pDec * pDec
        return (
          <>
            <p>Unabhängige Ziehungen (mit Zurücklegen):</p>
            <BlockMath
              math={[
                data.case2 === 1 &&
                  `\\begin{aligned}
          P(A\, A) &= \\Big(\\tfrac{${num}}{100}\\Big)^2 \\\\
                    &= \\tfrac{${num * num}}{10000} \\\\
                    &= ${pp(p2Dec)} \\\\
                    &= ${pp(p2Dec * 100)}\\%
          \\end{aligned}`,
                data.case2 === 2 &&
                  `\\begin{aligned}
          P(B\, B) &= \\Big(\\tfrac{${num}}{100}\\Big)^2 \\\\
                    &= \\tfrac{${num * num}}{10000} \\\\
                    &= ${pp(p2Dec)} \\\\
                    &= ${pp(p2Dec * 100)}\\%
          \\end{aligned}`,
                data.case2 === 3 &&
                  `\\begin{aligned}
          P(0\, 0) &= \\Big(\\tfrac{${num}}{100}\\Big)^2 \\\\
                    &= \\tfrac{${num * num}}{10000} \\\\
                    &= ${pp(p2Dec)} \\\\
                    &= ${pp(p2Dec * 100)}\\%
          \\end{aligned}`,
                data.case2 === 4 &&
                  `\\begin{aligned}
          P(AB\, AB) &= \\Big(\\tfrac{${num}}{100}\\Big)^2 \\\\
                      &= \\tfrac{${num * num}}{10000} \\\\
                      &= ${pp(p2Dec)} \\\\
                      &= ${pp(p2Dec * 100)}\\%
          \\end{aligned}`,
              ]
                .filter(Boolean)
                .join('')}
            />
          </>
        )
      },
    },
    // d)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Eine Schule hat {data.personen} Schülerinnen und Schülern. Wie viele
            Personen mit Blutgruppe {data.case3 == 1 && 'A'}
            {data.case3 == 2 && 'B'}
            {data.case3 == 3 && '0'}
            {data.case3 == 4 && 'AB'} sind darunter zu erwarten?
          </p>
        )
      },
      solution({ data }) {
        const AB = 100 - (data.A + data.B + data.zero)
        const num = [0, data.A, data.B, data.zero, AB][data.case3]
        const expected = (num / 100) * data.personen
        return (
          <>
            <p>Erwartungswert (Anzahl = Gesamt · Wahrscheinlichkeit):</p>
            <BlockMath
              math={[
                data.case3 === 1 &&
                  `E= ${data.personen}\\cdot \\tfrac{${num}}{100} = ${pp(expected)}`,
                data.case3 === 2 &&
                  `E= ${data.personen}\\cdot \\tfrac{${num}}{100} = ${pp(expected)}`,
                data.case3 === 3 &&
                  `E= ${data.personen}\\cdot \\tfrac{${num}}{100} = ${pp(expected)}`,
                data.case3 === 4 &&
                  `E= ${data.personen}\\cdot \\tfrac{${num}}{100} = ${pp(expected)}`,
              ]
                .filter(Boolean)
                .join('')}
            />
            <p>
              Es sind also etwa <b>{pp(expected)}</b> Personen zu erwarten.
            </p>
          </>
        )
      },
    },
  ],
}
