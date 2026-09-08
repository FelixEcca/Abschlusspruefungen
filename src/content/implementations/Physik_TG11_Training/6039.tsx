import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'efficiency' | 'useful' | 'input'

interface DATA {
  target: Target
  input: number
  useful: number
  efficiency: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function targetText(target: Target) {
  if (target === 'efficiency') return <>Berechne den Wirkungsgrad <InlineMath math="\\eta" />.</>
  if (target === 'useful') return <>Berechne die Nutzenergie <InlineMath math="E_\\mathrm{nutz}" />.</>
  return <>Berechne die zugeführte Energie <InlineMath math="E_\\mathrm{zu}" />.</>
}

export const exercise6039: Exercise<DATA> = {
  title: 'Wirkungsgrad einer Maschine',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomItemFromArray(['efficiency', 'useful', 'input'])
    const input = rng.randomItemFromArray([200, 400, 500, 800, 1000, 1500, 2000])
    const efficiency = rng.randomItemFromArray([25, 40, 50, 60, 75, 80, 90])
    const useful = round2((efficiency / 100) * input)
    return { target, input, useful, efficiency }
  },

  originalData: {
    target: 'efficiency',
    input: 1000,
    useful: 750,
    efficiency: 75,
  },

  constraint({ data }) {
    return data.input > 0 && data.useful > 0 && data.efficiency > 0
  },

  task({ data }) {
    return (
      <>
        <p>Bei einer Maschine wird nicht die gesamte zugeführte Energie genutzt.</p>
        <ul className="list-disc ml-6">
          {data.target !== 'input' && (
            <li>
              <InlineMath math={`E_\\mathrm{zu}=${pp(data.input)}\\,\\mathrm J`} />
            </li>
          )}
          {data.target !== 'useful' && (
            <li>
              <InlineMath math={`E_\\mathrm{nutz}=${pp(data.useful)}\\,\\mathrm J`} />
            </li>
          )}
          {data.target !== 'efficiency' && (
            <li>
              <InlineMath math={`\\eta=${pp(data.efficiency)}\\,\\%`} />
            </li>
          )}
        </ul>
        <p>{targetText(data.target)}</p>
      </>
    )
  },

  solution({ data }) {
    if (data.target === 'efficiency') {
      return (
        <>
          <InlineMath math={`\\eta=\\tfrac{E_\\mathrm{nutz}}{E_\\mathrm{zu}}\\cdot100\\,\\%`} />
          <br />
          <InlineMath
            math={`\\eta=\\tfrac{${pp(data.useful)}\\,\\mathrm J}{${pp(
              data.input,
            )}\\,\\mathrm J}\\cdot100\\,\\%=${pp(data.efficiency)}\\,\\%`}
          />
        </>
      )
    }
    if (data.target === 'useful') {
      return (
        <>
          <InlineMath math={`E_\\mathrm{nutz}=\\tfrac{\\eta}{100\\,\\%}\\cdot E_\\mathrm{zu}`} />
          <br />
          <InlineMath math={`E_\\mathrm{nutz}=\\tfrac{${pp(data.efficiency)}}{100}\\cdot ${pp(data.input)}\\,\\mathrm J=${pp(data.useful)}\\,\\mathrm J`} />
        </>
      )
    }
    return (
      <>
        <InlineMath math={`E_\\mathrm{zu}=\\tfrac{E_\\mathrm{nutz}}{\\eta/100}`} />
        <br />
        <InlineMath math={`E_\\mathrm{zu}=\\tfrac{${pp(data.useful)}}{${pp(data.efficiency)}/100}\\,\\mathrm J=${pp(data.input)}\\,\\mathrm J`} />
      </>
    )
  },
}
