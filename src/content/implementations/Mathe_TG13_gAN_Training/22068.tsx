import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { vec, Vec } from './math'

interface DATA {
  fixed: number
  axis: number
}
export const exercise22068: Exercise<DATA> = {
  title: 'Eine Gerade mit einer Koordinatenebene vergleichen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      fixed: rng.randomIntBetween(-3, 3),
      axis: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { fixed: 2, axis: 0 },
  task({ data }) {
    const a: Vec = [1, 2, -1],
      v: Vec = [2, -1, 3]
    a[data.axis] = data.fixed
    v[data.axis] = 0
    return (
      <>
        <p>
          Untersuchen Sie die Lage der Geraden zur{' '}
          <InlineMath math={['x_2x_3', 'x_1x_3', 'x_1x_2'][data.axis]} />
          -Ebene. Liegt sie in der Ebene oder ist sie echt parallel dazu?
        </p>
        <p>
          <InlineMath math={String.raw`g:\vec x=${vec(a)}+t${vec(v)}`} />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Komponente des Richtungsvektors senkrecht zur Ebene ist null. Die
          Koordinate x{data.axis + 1} bleibt deshalb für alle Parameterwerte
          konstant {data.fixed}.
        </p>
        <p>
          {data.fixed === 0
            ? 'Alle Punkte erfüllen die Ebenenbedingung, also liegt die ganze Gerade in der Ebene.'
            : 'Die Ebene verlangt an dieser Stelle die Koordinate 0. Weil der konstante Wert nicht 0 ist, hat die Gerade keinen gemeinsamen Punkt mit der Ebene und ist echt parallel.'}
        </p>
        <p>
          Ein Null-Eintrag im Richtungsvektor allein entscheidet also noch
          nicht, ob die Gerade in der Ebene liegt.
        </p>
      </>
    )
  },
}
