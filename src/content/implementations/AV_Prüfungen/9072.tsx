import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  width: number
  wallHeight: number
  ridgeHeight: number
  windowArea: number
  rectangleArea: number
  triangleArea: number
  paintArea: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export const exercise9072: Exercise<DATA> = {
  title: 'Teil 2: Hausfassade',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const width = rng.randomItemFromArray([8.4, 9.6, 10.8, 12])
    const wallHeight = rng.randomItemFromArray([3.5, 4, 4.5])
    const ridgeHeight = wallHeight + rng.randomItemFromArray([2, 2.4, 2.7, 3])
    const windowArea = rng.randomItemFromArray([4, 5, 6])
    const rectangleArea = round2(width * wallHeight)
    const triangleArea = round2((width * (ridgeHeight - wallHeight)) / 2)
    const paintArea = round2(rectangleArea + triangleArea - windowArea)
    return { width, wallHeight, ridgeHeight, windowArea, rectangleArea, triangleArea, paintArea }
  },

  originalData: {
    width: 10.8,
    wallHeight: 4.5,
    ridgeHeight: 7.2,
    windowArea: 5,
    rectangleArea: 48.6,
    triangleArea: 14.58,
    paintArea: 58.18,
  },

  constraint({ data }) {
    return data.paintArea > 0
  },

  task({ data }) {
    return (
      <>
        <p>Sie helfen dabei, eine Hausfassade zu streichen.</p>
        <p>
          Die Fassade ist {pp(data.width)} m breit, bis zur Dachkante{' '}
          {pp(data.wallHeight)} m hoch und bis zur Spitze {pp(data.ridgeHeight)}{' '}
          m hoch. Alle Fenster zusammen haben eine Fläche von{' '}
          {pp(data.windowArea)} m².
        </p>
        <p>Berechnen Sie, wie viel Fläche gestrichen werden muss.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`${pp(data.width)}\\cdot ${pp(data.wallHeight)}=${pp(data.rectangleArea)}\\,m^2`} />
        <br />
        <InlineMath math={`\\frac{${pp(data.width)}\\cdot (${pp(data.ridgeHeight)}-${pp(data.wallHeight)})}{2}=${pp(data.triangleArea)}\\,m^2`} />
        <br />
        <InlineMath math={`${pp(data.rectangleArea)}+${pp(data.triangleArea)}-${pp(data.windowArea)}=${pp(data.paintArea)}\\,m^2`} />
      </>
    )
  },
}
