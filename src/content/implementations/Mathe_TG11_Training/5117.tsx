// exercise5117.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  alphaDeg: number
  slopeFromAngle: number
  percent: number
  slopeFromPercent: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise5117: Exercise<DATA> = {
  title: 'Steigung aus Winkel und Prozentangabe',
  source: 'Funktionen',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const possibleAngles = [
      -60, -55, -50, -45, -40, -35, -30, -25, -20, -15, -10, -5, 5, 10, 15, 20,
      25, 30, 35, 40, 45, 50, 55, 60,
    ]
    const alphaDeg = rng.randomItemFromArray(possibleAngles)
    const slopeFromAngle = round2(Math.tan((alphaDeg * Math.PI) / 180))

    const possiblePercents = [
      -100, -80, -75, -60, -50, -40, -30, -25, -20, -10, 10, 20, 25, 30, 40, 50,
      60, 75, 80, 100,
    ]
    const percent = rng.randomItemFromArray(possiblePercents)
    const slopeFromPercent = round2(percent / 100)

    return { alphaDeg, slopeFromAngle, percent, slopeFromPercent }
  },

  originalData: {
    alphaDeg: 45,
    slopeFromAngle: 1,
    percent: -25,
    slopeFromPercent: -0.25,
  },

  constraint({ data }) {
    return data.alphaDeg !== 0 && data.percent !== 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Eine Gerade hat den Steigungswinkel <br></br>
              <InlineMath math={`\\alpha = ${pp(data.alphaDeg)}^{\\circ}`} />.
            </p>
            <p>Bestimmen Sie den Steigungswert als Dezimalzahl.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`m = \\tan(\\alpha)`} />
            <br />
            <InlineMath math={`m = \\tan(${pp(data.alphaDeg)}^{\\circ})`} />
            <br />
            <InlineMath math={`m \\approx ${pp(data.slopeFromAngle)}`} />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Eine Straße hat eine Steigung von{' '}
              <InlineMath math={`${pp(data.percent)}\\,\\%`} />.
            </p>
            <p>Bestimmen Sie den Steigungswert als Dezimalzahl.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <br />
            <InlineMath math={`m = \\frac{${pp(data.percent)}}{100}`} />
            <br />
            <InlineMath math={`m = ${pp(data.slopeFromPercent)}`} />
          </>
        )
      },
    },
  ],
}
