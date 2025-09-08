// ====================================
// 2C (3058) – Drahtfigur (Strahlensatz)
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  c: number
  d: number
  e: number // gegeben
  b: number
  f: number // gesucht
  pricePerM: number
}

export const exercise3057: Exercise<DATA> = {
  title: 'Drahtfigur: fehlende Längen & Materialkosten',
  source: '2022 Aufgabe 2C',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    // Erzeuge ähnliche Dreiecke mit Parallelität (f || a)
    const a = rng.randomItemFromArray([2.4, 3.0, 3.6])
    const c = rng.randomItemFromArray([2.8, 3.2, 3.6])
    const d = rng.randomItemFromArray([2.0, 2.2])
    const e = rng.randomItemFromArray([1.0, 1.2, 1.4])
    // Verhältnis großer/kleiner Teildreiecke entlang der Höhe:
    const k = c / (d + e) // c = d+e im Bild? (hier nähern)
    const b = d + e // Gesamt-Seitenhöhe außen
    const f = a * (e / (d + e)) // Parallel => ähnliche Dreiecke: f/a = e/(d+e)
    const pricePerM = rng.randomItemFromArray([34, 36, 38, 40])
    return { a, c, d, e, b, f, pricePerM }
  },

  originalData: {
    a: 2.4,
    c: 2.8,
    d: 2.0,
    e: 1.0,
    b: 3.0,
    f: 1.2,
    pricePerM: 38,
  },

  constraint() {
    return true
  },

  intro() {
    return <img src="/content/BW_2BFS/3058.png" width={320} alt="Drahtfigur" />
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>1.</b> Berechnen Sie die fehlenden Seitenlängen{' '}
            <InlineMath math="b" /> und <InlineMath math="f" />.
          </p>
        )
      },
      solution({ data }) {
        return (
          <div className="space-y-1">
            <InlineMath
              math={`b=d+e=${pp(data.d)}+${pp(data.e)}=${pp(data.b)}\\,\\text{cm}`}
            />
            <br />
            <InlineMath
              math={`\\dfrac{f}{a}=\\dfrac{e}{d+e}\\Rightarrow f=a\\cdot\\dfrac{e}{d+e}=${pp(data.a)}\\cdot\\dfrac{${pp(data.e)}}{${pp(data.d + data.e)}}=${pp(Math.round(data.f * 100) / 100)}\\,\\text{cm}`}
            />
          </div>
        )
      },
    },
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>2.</b> Ein Meter Draht kostet {` ${38}–€`} (variiert). Bestimmen
            Sie die Materialkosten pro Figur.
          </p>
        )
      },
      solution({ data }) {
        // Gesamtlänge: äußerer Rahmen (a + b + c) + innerer Querbalken f + innere linke Seite e
        const totalCm = data.a + data.b + data.c + data.f + data.e
        const cost = (totalCm / 100) * data.pricePerM
        return (
          <>
            <InlineMath
              math={`L_{\\text{gesamt}}=${pp(totalCm)}\\,\\text{cm}=${pp(totalCm / 100)}\\,\\text{m}`}
            />
            <br />
            <InlineMath
              math={`\\text{Kosten}=${pp(totalCm / 100)}\\cdot ${pp(data.pricePerM)}= ${pp(Math.round(cost * 100) / 100)}\\,€`}
            />
          </>
        )
      },
    },
  ],
}
