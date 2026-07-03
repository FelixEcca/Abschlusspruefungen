import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'p' | 'm' | 'v'

interface DATA {
  m: number // kg
  v: number // m/s
  p: number // kg·m/s
  target: Target
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6001: Exercise<DATA> = {
  title: 'Impuls',
  source: 'Impuls',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    // angenehme Werte
    const m = rng.randomIntBetween(1, 8) // kg
    const v = rng.randomIntBetween(2, 12) // m/s
    const p = round2(m * v)

    const target: Target = rng.randomItemFromArray(['p', 'm', 'v'])

    return { m, v, p, target }
  },

  originalData: {
    m: 4,
    v: 3,
    p: 12,
    target: 'p',
  },

  constraint({ data }) {
    return data.m > 0 && data.v !== 0 && data.p > 0
  },

  task({ data }) {
    const unitM = '\\mathrm{kg}'
    const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'
    const unitP = '\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}'

    const mDisp = data.target === 'm' ? ' ' : pp(data.m)
    const vDisp = data.target === 'v' ? ' ' : pp(data.v)
    const pDisp = data.target === 'p' ? ' ' : pp(data.p)

    const askText =
      data.target === 'p' ? (
        <>
          Berechne den Impuls <InlineMath math="p" /> des Körpers.
        </>
      ) : data.target === 'm' ? (
        <>
          Berechne die Masse <InlineMath math="m" /> des Körpers.
        </>
      ) : (
        <>
          Berechne die Geschwindigkeit <InlineMath math="v" /> des Körpers.
        </>
      )

    return (
      <>
        <p>
          Ein Körper bewegt sich geradlinig. Bestimme die fehlende Größe zum
          Impuls.
        </p>
        <p>{askText}</p>
        <p>Gegeben:</p>
        <ul className="list-disc ml-6">
          {data.target === 'm' ? null : (
            <li>
              <InlineMath math={`m = ${mDisp}\\;${unitM}`} />
            </li>
          )}

          {data.target === 'v' ? null : (
            <li>
              <InlineMath math={`v = ${vDisp}\\;${unitV}`} />
            </li>
          )}
          {data.target === 'p' ? null : (
            <li>
              <InlineMath math={`p = ${pDisp}\\;${unitP}`} />
            </li>
          )}
        </ul>
      </>
    )
  },

  solution({ data }) {
    const unitM = '\\mathrm{kg}'
    const unitV = '\\tfrac{\\mathrm m}{\\mathrm s}'
    const unitP = '\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}'

    if (data.target === 'p') {
      const p = round2(data.m * data.v)
      return (
        <>
          <p>Beginne mit der Formel für den Impuls:</p>
          <InlineMath math={`p = m\\cdot v`} />
          <p>Setze die bekannten Werte ein und berechne:</p>
          <InlineMath
            math={`p = ${pp(data.m)}\\,${unitM}\\cdot ${pp(data.v)}\\,${unitV}`}
          />
          <br />
          <InlineMath math={`p = ${pp(p)}\\,${unitP}`} />
        </>
      )
    }

    if (data.target === 'm') {
      const m = round2(data.p / data.v)
      return (
        <>
          <p>Beginne mit der Formel für den Impuls:</p>
          <InlineMath math={`p = m\\cdot v`} />
          <p>
            Setze die bekannten Werte ein und stelle die Gleichung nach m um:
          </p>
          <InlineMath
            math={`${pp(
              data.p,
            )}\\,${unitP} = m\\cdot ${pp(data.v)}\\,${unitV}\\quad | : ${pp(
              data.v,
            )}\\,${unitV}`}
          />
          <br />
          <InlineMath
            math={`m = \\tfrac{${pp(data.p)}\\,${unitP}}{${pp(
              data.v,
            )}\\,${unitV}}`}
          />
          <br />
          <InlineMath math={`m = ${pp(m)}\\,${unitM}`} />
        </>
      )
    }

    // target === 'v'
    const v = round2(data.p / data.m)
    return (
      <>
        <p>Beginne mit der Formel für den Impuls:</p>
        <InlineMath math={`p = m\\cdot v`} />
        <p>Setze die bekannten Werte ein und stelle die Gleichung nach v um:</p>
        <InlineMath
          math={`${pp(
            data.p,
          )}\\,${unitP} = ${pp(data.m)}\\,${unitM}\\cdot v\\quad | : ${pp(
            data.m,
          )}\\,${unitM}`}
        />
        <br />
        <InlineMath
          math={`v = \\tfrac{${pp(data.p)}\\,${unitP}}{${pp(
            data.m,
          )}\\,${unitM}}`}
        />
        <br />
        <InlineMath math={`v = ${pp(v)}\\,${unitV}`} />
      </>
    )
  },
}
