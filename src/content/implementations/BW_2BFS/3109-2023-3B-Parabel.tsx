// =====================================
// 3B — Parabel y = x^2 + 4x + 1
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3109 {
  a: number
  b: number
  c: number
  m: number // Steigung der Ursprungsgeraden
}

// Mapper wie gewohnt (KS 10er-Raster)
function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3109: Exercise<DATA3109> = {
  title: 'Parabel',
  source: '2023 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    // Wir erzeugen eine Parabel p: y = x^2 + b x + c
    // und eine Ursprungsgerade y = m x, die p BERÜHRT (genau 1 Schnittpunkt).
    // Konstruktiv: wähle m ∈ {-3,-2,-1,1,2,3}, k ∈ {1,2,3}
    // setze b = m + 2k  ⇒  b - m = 2k  ⇒  c = k^2  (Diskriminante 0).
    const m = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])
    const k = rng.randomItemFromArray([1, 2, 3])
    const b = m + 2 * k
    const c = k * k
    return { a: 1, b, c, m }
  },

  // Originaldaten exakt wie im Scan: y = x^2 + 4x + 1, m = 2
  originalData: { a: 1, b: 4, c: 1, m: 2 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Die Parabel <InlineMath math="p" /> hat die Gleichung <br></br>
        <InlineMath
          math={`y = x^{2}${pp(data.b, 'merge_op')}x${pp(data.c, 'merge_op')}.`}
        />
      </p>
    )
  },

  tasks: [
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie die Koordinaten des Scheitelpunktes. Zeichnen Sie die
            Parabel <InlineMath math="p" /> in ein Koordinatensystem.
          </p>
        )
      },
      solution({ data }) {
        const a = data.a
        const b = data.b
        const c = data.c
        const h = -b / (2 * a)
        const k = a * h * h + b * h + c

        // Parabel-SVG
        const xs: number[] = []
        for (let x = h - 6; x <= h + 6; x += 0.1) xs.push(+x.toFixed(1))
        const path = xs
          .map(x => `${toX(x)},${toY(a * x * x + b * x + c)}`)
          .join(' ')

        return (
          <div className="space-y-2">
            <p>Bestimme die Scheitelpunktform mit quadratischer Ergänzung:</p>
            <BlockMath
              math={`y = x^{2}${pp(data.b, 'merge_op')}x + \\left(\\frac{${pp(data.b)}}{2}\\right)^2${pp(data.c, 'merge_op')}- \\left(\\frac{${pp(data.b)}}{2}\\right)^2`}
            />
            <BlockMath
              math={`y = \\left(x ${data.b > 0 ? '+' : '-'}\\frac{${pp(data.b)}}{2}\\right)^{2} ${pp(data.c - (data.b / 2) * (data.b / 2), 'merge_op')}`}
            />
            <BlockMath
              math={`y = (x ${pp(data.b / 2, 'merge_op')})^{2} ${pp(data.c - (data.b / 2) * (data.b / 2), 'merge_op')}`}
            />
            <BlockMath
              math={`\\Rightarrow\\; S\\,=\\,(${pp(h)}\\mid ${pp(k)})`}
            />
            <svg
              viewBox="0 0 328 328"
              width="328"
              height="328"
              className="border rounded"
            >
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                width="328"
                height="328"
              />
              <polyline
                points={path}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
              <circle cx={toX(h)} cy={toY(k)} r="3" />
              <text x={toX(h) + 6} y={toY(k) - 6} fontSize="12">
                S
              </text>
            </svg>
          </div>
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
          <p>
            Die Ursprungsgerade mit der Steigung{' '}
            <InlineMath math={`${pp(data.m)}`} /> und die Parabel{' '}
            <InlineMath math="p" /> haben genau einen Punkt gemeinsam. Bestimmen
            Sie die Koordinaten dieses Punktes.
          </p>
        )
      },
      solution({ data }) {
        // Berührpunkt durch Gleichsetzen y = x^2 + b x + c = m x
        // x^2 + (b - m)x + c = 0  mit Diskriminante 0 ⇒ x = -(b - m)/2
        const bm = data.b - data.m
        const x = -bm / 2
        const y = data.m * x
        return (
          <div className="space-y-2">
            <p>
              Setze die Parabelgleichung und Geradengleichung gleich und löse:
            </p>
            <BlockMath
              math={`x^2+${pp(data.b)}x+${pp(data.c)}=${pp(data.m)}x`}
            />
            <BlockMath
              math={`\\Rightarrow\\; x^2+${pp(bm)}x+${pp(data.c)}=0`}
            />
            <p>Verwende die pq-Formel. Unter der Wurzel wird 0 stehen.</p>
            <BlockMath
              math={`\\Rightarrow\\; x=-\\dfrac{${pp(bm)}}{2}\\pm\\sqrt{0}=${pp(x)}`}
            />
            <p>Setze in die Geradengleichung ein für y:</p>
            <BlockMath
              math={`y=${pp(data.m)}\\cdot${pp(x, 'embrace_neg')}=${pp(y)}`}
            />
            <BlockMath
              math={`\\Rightarrow\\; P\\,=\\,(${pp(x)}\\mid ${pp(y)})`}
            />
          </div>
        )
      },
    },
  ],
}
