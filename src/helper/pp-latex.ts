// src/helper/pp-latex.ts
export type PolyTerm = [coeff: number, variable?: string, power?: number]

/**
 * Baut aus Termen wie [[m,'x',1],[b,'x',0]] einen LaTeX-String.
 * Beispiele:
 *   1x        -> x
 *  -1x        -> -x
 *   0x        -> (fällt weg)
 *   3x^2      -> 3x^{2}
 *  -2         -> -2
 *  0          -> 0 (wenn alle Terme 0 sind)
 */
export function polyToLatex(
  terms: PolyTerm[],
  opts?: {
    variable?: string        // default: 'x' (falls im Term nicht gesetzt)
    keepOrder?: boolean      // default: true – Reihenfolge der Eingabe behalten
    spaceAroundOps?: boolean // default: true – kleine Abstände um +/- einfügen
  },
): string {
  const variableDefault = opts?.variable ?? 'x'
  const keepOrder = opts?.keepOrder ?? true
  const spaceOps = opts?.spaceAroundOps ?? true

  const items = (keepOrder ? terms : [...terms].sort((a, b) => (b[2] ?? 0) - (a[2] ?? 0)))
    .map(([c, v, p]) => {
      const varSym = v ?? variableDefault
      const power = p ?? 0

      if (!isFinite(c) || c === 0) return '' // Term fällt weg

      // Vorzeichen
      const sign = c < 0 ? '-' : '+'
      const abs = Math.abs(c)

      // Koeffizient
      let coeff = ''
      if (power === 0) {
        // Konstante: immer Zahl anzeigen
        coeff = numberToLatex(abs)
      } else {
        // x-Terme: 1x -> x, -1x -> -x
        coeff = abs === 1 ? '' : numberToLatex(abs)
      }

      // Variable + Potenz
      let varPart = ''
      if (power > 0) {
        if (power === 1) {
          varPart = varSym
        } else {
          varPart = `${varSym}^{${power}}`
        }
      }

      // Kombination
      const glue = coeff && varPart ? '\\,' : '' // kleiner Abstand zwischen Zahl und Variable
      const body = `${coeff}${glue}${varPart}` || '0'
      return `${sign}${spaceOps ? '\\,' : ''}${body}`
    })
    .filter(Boolean)

  if (items.length === 0) return '0'

  // Erstes '+' entfernen, wenn positiv beginnt
  let s = items.join(spaceOps ? '\\,' : '')
  if (s.startsWith('+')) s = s.slice(1).trimStart()
  return s
}

function numberToLatex(n: number): string {
  // Simple: als Dezimalzahl ausgeben (z.B. 0.5). Falls du Brüche willst, hier in \tfrac konvertieren.
  // z.B.:
  // if (Number.isInteger(n)) return String(n)
  // const frac = toFraction(n) -> '\tfrac{p}{q}'
  return String(n)
}
