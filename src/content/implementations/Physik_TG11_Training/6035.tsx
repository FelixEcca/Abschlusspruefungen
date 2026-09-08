import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'deltaV' | 'force'

interface DATA {
  target: Target
  mass: number
  force: number
  time: number
  deltaV: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6035: Exercise<DATA> = {
  title: 'Geschwindigkeitsänderung durch Kraftstoß',
  source: 'Impuls',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomBoolean() ? 'deltaV' : 'force'
    const mass = rng.randomItemFromArray([0.2, 0.5, 1, 2, 5, 10])
    const force = rng.randomItemFromArray([5, 10, 20, 40, 50, 80, 100])
    const time = rng.randomItemFromArray([0.1, 0.2, 0.4, 0.5, 0.8, 1])
    const deltaV = round2((force * time) / mass)
    return { target, mass, force, time, deltaV }
  },

  originalData: {
    target: 'deltaV',
    mass: 2,
    force: 40,
    time: 0.5,
    deltaV: 10,
  },

  constraint({ data }) {
    return data.mass > 0 && data.force > 0 && data.time > 0 && data.deltaV > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Auf einen Körper wirkt eine Kraft. Dadurch ändert sich sein Impuls.
        </p>
        {data.target === 'deltaV' ? (
          <>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} />
              </li>
              <li>
                <InlineMath math={`F=${pp(data.force)}\\,\\mathrm N`} />
              </li>
              <li>
                <InlineMath math={`\\Delta t=${pp(data.time)}\\,\\mathrm s`} />
              </li>
            </ul>
            <p>Berechne die Geschwindigkeitsänderung.</p>
          </>
        ) : (
          <>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} />
              </li>
              <li>
                <InlineMath
                  math={`\\Delta v=${pp(data.deltaV)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
                />
              </li>
              <li>
                <InlineMath math={`\\Delta t=${pp(data.time)}\\,\\mathrm s`} />
              </li>
            </ul>
            <p>Berechne die wirkende Kraft.</p>
          </>
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.target === 'deltaV') {
      return (
        <>
          <InlineMath math={`F\\cdot\\Delta t=m\\cdot\\Delta v`} />
          <br />
          <InlineMath math={`\\Delta v=\\tfrac{F\\cdot\\Delta t}{m}`} />
          <br />
          <InlineMath
            math={`\\Delta v=\\tfrac{${pp(data.force)}\\,\\mathrm N\\cdot ${pp(
              data.time,
            )}\\,\\mathrm s}{${pp(data.mass)}\\,\\mathrm{kg}}=${pp(
              data.deltaV,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`F\\cdot\\Delta t=m\\cdot\\Delta v`} />
        <br />
        <InlineMath math={`F=\\tfrac{m\\cdot\\Delta v}{\\Delta t}`} />
        <br />
        <InlineMath
          math={`F=\\tfrac{${pp(data.mass)}\\,\\mathrm{kg}\\cdot ${pp(
            data.deltaV,
          )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(
            data.time,
          )}\\,\\mathrm s}=${pp(data.force)}\\,\\mathrm N`}
        />
      </>
    )
  },
}
