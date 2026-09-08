import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  alpha: number
  fg: number
  fh: number
  fn: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6033: Exercise<DATA> = {
  title: 'Hangabtriebskraft auf einer Rampe',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const m = rng.randomItemFromArray([5, 8, 10, 15, 20, 30, 50])
    const alpha = rng.randomItemFromArray([10, 15, 20, 25, 30, 35])
    const fg = round2(m * 9.81)
    const rad = (alpha * Math.PI) / 180
    const fh = round2(fg * Math.sin(rad))
    const fn = round2(fg * Math.cos(rad))
    return { m, alpha, fg, fh, fn }
  },

  originalData: {
    m: 20,
    alpha: 30,
    fg: 196.2,
    fh: 98.1,
    fn: 169.91,
  },

  constraint({ data }) {
    return data.m > 0 && data.alpha > 0 && data.fg > 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Eine Kiste mit <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> liegt
            auf einer reibungsfreien Rampe mit dem Neigungswinkel{' '}
            <InlineMath math={`\\alpha=${pp(data.alpha)}^{\\circ}`} />. Berechne die
            Gewichtskraft.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`F_\\mathrm G=m\\cdot g=${pp(
                data.m,
              )}\\,\\mathrm{kg}\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
            <br />
            <InlineMath math={`F_\\mathrm G\\approx ${pp(data.fg)}\\,\\mathrm N`} />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task() {
        return <p>Berechne die Hangabtriebskraft.</p>
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`F_\\mathrm H=F_\\mathrm G\\cdot\\sin\\alpha`} />
            <br />
            <InlineMath
              math={`F_\\mathrm H=${pp(data.fg)}\\,\\mathrm N\\cdot\\sin(${pp(
                data.alpha,
              )}^{\\circ})\\approx ${pp(data.fh)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task() {
        return <p>Berechne die Normalkraft der Kiste auf der Rampe.</p>
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`F_\\mathrm N=F_\\mathrm G\\cdot\\cos\\alpha`} />
            <br />
            <InlineMath
              math={`F_\\mathrm N=${pp(data.fg)}\\,\\mathrm N\\cdot\\cos(${pp(
                data.alpha,
              )}^{\\circ})\\approx ${pp(data.fn)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
  ],
}
