import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'force' | 'mass' | 'acceleration'

interface DATA {
  target: Target
  m: number
  a: number
  f: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function targetText(target: Target) {
  if (target === 'force') return <>Berechne die Kraft <InlineMath math="F" />.</>
  if (target === 'mass') return <>Berechne die Masse <InlineMath math="m" />.</>
  return <>Berechne die Beschleunigung <InlineMath math="a" />.</>
}

export const exercise6031: Exercise<DATA> = {
  title: 'Kraft, Masse und Beschleunigung verknüpfen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomItemFromArray([
      'force',
      'mass',
      'acceleration',
    ])
    const m = rng.randomItemFromArray([2, 4, 5, 8, 10, 20, 50, 80])
    const a = rng.randomItemFromArray([0.5, 1, 1.2, 1.5, 2, 2.5, 3])
    const f = round2(m * a)
    return { target, m, a, f }
  },

  originalData: {
    target: 'force',
    m: 10,
    a: 1.5,
    f: 15,
  },

  constraint({ data }) {
    return data.m > 0 && data.a > 0 && data.f > 0
  },

  task({ data }) {
    return (
      <>
        <p>Ein Körper wird durch eine resultierende Kraft beschleunigt.</p>
        <ul className="list-disc ml-6">
          {data.target !== 'mass' && (
            <li>
              <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} />
            </li>
          )}
          {data.target !== 'acceleration' && (
            <li>
              <InlineMath math={`a=${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`} />
            </li>
          )}
          {data.target !== 'force' && (
            <li>
              <InlineMath math={`F=${pp(data.f)}\\,\\mathrm N`} />
            </li>
          )}
        </ul>
        <p>{targetText(data.target)}</p>
      </>
    )
  },

  solution({ data }) {
    if (data.target === 'force') {
      return (
        <>
          <InlineMath math={`F=m\\cdot a`} />
          <br />
          <InlineMath
            math={`F=${pp(data.m)}\\,\\mathrm{kg}\\cdot ${pp(
              data.a,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}=${pp(data.f)}\\,\\mathrm N`}
          />
        </>
      )
    }
    if (data.target === 'mass') {
      return (
        <>
          <InlineMath math={`F=m\\cdot a`} />
          <br />
          <InlineMath
            math={`m=\\tfrac{F}{a}=\\tfrac{${pp(data.f)}\\,\\mathrm N}{${pp(
              data.a,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}=${pp(data.m)}\\,\\mathrm{kg}`}
          />
        </>
      )
    }
    return (
      <>
        <InlineMath math={`F=m\\cdot a`} />
        <br />
        <InlineMath
          math={`a=\\tfrac{F}{m}=\\tfrac{${pp(data.f)}\\,\\mathrm N}{${pp(
            data.m,
          )}\\,\\mathrm{kg}}=${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
      </>
    )
  },
}
