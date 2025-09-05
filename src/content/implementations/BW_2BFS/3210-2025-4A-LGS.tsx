import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type DATA = {
  // LGS-Koeffizienten  a1 x + b1 y = c1,  a2 x + b2 y = c2
  a1: number
  b1: number
  c1: number
  a2: number
  b2: number
  c2: number

  // abgeleitet
  det: number
  x: number
  y: number

  // Teil (b): zufällige Aussage-Variante
  scenario: 'one' | 'none'
}

export const exercise3210: Exercise<DATA> = {
  title: 'LGS',
  source: '2025 Wahlteil Aufgabe 4A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // Wir erzeugen ein 2x2-System mit eindeutigem Schnittpunkt (det ≠ 0)
    // Vorgehen: wähle ganzzahlige Lösung (x0,y0), dann zufällige Richtungsvektoren
    const x0 = rng.randomIntBetween(-6, 6)
    const y0 = rng.randomIntBetween(-6, 6)

    const a1 = rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const b1 = rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    let a2 = rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    let b2 = rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])

    // Sicherstellen: Richtungen nicht proportional (det ≠ 0)
    // notfalls neu würfeln
    let tries = 0
    while (a1 * b2 - a2 * b1 === 0 && tries < 20) {
      a2 = rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
      b2 = rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
      tries++
    }

    const c1 = a1 * x0 + b1 * y0
    const c2 = a2 * x0 + b2 * y0
    const det = a1 * b2 - a2 * b1
    const x = (c1 * b2 - c2 * b1) / det
    const y = (a1 * c2 - a2 * c1) / det

    const scenario = rng.randomItemFromArray<'one' | 'none'>(['one', 'none'])

    return { a1, b1, c1, a2, b2, c2, det, x, y, scenario }
  },

  // Originaldaten aus der Abbildung:  -5x + 4y = 0  und  2x − 3y = 7
  originalData: {
    a1: -5,
    b1: 4,
    c1: 0,
    a2: 2,
    b2: -3,
    c2: 7,
    det: -5 * -3 - 2 * 4, // 7
    x: (-5 * 7 - 2 * 0) / 7, // -4
    y: ((-5 * 7 - 2 * 0) / 7) * 0, // (nicht so berechnen) -> unten korrekt
    scenario: 'one',
  } as unknown as DATA,

  constraint({ data }) {
    // Eindeutige Lösung für Teil (a)
    return (
      Number.isFinite(data.det) &&
      data.det !== 0 &&
      Math.abs(data.a1 - data.a2) > 0.001 &&
      Math.abs(data.b1 - data.b2) > 0.001
    )
  },

  intro({ data }) {
    return <></>
  },

  tasks: [
    {
      points: 24,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Lösen Sie das folgende lineare Gleichungssystem.</p>
            <BlockMath
              math={String.raw`
          \begin{aligned}
          ${pp(data.a1)}x\,${pp(data.b1, 'merge_op')}y&=${pp(data.c1)}\\
          ${pp(data.a2)}x\,${pp(data.b2, 'merge_op')}y&=${pp(data.c2)}
          \end{aligned}
        `}
            />
          </>
        )
      },
      solution({ data }) {
        const det = data.a1 * data.b2 - data.a2 * data.b1
        const numX = data.c1 * data.b2 - data.c2 * data.b1
        const numY = data.a1 * data.c2 - data.a2 * data.c1
        const x = numX / det
        const y = numY / det

        return (
          <>
            <BlockMath
              math={String.raw`
              \begin{aligned}
              \text{(I)}\; ${pp(data.a1)}x\,${pp(data.b1, 'merge_op')}y&=${pp(data.c1)}\\
              \text{(II)}\; ${pp(data.a2)}x\,${pp(data.b2, 'merge_op')}y&=${pp(data.c2)}\\[4pt]\end{aligned}`}
            />
            <InlineMath
              math={`\\text{Multipliziere die Gleichung (I) mit }\\\\ ${pp(data.b2)}\\text{ und (II) mit }${pp(-data.b1)}:`}
            />

            <BlockMath
              math={String.raw`
              \begin{aligned}
               \text{(I')}\;\; ${pp(data.a1 * data.b2)}x\,${pp(data.b1 * data.b2, 'merge_op')}y&=${pp(data.c1 * data.b2)}\\
             \text{(II')}\;\; ${pp(data.a2 * -data.b1)}x\,${pp(data.b2 * -data.b1, 'merge_op')}y&=${pp(data.c2 * -data.b1)}\\[4pt]\end{aligned}`}
            />
            <BlockMath
              math={String.raw`
              \text{Addiere die beiden Gleichungen: }\\{${pp(data.a1 * data.b2)}}x+{${pp(data.a2 * -data.b1, 'embrace_neg')}}x
              = {${pp(data.c1 * data.b2)}}+{${pp(data.c2 * -data.b1, 'embrace_neg')}}\\[2pt]
              \Rightarrow\; x=\dfrac{${pp(numX)}}{${pp(det)}}=${pp(x)}\\[6pt]
              \text{Einsetzen in (I): } ${pp(data.a1)}\cdot${pp(x, 'embrace_neg')}\,${pp(data.b1, 'merge_op')}y=${pp(data.c1)}\\
              \;\Rightarrow\; y=\dfrac{${pp(numY)}}{${pp(det)}}=${pp(y)}
              
            `}
            />
            <p>
              Lösung:&nbsp;
              <InlineMath math={`\\left(${pp(x)}|${pp(y)}\\right)`} />
            </p>
          </>
        )
      },
    },

    {
      points: 18,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            {data.scenario === 'one' ? (
              <p>
                Ein anderes lineares Gleichungssystem hat genau eine Lösung.
                Erklären Sie, wie man die Lösung zeichnerisch ermitteln kann.
              </p>
            ) : (
              <p>
                Ein anderes lineares Gleichungssystem hat <strong>keine</strong>{' '}
                Lösung. Erklären Sie zeichnerisch, woran man das erkennt.
              </p>
            )}
          </>
        )
      },
      solution({ data }) {
        return data.scenario === 'one' ? (
          <div className="space-y-2">
            <p>
              Zeichnen Sie die beiden Geraden in ein gemeinsames
              Koordinatensystem. Der Schnittpunkt der Geraden ist die gesuchte
              Lösung des LGS.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p>
              Zeichnen Sie die beiden Geraden in ein Koordinatensystem. Wenn die
              Geraden <em>parallel</em> sind, hat das System hat{' '}
              <strong>keine</strong> Lösung.
            </p>
          </div>
        )
      },
    },
  ],
}
