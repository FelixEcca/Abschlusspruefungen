import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'waffeln' | 'muffins' | 'pfannkuchen' | 'kekse'

interface DATA {
  kontext: Kontext
  gramPerPiece: number
  pieces: number
  totalGram: number
  totalKg: number
}

function getFood(kontext: Kontext) {
  if (kontext === 'muffins') return 'Muffins'
  if (kontext === 'pfannkuchen') return 'Pfannkuchen'
  if (kontext === 'kekse') return 'Kekse'
  return 'Waffeln'
}

export const exercise9051: Exercise<DATA> = {
  title: 'Teil 1: Zuckerbedarf',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'waffeln',
      'muffins',
      'pfannkuchen',
      'kekse',
    ])
    const gramPerPiece = rng.randomItemFromArray([8, 10, 12, 13, 15, 18])
    const pieces = rng.randomItemFromArray([120, 180, 240, 300, 325, 400])
    const totalGram = gramPerPiece * pieces
    const totalKg = totalGram / 1000
    return { kontext, gramPerPiece, pieces, totalGram, totalKg }
  },

  originalData: {
    kontext: 'waffeln',
    gramPerPiece: 13,
    pieces: 325,
    totalGram: 4225,
    totalKg: 4.225,
  },

  constraint({ data }) {
    return data.totalGram === data.gramPerPiece * data.pieces
  },

  task({ data }) {
    return (
      <>
        <p>
          Laut Rezept brauchen Sie pro {getFood(data.kontext).slice(0, -1)}{' '}
          {data.gramPerPiece} g Zucker. Sie wollen {data.pieces}{' '}
          {getFood(data.kontext)} backen.
        </p>
        <p>Berechnen Sie, wie viel Zucker Sie einkaufen müssen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.gramPerPiece}\\cdot ${data.pieces}=${data.totalGram}\\,g`}
        />
        <p>
          Das sind <b>{pp(data.totalKg)} kg Zucker</b>.
        </p>
      </>
    )
  },
}
