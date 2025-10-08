// ======================================
// 5005 — Parallele Vektoren
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  ax: number
  ay: number
  az: number
  bx: number
  by: number
  bz: number
  // Meta (nur für Kontrolle/Tests)
  isParallel: boolean
  k?: number // Faktor, falls parallel
}

export const exercise5005: Exercise<DATA> = {
  title: 'Parallele Vektoren',
  source: 'Vektoren',
  useCalculator: false,
  duration: 8,
  points: 6,

  generator(rng) {
    const nz = () =>
      rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
    const isParallel = rng.randomItemFromArray([true, false])

    // Basisvektor a (alle Komponenten ≠ 0, um Quotienten sauber zu zeigen)
    const ax = nz(),
      ay = nz(),
      az = nz()

    if (isParallel) {
      const k = rng.randomItemFromArray([2, -2, 3, -3, 0.5, -0.5])
      const bx = k * ax,
        by = k * ay,
        bz = k * az
      return { ax, ay, az, bx, by, bz, isParallel, k }
    } else {
      // wähle b so, dass nicht alle Verhältnisse gleich sind
      let bx = nz(),
        by = nz(),
        bz = nz()
      // sicherstellen: nicht proportional
      const sameRatio = bx / ax === by / ay && bx / ax === bz / az
      if (sameRatio) {
        // Störe eine Komponente
        bx += rng.randomItemFromArray([-1, 1])
      }
      return { ax, ay, az, bx, by, bz, isParallel }
    }
  },

  // Beispiel-/Originaldaten
  originalData: {
    // Parallelbeispiel mit halbem Faktor
    ax: 2,
    ay: -3,
    az: 4,
    bx: -1,
    by: 1.5,
    bz: -2,
    isParallel: true,
    k: -0.5,
  } as DATA,

  constraint({ data }) {
    // a darf nicht der Nullvektor sein
    const aOk = !(data.ax === 0 && data.ay === 0 && data.az === 0)
    const bOk = !(data.bx === 0 && data.by === 0 && data.bz === 0)
    return aOk && bOk
  },

  task({ data }) {
    return (
      <>
        <p>Überprüfen Sie, ob die Vektoren parallel sind.</p>
        <BlockMath
          math={String.raw`
            \vec a=\begin{pmatrix}${pp(data.ax)}\\ ${pp(data.ay)}\\ ${pp(data.az)}\end{pmatrix}
            \qquad
            \vec b=\begin{pmatrix}${pp(data.bx)}\\ ${pp(data.by)}\\ ${pp(data.bz)}\end{pmatrix}
          `}
        />
      </>
    )
  },

  solution({ data }) {
    // Quotienten (Komponenten-Verhältnisse) berechnen
    const r1 = data.bx / data.ax
    const r2 = data.by / data.ay
    const r3 = data.bz / data.az

    // hübsches Format für einfache Brüche/ganze Zahlen
    const fmt = (v: number) => {
      const round2 = Math.round(v * 100) / 100
      if (Math.abs(round2 - Math.round(round2)) < 1e-9)
        return pp(Math.round(round2)) // ganze Zahl
      if (Math.abs(round2 - 0.5) < 1e-9) return String.raw`\tfrac{1}{2}`
      if (Math.abs(round2 + 0.5) < 1e-9) return String.raw`-\tfrac{1}{2}`
      return pp(round2)
    }

    const same = Math.abs(r1 - r2) < 1e-9 && Math.abs(r1 - r3) < 1e-9

    return (
      <>
        {same ? (
          <>
            <p>Die Vektoren sind parallel zueinander.</p>

            <p>
              Der Vektor b ist genau das{' '}
              {Math.abs(data.bx / data.ax) > 1 ? (
                <>{pp(data.bx / data.ax, 'embrace_neg')}</>
              ) : (
                <>{pp(data.ax / data.bx, 'embrace_neg')}</>
              )}
              -fache des Vektors a.
            </p>
          </>
        ) : (
          <>
            <p>Die Vektoren sind nicht parallel zueinander.</p>
            <p>
              Jede Zeile müsste das Vielfache sein von der Zeile des anderen
              Vektors.
            </p>
            <BlockMath
              math={String.raw`
                ${pp(data.ax)}=k\cdot ${pp(data.bx, 'embrace_neg')}\\
                ${pp(data.ay)}=k\cdot${pp(data.by, 'embrace_neg')}\\
               ${pp(data.az)}=k\cdot${pp(data.bz, 'embrace_neg')}
              `}
            />
            <p>
              Kein Wert für k kann das erfüllen, womit die Vektoren nicht
              parallel sind.
            </p>
          </>
        )}
      </>
    )
  },
}
