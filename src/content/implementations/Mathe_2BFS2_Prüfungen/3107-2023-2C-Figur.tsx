// ======================================
// 2C — Viertelkreis – Kreis (Flächen R)
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3107 {
  r: number
  A: number
}

export const exercise3107: Exercise<DATA3107> = {
  title: 'Viertelkreis und Kreis',
  source: '2023 Wahlteil Aufgabe 2C',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    // Wir wählen zuerst R, berechnen daraus A, geben aber nur r und A vor.
    const r = rng.randomIntBetween(10, 25)
    const R = rng.randomIntBetween(r + 5, r + 25)
    const A = Math.round((0.25 * Math.PI * R * R - Math.PI * r * r) * 10) / 10
    return { r, A }
  },

  // Originaldaten aus dem Scan
  originalData: { r: 20, A: 574.4 },

  constraint({ data }) {
    return data.A > 0 && data.r > 0
  },

  intro() {
    return (
      <>
        <p>
          Die Figur besteht aus einem Viertelkreis mit dem Radius{' '}
          <InlineMath math="R" /> und einem Kreis mit dem Radius{' '}
          <InlineMath math="r" />.
        </p>
        <svg viewBox="0 0 328 120">
          <image href="/content/BW_2BFS/3107.png" height="120" width="328" />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Der Flächeninhalt <InlineMath math="A" /> aller grauen Flächen
              zusammen lässt sich mit folgender Gleichung bestimmen.
            </p>
            <BlockMath math={`A=\\tfrac14\\,\\pi\\,R^2-\\pi\\,r^2`} />
            <p>
              Berechnen Sie <InlineMath math="R" /> für folgende Werte:<br></br>{' '}
              <InlineMath math={`r=${pp(data.r)}\\,\\text{cm}`} /> und{' '}
              <InlineMath math={`A=${pp(data.A)}\\,\\text{cm}^2`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const R = Math.sqrt(
          (4 * (data.A + Math.PI * data.r * data.r)) / Math.PI,
        )
        const Rout = Math.round(R * 10) / 10
        return (
          <div className="space-y-2">
            <BlockMath math={`A=\\tfrac14\\pi R^2-\\pi r^2`} />
            <p>Setze die Werte ein und stelle die Gleichung um:</p>
            <BlockMath
              math={`${pp(data.A)}=\\tfrac14\\pi R^2-\\pi\\cdot${pp(data.r)}^2`}
            />
            <BlockMath
              math={`\\tfrac14\\pi R^2=${pp(data.A)}+\\pi \\cdot${pp(data.r)}^2`}
            />
            <BlockMath
              math={`R^2=\\dfrac{4\\,(${pp(data.A)}+\\pi \\cdot${pp(data.r)}^2)}{\\pi}`}
            />
            <BlockMath
              math={`R=\\sqrt{\\dfrac{4\\,(${pp(data.A)}+\\pi \\cdot${pp(data.r)}^2)}{\\pi}}\\;\\approx\\;${pp(Rout)}\\,\\text{cm}`}
            />
          </div>
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
          <>
            <p>
              Zur Berechnung von <InlineMath math="R" /> wird folgende andere
              Gleichung aufgestellt:
            </p>
            <BlockMath math={`(R-r)^2=r^2+r^2`} />
            <p>Erläutern Sie, wie diese Gleichung zustande kommt.</p>
          </>
        )
      },
      solution() {
        return (
          <div className="space-y-2">
            <p>
              Verbindet man den Mittelpunkt des Kreises mit dem rechten Winkel
              des Viertelkreises, entsteht ein rechtwinkliges Dreieck.
            </p>
            <ul className="list-disc ml-6">
              <li>
                Beide Katheten haben die Länge <InlineMath math="r" />.
              </li>
              <li>
                Die Hypotenuse ist die Strecke von der Ecke des Viertelkreises
                bis zum Kreismittelpunkt. Ihre Länge ist{' '}
                <InlineMath math="R-r" />.
              </li>
            </ul>
            <p>Mit dem Satz des Pythagoras:</p>
            <BlockMath math={`(R-r)^2=r^2+r^2`} />
          </div>
        )
      },
    },
  ],
}
