import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // für a)
  k: number // Verhältnisfaktor in a = k·b
  d: number // Altersunterschied in a = b + d und b = a − d
  // für b)
  m: number // „… m-fach so alt …“
  alex: number // aktuelles Alter von Alex
  bettina: number // aktuelles Alter von Bettina (= alex / m)
  ziel: number // Zielalter von Bettina
  order: number[]
}

export const exercise3050: Exercise<DATA> = {
  title: 'Formeln',
  source: '2022 Pflichtteil Aufgabe 1A',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    // a) Parameter
    const k = rng.randomItemFromArray([2, 3])
    const d = rng.randomIntBetween(4, 10)
    const order = rng.shuffleArray([0, 1, 2])
    // b) Parameter
    const m = rng.randomItemFromArray([2, 3])
    const bettina = rng.randomIntBetween(6, 12)
    const alex = m * bettina
    // Zielalter mindestens 1 Jahr über dem aktuellen Alter von Bettina, max +8
    const ziel = bettina + rng.randomIntBetween(1, 8)

    return { k, d, m, alex, bettina, ziel, order }
  },
  originalData: {
    k: 2,
    d: 8,
    m: 2,
    alex: 16,
    bettina: 8,
    ziel: 18,
    order: [0, 1, 2],
  },
  constraint() {
    return true
  },
  intro() {
    return null
  },
  tasks: [
    // Teil 1
    {
      points: 42,
      intro() {
        return (
          <>
            <p>
              a beschreibt das Alter von Alex, b das Alter von Bettina (jeweils
              in Jahren).
            </p>
          </>
        )
      },
      task({ data }) {
        const listItems = [
          <li key="1">
            <InlineMath math={`a = ${data.k}\\,b`} />
          </li>,
          <li key="2">
            <InlineMath math={`a = b + ${data.d}`} />
          </li>,
          <li key="3">
            <InlineMath math={`b = a - ${data.d}`} />
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              Beschreiben Sie in diesem Zusammenhang die Bedeutung der
              Gleichungen in Worten.
            </p>
            <ol>{shuffledItems}</ol>
          </>
        )
      },
      solution({ data }) {
        const listItems = [
          <li key="1">
            <>
              <p>
                <InlineMath math={`a = ${data.k}b`} /> bedeutet: &nbsp;Alex ist{' '}
                {data.k}-mal so alt wie Bettina.
              </p>
            </>
          </li>,
          <li key="2">
            <>
              <p>
                <InlineMath math={`a = b + ${data.d}`} /> bedeutet: &nbsp;Alex
                ist {data.d} Jahre älter als Bettina.
              </p>
            </>
          </li>,
          <li key="3">
            <>
              <p>
                <InlineMath math={`b = a - ${data.d}`} /> bedeutet:
                &nbsp;Bettina ist {data.d} Jahre jünger als Alex.
              </p>
            </>
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])

        return (
          <>
            <ol>{shuffledItems}</ol>
          </>
        )
      },
    },

    // Teil 2
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Alex ist heute {data.m} -fach so alt wie Bettina.
              <br />
              Alex ist heute {data.alex} Jahre alt.
              <br />
              Bestimmen Sie, in wie vielen Jahren Bettina
              {data.ziel} Jahre alt sein wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        const bJetzt = data.bettina // = alex / m
        const jahre = data.ziel - bJetzt

        return (
          <>
            <p>Zuerst das heutige Alter von Bettina bestimmen:</p>
            {buildEquation([
              [
                <>
                  <InlineMath math={`${data.m}\\cdot b`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${data.alex}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`b`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`\\dfrac{${data.alex}}{${data.m}}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`b`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${bJetzt}`} />
                </>,
              ],
            ])}
            <p>
              Wie lange bis Bettina <InlineMath math={`${data.ziel}`} /> Jahre
              alt ist?
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath math="\text{gesuchte Jahre}" />
                </>,
                <>
                  <InlineMath math=":" />
                </>,
                <>
                  <InlineMath math={`${data.ziel} - ${bJetzt} = ${jahre}`} />
                </>,
              ],
            ])}
            <p>
              Antwort: In {pp(jahre)} Jahren wird Bettina {pp(data.ziel)} Jahre
              alt sein.
            </p>
          </>
        )
      },
    },
  ],
}
