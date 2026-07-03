// ======================================
// 5004 — Linearkombinationen
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // Vektoren a, b in R^3
  ax: number
  ay: number
  az: number
  bx: number
  by: number
  bz: number
  // Linearkombination k1·a + k2·b
  k1: number
  k2: number
  label: string // z.B. "a+2b", "-3a+b"
}

export const exercise5004: Exercise<DATA> = {
  title: 'Linearkombinationen',
  source: 'Vektoren',
  useCalculator: false,
  duration: 8,
  points: 6,

  generator(rng) {
    const r = () => rng.randomIntBetween(-5, 5)
    // sorge für „nette“ Vektoren, nicht beide Null
    let ax = r(),
      ay = r(),
      az = r()
    let bx = r(),
      by = r(),
      bz = r()
    const allZero = (x: number, y: number, z: number) =>
      x === 0 && y === 0 && z === 0
    if (allZero(ax, ay, az)) {
      ax = 1
    } // minimal sicherstellen
    if (allZero(bx, by, bz)) {
      bx = -1
    }

    // feste abwechslungsreiche Settings
    const combos = [
      { k1: 0.5, k2: 1, label: '0,5 \\cdot a+b' },
      { k1: 1, k2: -0.5, label: 'a-0,5\\cdot b' },
      { k1: -0.5, k2: 1, label: '-0,5\\cdot a+b' },
      { k1: 2, k2: 1, label: '2a+b' },
      { k1: 1, k2: 2, label: 'a+2b' },
      { k1: -3, k2: 1, label: '-3a+b' },
      { k1: 1, k2: -2, label: 'a-2b' },
      { k1: 2, k2: -3, label: '2a-3b' },
    ]
    const pick = rng.randomItemFromArray(combos)

    return { ax, ay, az, bx, by, bz, ...pick }
  },

  // Beispiel-/Originaldaten
  originalData: {
    ax: 2,
    ay: -1,
    az: 3,
    bx: -1,
    by: 4,
    bz: 0,
    k1: 1,
    k2: 2,
    label: 'a+2b',
  } as DATA,

  constraint({ data }) {
    // keine weiteren strengen Bedingungen nötig
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Gegeben sind die Vektoren.</p>
        <BlockMath
          math={String.raw`
            \vec a=\begin{pmatrix}${pp(data.ax)}\\ ${pp(data.ay)}\\ ${pp(data.az)}\end{pmatrix},
            \qquad
            \vec b=\begin{pmatrix}${pp(data.bx)}\\ ${pp(data.by)}\\ ${pp(data.bz)}\end{pmatrix}.
          `}
        />
        <p>
          Berechnen Sie die Linearkombination<br></br>{' '}
          <InlineMath math={`${data.label}`} />.
        </p>
      </>
    )
  },

  solution({ data }) {
    const { ax, ay, az, bx, by, bz, k1, k2, label } = data
    const rx = k1 * ax + k2 * bx
    const ry = k1 * ay + k2 * by
    const rz = k1 * az + k2 * bz

    const k1s = k1 === 1 ? '' : k1 === -1 ? '-' : `${pp(k1)}`
    const k2s = k2 === 1 ? '' : k2 === -1 ? '-' : `${pp(k2)}`

    return (
      <>
        <BlockMath
          math={String.raw`
            
            ${k1s}\begin{pmatrix}${pp(ax)}\\ ${pp(ay)}\\ ${pp(az)}\end{pmatrix}
            ${k2 >= 0 ? '+' : ''}
            ${k2s}\begin{pmatrix}${pp(bx)}\\ ${pp(by)}\\ ${pp(bz)}\end{pmatrix}=\begin{pmatrix}${pp(rx)}\\ ${pp(ry)}\\ ${pp(rz)}\end{pmatrix}
          `}
        />
      </>
    )
  },
}
