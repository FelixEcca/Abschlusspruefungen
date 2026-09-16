import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type FormulaType =
  | 'spindleSpeed'
  | 'toolDiameter'
  | 'pistonDiameter'
  | 'feedPerTooth'

interface DATA {
  type: FormulaType
  valueA: number
  valueB: number
  valueC: number
}

function formulaContent(data: DATA) {
  if (data.type === 'spindleSpeed' || data.type === 'toolDiameter') {
    const diameter = data.valueA * 5
    const spindleSpeed = data.valueB * 100
    const cuttingSpeed = (Math.PI * diameter * spindleSpeed) / 1000
    const isSpeed = data.type === 'spindleSpeed'
    return {
      situation: isSpeed
        ? `Beim Drehen sind eine Schnittgeschwindigkeit von ${pp(cuttingSpeed)} m/min und ein Werkstückdurchmesser von ${diameter} mm vorgegeben. Berechnen Sie die erforderliche Drehzahl n.`
        : `Eine Maschine arbeitet mit ${pp(cuttingSpeed)} m/min bei ${spindleSpeed} min⁻¹. Bestimmen Sie den zugehörigen Werkzeugdurchmesser d.`,
      formula: 'v_c=\\frac{\\pi\\cdot d\\cdot n}{1000}',
      rearranged: isSpeed
        ? 'n=\\frac{1000\\cdot v_c}{\\pi\\cdot d}'
        : 'd=\\frac{1000\\cdot v_c}{\\pi\\cdot n}',
      calculation: isSpeed
        ? `n=\\frac{1000\\cdot${pp(cuttingSpeed)}}{\\pi\\cdot${diameter}}\\approx${spindleSpeed}\\,\\mathrm{min}^{-1}`
        : `d=\\frac{1000\\cdot${pp(cuttingSpeed)}}{\\pi\\cdot${spindleSpeed}}\\approx${diameter}\\,\\mathrm{mm}`,
    }
  }

  if (data.type === 'pistonDiameter') {
    const pressure = data.valueA
    const diameter = data.valueB * 5
    const force = (pressure * Math.PI * diameter ** 2) / 4
    return {
      situation: `Ein Hydraulikzylinder soll bei ${pressure} N/mm² eine Kraft von ${pp(force)} N erzeugen. Berechnen Sie den erforderlichen Kolbendurchmesser d.`,
      formula: 'F=p\\cdot\\frac{\\pi d^2}{4}',
      rearranged: 'd=\\sqrt{\\frac{4F}{\\pi p}}',
      calculation: `d=\\sqrt{\\frac{4\\cdot${pp(force)}}{\\pi\\cdot${pressure}}}\\approx${diameter}\\,\\mathrm{mm}`,
    }
  }

  const spindleSpeed = data.valueA * 100
  const teeth = data.valueB
  const feedPerTooth = data.valueC / 100
  const feedRate = spindleSpeed * teeth * feedPerTooth
  return {
    situation: `Ein Fräser mit ${teeth} Schneiden läuft bei ${spindleSpeed} min⁻¹. Die Vorschubgeschwindigkeit beträgt ${pp(feedRate)} mm/min. Berechnen Sie den Vorschub je Zahn f_z.`,
    formula: 'v_f=n\\cdot z\\cdot f_z',
    rearranged: 'f_z=\\frac{v_f}{n\\cdot z}',
    calculation: `f_z=\\frac{${pp(feedRate)}\\,\\frac{\\mathrm{mm}}{\\mathrm{min}}}{${spindleSpeed}\\,\\mathrm{min}^{-1}\\cdot${teeth}}=${pp(feedPerTooth)}\\,\\mathrm{mm}`,
  }
}

export const exercise13014: Exercise<DATA> = {
  title: 'Komplexe Fertigungsformeln umstellen',
  source: 'Vorbereitungskurs Meister · Gleichungen und Formeln',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    return {
      type: rng.randomItemFromArray<FormulaType>([
        'spindleSpeed',
        'toolDiameter',
        'pistonDiameter',
        'feedPerTooth',
      ]),
      valueA: rng.randomIntBetween(2, 10),
      valueB: rng.randomIntBetween(2, 10),
      valueC: rng.randomItemFromArray([5, 8, 10, 12, 15, 20]),
    }
  },
  originalData: {
    type: 'spindleSpeed',
    valueA: 8,
    valueB: 12,
    valueC: 10,
  },
  constraint({ data }) {
    return data.valueA > 0 && data.valueB > 0 && data.valueC > 0
  },
  intro({ data }) {
    return <p>{formulaContent(data).situation}</p>
  },
  tasks: [
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>Stellen Sie die Formel zuerst nach der gesuchten Größe um.</p>
            <BlockMath math={formulaContent(data).formula} />
          </>
        )
      },
      solution({ data }) {
        return <BlockMath math={formulaContent(data).rearranged} />
      },
    },
    {
      points: 3,
      task() {
        return (
          <p>
            Setzen Sie die Werte erst nach dem Umstellen ein und berechnen Sie
            das Ergebnis mit Einheit.
          </p>
        )
      },
      solution({ data }) {
        return <BlockMath math={formulaContent(data).calculation} />
      },
    },
  ],
}
