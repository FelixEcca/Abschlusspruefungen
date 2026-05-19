// exercise9572.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Figure = 'rechteckMinusRechteck' | 'rechteckPlusRechteck' | 'rechteckMinusDreieck'

interface DATA {
  figure: Figure
  a: number
  b: number
  c: number
  d: number
  unit: Unit
  area1: number
  area2: number
  result: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9572: Exercise<DATA> = {
  title: 'Zusammengesetzte Fläche',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const figure: Figure = rng.randomItemFromArray([
      'rechteckMinusRechteck',
      'rechteckPlusRechteck',
      'rechteckMinusDreieck',
    ])

    const a = rng.randomItemFromArray([8, 10, 12, 15, 18, 20])
    const b = rng.randomItemFromArray([5, 6, 8, 10, 12])
    const c = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const d = rng.randomItemFromArray([2, 3, 4, 5])

    if (figure === 'rechteckMinusRechteck') {
      const area1 = a * b
      const area2 = c * d
      return { figure, a, b, c, d, unit, area1, area2, result: area1 - area2 }
    }

    if (figure === 'rechteckPlusRechteck') {
      const area1 = a * b
      const area2 = c * d
      return { figure, a, b, c, d, unit, area1, area2, result: area1 + area2 }
    }

    const area1 = a * b
    const area2 = (c * d) / 2
    return { figure, a, b, c, d, unit, area1, area2, result: area1 - area2 }
  },

  originalData: {
    figure: 'rechteckMinusRechteck',
    a: 12,
    b: 8,
    c: 4,
    d: 3,
    unit: 'cm',
    area1: 96,
    area2: 12,
    result: 84,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt der Figur.</p>

        {data.figure === 'rechteckMinusRechteck' && (
          <svg viewBox="0 0 328 210">
            <path
              d="M 55 40 L 270 40 L 270 165 L 55 165 Z M 185 95 L 250 95 L 250 145 L 185 145 Z"
              fill="#eee"
              stroke="black"
              strokeWidth="2"
              fillRule="evenodd"
            />
            <text x="162" y="188" fontSize="14" textAnchor="middle">
              a = {pp(data.a)} {data.unit}
            </text>
            <text x="25" y="108" fontSize="14">
              b = {pp(data.b)} {data.unit}
            </text>
            <text x="218" y="88" fontSize="14" textAnchor="middle">
              c = {pp(data.c)} {data.unit}
            </text>
            <text x="255" y="123" fontSize="14">
              d = {pp(data.d)} {data.unit}
            </text>
          </svg>
        )}

        {data.figure === 'rechteckPlusRechteck' && (
          <svg viewBox="0 0 328 210">
            <rect x="55" y="70" width="190" height="95" fill="#eee" stroke="black" strokeWidth="2" />
            <rect x="55" y="35" width="85" height="35" fill="#eee" stroke="black" strokeWidth="2" />
            <text x="150" y="188" fontSize="14" textAnchor="middle">
              a = {pp(data.a)} {data.unit}
            </text>
            <text x="24" y="122" fontSize="14">
              b = {pp(data.b)} {data.unit}
            </text>
            <text x="98" y="28" fontSize="14" textAnchor="middle">
              c = {pp(data.c)} {data.unit}
            </text>
            <text x="145" y="56" fontSize="14">
              d = {pp(data.d)} {data.unit}
            </text>
          </svg>
        )}

        {data.figure === 'rechteckMinusDreieck' && (
          <svg viewBox="0 0 328 210">
            <rect x="55" y="45" width="215" height="120" fill="#eee" stroke="black" strokeWidth="2" />
            <polygon points="205,45 270,45 270,95" fill="white" stroke="black" strokeWidth="2" />
            <text x="162" y="188" fontSize="14" textAnchor="middle">
              a = {pp(data.a)} {data.unit}
            </text>
            <text x="25" y="108" fontSize="14">
              b = {pp(data.b)} {data.unit}
            </text>
            <text x="237" y="38" fontSize="14" textAnchor="middle">
              c = {pp(data.c)} {data.unit}
            </text>
            <text x="276" y="75" fontSize="14">
              d = {pp(data.d)} {data.unit}
            </text>
          </svg>
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.figure === 'rechteckMinusRechteck' && (
          <>
            <p>Berechne zuerst das große Rechteck.</p>
            <InlineMath
              math={`A_1=${pp(data.a)}\\cdot ${pp(data.b)}=${pp(
                data.area1,
              )}\\,${unitLatex(data.unit)}^2`}
            />
            <p>Dann berechne das kleine Rechteck.</p>
            <InlineMath
              math={`A_2=${pp(data.c)}\\cdot ${pp(data.d)}=${pp(
                data.area2,
              )}\\,${unitLatex(data.unit)}^2`}
            />
            <p>Das kleine Rechteck wird abgezogen.</p>
            <InlineMath
              math={`A=A_1-A_2=${pp(data.area1)}-${pp(data.area2)}=${pp(
                data.result,
              )}\\,${unitLatex(data.unit)}^2`}
            />
          </>
        )}

        {data.figure === 'rechteckPlusRechteck' && (
          <>
            <p>Die Figur besteht aus zwei Rechtecken.</p>
            <InlineMath
              math={`A_1=${pp(data.a)}\\cdot ${pp(data.b)}=${pp(
                data.area1,
              )}\\,${unitLatex(data.unit)}^2`}
            />
            <br />
            <InlineMath
              math={`A_2=${pp(data.c)}\\cdot ${pp(data.d)}=${pp(
                data.area2,
              )}\\,${unitLatex(data.unit)}^2`}
            />
            <p>Die Flächen werden addiert.</p>
            <InlineMath
              math={`A=A_1+A_2=${pp(data.area1)}+${pp(data.area2)}=${pp(
                data.result,
              )}\\,${unitLatex(data.unit)}^2`}
            />
          </>
        )}

        {data.figure === 'rechteckMinusDreieck' && (
          <>
            <p>Berechne zuerst das Rechteck.</p>
            <InlineMath
              math={`A_1=${pp(data.a)}\\cdot ${pp(data.b)}=${pp(
                data.area1,
              )}\\,${unitLatex(data.unit)}^2`}
            />
            <p>Dann berechne das Dreieck.</p>
            <InlineMath
              math={`A_2=\\frac{${pp(data.c)}\\cdot ${pp(data.d)}}{2}=${pp(
                data.area2,
              )}\\,${unitLatex(data.unit)}^2`}
            />
            <p>Das Dreieck wird abgezogen.</p>
            <InlineMath
              math={`A=A_1-A_2=${pp(data.area1)}-${pp(data.area2)}=${pp(
                data.result,
              )}\\,${unitLatex(data.unit)}^2`}
            />
          </>
        )}
      </>
    )
  },
}