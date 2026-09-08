import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Direction = 'toMs' | 'toKmh'
type Context = 'roller' | 'auto' | 'laufband' | 'zug'

interface DATA {
  direction: Direction
  context: Context
  kmh: number
  ms: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function contextText(context: Context) {
  if (context === 'roller') return 'Ein E-Roller fährt durch die Stadt.'
  if (context === 'auto') return 'Ein Auto fährt auf einer Landstraße.'
  if (context === 'laufband') return 'Ein Laufband bewegt sich gleichmäßig.'
  return 'Ein Zug fährt zwischen zwei Bahnhöfen.'
}

export const exercise6024: Exercise<DATA> = {
  title: 'Geschwindigkeitseinheiten umwandeln',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const context: Context = rng.randomItemFromArray([
      'roller',
      'auto',
      'laufband',
      'zug',
    ])
    const direction: Direction = rng.randomBoolean() ? 'toMs' : 'toKmh'
    const kmh = rng.randomItemFromArray([
      7.2, 10.8, 14.4, 18, 21.6, 36, 43.2, 54, 72, 90,
    ])
    const ms = round2(kmh / 3.6)
    return { direction, context, kmh, ms }
  },

  originalData: {
    direction: 'toMs',
    context: 'auto',
    kmh: 54,
    ms: 15,
  },

  constraint({ data }) {
    return data.kmh > 0 && data.ms > 0
  },

  task({ data }) {
    return (
      <>
        <p>{contextText(data.context)}</p>
        {data.direction === 'toMs' ? (
          <p>
            Wandle die Geschwindigkeit{' '}
            <InlineMath
              math={`${pp(data.kmh)}\\,\\tfrac{\\mathrm{km}}{\\mathrm h}`}
            />{' '}
            in <InlineMath math={`\\tfrac{\\mathrm m}{\\mathrm s}`} /> um.
          </p>
        ) : (
          <p>
            Wandle die Geschwindigkeit{' '}
            <InlineMath
              math={`${pp(data.ms)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />{' '}
            in <InlineMath math={`\\tfrac{\\mathrm{km}}{\\mathrm h}`} /> um.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.direction === 'toMs') {
      return (
        <>
          <InlineMath math={`1\\,\\tfrac{\\mathrm{km}}{\\mathrm h}=\\tfrac{1}{3{,}6}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />
          <br />
          <InlineMath
            math={`v = \\tfrac{${pp(data.kmh)}\\,\\tfrac{\\mathrm{km}}{\\mathrm h}}{3{,}6}`}
          />
          <br />
          <InlineMath math={`v = ${pp(data.ms)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`1\\,\\tfrac{\\mathrm m}{\\mathrm s}=3{,}6\\,\\tfrac{\\mathrm{km}}{\\mathrm h}`} />
        <br />
        <InlineMath
          math={`v = ${pp(data.ms)}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot 3{,}6`}
        />
        <br />
        <InlineMath math={`v = ${pp(data.kmh)}\\,\\tfrac{\\mathrm{km}}{\\mathrm h}`} />
      </>
    )
  },
}
