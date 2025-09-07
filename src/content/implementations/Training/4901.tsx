import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4901 {
  data: number[]
}

export const exercise4901: Exercise<D4901> = {
  title: 'Mittelwert – Median – Spannweite',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const n = rng.randomIntBetween(5, 10)
    const data = Array.from({ length: n }, () => rng.randomIntBetween(1, 20))
    return { data }
  },
  originalData: { data: [3, 7, 7, 12, 15, 2] },
  constraint() {
    return true
  },
  task({ data }) {
    return (
      <p>
        Gegeben ist der Datensatz:<br></br> {data.data.join(', ')}. <br></br>
        Bestimme Mittelwert, Median und Spannweite.
      </p>
    )
  },
  solution({ data }) {
    const arr = [...data.data].sort((a, b) => a - b)
    const n = arr.length
    const mean = arr.reduce((s, v) => s + v, 0) / n
    const median = n % 2 ? arr[(n - 1) / 2] : (arr[n / 2 - 1] + arr[n / 2]) / 2
    const R = arr[n - 1] - arr[0]
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          '\\text{Mittelwert}&=' + pp(mean) + '\\\\',
          '\\text{Median}&=' + pp(median) + '\\\\',
          '\\text{Spannweite}&=x_{\\max}-x_{\\min}=' +
            arr[n - 1] +
            '-' +
            arr[0] +
            '=' +
            pp(R),
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
