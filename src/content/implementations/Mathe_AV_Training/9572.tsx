// exercise9572.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Figure =
  | 'rechteckMinusRechteck'
  | 'rechteckPlusRechteck'
  | 'rechteckMinusDreieck'
  | 'rechteckPlusDreieck'
  | 'rechteckPlusHalbkreis'
  | 'rahmen'

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
  duration: 9,
  points: 4,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const figure: Figure = rng.randomItemFromArray([
      'rechteckMinusRechteck',
      'rechteckPlusRechteck',
      'rechteckMinusDreieck',
      'rechteckPlusDreieck',
      'rechteckPlusHalbkreis',
      'rahmen',
    ])

    const a = rng.randomItemFromArray([8, 10, 12, 15, 18, 20])
    const b = rng.randomItemFromArray([5, 6, 8, 10, 12])
    const c = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const d = rng.randomItemFromArray([2, 3, 4, 5])

    if (figure === 'rechteckMinusRechteck' || figure === 'rahmen') {
      const area1 = a * b
      const area2 = c * d
      return { figure, a, b, c, d, unit, area1, area2, result: area1 - area2 }
    }

    if (figure === 'rechteckPlusRechteck') {
      const area1 = a * b
      const area2 = c * d
      return { figure, a, b, c, d, unit, area1, area2, result: area1 + area2 }
    }

    if (figure === 'rechteckPlusDreieck') {
      const area1 = a * b
      const area2 = (b * c) / 2
      return { figure, a, b, c, d, unit, area1, area2, result: area1 + area2 }
    }

    if (figure === 'rechteckPlusHalbkreis') {
      const area1 = a * b
      const area2 = (Math.PI * (b / 2) ** 2) / 2
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
    return data.result > 0 && data.c < data.a && data.d < data.b
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt der Figur.</p>

        {data.figure === 'rechteckMinusRechteck' && (
          <svg viewBox="0 0 328 210" className="w-full max-w-[380px]">
            <rect
              x="55"
              y="40"
              width="215"
              height="125"
              fill="#eee"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="185"
              y="95"
              width="65"
              height="50"
              fill="white"
              stroke="black"
              strokeWidth="2"
            />
            <line x1="190" y1="140" x2="245" y2="100" stroke="#bbb" />
            <line x1="190" y1="125" x2="225" y2="100" stroke="#bbb" />
            <line x1="210" y1="140" x2="245" y2="115" stroke="#bbb" />
            <text x="218" y="124" fontSize="13" textAnchor="middle">
              Loch
            </text>
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
          <svg viewBox="0 0 328 210" className="w-full max-w-[380px]">
            <rect
              x="55"
              y="70"
              width="190"
              height="95"
              fill="#eee"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="55"
              y="35"
              width="85"
              height="35"
              fill="#eee"
              stroke="black"
              strokeWidth="2"
            />
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
          <svg viewBox="0 0 328 210" className="w-full max-w-[380px]">
            <polygon
              points="55,45 205,45 270,95 270,165 55,165"
              fill="#eee"
              stroke="black"
              strokeWidth="2"
            />
            <polygon
              points="205,45 270,45 270,95"
              fill="white"
              stroke="#777"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <line x1="215" y1="50" x2="265" y2="88" stroke="#bbb" />
            <line x1="232" y1="49" x2="268" y2="76" stroke="#bbb" />
            <text x="251" y="68" fontSize="12" textAnchor="middle">
              weg
            </text>
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

        {data.figure === 'rahmen' && (
          <svg viewBox="0 0 328 210" className="w-full max-w-[380px]" role="img" aria-label="Rechteckiger Rahmen mit mittiger Öffnung">
            <path d="M45 35 H275 V165 H45 Z M105 70 V130 H215 V70 Z" fill="#edf4ff" fillRule="evenodd" stroke="#1e3a5f" strokeWidth="2" />
            <text x="150" y="190" textAnchor="middle" fontSize="14">a = {pp(data.a)} {data.unit}</text>
            <text x="8" y="110" fontSize="14">b = {pp(data.b)} {data.unit}</text>
            <text x="150" y="64" textAnchor="middle" fontSize="14">c = {pp(data.c)} {data.unit}</text>
            <text x="220" y="104" fontSize="14">d = {pp(data.d)} {data.unit}</text>
          </svg>
        )}

        {data.figure === 'rechteckPlusDreieck' && (
          <svg viewBox="0 0 328 210" className="w-full max-w-[380px]" role="img" aria-label="Rechteck mit seitlich angesetztem Dreieck">
            <path d="M40 40 H210 L285 105 L210 170 H40 Z" fill="#edf4ff" stroke="#1e3a5f" strokeWidth="2" />
            <path d="M210 40 V170" stroke="#52647a" strokeDasharray="5 4" />
            <text x="110" y="195" fontSize="14">a = {pp(data.a)} {data.unit}</text>
            <text x="4" y="108" fontSize="14">b = {pp(data.b)} {data.unit}</text>
            <text x="231" y="115" fontSize="14">c = {pp(data.c)} {data.unit}</text>
          </svg>
        )}

        {data.figure === 'rechteckPlusHalbkreis' && (
          <svg viewBox="0 0 328 210" className="w-full max-w-[380px]" role="img" aria-label="Rechteck mit angesetztem Halbkreis">
            <path d="M45 40 H205 A65 65 0 0 1 205 170 H45 Z" fill="#edf4ff" stroke="#1e3a5f" strokeWidth="2" />
            <path d="M205 40 V170" stroke="#52647a" strokeDasharray="5 4" />
            <text x="100" y="195" fontSize="14">a = {pp(data.a)} {data.unit}</text>
            <text x="4" y="108" fontSize="14">b = {pp(data.b)} {data.unit}</text>
            <text x="213" y="110" fontSize="12">d = b</text>
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
        {data.figure === 'rahmen' && (
          <>
            <p>Die Öffnung wird von der äußeren Rechteckfläche abgezogen.</p>
            <InlineMath math={`A=${pp(data.a)}\\cdot${pp(data.b)}-${pp(data.c)}\\cdot${pp(data.d)}=${pp(data.result)}\\,${unitLatex(data.unit)}^2`} />
          </>
        )}
        {data.figure === 'rechteckPlusDreieck' && (
          <>
            <p>Zum Rechteck wird das Dreieck mit Grundseite b und Höhe c addiert.</p>
            <InlineMath math={`A=${pp(data.a)}\\cdot${pp(data.b)}+\\frac{${pp(data.b)}\\cdot${pp(data.c)}}{2}=${pp(data.result)}\\,${unitLatex(data.unit)}^2`} />
          </>
        )}
        {data.figure === 'rechteckPlusHalbkreis' && (
          <>
            <p>Zum Rechteck wird ein Halbkreis mit Durchmesser b addiert.</p>
            <InlineMath math={`A=${pp(data.a)}\\cdot${pp(data.b)}+\\frac{\\pi\\cdot(${pp(data.b)}/2)^2}{2}\\approx${pp(data.result)}\\,${unitLatex(data.unit)}^2`} />
          </>
        )}
      </>
    )
  },
}
