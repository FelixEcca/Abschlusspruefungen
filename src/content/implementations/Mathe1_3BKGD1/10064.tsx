import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface DATA {
  inchToCm: number
  cmToInch: number
}

const INCH_IN_CM = 2.54

export const exercise10064: Exercise<DATA> = {
  title: 'Zoll und Zentimeter umrechnen',
  source: '3BKGD1 · Fachrechnen',
  useCalculator: true,
  duration: 7,
  generator(rng) {
    const values = rng.shuffleArray([
      2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 27,
    ])
    return {
      inchToCm: values[0],
      cmToInch: values[1],
    }
  },
  originalData: {
    inchToCm: 12,
    cmToInch: 8,
  },
  constraint({ data }) {
    return data.inchToCm > 0 && data.cmToInch > 0
  },
  intro() {
    return (
      <p>
        Zoll und Inch bezeichnen dieselbe Längeneinheit. Die englische
        Abkürzung lautet <b>in</b>. Es gilt:{' '}
        <InlineMath math="1\\,\\mathrm{in}=2{,}54\\,\\mathrm{cm}" />.
      </p>
    )
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <p>
            Eine Bilddiagonale beträgt <b>{pp(data.inchToCm)} Zoll</b>. Rechnen
            Sie die Länge in Zentimeter um.
          </p>
        )
      },
      solution({ data }) {
        const result = data.inchToCm * INCH_IN_CM
        return (
          <>
            <p>Von Zoll nach Zentimeter wird mit 2,54 multipliziert.</p>
            <BlockMath
              math={`${pp(data.inchToCm)}\\,\\mathrm{in}\\cdot2{,}54\\,\\frac{\\mathrm{cm}}{\\mathrm{in}}=${pp(result)}\\,\\mathrm{cm}`}
            />
            <p>Die Bilddiagonale beträgt {pp(result)} cm.</p>
          </>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const centimetres = data.cmToInch * INCH_IN_CM
        return (
          <p>
            Die Breite eines Layouts beträgt <b>{pp(centimetres)} cm</b>.
            Rechnen Sie die Länge in Zoll beziehungsweise Inch um.
          </p>
        )
      },
      solution({ data }) {
        const centimetres = data.cmToInch * INCH_IN_CM
        return (
          <>
            <p>Von Zentimeter nach Zoll wird durch 2,54 dividiert.</p>
            <BlockMath
              math={`${pp(centimetres)}\\,\\mathrm{cm}:2{,}54\\,\\frac{\\mathrm{cm}}{\\mathrm{in}}=${pp(data.cmToInch)}\\,\\mathrm{in}`}
            />
            <p>
              Die Breite beträgt {pp(data.cmToInch)} Zoll beziehungsweise Inch.
            </p>
          </>
        )
      },
    },
  ],
}
