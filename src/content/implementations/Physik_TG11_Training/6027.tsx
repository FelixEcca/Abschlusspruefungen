import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'time' | 'height' | 'speed'

interface DATA {
  target: Target
  h: number
  t: number
  v: number
  g: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6027: Exercise<DATA> = {
  title: 'Fallbewegung ohne Anfangsgeschwindigkeit',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomItemFromArray(['time', 'height', 'speed'])
    const g = 9.81
    const t = rng.randomItemFromArray([0.5, 0.8, 1, 1.2, 1.5, 2, 2.5])
    const h = round2(0.5 * g * t * t)
    const v = round2(g * t)
    return { target, h, t, v, g }
  },

  originalData: {
    target: 'time',
    h: 19.62,
    t: 2,
    v: 19.62,
    g: 9.81,
  },

  constraint({ data }) {
    return data.h > 0 && data.t > 0 && data.v > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Ball fällt aus der Ruhe senkrecht nach unten. Die Luftreibung wird
          vernachlässigt.
        </p>
        {data.target === 'time' && (
          <p>
            Die Fallhöhe beträgt{' '}
            <InlineMath math={`h=${pp(data.h)}\\,\\mathrm m`} />. Berechne die
            Fallzeit.
          </p>
        )}
        {data.target === 'height' && (
          <p>
            Der Ball fällt <InlineMath math={`${pp(data.t)}\\,\\mathrm s`} />{' '}
            lang. Berechne die Fallhöhe.
          </p>
        )}
        {data.target === 'speed' && (
          <p>
            Der Ball fällt <InlineMath math={`${pp(data.t)}\\,\\mathrm s`} />{' '}
            lang. Berechne die Geschwindigkeit kurz vor dem Aufprall.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.target === 'time') {
      return (
        <>
          <p>Anstatt der Strecke s kann man hier auch die Höhe h schreiben:</p>
          <InlineMath math={`h=\\tfrac12\\cdot g\\cdot t^2`} />
          <br />
          <InlineMath math={`t=\\sqrt{\\tfrac{2h}{g}}`} />
          <br />
          <InlineMath
            math={`t=\\sqrt{\\tfrac{2\\cdot ${pp(data.h)}\\,\\mathrm m}{${pp(
              data.g,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}}=${pp(data.t)}\\,\\mathrm s`}
          />
        </>
      )
    }

    if (data.target === 'height') {
      return (
        <>
          <InlineMath math={`h=\\tfrac12\\cdot g\\cdot t^2`} />
          <br />
          <InlineMath
            math={`h=\\tfrac12\\cdot ${pp(
              data.g,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot (${pp(
              data.t,
            )}\\,\\mathrm s)^2=${pp(data.h)}\\,\\mathrm m`}
          />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`v=g\\cdot t`} />
        <br />
        <InlineMath
          math={`v=${pp(data.g)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot ${pp(
            data.t,
          )}\\,\\mathrm s=${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
        />
      </>
    )
  },
}
