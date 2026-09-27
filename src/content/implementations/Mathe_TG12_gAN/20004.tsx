import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Direction = 'degToRad' | 'radToDeg'

interface Item {
  direction: Direction
  degree: number
  numerator: number
  denominator: number
}

interface DATA {
  item: Item
}

const angleOptions: Omit<Item, 'direction'>[] = [
  { degree: 30, numerator: 1, denominator: 6 },
  { degree: 45, numerator: 1, denominator: 4 },
  { degree: 60, numerator: 1, denominator: 3 },
  { degree: 90, numerator: 1, denominator: 2 },
  { degree: 120, numerator: 2, denominator: 3 },
  { degree: 135, numerator: 3, denominator: 4 },
  { degree: 150, numerator: 5, denominator: 6 },
  { degree: 180, numerator: 1, denominator: 1 },
  { degree: 210, numerator: 7, denominator: 6 },
  { degree: 270, numerator: 3, denominator: 2 },
  { degree: 300, numerator: 5, denominator: 3 },
  { degree: 450, numerator: 5, denominator: 2 },
]

function radLatex({ numerator, denominator }: Item) {
  if (denominator === 1 && numerator === 1) return '\\pi'
  if (denominator === 1) return `${numerator}\\pi`
  if (numerator === 1) return `\\frac{\\pi}{${denominator}}`
  return `\\frac{${numerator}\\pi}{${denominator}}`
}

function promptLatex(item: Item) {
  if (item.direction === 'degToRad') return `${item.degree}^\\circ`
  return radLatex(item)
}

function targetName(item: Item) {
  return item.direction === 'degToRad' ? 'Bogenmaß' : 'Gradmaß'
}

export const exercise20004: Exercise<DATA> = {
  title: 'Gradmaß und Bogenmaß umwandeln',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 12,
  points: 12,
  generator(rng) {
    const selected = rng.randomItemFromArray(angleOptions)
    return {
      item: {
        ...selected,
        direction: rng.randomItemFromArray(['degToRad', 'radToDeg']),
      },
    }
  },
  originalData: {
    item: { direction: 'degToRad', degree: 150, numerator: 5, denominator: 6 },
  },
  task({ data }) {
    const item = data.item

    return (
      <>
        <p>
          Wandeln Sie den Winkel in das andere Winkelmaß um. Verwenden Sie{' '}
          <InlineMath math={`360^\\circ=2\\pi`} />.
        </p>
        <div className="my-4 max-w-md rounded border border-slate-300 bg-white px-4 py-3">
          <p>
            Gegeben:{' '}
            <b>
              <InlineMath math={promptLatex(item)} />
            </b>
          </p>
          <p>Gesucht: {targetName(item)}</p>
          <p>
            Ergebnis:{' '}
            <span className="inline-block w-32 border-b border-slate-500" />
          </p>
        </div>
      </>
    )
  },
  solution({ data }) {
    const item = data.item

    return (
      <>
        <p>
          Grundlage ist der volle Kreis:{' '}
          <InlineMath math={`360^\\circ=2\\pi`} />. Zuerst bestimmt man den
          Anteil am ganzen Kreis. Diesen Anteil multipliziert man mit dem
          Winkelmaß des ganzen Kreises.
        </p>
        <div className="my-4 max-w-xl rounded border border-slate-300 bg-white px-4 py-3">
          {item.direction === 'degToRad' ? (
            <>
              <p>
                <InlineMath
                  math={`${item.degree}^\\circ = \\frac{${item.degree}}{360}\\cdot 2\\pi`}
                />
              </p>
              <p>
                Gekürzt ergibt das:{' '}
                <b>
                  <InlineMath math={`${item.degree}^\\circ=${radLatex(item)}`} />
                </b>
              </p>
            </>
          ) : (
            <>
              <p>
                <InlineMath
                  math={`${radLatex(item)} = \\frac{${item.numerator}\\pi}{${item.denominator}}\\cdot\\frac{360^\\circ}{2\\pi}`}
                />
              </p>
              <p>
                Ergebnis:{' '}
                <b>
                  <InlineMath math={`${radLatex(item)}=${item.degree}^\\circ`} />
                </b>
              </p>
            </>
          )}
        </div>
      </>
    )
  },
}
