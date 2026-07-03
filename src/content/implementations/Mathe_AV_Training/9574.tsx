// exercise9574.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Mode = 'areaToCost' | 'tilesNeeded' | 'paintNeeded'

interface DATA {
  mode: Mode
  length: number
  width: number
  unit: Unit
  area: number
  price: number
  tileArea: number
  bucketArea: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9574: Exercise<DATA> = {
  title: 'Fläche im Sachkontext',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray([
      'areaToCost',
      'tilesNeeded',
      'paintNeeded',
    ])
    const unit: Unit = 'm'

    const length = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const width = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const area = length * width

    const price = rng.randomItemFromArray([8.5, 10, 12.5, 15, 18])
    const tileArea = rng.randomItemFromArray([0.25, 0.5, 1])
    const bucketArea = rng.randomItemFromArray([8, 10, 12, 15])

    let result = 0
    if (mode === 'areaToCost') result = round2(area * price)
    if (mode === 'tilesNeeded') result = Math.ceil(area / tileArea)
    if (mode === 'paintNeeded') result = Math.ceil(area / bucketArea)

    return {
      mode,
      length,
      width,
      unit,
      area,
      price,
      tileArea,
      bucketArea,
      result,
    }
  },

  originalData: {
    mode: 'areaToCost',
    length: 6,
    width: 4,
    unit: 'm',
    area: 24,
    price: 12.5,
    tileArea: 0.5,
    bucketArea: 10,
    result: 300,
  },

  constraint({ data }) {
    return data.area > 0 && data.result > 0
  },

  task({ data }) {
    return (
      <>
        {data.mode === 'areaToCost' && (
          <>
            <p>
              Ein rechteckiger Boden ist {pp(data.length)} m lang und{' '}
              {pp(data.width)} m breit.
            </p>
            <p>
              Ein Quadratmeter Bodenbelag kostet {pp(data.price)} €.
              Berechnen Sie die Kosten.
            </p>
          </>
        )}

        {data.mode === 'tilesNeeded' && (
          <>
            <p>
              Ein rechteckiger Boden ist {pp(data.length)} m lang und{' '}
              {pp(data.width)} m breit.
            </p>
            <p>
              Eine Bodenplatte bedeckt {pp(data.tileArea)} m². Berechnen Sie,
              wie viele Bodenplatten mindestens benötigt werden.
            </p>
          </>
        )}

        {data.mode === 'paintNeeded' && (
          <>
            <p>
              Eine rechteckige Wand ist {pp(data.length)} m lang und{' '}
              {pp(data.width)} m hoch.
            </p>
            <p>
              Ein Farbeimer reicht für {pp(data.bucketArea)} m². Berechnen Sie,
              wie viele Farbeimer mindestens benötigt werden.
            </p>
          </>
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird die Fläche berechnet.</p>
        <InlineMath
          math={`A=${pp(data.length)}\\cdot ${pp(data.width)}=${pp(
            data.area,
          )}\\,${unitLatex(data.unit)}^2`}
        />

        {data.mode === 'areaToCost' && (
          <>
            <p>Dann werden die Kosten berechnet.</p>
            <InlineMath
              math={`${pp(data.area)}\\cdot ${pp(data.price)}=${pp(
                data.result,
              )}\\,€`}
            />
            <p>
              Die Kosten betragen <b>{pp(data.result)} €</b>.
            </p>
          </>
        )}

        {data.mode === 'tilesNeeded' && (
          <>
            <p>Dann wird durch die Fläche einer Bodenplatte geteilt.</p>
            <InlineMath
              math={`${pp(data.area)}:${pp(data.tileArea)}=${pp(
                data.area / data.tileArea,
              )}`}
            />
            <p>Falls keine ganze Zahl herauskommt, muss aufgerundet werden.</p>
            <p>
              Es werden mindestens <b>{pp(data.result)} Bodenplatten</b>{' '}
              benötigt.
            </p>
          </>
        )}

        {data.mode === 'paintNeeded' && (
          <>
            <p>Dann wird durch die Fläche geteilt, die ein Farbeimer schafft.</p>
            <InlineMath
              math={`${pp(data.area)}:${pp(data.bucketArea)}=${pp(
                round2(data.area / data.bucketArea),
              )}`}
            />
            <p>Es muss auf ganze Farbeimer aufgerundet werden.</p>
            <p>
              Es werden mindestens <b>{pp(data.result)} Farbeimer</b> benötigt.
            </p>
          </>
        )}
      </>
    )
  },
}