// ============================
// 2A — Wahrscheinlichkeit/Zug
// ============================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3105 {
  pNo: number
  sample: number
}

export const exercise3105: Exercise<DATA3105> = {
  title: 'Zwei ohne Fahrschein & Erwartungswert',
  source: '2023 Pflichtteil 2A',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    const pNo = rng.randomItemFromArray([0.1, 0.12, 0.15, 0.18, 0.2])
    const sample = rng.randomItemFromArray([60, 80, 100, 120])
    return { pNo, sample }
  },

  originalData: { pNo: 0.15, sample: 100 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Angenommen, {Math.round(100 * data.pNo)}% der Zugfahrenden fahren ohne
        gültigen Fahrschein.
      </p>
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie die Wahrscheinlichkeit, dass <b>zwei</b> zufällig
            kontrollierte Personen ohne Fahrschein sind.
          </p>
        )
      },
      solution({ data }) {
        const p2 = data.pNo * data.pNo
        return (
          <>
            <BlockMath math="P(2\ \text{ohne})=p\cdot p" />
            <BlockMath
              math={`= ${pp(data.pNo)}\\cdot ${pp(data.pNo)} = ${pp(p2)}`}
            />
            <p>≈ {Math.round(p2 * 100)} %</p>
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Wie viele Personen ohne Fahrschein <em>erwartet</em> man bei{' '}
            {data.sample} Kontrollen?
          </p>
        )
      },
      solution({ data }) {
        const E = data.pNo * data.sample
        return (
          <>
            <InlineMath math="E=n\cdot p" />
            <br />
            <InlineMath
              math={`E=${data.sample}\\cdot ${pp(data.pNo)}=${pp(E)}`}
            />
          </>
        )
      },
    },
  ],
}
