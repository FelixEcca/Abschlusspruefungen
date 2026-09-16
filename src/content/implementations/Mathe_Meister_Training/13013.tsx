import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type FormulaType = 'travelTime' | 'pistonArea' | 'current' | 'work'

interface DATA {
  type: FormulaType
  firstValue: number
  secondValue: number
}

function formulaContent(data: DATA) {
  if (data.type === 'travelTime') {
    const speed = data.firstValue
    const time = data.secondValue
    const distance = speed * time
    return {
      prompt: 'Stellen Sie die Geschwindigkeitsformel nach der Zeit t um.',
      formula: 'v=\\frac{s}{t}',
      rearranged: 't=\\frac{s}{v}',
      steps: 'v=\\frac{s}{t}\\quad\\Rightarrow\\quad v\\cdot t=s\\quad\\Rightarrow\\quad t=\\frac{s}{v}',
      values: `s=${distance}\\,\\mathrm{m},\\quad v=${speed}\\,\\frac{\\mathrm{m}}{\\mathrm{s}}`,
      calculation: `t=\\frac{${distance}\\,\\mathrm{m}}{${speed}\\,\\frac{\\mathrm{m}}{\\mathrm{s}}}=${time}\\,\\mathrm{s}`,
    }
  }

  if (data.type === 'pistonArea') {
    const pressure = data.firstValue
    const area = data.secondValue * 10
    const force = pressure * area
    return {
      prompt: 'Stellen Sie die Druckformel nach der Kolbenfläche A um.',
      formula: 'p=\\frac{F}{A}',
      rearranged: 'A=\\frac{F}{p}',
      steps: 'p=\\frac{F}{A}\\quad\\Rightarrow\\quad p\\cdot A=F\\quad\\Rightarrow\\quad A=\\frac{F}{p}',
      values: `F=${force}\\,\\mathrm{N},\\quad p=${pressure}\\,\\frac{\\mathrm{N}}{\\mathrm{mm}^2}`,
      calculation: `A=\\frac{${force}\\,\\mathrm{N}}{${pressure}\\,\\frac{\\mathrm{N}}{\\mathrm{mm}^2}}=${area}\\,\\mathrm{mm}^2`,
    }
  }

  if (data.type === 'current') {
    const voltage = data.firstValue * 10
    const current = data.secondValue
    const power = voltage * current
    return {
      prompt: 'Stellen Sie die Leistungsformel nach der Stromstärke I um.',
      formula: 'P=U\\cdot I',
      rearranged: 'I=\\frac{P}{U}',
      steps: 'P=U\\cdot I\\quad\\Rightarrow\\quad I=\\frac{P}{U}',
      values: `P=${power}\\,\\mathrm{W},\\quad U=${voltage}\\,\\mathrm{V}`,
      calculation: `I=\\frac{${power}\\,\\mathrm{W}}{${voltage}\\,\\mathrm{V}}=${current}\\,\\mathrm{A}`,
    }
  }

  const power = data.firstValue * 100
  const time = data.secondValue
  const work = power * time
  return {
    prompt: 'Stellen Sie die Leistungsformel nach der Arbeit W um.',
    formula: 'P=\\frac{W}{t}',
    rearranged: 'W=P\\cdot t',
    steps: 'P=\\frac{W}{t}\\quad\\Rightarrow\\quad P\\cdot t=W',
    values: `P=${power}\\,\\mathrm{W},\\quad t=${time}\\,\\mathrm{s}`,
    calculation: `W=${power}\\,\\mathrm{W}\\cdot${time}\\,\\mathrm{s}=${work}\\,\\mathrm{J}`,
  }
}

export const exercise13013: Exercise<DATA> = {
  title: 'Technische Formeln umstellen',
  source: 'Vorbereitungskurs Meister · Gleichungen und Formeln',
  useCalculator: true,
  duration: 7,
  generator(rng) {
    return {
      type: rng.randomItemFromArray<FormulaType>([
        'travelTime',
        'pistonArea',
        'current',
        'work',
      ]),
      firstValue: rng.randomIntBetween(2, 12),
      secondValue: rng.randomIntBetween(2, 12),
    }
  },
  originalData: {
    type: 'pistonArea',
    firstValue: 6,
    secondValue: 8,
  },
  constraint({ data }) {
    return data.firstValue > 0 && data.secondValue > 0
  },
  intro({ data }) {
    const content = formulaContent(data)
    return (
      <>
        <p>{content.prompt}</p>
        <BlockMath math={content.formula} />
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task() {
        return <p>Dokumentieren Sie die notwendigen Umformungsschritte.</p>
      },
      solution({ data }) {
        return <BlockMath math={formulaContent(data).steps} />
      },
    },
    {
      points: 3,
      task({ data }) {
        const content = formulaContent(data)
        return (
          <>
            <p>Berechnen Sie die gesuchte Größe mit den folgenden Werten.</p>
            <BlockMath math={content.values} />
          </>
        )
      },
      solution({ data }) {
        return <BlockMath math={formulaContent(data).calculation} />
      },
    },
  ],
}
