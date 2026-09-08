import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  force1: number
  force2: number
  distance: number
  work1: number
  work2: number
  diff: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6041: Exercise<DATA> = {
  title: 'Arbeit aus einem Kraft-Weg-Diagramm',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const force1 = rng.randomItemFromArray([20, 40, 60, 80, 100, 120])
    const force2 = rng.randomItemFromArray([40, 60, 80, 100, 120, 160])
    const distance = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const work1 = round2(force1 * distance)
    const work2 = round2(0.5 * (force1 + force2) * distance)
    const diff = round2(work2 - work1)
    return { force1, force2, distance, work1, work2, diff }
  },

  originalData: {
    force1: 60,
    force2: 120,
    distance: 4,
    work1: 240,
    work2: 360,
    diff: 120,
  },

  constraint({ data }) {
    return data.force1 > 0 && data.force2 > data.force1 && data.distance > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Schlitten wird über eine Strecke von{' '}
          <InlineMath math={`${pp(data.distance)}\\,\\mathrm m`} /> gezogen.
        </p>
        <p>
          Fall A: Die Zugkraft ist konstant{' '}
          <InlineMath math={`F=${pp(data.force1)}\\,\\mathrm N`} />. Fall B: Die
          Zugkraft steigt gleichmäßig von{' '}
          <InlineMath math={`${pp(data.force1)}\\,\\mathrm N`} /> auf{' '}
          <InlineMath math={`${pp(data.force2)}\\,\\mathrm N`} />.
        </p>
        <p>Berechne die Arbeit in beiden Fällen und vergleiche.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Fall A: Rechtecksfläche im Kraft-Weg-Diagramm</p>
        <InlineMath
          math={`W_A=F\\cdot s=${pp(data.force1)}\\,\\mathrm N\\cdot${pp(
            data.distance,
          )}\\,\\mathrm m=${pp(data.work1)}\\,\\mathrm J`}
        />
        <p>Fall B: mittlere Kraft mal Weg</p>
        <InlineMath
          math={`W_B=\\tfrac{${pp(data.force1)}\\,\\mathrm N+${pp(
            data.force2,
          )}\\,\\mathrm N}{2}\\cdot${pp(data.distance)}\\,\\mathrm m=${pp(
            data.work2,
          )}\\,\\mathrm J`}
        />
        <p>
          In Fall B ist die Arbeit um <InlineMath math={`${pp(data.diff)}\\,\\mathrm J`} /> größer.
        </p>
      </>
    )
  },
}
