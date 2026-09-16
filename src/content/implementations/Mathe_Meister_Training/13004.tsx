import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Context = 'parts' | 'sheetMetal' | 'coating' | 'maintenance'

interface DATA {
  context: Context
  baseInput: number
  baseOutput: number
  targetInput: number
  targetOutput: number
}

function contextText(data: DATA) {
  const { context, baseInput, baseOutput, targetInput } = data
  if (context === 'parts') {
    return {
      text: `${pp(baseInput)} gleichartige Maschinen fertigen in einer Schicht ${pp(baseOutput)} Bauteile. Wie viele Bauteile fertigen ${pp(targetInput)} Maschinen bei gleicher Leistung und gleicher Laufzeit?`,
      inputUnit: 'Maschinen',
      outputUnit: 'Bauteile',
      inverse: false,
    }
  }
  if (context === 'sheetMetal') {
    return {
      text: `${pp(baseInput)} gleich große Stahlbleche haben zusammen eine Masse von ${pp(baseOutput)} kg. Welche Masse haben ${pp(targetInput)} dieser Bleche?`,
      inputUnit: 'Bleche',
      outputUnit: 'kg',
      inverse: false,
    }
  }
  if (context === 'coating') {
    return {
      text: `Für ${pp(baseInput)} m² Metalloberfläche werden ${pp(baseOutput)} Liter Beschichtungsmittel benötigt. Wie viele Liter werden für ${pp(targetInput)} m² benötigt?`,
      inputUnit: 'mathrm{m}^2',
      outputUnit: 'Liter',
      inverse: false,
    }
  }
  return {
    text: `${pp(baseInput)} Fachkräfte benötigen für eine planbare Wartungsarbeit ${pp(baseOutput)} Stunden. Wie lange benötigen ${pp(targetInput)} gleich leistungsfähige Fachkräfte? Arbeitsumfang und Bedingungen bleiben gleich.`,
    inputUnit: 'Fachkräfte',
    outputUnit: 'Stunden',
    inverse: true,
  }
}

export const exercise13004: Exercise<DATA> = {
  title: 'Dreisatz in Metallbetrieb und Produktion',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: true,
  duration: 8,
  points: 4,
  generator(rng) {
    const context = rng.randomItemFromArray<Context>([
      'parts',
      'sheetMetal',
      'coating',
      'maintenance',
    ])
    const baseInput = rng.randomItemFromArray([2, 3, 4, 5, 6])
    let targetInput = rng.randomItemFromArray([3, 4, 6, 8, 10])
    if (targetInput === baseInput) targetInput += 1

    if (context === 'maintenance') {
      const targetOutput = rng.randomItemFromArray([2, 3, 4, 5, 6])
      const baseOutput = (targetInput * targetOutput) / baseInput
      return { context, baseInput, baseOutput, targetInput, targetOutput }
    }

    const outputPerUnit =
      context === 'parts'
        ? rng.randomItemFromArray([80, 120, 150, 200])
        : context === 'sheetMetal'
          ? rng.randomItemFromArray([12, 18, 24, 30])
          : rng.randomItemFromArray([0.2, 0.25, 0.4, 0.5])
    const baseOutput = baseInput * outputPerUnit
    const targetOutput = targetInput * outputPerUnit
    return { context, baseInput, baseOutput, targetInput, targetOutput }
  },
  originalData: {
    context: 'parts',
    baseInput: 4,
    baseOutput: 600,
    targetInput: 6,
    targetOutput: 900,
  },
  constraint({ data }) {
    return (
      data.baseInput > 0 &&
      data.targetInput > 0 &&
      data.baseOutput > 0 &&
      data.targetOutput > 0 &&
      Number.isFinite(data.targetOutput)
    )
  },
  task({ data }) {
    return <p>{contextText(data).text}</p>
  },
  solution({ data }) {
    const context = contextText(data)
    const oneUnit = context.inverse
      ? data.baseInput * data.baseOutput
      : data.baseOutput / data.baseInput
    return (
      <>
        <p>
          {context.inverse
            ? 'Mehr Fachkräfte benötigen bei gleichem Arbeitsumfang weniger Zeit. Die Größen sind umgekehrt proportional.'
            : 'Die Größen sind direkt proportional: Wird die Eingangsgröße größer, wächst die Ausgangsgröße im gleichen Verhältnis.'}
        </p>
        <BlockMath
          math={
            context.inverse
              ? `${data.baseInput}\\cdot ${pp(data.baseOutput)}=${pp(oneUnit)}\\quad\\Rightarrow\\quad \\frac{${pp(oneUnit)}}{${data.targetInput}}=${pp(data.targetOutput)}`
              : `\\frac{${pp(data.baseOutput)}}{${data.baseInput}}=${pp(oneUnit)}\\quad\\Rightarrow\\quad ${pp(oneUnit)}\\cdot ${data.targetInput}=${pp(data.targetOutput)}`
          }
        />
        <p>
          Ergebnis:{' '}
          <b>
            {pp(data.targetOutput)} {context.outputUnit}
          </b>
          .
        </p>
      </>
    )
  },
}
