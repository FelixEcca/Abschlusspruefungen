import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type ErrorType = 'unitConversion' | 'areaUnit' | 'pressureFormula' | 'massUnit'

interface DATA {
  type: ErrorType
  valueA: number
  valueB: number
}

function errorContent(data: DATA) {
  if (data.type === 'unitConversion') {
    const lengthMillimetres = data.valueA * 100
    const lengthMetres = lengthMillimetres / 1000
    const speed = data.valueB
    const time = lengthMetres / speed
    return {
      situation: `Ein Transportwagen fährt ${lengthMillimetres} mm mit ${speed} m/min.`,
      falseCalculation: `t=\\frac{${lengthMillimetres}}{${speed}}=${pp(lengthMillimetres / speed)}\\,\\mathrm{min}`,
      explanation:
        'Millimeter und Meter wurden ohne Umrechnung miteinander verrechnet. Die Größen müssen vor dem Einsetzen in kompatiblen Einheiten vorliegen.',
      correction: `${lengthMillimetres}\\,\\mathrm{mm}=${pp(lengthMetres)}\\,\\mathrm{m},\\qquad t=\\frac{${pp(lengthMetres)}\\,\\mathrm{m}}{${speed}\\,\\frac{\\mathrm{m}}{\\mathrm{min}}}=${pp(time)}\\,\\mathrm{min}`,
    }
  }

  if (data.type === 'areaUnit') {
    const length = data.valueA * 10
    const width = data.valueB * 10
    return {
      situation: `Eine rechteckige Blechtafel ist ${length} mm lang und ${width} mm breit.`,
      falseCalculation: `A=${length}+${width}=${length + width}\\,\\mathrm{mm}`,
      explanation:
        'Für den Flächeninhalt wurden die Seiten addiert. Das wäre außerdem keine Fläche, denn das Ergebnis besitzt nur die Einheit mm.',
      correction: `A=l\\cdot b=${length}\\,\\mathrm{mm}\\cdot${width}\\,\\mathrm{mm}=${length * width}\\,\\mathrm{mm}^2`,
    }
  }

  if (data.type === 'pressureFormula') {
    const pressure = data.valueA
    const area = data.valueB * 20
    const force = pressure * area
    return {
      situation: `Eine Spannvorrichtung wirkt mit ${force} N auf ${area} mm².`,
      falseCalculation: `p=F\\cdot A=${force}\\cdot${area}=${force * area}\\,\\frac{\\mathrm{N}}{\\mathrm{mm}^2}`,
      explanation:
        'Druck ist Kraft je Fläche. Die Kraft muss durch die Fläche geteilt werden. Das Produkt aus N und mm² hätte zudem die Einheit N·mm², nicht N/mm².',
      correction: `p=\\frac{F}{A}=\\frac{${force}\\,\\mathrm{N}}{${area}\\,\\mathrm{mm}^2}=${pressure}\\,\\frac{\\mathrm{N}}{\\mathrm{mm}^2}`,
    }
  }

  const volume = data.valueA * 100
  const density = 7.85
  const massGrams = volume * density
  return {
    situation: `Ein Stahlkörper besitzt ein Volumen von ${volume} cm³. Für Stahl gilt ρ = 7,85 g/cm³.`,
    falseCalculation: `m=7{,}85\\cdot${volume}=${pp(massGrams)}\\,\\mathrm{kg}`,
    explanation:
      'Der Zahlenwert ist richtig, aber die Einheit ist falsch. Aus g/cm³ und cm³ entsteht zunächst Gramm, nicht Kilogramm.',
    correction: `m=${pp(massGrams)}\\,\\mathrm{g}=${pp(massGrams / 1000)}\\,\\mathrm{kg}`,
  }
}

export const exercise13016: Exercise<DATA> = {
  title: 'Technische Ergebnisse auf Plausibilität prüfen',
  source: 'Vorbereitungskurs Meister · Gleichungen und Formeln',
  useCalculator: true,
  duration: 7,
  generator(rng) {
    return {
      type: rng.randomItemFromArray<ErrorType>([
        'unitConversion',
        'areaUnit',
        'pressureFormula',
        'massUnit',
      ]),
      valueA: rng.randomIntBetween(4, 15),
      valueB: rng.randomIntBetween(2, 10),
    }
  },
  originalData: {
    type: 'unitConversion',
    valueA: 12,
    valueB: 3,
  },
  constraint({ data }) {
    return data.valueA > 0 && data.valueB > 0
  },
  intro({ data }) {
    return <p>{errorContent(data).situation}</p>
  },
  tasks: [
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              Eine Auszubildende dokumentiert die folgende Rechnung. Prüfen Sie
              Formel, Einheiten und Größenordnung. Benennen Sie den Fehler
              genau.
            </p>
            <BlockMath math={errorContent(data).falseCalculation} />
          </>
        )
      },
      solution({ data }) {
        return <p>{errorContent(data).explanation}</p>
      },
    },
    {
      points: 3,
      task() {
        return <p>Berichtigen Sie die Rechnung vollständig.</p>
      },
      solution({ data }) {
        return <BlockMath math={errorContent(data).correction} />
      },
    },
  ],
}
