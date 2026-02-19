import * as React from 'react'
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mult = 1 | 2 | 3
interface Root {
  r: number
  m: Mult
}

interface DATA {
  roots: Root[] // Linearfaktoren (x-r)^m, Leitkoeffizient immer 1 (nicht extra erwähnt)
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function clamp(y: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, y))
}

function fOf(x: number, roots: Root[]) {
  let y = 1
  for (const rt of roots) y *= Math.pow(x - rt.r, rt.m)
  return y
}

function buildPolyline(roots: Root[]) {
  const pts: string[] = []
  // Anzeige-Bereich: -8 < x < 8
  for (let x = -7; x <= 7; x += 0.01) {
    const y = fOf(x, roots)
    const yClamped = clamp(y, -9.5, 9.5)
    pts.push(`${toX(x)},${toY(yClamped)}`)
  }
  return pts.join(' ')
}

function termLatex(roots: Root[]) {
  const parts: string[] = []
  for (const rt of roots) {
    const base = rt.r === 0 ? 'x' : `\\left(x${pp(-rt.r, 'merge_op')}\\right)`
    parts.push(rt.m === 1 ? base : `${base}^{${rt.m}}`)
  }
  return parts.join('\\,')
}

function describeRoot(rt: Root) {
  if (rt.m === 2) {
    return (
      <>
        Bei <InlineMath math={`x=${pp(rt.r)}`} /> berührt der Graph die x-Achse
        (Vielfachheit 2).
      </>
    )
  }
  if (rt.m === 3) {
    return (
      <>
        Bei <InlineMath math={`x=${pp(rt.r)}`} /> schneidet der Graph die
        x-Achse
        <i> flach</i> (Vielfachheit 3).
      </>
    )
  }
  return (
    <>
      Bei <InlineMath math={`x=${pp(rt.r)}`} /> schneidet der Graph die x-Achse
      (Vielfachheit 1).
    </>
  )
}

function degreeOf(roots: Root[]) {
  return roots.reduce((s, rt) => s + rt.m, 0)
}

export const exercise5114: Exercise<DATA> = {
  title: 'Linearfaktorform aus dem Graphen',
  source: 'Polynomfunktionen',
  useCalculator: false,
  duration: 10,
  points: 4,

  generator(rng) {
    // Grad soll genau 2,3,4 oder 5 sein.
    // Nullstellen im sichtbaren Bereich, Graph nicht komplett außerhalb.
    const targetDeg = rng.randomItemFromArray([2, 3, 4, 5])

    for (let attempt = 0; attempt < 120; attempt++) {
      // Anzahl verschiedener Nullstellen: 1..3
      const rootCount = rng.randomIntBetween(1, Math.min(3, targetDeg))

      // wähle verschiedene Nullstellen (ganzzahlig), nicht zu nah am Rand
      const candidates: number[] = []
      while (candidates.length < rootCount) {
        const r = rng.randomIntBetween(-6, 6)
        if (candidates.includes(r)) continue
        candidates.push(r)
      }

      // Vielfachheiten so wählen, dass Summe genau targetDeg ist
      const mults: Mult[] = Array(rootCount).fill(1) as Mult[]
      let remaining = targetDeg - rootCount // noch zu verteilen

      // verteile remaining als +1 oder +2 auf zufällige Nullstellen (max m=3)
      while (remaining > 0) {
        const i = rng.randomIntBetween(0, rootCount - 1)
        if (mults[i] === 3) continue
        mults[i] = (mults[i] + 1) as Mult
        remaining--
      }

      const roots: Root[] = candidates
        .map((r, i) => ({ r, m: mults[i] }))
        .sort((a, b) => a.r - b.r)

      // Sichtbarkeit: Werte im Bereich -8..8 nicht komplett extrem
      const samples = [-6, -4, -2, 0, 2, 4, 6]
      const ok = samples.every(x => Math.abs(fOf(x, roots)) <= 12) // etwas Luft
      if (!ok) continue

      // außerdem: nicht “fast überall” bei ±9.5 geklemmt (Grobtest)
      const midSamples = [-4, -2, 0, 2, 4]
      const ok2 = midSamples.some(x => Math.abs(fOf(x, roots)) <= 8.5)
      if (!ok2) continue

      return { roots }
    }

    // Fallback (Grad 4, sichtbar)
    return {
      roots: [
        { r: -2, m: 1 },
        { r: 1, m: 3 },
      ],
    }
  },

  originalData: {
    roots: [
      { r: -2, m: 1 },
      { r: 1, m: 2 },
      { r: 3, m: 1 },
    ], // Grad 4
  },

  constraint({ data }) {
    const deg = degreeOf(data.roots ?? [])
    return [2, 3, 4, 5].includes(deg)
  },

  task({ data }) {
    const poly = buildPolyline(data.roots)

    return (
      <>
        <p>
          Unten siehst du den Graphen einer Polynomfunktion. Gib den
          Funktionsterm in <b>Linearfaktordarstellung</b> an.
        </p>

        <svg viewBox="0 0 328 328" className="my-2">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline points={poly} fill="none" stroke="black" strokeWidth="3" />
        </svg>

        <p>
          Gesucht: <InlineMath math={`f(x)=\\;\\square`} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const rootsSorted = [...data.roots].sort((a, b) => a.r - b.r)
    const latex = termLatex(rootsSorted)

    return (
      <>
        <p>
          <b>Nullstellen (mit Vielfachheit):</b>
        </p>
        <ul className="list-disc ml-6">
          {rootsSorted.map((rt, i) => (
            <li key={i}>{describeRoot(rt)}</li>
          ))}
        </ul>

        <p className="mt-3">Funktionsterm in Linearfaktorform:</p>
        <InlineMath math={`f(x)= ${latex}`} />
      </>
    )
  },
}
