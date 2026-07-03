// ======================================
// 5001 — Lage von Punkten (Achsen/Ebenen)
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // Teil (a): Punkt mit mindestens einer 0 (genau 1 oder genau 2 Nullen)
  ax: number
  ay: number
  az: number

  // Teil (b): Zielvorgabe + ein korrektes Beispiel (zur Musterlösung)
  targetType: 'plane' | 'axis'
  targetIdx: 1 | 2 | 3 // 1→x1, 2→x2, 3→x3
  exX: number
  exY: number
  exZ: number
}

export const exercise5001: Exercise<DATA> = {
  title: 'Lage von Punkten',
  source: 'Vektoren',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    // Zufällige ganzzahlige Werte aus −5…5 \ {0}
    const nz = () =>
      rng.randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])

    // --- Teil (a): Punkt mit genau 1 oder genau 2 Nullen ---
    const twoZeros = rng.randomItemFromArray([true, false]) // 50/50
    let ax = 0,
      ay = 0,
      az = 0

    if (twoZeros) {
      // Punkt auf einer Achse: wähle eine Achse, dort ≠0, die anderen 0
      const axis: 1 | 2 | 3 = rng.randomItemFromArray([1, 2, 3])
      if (axis === 1) {
        ax = nz()
        ay = 0
        az = 0
      }
      if (axis === 2) {
        ax = 0
        ay = nz()
        az = 0
      }
      if (axis === 3) {
        ax = 0
        ay = 0
        az = nz()
      }
    } else {
      // Punkt in einer Ebene (aber nicht auf einer Achse): genau eine Koordinate 0
      const zeroIdx: 1 | 2 | 3 = rng.randomItemFromArray([1, 2, 3])
      if (zeroIdx === 1) {
        ax = 0
        ay = nz()
        az = nz()
      }
      if (zeroIdx === 2) {
        ax = nz()
        ay = 0
        az = nz()
      }
      if (zeroIdx === 3) {
        ax = nz()
        ay = nz()
        az = 0
      }
    }

    // --- Teil (b): Vorgabe & Beispiel ---
    const targetType = rng.randomItemFromArray(['plane', 'axis'] as const)
    const targetIdx: 1 | 2 | 3 = rng.randomItemFromArray([1, 2, 3])
    let exX = 0,
      exY = 0,
      exZ = 0
    if (targetType === 'plane') {
      // Ebene x_target = 0, aber NICHT auf Achse ⇒ die anderen beide ≠ 0
      if (targetIdx === 1) {
        exX = 0
        exY = nz()
        exZ = nz()
      }
      if (targetIdx === 2) {
        exX = nz()
        exY = 0
        exZ = nz()
      }
      if (targetIdx === 3) {
        exX = nz()
        exY = nz()
        exZ = 0
      }
    } else {
      // Achse x_target ≠ 0, andere = 0
      if (targetIdx === 1) {
        exX = nz()
        exY = 0
        exZ = 0
      }
      if (targetIdx === 2) {
        exX = 0
        exY = nz()
        exZ = 0
      }
      if (targetIdx === 3) {
        exX = 0
        exY = 0
        exZ = nz()
      }
    }

    return { ax, ay, az, targetType, targetIdx, exX, exY, exZ }
  },

  // Beispiel-/Originaldaten
  originalData: {
    ax: 0,
    ay: -3,
    az: 4, // liegt in x1=0-Ebene (x2x3-Ebene)
    targetType: 'axis',
    targetIdx: 2,
    exX: 0,
    exY: 5,
    exZ: 0, // Beispielpunkt auf x2-Achse
  } as DATA,

  constraint({ data }) {
    // mindestens eine 0, aber nicht der Ursprung
    const zeros = [data.ax, data.ay, data.az].filter(v => v === 0).length
    const notOrigin = !(data.ax === 0 && data.ay === 0 && data.az === 0)
    return (zeros === 1 || zeros === 2) && notOrigin
  },

  intro() {
    return null
  },

  tasks: [
    // (a) Punkt klassifizieren: Ebene oder Achse?
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Gegeben ist der Punkt{' '}
            <InlineMath
              math={`P\\,(${pp(data.ax)}\\mid ${pp(data.ay)}\\mid ${pp(data.az)})`}
            />
            . Entscheiden Sie, ob <InlineMath math="P" /> in einer{' '}
            <b>Koordinatenebene</b> oder auf einer <b>Koordinatenachse</b>{' '}
            liegt, und geben Sie diese an.
          </p>
        )
      },
      solution({ data }) {
        const zeros = [
          data.ax === 0 ? 1 : 0,
          data.ay === 0 ? 1 : 0,
          data.az === 0 ? 1 : 0,
        ]
        const count = zeros[0] + zeros[1] + zeros[2]

        let text: JSX.Element
        if (count === 1) {
          // Ebene
          const which =
            data.ax === 0
              ? 'x₂x₃-Ebene (x₁ = 0)'
              : data.ay === 0
                ? 'x₁x₃-Ebene (x₂ = 0)'
                : 'x₁x₂-Ebene (x₃ = 0)'
          text = <span>{which}</span>
        } else {
          // Achse
          const which =
            data.ax !== 0
              ? 'x₁-Achse (x₂ = x₃ = 0)'
              : data.ay !== 0
                ? 'x₂-Achse (x₁ = x₃ = 0)'
                : 'x₃-Achse (x₁ = x₂ = 0)'
          text = <span>{which}</span>
        }

        return (
          <>
            <p>
              Es werden Nullen gezählt: eine 0 ⇒ Koordinaten
              <strong>ebene</strong>, zwei 0 ⇒ Koordinaten<strong>achse</strong>
              .
            </p>
            <p>
              Ergebnis: <b>{text}</b>.
            </p>
          </>
        )
      },
    },

    // (b) Beispielpunkt angeben für eine geforderte Lage
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const label =
          data.targetType === 'plane'
            ? data.targetIdx === 1
              ? 'x₁x₂x₃-Ebenenbezeichnung: x₁ = 0 → x₂x₃-Ebene'
              : data.targetIdx === 2
                ? 'x₂ = 0 → x₁x₃-Ebene'
                : 'x₃ = 0 → x₁x₂-Ebene'
            : data.targetIdx === 1
              ? 'x₁-Achse'
              : data.targetIdx === 2
                ? 'x₂-Achse'
                : 'x₃-Achse'
        return (
          <>
            <p>
              Geben Sie einen Punkt an, der{' '}
              {data.targetType === 'plane'
                ? `in der ${
                    data.targetIdx === 1
                      ? 'x₂x₃-Ebene (x₁=0)'
                      : data.targetIdx === 2
                        ? 'x₁x₃-Ebene (x₂=0)'
                        : 'x₁x₂-Ebene (x₃=0)'
                  } liegt und nicht auf einer Achse.`
                : `auf der ${data.targetIdx === 1 ? 'x₁-' : data.targetIdx === 2 ? 'x₂-' : 'x₃-'}Achse liegt.`}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Ein mögliches korrektes Beispiel lautet:</p>
            <p>
              <InlineMath
                math={`Q\\,(${pp(data.exX)}\\mid ${pp(data.exY)}\\mid ${pp(data.exZ)})`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
