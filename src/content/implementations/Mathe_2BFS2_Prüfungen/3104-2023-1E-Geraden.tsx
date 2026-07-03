// =======================================
// 1E (Index 3104) — Geraden g, h + Gerade k
//
// k: immer waagrecht (m = 0) und geht durch S → y = y_S
// =======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3104 {
  // g/h: jeweils Steigung m und Achsenabschnitt b (Zuweisung wird RANDOMisiert)
  mg: number
  bg: number
  mh: number
  bh: number
  // S(x|y) liegt auf h (für Teil (2))
  Sx: number
  Sy: number
  // k: waagrecht durch S  ⇒ mk = 0,  bk = Sy
  mk: number
  bk: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3104: Exercise<DATA3104> = {
  title: 'Geraden zuordnen & Gerade durch gegebenen Punkt',
  source: '2023 Pflichtteil 1E',
  useCalculator: false,
  duration: 12,

  generator(rng) {
    // Eine steigende & eine fallende Gerade konstruieren
    const mPos = rng.randomItemFromArray([0.5, 1, 1.5, 2])
    const bPos = rng.randomIntBetween(-2, 4)

    const mNeg = rng.randomItemFromArray([-0.5, -1, -1.5, -2])
    const bNeg = rng.randomIntBetween(2, 6)

    // RANDOM: Welche davon heißt h, welche g?
    const hIsPos = rng.randomItemFromArray([true, false])
    const mh = hIsPos ? mPos : mNeg
    const bh = hIsPos ? bPos : bNeg
    const mg = hIsPos ? mNeg : mPos
    const bg = hIsPos ? bNeg : bPos

    // Schnittpunkt S auf h (sichtbarer Bereich)
    const Sx = rng.randomIntBetween(-1, 6)
    const Sy = mh * Sx + bh

    // k ist waagrecht: m = 0, b = Sy
    const mk = 0
    const bk = Sy

    return { mg, bg, mh, bh, Sx, Sy, mk, bk }
  },

  // Originaldaten (entsprechen dem Scan; k wird waagrecht durch S gelegt)
  originalData: { mg: -0.5, bg: 4, mh: 1, bh: 1, Sx: 1, Sy: 2, mk: 0, bk: 2 },

  constraint({ data }) {
    // k muss waagrecht sein und durch S gehen
    return (
      isFinite(data.mg) &&
      isFinite(data.mh) &&
      data.mk === 0 &&
      Math.abs(data.bk - data.Sy) < 1e-9
    )
  },

  intro({ data }) {
    const xs: number[] = []
    for (let x = -8; x <= 8; x += 0.1) xs.push(+x.toFixed(1))
    const pathG = xs
      .map(x => `${toX(x)},${toY(data.mg * x + data.bg)}`)
      .join(' ')
    const pathH = xs
      .map(x => `${toX(x)},${toY(data.mh * x + data.bh)}`)
      .join(' ')
    return (
      <div className="space-y-2">
        <p>
          Dargestellt sind zwei Geraden <InlineMath math="g" /> und{' '}
          <InlineMath math="h" /> sowie jeweils eine zugehörige Gleichung.
        </p>
        <div>
          {/* Gleichungen (ohne Zuordnung) */}
          <InlineMath
            math={`y=${data.mh === 1 ? '' : data.mh === -1 ? '-' : pp(data.mh)}x${pp(
              data.bh,
              'merge_op',
            )}`}
          />
          <br />
          <InlineMath
            math={`y=${data.mg === 1 ? '' : data.mg === -1 ? '-' : pp(data.mg)}x${pp(
              data.bg,
              'merge_op',
            )}`}
          />
        </div>
        <svg viewBox="0 0 328 328" width="328" height="328">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            width="328"
            height="328"
          />
          <polyline points={pathG} fill="none" stroke="black" strokeWidth="2" />
          <polyline points={pathH} fill="none" stroke="black" strokeWidth="2" />
          {/* Labels an den Linien */}
          <text x={toX(-1)} y={toY(data.mg * -1 + data.bg) - 6}>
            g
          </text>
          <text x={toX(4)} y={toY(data.mh * 4 + data.bh) - 6}>
            h
          </text>
        </svg>
      </div>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Begründen Sie, welche Gleichung zu <InlineMath math="g" /> bzw.{' '}
            <InlineMath math="h" /> gehört.
          </p>
        )
      },
      solution({ data }) {
        const isHSteigend = data.mh > 0
        return (
          <>
            <p>
              Die steigende Gerade hat positive Steigung (
              <InlineMath math="m>0" />
              ):
            </p>
            <InlineMath
              math={`${isHSteigend ? 'h' : 'g'}: y=${pp(isHSteigend ? data.mh : data.mg)}x${pp(
                isHSteigend ? data.bh : data.bg,
                'merge_op',
              )}`}
            />
            <br />
            <p>
              Die fallende Gerade hat negative Steigung (
              <InlineMath math="m<0" />
              ):
            </p>
            <InlineMath
              math={`${isHSteigend ? 'g' : 'h'}: y=${pp(!isHSteigend ? data.mh : data.mg)}x${pp(
                !isHSteigend ? data.bh : data.bg,
                'merge_op',
              )}`}
            />
          </>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Gerade <InlineMath math="k" /> schneidet <InlineMath math="h" /> in{' '}
            <InlineMath math={`S(${pp(data.Sx)}\\mid ${pp(data.Sy)})`} />.
            Zeichnen Sie eine mögliche waagerechte Gerade{' '}
            <InlineMath math="k" /> in das Koordinatensystem und bestimmen Sie
            ihre Gleichung.
          </p>
        )
      },
      solution({ data }) {
        const xs: number[] = []
        for (let x = -8; x <= 8; x += 0.1) xs.push(+x.toFixed(1))
        const pathK = xs.map(x => `${toX(x)},${toY(data.bk)}`).join(' ') // m=0 ⇒ y=b
        const pathH = xs
          .map(x => `${toX(x)},${toY(data.mh * x + data.bh)}`)
          .join(' ')
        const pathG = xs
          .map(x => `${toX(x)},${toY(data.mg * x + data.bg)}`)
          .join(' ')
        return (
          <>
            <p>Im einfachsten Fall ist k einfach eine waagerechte Gerade:</p>
            <div>
              <InlineMath math={`\\Rightarrow\\; y=b`} />
              <br />
              <InlineMath
                math={`\\text{Durch } S(${pp(data.Sx)}\\mid ${pp(
                  data.Sy,
                )})\\;\\Rightarrow\\; b = ${pp(data.Sy)}`}
              />
              <br />
              <InlineMath
                math={`\\text{Gerade } k:\\quad y = ${pp(data.Sy)}`}
              />
              <svg viewBox="0 0 328 328" width="328" height="328">
                <image
                  href="/content/BW_2BFS/ksgroßmitachsen.png"
                  width="328"
                  height="328"
                />
                <polyline
                  points={pathG}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <polyline
                  points={pathH}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <polyline
                  points={pathK}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <circle cx={toX(data.Sx)} cy={toY(data.Sy)} r="3" />
              </svg>
            </div>
          </>
        )
      },
    },
  ],
}
