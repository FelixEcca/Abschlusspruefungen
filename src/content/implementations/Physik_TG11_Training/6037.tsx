import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'work' | 'force' | 'distance'

interface DATA {
  target: Target
  force: number
  distance: number
  work: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function targetText(target: Target) {
  if (target === 'work') return <>Berechne die mechanische Arbeit <InlineMath math="W" />.</>
  if (target === 'force') return <>Berechne die Kraft <InlineMath math="F" />.</>
  return <>Berechne die Strecke <InlineMath math="s" />.</>
}

export const exercise6037: Exercise<DATA> = {
  title: 'Mechanische Arbeit berechnen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomItemFromArray(['work', 'force', 'distance'])
    const force = rng.randomItemFromArray([20, 40, 50, 80, 100, 150, 200, 300])
    const distance = rng.randomItemFromArray([0.5, 1, 2, 3, 4, 5, 8, 10])
    const work = round2(force * distance)
    return { target, force, distance, work }
  },

  originalData: {
    target: 'work',
    force: 80,
    distance: 5,
    work: 400,
  },

  constraint({ data }) {
    return data.force > 0 && data.distance > 0 && data.work > 0
  },

  task({ data }) {
    return (
      <>
        <p>Eine konstante Kraft wirkt in Bewegungsrichtung.</p>
        <ul className="list-disc ml-6">
          {data.target !== 'force' && (
            <li>
              <InlineMath math={`F=${pp(data.force)}\\,\\mathrm N`} />
            </li>
          )}
          {data.target !== 'distance' && (
            <li>
              <InlineMath math={`s=${pp(data.distance)}\\,\\mathrm m`} />
            </li>
          )}
          {data.target !== 'work' && (
            <li>
              <InlineMath math={`W=${pp(data.work)}\\,\\mathrm J`} />
            </li>
          )}
        </ul>
        <p>{targetText(data.target)}</p>
      </>
    )
  },

  solution({ data }) {
    if (data.target === 'work') {
      return (
        <>
          <InlineMath math={`W=F\\cdot s`} />
          <br />
          <InlineMath
            math={`W=${pp(data.force)}\\,\\mathrm N\\cdot ${pp(
              data.distance,
            )}\\,\\mathrm m=${pp(data.work)}\\,\\mathrm J`}
          />
        </>
      )
    }
    if (data.target === 'force') {
      return (
        <>
          <InlineMath math={`F=\\tfrac{W}{s}`} />
          <br />
          <InlineMath
            math={`F=\\tfrac{${pp(data.work)}\\,\\mathrm J}{${pp(
              data.distance,
            )}\\,\\mathrm m}=${pp(data.force)}\\,\\mathrm N`}
          />
        </>
      )
    }
    return (
      <>
        <InlineMath math={`s=\\tfrac{W}{F}`} />
        <br />
        <InlineMath
          math={`s=\\tfrac{${pp(data.work)}\\,\\mathrm J}{${pp(
            data.force,
          )}\\,\\mathrm N}=${pp(data.distance)}\\,\\mathrm m`}
        />
      </>
    )
  },
}
