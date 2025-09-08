// ===============================
// 3C (3060) – Kerzen & Geraden
// ===============================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // alle drei beginnen gleich hoch (gemeinsamer y-Achsenabschnitt H)
  H: number
  // Steigungen (negativ), eindeutig: |mA| > |mB| > |mC|
  mA: number
  mB: number
  mC: number
  // Zeitmarke für „nur noch 7 cm“
  target: number
}

export const exercise3060: Exercise<DATA> = {
  title: 'Kerzen',
  source: '2022 Wahlteil Aufgabe 3C',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    const H = rng.randomItemFromArray([10, 11, 12, 13])
    // saubere negative Steigungen (cm/h)
    const mA = -rng.randomItemFromArray([1.0, 0.9, 0.8])
    const mB = -rng.randomItemFromArray([0.7, 0.6])
    const mC = -rng.randomItemFromArray([0.5, 0.4, 0.3])
    const target = 7
    return { H, mA, mB, mC, target }
  },

  // Original-Anmutung aus dem Bild: alle starten bei 12 cm,
  // Kerze A brennt am schnellsten, C am langsamsten.
  originalData: { H: 12, mA: -1.0, mB: -0.7, mC: -0.4, target: 7 },

  constraint({ data }) {
    return data.H > 0 && data.mA < data.mB && data.mB < data.mC && data.mC < 0
  },

  intro() {
    return (
      <div className="space-y-2">
        <p>
          Aus Wachs werden drei gleich hohe Kerzen A, B, C hergestellt. Alle
          werden gleichzeitig angezündet.
        </p>
        <img
          src="/content/BW_2BFS/3060.png"
          width={340}
          alt="Kerzen Diagramm"
        />
        <p>
          Das Diagramm zeigt vereinfacht die Höhe der Kerzen (y in cm) in
          Abhängigkeit von der Zeit (x in h).
        </p>
      </div>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return (
          <p>
            <b>1.</b> Ordnen Sie jeder Kerze eine Gerade zu und begründen Sie
            Ihre Zuordnung (Steigung/Abbrand).
          </p>
        )
      },
      task({ data }) {
        return (
          <ul className="list-disc ml-6">
            <li>
              Gerade 1: <InlineMath math={`y=${pp(data.mA)}x+${pp(data.H)}`} />{' '}
              (steil fallend)
            </li>
            <li>
              Gerade 2: <InlineMath math={`y=${pp(data.mB)}x+${pp(data.H)}`} />{' '}
              (mittlere Steigung)
            </li>
            <li>
              Gerade 3: <InlineMath math={`y=${pp(data.mC)}x+${pp(data.H)}`} />{' '}
              (flach fallend)
            </li>
          </ul>
        )
      },
      solution({ data }) {
        return (
          <div className="space-y-1">
            <p>
              Am schnellsten brennt die Kerze mit der <b>steilsten negativen</b>{' '}
              Steigung:
            </p>
            <ul className="list-disc ml-6">
              <li>
                A → Gerade 1 (|m| am größten: {pp(Math.abs(data.mA))} cm/h)
              </li>
              <li>B → Gerade 2</li>
              <li>C → Gerade 3 (am langsamsten, |m| am kleinsten)</li>
            </ul>
          </div>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            <b>2.</b> Wie lange dauert es, bis Kerze A nur noch {data.target} cm
            hoch ist?
          </p>
        )
      },
      solution({ data }) {
        const t = (data.target - data.H) / data.mA // mA < 0
        return (
          <InlineMath
            math={`t=\\dfrac{${pp(data.target)}-${pp(data.H)}}{${pp(data.mA)}}=${pp(Math.round(t * 100) / 100)}\\,\\text{h}`}
          />
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>3.</b> Geben Sie die Gleichung der Geraden zu Kerze A an.
          </p>
        )
      },
      solution({ data }) {
        return <InlineMath math={`y=${pp(data.mA)}x+${pp(data.H)}`} />
      },
    },
  ],
}
