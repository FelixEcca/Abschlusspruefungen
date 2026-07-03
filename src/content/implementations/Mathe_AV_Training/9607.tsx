// exercise9607.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Kontext = 'farben' | 'noten' | 'getraenke'

interface DATA {
  kontext: Kontext
  values: string[]
  target: string
  count: number
}

function getPool(kontext: Kontext) {
  if (kontext === 'noten') return ['1', '2', '3', '4', '5']
  if (kontext === 'getraenke') return ['Wasser', 'Saft', 'Tee', 'Cola']
  return ['rot', 'blau', 'grün', 'gelb']
}

function getIntro(kontext: Kontext) {
  if (kontext === 'noten') return 'Folgende Noten wurden notiert:'
  if (kontext === 'getraenke') return 'Folgende Lieblingsgetränke wurden genannt:'
  return 'Folgende Lieblingsfarben wurden genannt:'
}

export const exercise9607: Exercise<DATA> = {
  title: 'Häufigkeiten bestimmen',
  source: 'Diagramme und Daten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray(['farben', 'noten', 'getraenke'])
    const pool = getPool(kontext)
    const values = Array.from({ length: rng.randomItemFromArray([10, 12, 15]) }, () =>
      rng.randomItemFromArray(pool),
    )
    const target = rng.randomItemFromArray(pool)
    const count = values.filter(v => v === target).length

    return { kontext, values, target, count }
  },

  originalData: {
    kontext: 'farben',
    values: ['rot', 'blau', 'rot', 'grün', 'rot', 'gelb', 'blau', 'rot'],
    target: 'rot',
    count: 4,
  },

  constraint({ data }) {
    return data.count > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getIntro(data.kontext)}</p>
        <p>{data.values.join(', ')}</p>
        <p>
          Bestimmen Sie die Häufigkeit von <b>{data.target}</b>.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zähle, wie oft der gesuchte Wert vorkommt.</p>
        <p>
          <b>{data.target}</b> kommt <b>{data.count}</b>-mal vor.
        </p>
        <InlineMath math={`H=${data.count}`} />
      </>
    )
  },
}