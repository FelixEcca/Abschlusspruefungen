// exercise3066.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  scoopDiameter: number
  scoopPrice: number
  cubeEdge: number
  discounterPrice: number
  chocoCostPerLiter: number
  extraFactor: number
  portionMl: number
  portionPrice: number
  scoopVolumeTwoMl: number
  cubeVolumeMl: number
  profitPerLiter: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3066: Exercise<DATA> = {
  title: 'Eisladen',
  source: 'Prüfung 2022 / Aufgabe 5C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const scoopDiameter = 5
    const scoopPrice = 1.2
    const cubeEdge = 5
    const discounterPrice = 2.4
    const chocoCostPerLiter = rng.randomItemFromArray([2.5, 3, 3.5])
    const extraFactor = 4
    const portionMl = 100
    const portionPrice = rng.randomItemFromArray([2.25, 2.5, 2.75])

    const r = scoopDiameter / 2
    const scoopVolumeTwoMl = round2(2 * (4 / 3) * Math.PI * r ** 3)
    const cubeVolumeMl = cubeEdge ** 3
    const totalCostPerLiter = chocoCostPerLiter * (1 + extraFactor)
    const revenuePerLiter = (1000 / portionMl) * portionPrice
    const profitPerLiter = round2(revenuePerLiter - totalCostPerLiter)

    return {
      scoopDiameter,
      scoopPrice,
      cubeEdge,
      discounterPrice,
      chocoCostPerLiter,
      extraFactor,
      portionMl,
      portionPrice,
      scoopVolumeTwoMl,
      cubeVolumeMl,
      profitPerLiter,
    }
  },

  originalData: {
    scoopDiameter: 5,
    scoopPrice: 1.2,
    cubeEdge: 5,
    discounterPrice: 2.4,
    chocoCostPerLiter: 2.5,
    extraFactor: 4,
    portionMl: 100,
    portionPrice: 2.25,
    scoopVolumeTwoMl: round2(2 * (4 / 3) * Math.PI * 2.5 ** 3),
    cubeVolumeMl: 125,
    profitPerLiter: round2(10 * 2.25 - 2.5 * 5),
  },

  constraint() {
    return true
  },

  intro() {
    return (
      <>
        <p>
          Janine hat einen kleinen Eisladen. Ihre Eiskugeln haben einen
          Durchmesser von 5 cm und kosten je Kugel 1,20 €.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Berechnen Sie das Volumen einer Eisportion aus zwei Kugeln in ml.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={'V = 2\\cdot \\frac{4}{3}\\pi r^3'} />
            <br />
            <InlineMath math={`V = 2\\cdot \\frac{4}{3}\\pi\\cdot ${pp(2.5)}^3`} />
            <br />
            <InlineMath math={`V \\approx ${pp(data.scoopVolumeTwoMl)}\\,\\mathrm{ml}`} />
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return (
          <>
            <p>
              In einem Discounter wird das Eis „Cubix“ (Würfelform mit 5 cm
              Kantenlänge) zwischen zwei Waffeln für 2,40 € verkauft.
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>Wo bekommt man mehr Eis fürs Geld?</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`V_\\text{Cubix} = ${pp(data.cubeEdge)}^3 = ${pp(
              data.cubeVolumeMl,
            )}\\,\\mathrm{ml}`}
            />
            <br />
            <InlineMath
              math={`V_\\text{Janine} \\approx ${pp(data.scoopVolumeTwoMl)}\\,\\mathrm{ml}`}
            />
            <br />
            <p>
              Da Janines Portion bei gleichem Preis mehr Volumen hat, bekommt man
              dort mehr Eis fürs Geld.
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Die Materialkosten von Schokoeis betragen{' '}
              <InlineMath math={`${pp(data.chocoCostPerLiter)}`} /> € pro Liter.
              Janine rechnet 400% der Materialkosten für die Nebenkosten hinzu.
              Sie überlegt, dass sie Schokoeis in Portionen zu 100 ml für{' '}
              <InlineMath math={`${pp(data.portionPrice)}`} /> € verkauft.
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>
              Bestimmen Sie, wie viel Euro Janine nach Abzug der Material- und
              Nebenkosten an einem Liter Schokoeis verdient.
            </p>
          </>
        )
      },
      solution({ data }) {
        const totalCost = round2(data.chocoCostPerLiter * 5)
        const revenue = round2(10 * data.portionPrice)

        return (
          <>
            <p>Zu den Materialkosten kommen 400% Nebenkosten hinzu.</p>
            <InlineMath
              math={`K = ${pp(data.chocoCostPerLiter)}\\cdot 5 = ${pp(totalCost)}`}
            />
            <span> €</span>
            <br />
            <InlineMath
              math={`E = 10\\cdot ${pp(data.portionPrice)} = ${pp(revenue)}`}
            />
            <span> €</span>
            <br />
            <InlineMath
              math={`G = ${pp(revenue)} - ${pp(totalCost)} = ${pp(
                data.profitPerLiter,
              )}`}
            />
            <span> €</span>
          </>
        )
      },
    },
  ],
}