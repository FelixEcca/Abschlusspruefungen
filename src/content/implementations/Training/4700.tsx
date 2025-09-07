import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4700 {
  type: 'cube' | 'cuboid' | 'prism'
  a: number
  b?: number
  h: number
}

export const exercise4700: Exercise<D4700> = {
  title: 'Quader & Prisma – Oberfläche und Volumen',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const type = rng.randomItemFromArray(['cube', 'cuboid', 'prism'] as const)
    if (type === 'cube') {
      const a = rng.randomIntBetween(2, 8)
      return { type, a, h: a }
    }
    if (type === 'cuboid') {
      const a = rng.randomIntBetween(2, 8)
      const b = rng.randomIntBetween(2, 8)
      const h = rng.randomIntBetween(2, 8)
      return { type, a, b, h }
    }
    // prism: rechtwinkliges Dreieck (a,b) als Grundfläche, Höhe h
    const a = rng.randomIntBetween(3, 7)
    const b = rng.randomIntBetween(3, 7)
    const h = rng.randomIntBetween(3, 9)
    return { type, a, b, h }
  },
  originalData: { type: 'cuboid', a: 3, b: 4, h: 5 },
  constraint() {
    return true
  },
  task({ data }) {
    const { type, a, b, h } = data
    return (
      <>
        {type === 'cube' && (
          <p>
            Gegeben ist ein Würfel mit Kantenlänge{' '}
            <InlineMath math={`a = ${a}\\ \\text{cm}`} />. Bestimme Oberfläche
            und Volumen.
          </p>
        )}
        {type === 'cuboid' && (
          <p>
            Gegeben ist ein Quader mit Kantenlängen{' '}
            <InlineMath math={`a = ${a}\\ \\text{cm}`} /> ,{' '}
            <InlineMath math={`b = ${b}\\ \\text{cm}`} /> ,{' '}
            <InlineMath math={`h = ${h}\\ \\text{cm}`} /> . Bestimme Oberfläche
            und Volumen.
          </p>
        )}
        {type === 'prism' && (
          <>
            <p>
              Gegeben ist ein gerades Prisma mit rechtwinkliger, dreieckiger
              Grundfläche (Katheten <InlineMath math={`${a}\\ \\text{cm}`} />{' '}
              und <InlineMath math={`${b}\\ \\text{cm}`} />
              ), Höhe <InlineMath math={`${h}\\ \\text{cm}`} />. Bestimme
              Oberfläche und Volumen.
            </p>
            <svg viewBox="0 0 200 120" className="w-full max-w-xs">
              <polygon
                points="40,80 120,80 40,40"
                fill="#e5f0ff"
                stroke="#1e40af"
              />
              <polygon
                points="80,90 160,90 80,50"
                fill="#e5f0ff"
                stroke="#1e40af"
                opacity="0.7"
              />
              <polyline
                points="40,80 80,90 160,90 120,80 40,80 40,40 80,50 160,90"
                fill="none"
                stroke="#1e40af"
              />
            </svg>
          </>
        )}
      </>
    )
  },
  solution({ data }) {
    const { type, a, b, h } = data
    if (type === 'cube') {
      const O = 6 * a * a
      const V = a * a * a
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            'O&=6a^2=6\\cdot' + a + '^2=' + pp(O) + '\\,\\text{cm}^2\\\\',
            'V&=a^3=' + a + '^3=' + pp(V) + '\\,\\text{cm}^3',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (type === 'cuboid') {
      const O = 2 * (a! * b! + a! * h! + b! * h!)
      const V = a! * b! * h!
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            'O&=2(ab+ah+bh)=2(' +
              a +
              '\\cdot' +
              b +
              '+' +
              a +
              '\\cdot' +
              h +
              '+' +
              b +
              '\\cdot' +
              h +
              ')=' +
              pp(O) +
              '\\\\',
            'V&=a\\,b\\,h=' + a + '\\cdot' + b + '\\cdot' + h + '=' + pp(V),
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    // prism
    const A_g = (a! * b!) / 2
    const U_g = a! + b! + Math.sqrt(a! * a! + b! * b!)
    const O = 2 * A_g + U_g * h!
    const V = A_g * h!
    return (
      <>
        <p>
          Berechne zuerst den Flächeninhalt und den Umfang der dreieckigen
          Grundfläche.
        </p>
        <BlockMath
          math={[
            '\\begin{aligned}',
            'A_{G}&=\\tfrac{1}{2}ab=\\tfrac{1}{2}\\cdot' +
              a +
              '\\cdot' +
              b +
              '=' +
              pp(A_g) +
              '\\\\',
            'U_{G}&=a+b+c=' +
              a +
              '+' +
              b +
              '+\\sqrt{' +
              a +
              '^2+' +
              b +
              '^2}=' +
              pp(U_g) +
              '\\\\',
            'O&=2A_G+U_G\\cdot h=' +
              pp(2 * A_g) +
              '+' +
              pp(U_g) +
              '\\cdot' +
              h +
              '=' +
              pp(O) +
              '\\\\',
            'V&=A_G\\cdot h=' + pp(A_g) + '\\cdot' + h + '=' + pp(V),
            '\\end{aligned}',
          ].join('')}
        />
      </>
    )
  },
}
