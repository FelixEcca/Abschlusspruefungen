import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'power' | 'time' | 'work'

interface DATA {
  target: Target
  work: number
  time: number
  power: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function targetText(target: Target) {
  if (target === 'power') return <>Berechne die Leistung <InlineMath math="P" />.</>
  if (target === 'time') return <>Berechne die Zeit <InlineMath math="t" />.</>
  return <>Berechne die Energieänderung <InlineMath math="\\Delta E" />.</>
}

export const exercise6038: Exercise<DATA> = {
  title: 'Leistung bei gleichmäßiger Arbeit',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomItemFromArray(['power', 'time', 'work'])
    const power = rng.randomItemFromArray([
      50, 75, 100, 150, 200, 250, 400, 800,
    ])
    const time = rng.randomItemFromArray([2, 4, 5, 8, 10, 20, 30, 60])
    const work = round2(power * time)
    return { target, work, time, power }
  },

  originalData: {
    target: 'power',
    work: 1200,
    time: 8,
    power: 150,
  },

  constraint({ data }) {
    return data.work > 0 && data.time > 0 && data.power > 0
  },

  task({ data }) {
    return (
      <>
        <p>Eine Maschine verrichtet mechanische Arbeit.</p>
        <ul className="list-disc ml-6">
          {data.target !== 'work' && (
            <li>
              <InlineMath math={`\\Delta E=${pp(data.work)}\\,\\mathrm J`} />
            </li>
          )}
          {data.target !== 'time' && (
            <li>
              <InlineMath math={`t=${pp(data.time)}\\,\\mathrm s`} />
            </li>
          )}
          {data.target !== 'power' && (
            <li>
              <InlineMath math={`P=${pp(data.power)}\\,\\mathrm W`} />
            </li>
          )}
        </ul>
        <p>{targetText(data.target)}</p>
      </>
    )
  },

  solution({ data }) {
    if (data.target === 'power') {
      return (
        <>
          <InlineMath math={`P=\\tfrac{\\Delta E}{t}`} />
          <br />
          <InlineMath
            math={`P=\\tfrac{${pp(data.work)}\\,\\mathrm J}{${pp(
              data.time,
            )}\\,\\mathrm s}=${pp(data.power)}\\,\\mathrm W`}
          />
        </>
      )
    }
    if (data.target === 'time') {
      return (
        <>
          <InlineMath math={`t=\\tfrac{\\Delta E}{P}`} />
          <br />
          <InlineMath
            math={`t=\\tfrac{${pp(data.work)}\\,\\mathrm J}{${pp(
              data.power,
            )}\\,\\mathrm W}=${pp(data.time)}\\,\\mathrm s`}
          />
        </>
      )
    }
    return (
      <>
        <InlineMath math={`\\Delta E=P\\cdot t`} />
        <br />
        <InlineMath
          math={`\\Delta E=${pp(data.power)}\\,\\mathrm W\\cdot ${pp(
            data.time,
          )}\\,\\mathrm s=${pp(data.work)}\\,\\mathrm J`}
        />
      </>
    )
  },
}
