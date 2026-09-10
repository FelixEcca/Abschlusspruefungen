import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  firstItem: string
  secondItem: string
  countOne: number
  countTwo: number
  priceOne: number
  countThree: number
  countFour: number
  priceTwo: number
}

export const exercise10029: Exercise<DATA> = {
  title: 'Sachaufgabe als LGS modellieren',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        firstItem: 'Poster',
        secondItem: 'Stickerbogen',
        countOne: 2,
        countTwo: 3,
        priceOne: 19,
        countThree: 4,
        countFour: 1,
        priceTwo: 23,
      },
      {
        firstItem: 'T-Shirts',
        secondItem: 'Caps',
        countOne: 3,
        countTwo: 2,
        priceOne: 47,
        countThree: 1,
        countFour: 4,
        priceTwo: 43,
      },
    ])
  },
  originalData: {
    firstItem: 'Poster',
    secondItem: 'Stickerbogen',
    countOne: 2,
    countTwo: 3,
    priceOne: 19,
    countThree: 4,
    countFour: 1,
    priceTwo: 23,
  },
  task({ data }) {
    return (
      <>
        <p>
          In einem Schulprojekt werden {data.firstItem} und {data.secondItem}
          verkauft.
        </p>
        <p>
          {data.countOne} {data.firstItem} und {data.countTwo}{' '}
          {data.secondItem} kosten zusammen {data.priceOne} €. {data.countThree}{' '}
          {data.firstItem} und {data.countFour} {data.secondItem} kosten
          zusammen {data.priceTwo} €.
        </p>
        <p>
          Stellen Sie ein lineares Gleichungssystem auf. Lösen müssen Sie es in
          dieser Aufgabe noch nicht.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Ich lege zuerst Variablen fest.</p>
        <p>
          <InlineMath math="x" /> = Preis für ein {data.firstItem}
        </p>
        <p>
          <InlineMath math="y" /> = Preis für einen {data.secondItem}
        </p>
        <p>Dann übersetze ich die beiden Sätze in Gleichungen.</p>
        <p>
          <InlineMath
            math={`${data.countOne}x+${data.countTwo}y=${data.priceOne}`}
          />
        </p>
        <p>
          <InlineMath
            math={`${data.countThree}x+${data.countFour}y=${data.priceTwo}`}
          />
        </p>
        <p>
          Das gesuchte LGS lautet also:{' '}
          <InlineMath
            math={`\\begin{cases}${data.countOne}x+${data.countTwo}y=${data.priceOne}\\\\${data.countThree}x+${data.countFour}y=${data.priceTwo}\\end{cases}`}
          />
        </p>
      </>
    )
  },
}
