import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Situation = 'bewegung' | 'kraft' | 'impuls' | 'energie'

interface DATA {
  situation: Situation
  a: number
  b: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6044: Exercise<DATA> = {
  title: 'Passende Mechanikformel auswählen',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const situation: Situation = rng.randomItemFromArray([
      'bewegung',
      'kraft',
      'impuls',
      'energie',
    ])

    if (situation === 'bewegung') {
      const a = rng.randomItemFromArray([2, 3, 4, 5, 8, 10])
      const b = rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
      return { situation, a, b, result: round2(a * b) }
    }
    if (situation === 'kraft') {
      const a = rng.randomItemFromArray([2, 5, 10, 20, 50])
      const b = rng.randomItemFromArray([0.5, 1, 1.5, 2, 3])
      return { situation, a, b, result: round2(a * b) }
    }
    if (situation === 'impuls') {
      const a = rng.randomItemFromArray([0.5, 1, 2, 5, 10])
      const b = rng.randomItemFromArray([2, 4, 5, 8, 10, 12])
      return { situation, a, b, result: round2(a * b) }
    }
    const a = rng.randomItemFromArray([2, 5, 10, 20])
    const b = rng.randomItemFromArray([3, 4, 5, 8, 10])
    return { situation, a, b, result: round2(0.5 * a * b * b) }
  },

  originalData: {
    situation: 'impuls',
    a: 2,
    b: 8,
    result: 16,
  },

  constraint({ data }) {
    return data.a > 0 && data.b > 0 && data.result > 0
  },

  task({ data }) {
    if (data.situation === 'bewegung') {
      return (
        <p>
          Ein Körper bewegt sich gleichförmig mit{' '}
          <InlineMath math={`v=${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />{' '}
          über <InlineMath math={`t=${pp(data.b)}\\,\\mathrm s`} />. Wähle die passende
          Formel und berechne die Strecke.
        </p>
      )
    }
    if (data.situation === 'kraft') {
      return (
        <p>
          Ein Körper mit <InlineMath math={`m=${pp(data.a)}\\,\\mathrm{kg}`} /> wird mit{' '}
          <InlineMath math={`a=${pp(data.b)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`} />{' '}
          beschleunigt. Wähle die passende Formel und berechne die Kraft.
        </p>
      )
    }
    if (data.situation === 'impuls') {
      return (
        <p>
          Ein Körper mit <InlineMath math={`m=${pp(data.a)}\\,\\mathrm{kg}`} /> bewegt
          sich mit <InlineMath math={`v=${pp(data.b)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
          Wähle die passende Formel und berechne den Impuls.
        </p>
      )
    }
    return (
      <p>
        Ein Körper mit <InlineMath math={`m=${pp(data.a)}\\,\\mathrm{kg}`} /> bewegt
        sich mit <InlineMath math={`v=${pp(data.b)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
        Wähle die passende Formel und berechne die kinetische Energie.
      </p>
    )
  },

  solution({ data }) {
    if (data.situation === 'bewegung') {
      return (
        <>
          <InlineMath
            math={`s=v\\cdot t=${pp(
              data.a,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot${pp(
              data.b,
            )}\\,\\mathrm s=${pp(data.result)}\\,\\mathrm m`}
          />
          <br />
        </>
      )
    }
    if (data.situation === 'kraft') {
      return (
        <>
          <InlineMath
            math={`F=m\\cdot a=${pp(data.a)}\\,\\mathrm{kg}\\cdot${pp(
              data.b,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}=${pp(data.result)}\\,\\mathrm N`}
          />
          <br />
        </>
      )
    }
    if (data.situation === 'impuls') {
      return (
        <>
          <InlineMath
            math={`p=m\\cdot v=${pp(data.a)}\\,\\mathrm{kg}\\cdot${pp(
              data.b,
            )}\\,\\tfrac{\\mathrm m}{\\mathrm s}=${pp(
              data.result,
            )}\\,\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
          />
          <br />
        </>
      )
    }
    return (
      <>
        <InlineMath math={`E_\\mathrm{kin}=\\tfrac12mv^2`} />
        <br />
        <InlineMath
          math={`E_\\mathrm{kin}=\\tfrac12\\cdot${pp(
            data.a,
          )}\\,\\mathrm{kg}\\cdot(${pp(
            data.b,
          )}\\,\\tfrac{\\mathrm m}{\\mathrm s})^2=${pp(data.result)}\\,\\mathrm J`}
        />
      </>
    )
  },
}
