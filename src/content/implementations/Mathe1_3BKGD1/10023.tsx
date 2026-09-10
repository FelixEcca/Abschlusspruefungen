import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  value: number
  exponent: number
  item: string
  question: string
}

export const exercise10023: Exercise<DATA> = {
  title: 'Sachaufgabe mit Zehnerpotenzen lösen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        value: 3.2,
        exponent: 6,
        item: 'Pixel',
        question: 'Wie viele Pixel sind das als ausgeschriebene Zahl?',
      },
      {
        value: 7.5,
        exponent: -3,
        item: 'Meter',
        question: 'Wie viele Meter sind das als Dezimalzahl?',
      },
      {
        value: 4.8,
        exponent: 5,
        item: 'Druckpunkte',
        question: 'Wie viele Druckpunkte sind das als ausgeschriebene Zahl?',
      },
      {
        value: 2.4,
        exponent: -2,
        item: 'Sekunden',
        question: 'Wie viele Sekunden sind das als Dezimalzahl?',
      },
    ])
  },
  originalData: {
    value: 3.2,
    exponent: 6,
    item: 'Pixel',
    question: 'Wie viele Pixel sind das als ausgeschriebene Zahl?',
  },
  task({ data }) {
    return (
      <>
        <p>
          In einer technischen Angabe stehen{' '}
          <InlineMath math={`${String(data.value).replace('.', ',')}\\cdot10^{${data.exponent}}`} />{' '}
          {data.item}.
        </p>
        <p>{data.question}</p>
      </>
    )
  },
  solution({ data }) {
    const result = data.value * 10 ** data.exponent
    const direction = data.exponent > 0 ? 'nach rechts' : 'nach links'
    return (
      <>
        <p>
          Bei einer Zehnerpotenz verschiebt sich das Komma um so viele Stellen,
          wie der Exponent angibt.
        </p>
        <p>
          Der Exponent ist <InlineMath math={`${data.exponent}`} />, also
          verschiebt sich das Komma {Math.abs(data.exponent)} Stellen {direction}.
        </p>
        <p>
          <InlineMath
            math={`${String(data.value).replace('.', ',')}\\cdot10^{${data.exponent}}=${pp(result)}`}
          />
        </p>
        <p>
          Das sind <b>{pp(result)} {data.item}</b>.
        </p>
      </>
    )
  },
}
