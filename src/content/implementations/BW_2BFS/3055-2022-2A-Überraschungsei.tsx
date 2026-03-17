// exercise3055.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  eggsPerFigure: number
  eggsTim: number
  eggsMehmet: number
  eggPrice: number
  figureSalePrice: number
  eggsPaula: number
  pFigure: number
  expectedFiguresTim: number
  probabilityNoFigure: number
  paulaCost: number
  paulaExpectedRevenue: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

export const exercise3055: Exercise<DATA> = {
  title: 'Wahrscheinlichkeit',
  source: 'Prüfung 2022 / Aufgabe 2A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const eggsPerFigure = rng.randomItemFromArray([5, 6, 7, 8, 10])
    const eggsTim = rng.randomItemFromArray([24, 30, 35, 40, 42])
    const eggsMehmet = 2
    const eggPrice = rng.randomItemFromArray([0.79, 0.89, 0.99, 1.09])
    const figureSalePrice = rng.randomItemFromArray([5, 6, 7, 8])
    const eggsPaula = rng.randomItemFromArray([60, 80, 100, 120])

    const pFigure = 1 / eggsPerFigure
    const expectedFiguresTim = round2(eggsTim * pFigure)
    const probabilityNoFigure = round4((1 - pFigure) * (1 - pFigure))
    const paulaCost = round2(eggsPaula * eggPrice)
    const paulaExpectedRevenue = round2(eggsPaula * pFigure * figureSalePrice)

    return {
      eggsPerFigure,
      eggsTim,
      eggsMehmet,
      eggPrice,
      figureSalePrice,
      eggsPaula,
      pFigure,
      expectedFiguresTim,
      probabilityNoFigure,
      paulaCost,
      paulaExpectedRevenue,
    }
  },

  originalData: {
    eggsPerFigure: 7,
    eggsTim: 35,
    eggsMehmet: 2,
    eggPrice: 0.89,
    figureSalePrice: 6,
    eggsPaula: 100,
    pFigure: 1 / 7,
    expectedFiguresTim: round2(35 / 7),
    probabilityNoFigure: round4((6 / 7) * (6 / 7)),
    paulaCost: round2(100 * 0.89),
    paulaExpectedRevenue: round2((100 / 7) * 6),
  },

  constraint({ data }) {
    return (
      data.eggsPerFigure > 1 &&
      data.eggsTim > 0 &&
      data.eggPrice > 0 &&
      data.figureSalePrice > 0 &&
      data.eggsPaula > 0
    )
  },

  intro({ data }) {
    const { eggsPerFigure } = data
    return (
      <>
        <p>
          Der Hersteller von Überraschungseiern wirbt damit, dass in jedem{' '}
          <InlineMath math={`${pp(eggsPerFigure)}.`} /> Ei eine Sammelfigur ist.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 1,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { eggsTim } = data
        return (
          <>
            <p>
              Tim kauft <InlineMath math={`${pp(eggsTim)}`} /> Eier. Geben Sie an,
              wie viele Figuren er erwarten kann.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { eggsTim, eggsPerFigure, expectedFiguresTim } = data
        return (
          <>
            <InlineMath
              math={`E = ${pp(eggsTim)}\\cdot \\frac{1}{${pp(eggsPerFigure)}}`}
            />
            <br />
            <InlineMath math={`E = ${pp(expectedFiguresTim)}`} />
            <br />
            <p>
              Tim kann also <InlineMath math={`${pp(expectedFiguresTim)}`} />{' '}
              Figuren erwarten.
            </p>
          </>
        )
      },
    },
    {
      points: 5,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Mehmet kauft zwei Eier und prüft, ob darin jeweils eine
              Sammelfigur enthalten ist oder nicht.
            </p>
            <p>
              Bestimmen Sie mit Hilfe eines Baumdiagramms die Wahrscheinlichkeit
              dafür, dass in keinem der beiden Eier eine Figur enthalten ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { eggsPerFigure, probabilityNoFigure } = data

        return (
          <>
            <p>
              Die Wahrscheinlichkeit für „keine Figur“ beträgt pro Ei
              <InlineMath
                math={`\\ \\frac{${pp(eggsPerFigure - 1)}}{${pp(eggsPerFigure)}}`}
              />
              .
            </p>
            <InlineMath
              math={`P = \\frac{${pp(eggsPerFigure - 1)}}{${pp(
                eggsPerFigure,
              )}}\\cdot \\frac{${pp(eggsPerFigure - 1)}}{${pp(eggsPerFigure)}}`}
            />
            <br />
            <InlineMath math={`P = ${pp(probabilityNoFigure)}`} />
            <br />
            <InlineMath
              math={`P \\approx ${pp(round2(probabilityNoFigure * 100))}\\,\\%`}
            />
          </>
        )
      },
    },
    {
      points: 3,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { eggPrice, figureSalePrice, eggsPaula } = data
        return (
          <>
            <p>
              Ein Ei kostet <InlineMath math={`${pp(eggPrice)}`} /> €. Paula kann
              eine Sammelfigur für <InlineMath math={`${pp(figureSalePrice)}`} /> €
              verkaufen. Deshalb möchte sie{' '}
              <InlineMath math={`${pp(eggsPaula)}`} /> Eier kaufen.
            </p>
            <p>
              Begründen Sie, ob Paula damit rechnen kann, dass sich der Kauf für
              sie lohnt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const {
          eggsPerFigure,
          eggsPaula,
          eggPrice,
          figureSalePrice,
          paulaCost,
          paulaExpectedRevenue,
        } = data

        const profitable = paulaExpectedRevenue > paulaCost

        return (
          <>
            <p>Zuerst wird der erwartete Erlös bestimmt.</p>
            <InlineMath
              math={`E = ${pp(eggsPaula)}\\cdot \\frac{1}{${pp(
                eggsPerFigure,
              )}}\\cdot ${pp(figureSalePrice)}`}
            />
            <br />
            <InlineMath math={`E \\approx ${pp(paulaExpectedRevenue)}`} />
            <span> €</span>
            <br />
            <InlineMath
              math={`K = ${pp(eggsPaula)}\\cdot ${pp(eggPrice)} = ${pp(
                paulaCost,
              )}`}
            />
            <span> €</span>
            <br />
            {profitable ? (
              <p>
                Da der erwartete Erlös größer als die Kosten ist, kann Paula
                damit rechnen, dass sich der Kauf lohnt.
              </p>
            ) : (
              <p>
                Da der erwartete Erlös kleiner als die Kosten ist, kann Paula
                nicht damit rechnen, dass sich der Kauf lohnt.
              </p>
            )}
          </>
        )
      },
    },
  ],
}