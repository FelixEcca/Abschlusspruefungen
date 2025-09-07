import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Given = 'hyp' | 'ank' | 'geg'
interface DATA {
  a: number // Ankathete
  g: number // Gegenkathete
  h: number // Hypotenuse
  alpha: number // Winkel an der Ankathete (Grad)
  given: Given
  ask: 'a' | 'g' | 'h'
}

function toDeg(rad: number) {
  return (rad * 180) / Math.PI
}

export const exercise4601: Exercise<DATA> = {
  title: 'Winkelfunktionen im rechtwinkligen Dreieck',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const alpha = rng.randomIntBetween(20, 60) // Grad
    // Konstruiere ein Dreieck mit runden Längen relativ zu sin/cos
    const h = rng.randomIntBetween(5, 10)
    const rad = (alpha * Math.PI) / 180
    const g = Math.round(h * Math.sin(rad))
    const a = Math.round(h * Math.cos(rad))

    const given = rng.randomItemFromArray<Given>(['hyp', 'ank', 'geg'])
    const ask = rng.randomItemFromArray<'a' | 'g' | 'h'>(['a', 'g', 'h'])
    // nicht dasselbe erfragen wie gegeben
    if (
      (given === 'hyp' && ask === 'h') ||
      (given === 'ank' && ask === 'a') ||
      (given === 'geg' && ask === 'g')
    ) {
      // tausche
      return { a, g, h, alpha, given, ask: 'a' }
    }
    return { a, g, h, alpha, given, ask }
  },

  originalData: { a: 8, g: 6, h: 10, alpha: 37, given: 'ank', ask: 'h' },

  task({ data }) {
    const { alpha, a, g, h, given, ask } = data
    // Skizze (rechtwinklig, Alpha unten links)
    return (
      <>
        <p>
          Gegeben ist ein rechtwinkliges Dreieck mit Winkel{' '}
          <InlineMath math={`\\alpha=${alpha}^{\\circ}`} /> (unten links). Es
          ist genau <b>eine</b> Seitenlänge bekannt:{' '}
          {given === 'hyp'
            ? 'Hypotenuse'
            : given === 'ank'
              ? 'Ankathete'
              : 'Gegenkathete'}
          . Bestimme die gesuchte Seitenlänge.
        </p>

        <svg viewBox="0 0 260 160" className="border rounded my-2">
          {/* Dreieck */}
          <polyline
            points="30,120 220,120 30,30 30,120"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {/* rechter Winkel */}
          <polyline
            points="30,120 50,120 50,100"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {/* Alpha */}
          <text x="40" y="115" fontSize="12">
            α={alpha}°
          </text>
        </svg>

        <p>
          Gegeben:{' '}
          {given === 'hyp' ? (
            <InlineMath math={`c=${h}`} />
          ) : given === 'ank' ? (
            <InlineMath math={`b=${a}`} />
          ) : (
            <InlineMath math={`a=${g}`} />
          )}
          . Gesucht:{' '}
          {ask === 'h'
            ? 'Hypotenuse'
            : ask === 'a'
              ? 'Ankathete'
              : 'Gegenkathete'}
          .
        </p>
      </>
    )
  },

  solution({ data }) {
    const { alpha, a, g, h, given, ask } = data
    const rad = (alpha * Math.PI) / 180

    // Formeln:
    // sin α = geg / hyp, cos α = ank / hyp, tan α = geg / ank
    let formel = '',
      einsetzen = '',
      wert = 0

    if (ask === 'h') {
      if (given === 'geg') {
        formel = '\\sin\\,\\alpha=\\tfrac{\\text{geg}}{\\text{hyp}}'
        wert = g / Math.sin(rad)
      }
      if (given === 'ank') {
        formel = '\\cos\\,\\alpha=\\tfrac{\\text{ank}}{\\text{hyp}}'
        wert = a / Math.cos(rad)
      }
    } else if (ask === 'a') {
      if (given === 'hyp') {
        formel = '\\cos\\,\\alpha=\\tfrac{\\text{ank}}{\\text{hyp}}'
        wert = h * Math.cos(rad)
      }
      if (given === 'geg') {
        formel = '\\tan\\,\\alpha=\\tfrac{\\text{geg}}{\\text{ank}}'
        wert = g / Math.tan(rad)
      }
    } else if (ask === 'g') {
      if (given === 'hyp') {
        formel = '\\sin\\,\\alpha=\\tfrac{\\text{geg}}{\\text{hyp}}'
        wert = h * Math.sin(rad)
      }
      if (given === 'ank') {
        formel = '\\tan\\,\\alpha=\\tfrac{\\text{geg}}{\\text{ank}}'
        wert = a * Math.tan(rad)
      }
    }

    // Einsetzen-String
    if (formel.includes('\\sin')) {
      einsetzen =
        ask === 'h'
          ? `\\sin(${alpha}^{\\circ})=\\tfrac{${pp(g)}}{\\text{hyp}}`
          : ask === 'g'
            ? `\\sin(${alpha}^{\\circ})=\\tfrac{\\text{geg}}{${pp(h)}}`
            : einsetzen
    }
    if (formel.includes('\\cos')) {
      einsetzen =
        ask === 'h'
          ? `\\cos(${alpha}^{\\circ})=\\tfrac{${pp(a)}}{\\text{hyp}}`
          : ask === 'a'
            ? `\\cos(${alpha}^{\\circ})=\\tfrac{\\text{ank}}{${pp(h)}}`
            : einsetzen
    }
    if (formel.includes('\\tan')) {
      einsetzen =
        ask === 'a'
          ? `\\tan(${alpha}^{\\circ})=\\tfrac{${pp(g)}}{\\text{ank}}`
          : ask === 'g'
            ? `\\tan(${alpha}^{\\circ})=\\tfrac{\\text{geg}}{${pp(a)}}`
            : einsetzen
    }

    return (
      <>
        <p>
          <b>Formel → Einsetzen → Lösen</b>
        </p>
        <InlineMath math={formel} />
        <br />
        {einsetzen && <InlineMath math={einsetzen} />}
        <br />
        <InlineMath
          math={`\\Rightarrow\\; ${ask === 'h' ? '\\text{hyp}' : ask === 'a' ? '\\text{ank}' : '\\text{geg}'}\\approx ${pp(Math.round(wert * 100) / 100)}`}
        />
      </>
    )
  },
}
