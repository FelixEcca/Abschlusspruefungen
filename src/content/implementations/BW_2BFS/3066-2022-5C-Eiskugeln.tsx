// =====================================
// 5C (3066) – Eisladen: Volumen & Kosten
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  dBall: number // cm (Durchmesser einer Kugel)
  priceBall: number // €
  cubeEdge: number // cm (Eis "Cubix")
  cubePrice: number // €
  matCostPerL: number // €/L Material Schokoeis
  overheadFactor: number // z.B. 5 (= 400% Nebenkosten + Material)
  sellPortionMl: number // ml
  sellPricePortion: number // €
}

export const exercise3066: Exercise<DATA> = {
  title: 'Eis: Kugelvolumen, Vergleich & Gewinn pro Liter',
  source: '2022 Aufgabe 5C',
  useCalculator: true,
  duration: 14,

  generator(rng) {
    const dBall = rng.randomItemFromArray([5, 6])
    const priceBall = rng.randomItemFromArray([1.1, 1.2, 1.3])
    const cubeEdge = rng.randomItemFromArray([5, 6])
    const cubePrice = rng.randomItemFromArray([2.2, 2.4, 2.6])
    const matCostPerL = rng.randomItemFromArray([2.5, 3.0])
    const overheadFactor = 5 // 400% Nebenkosten → gesamt = 5·Material
    const sellPortionMl = rng.randomItemFromArray([80, 100, 120])
    const sellPricePortion = rng.randomItemFromArray([2.0, 2.25, 2.5])
    return {
      dBall,
      priceBall,
      cubeEdge,
      cubePrice,
      matCostPerL,
      overheadFactor,
      sellPortionMl,
      sellPricePortion,
    }
  },

  // Originaldaten sinngemäß: d=5 cm, Preis Kugel 1,20 €, „Cubix“ 5 cm Kantenlänge für 2,40 €, Material 2,50 €/L, 100 ml für 2,25 €
  originalData: {
    dBall: 5,
    priceBall: 1.2,
    cubeEdge: 5,
    cubePrice: 2.4,
    matCostPerL: 2.5,
    overheadFactor: 5,
    sellPortionMl: 100,
    sellPricePortion: 2.25,
  },

  constraint() {
    return true
  },

  intro() {
    return (
      <p>
        Janine verkauft Eiskugeln (Durchmesser <InlineMath math="d" />) und ein
        Würfeleis „Cubix“ (Kantenlänge <InlineMath math="a" />
        ).
      </p>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return (
          <p>
            <b>1.</b> Volumen einer Eisportion aus zwei Kugeln in ml.
          </p>
        )
      },
      task({ data }) {
        return (
          <p>
            Gegeben: <InlineMath math={`d=${data.dBall}\\,\\text{cm}`} />.
          </p>
        )
      },
      solution({ data }) {
        const r = data.dBall / 2
        const V = 2 * (4 / 3) * Math.PI * r ** 3 // cm^3 = ml
        return (
          <InlineMath
            math={`V=2\\cdot\\tfrac{4}{3}\\pi r^{3}= ${pp(Math.round(V * 100) / 100)}\\,\\text{ml}`}
          />
        )
      },
    },
    {
      points: 5,
      intro() {
        return (
          <p>
            <b>2.</b> Discounter: Eiswürfel <InlineMath math="a" /> cm zwischen
            zwei Waffeln für {`€`}?. Wo bekommt man mehr Eis fürs Geld (ml pro
            Euro)?
          </p>
        )
      },
      task({ data }) {
        return (
          <p>
            Gegeben:{' '}
            <InlineMath
              math={`a=${data.cubeEdge}\\,\\text{cm},\\; p_{\\text{Cubix}}=${pp(data.cubePrice)}\\,€`}
            />
            , Kugelpreis {pp(data.priceBall)} € pro Stück.
          </p>
        )
      },
      solution({ data }) {
        const r = data.dBall / 2
        const V2Balls = 2 * (4 / 3) * Math.PI * r ** 3
        const mlPerEuroBalls = V2Balls / (2 * data.priceBall)
        const Vcube = data.cubeEdge ** 3
        const mlPerEuroCube = Vcube / data.cubePrice
        return (
          <>
            <BlockMath
              math={`\\text{Kugeln: }\\frac{${pp(V2Balls)}\\,\\text{ml}}{${pp(2 * data.priceBall)}\\,€}=${pp(Math.round(mlPerEuroBalls * 100) / 100)}\\,\\text{ml/€}`}
            />
            <BlockMath
              math={`\\text{Cubix: }\\frac{${pp(Vcube)}\\,\\text{ml}}{${pp(data.cubePrice)}\\,€}=${pp(Math.round(mlPerEuroCube * 100) / 100)}\\,\\text{ml/€}`}
            />
            <p>
              {mlPerEuroBalls > mlPerEuroCube
                ? 'Mehr Eis fürs Geld: 2 Kugeln.'
                : 'Mehr Eis fürs Geld: Cubix.'}
            </p>
          </>
        )
      },
    },
    {
      points: 5,
      intro() {
        return (
          <p>
            <b>3.</b> Gewinn pro Liter Schokoeis (Materialkosten {pp(2.5)} €/L;
            Nebenkosten = 400 % der Materialkosten). Verkauf in Portionen zu{' '}
            {` `}
            <InlineMath math="100\\,\\text{ml}" /> für {pp(2.25)} € (variabel).
          </p>
        )
      },
      task({ data }) {
        return <p>Nutzen Sie die angegebenen Werte.</p>
      },
      solution({ data }) {
        const costPerL = data.matCostPerL * data.overheadFactor // € je L gesamt
        const portionsPerL = 1000 / data.sellPortionMl
        const revenuePerL = portionsPerL * data.sellPricePortion
        const profit = revenuePerL - costPerL
        return (
          <>
            <InlineMath
              math={`\\text{Kosten je L}=${pp(data.matCostPerL)}\\cdot ${pp(data.overheadFactor)}=${pp(costPerL)}\\,€`}
            />
            <br />
            <InlineMath
              math={`\\text{Erlös je L}=\\tfrac{1000}{${pp(data.sellPortionMl)}}\\cdot ${pp(data.sellPricePortion)}=${pp(Math.round(revenuePerL * 100) / 100)}\\,€`}
            />
            <br />
            <InlineMath
              math={`\\text{Gewinn je L}= ${pp(Math.round(profit * 100) / 100)}\\,€`}
            />
          </>
        )
      },
    },
  ],
}
