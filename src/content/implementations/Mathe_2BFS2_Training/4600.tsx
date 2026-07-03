import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface D4600 {
  type: 'rect' | 'tri' | 'circle' | 'trapezoid' | 'parallelogram'
  a: number
  b?: number
  c?: number
  d?: number
  h?: number
}

export const exercise4600: Exercise<D4600> = {
  title: 'Umfang & Fläche',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const type = rng.randomItemFromArray([
      'rect',
      'tri',
      'circle',
      'trapezoid',
      'parallelogram',
    ] as const)
    if (type === 'rect') {
      const a = rng.randomIntBetween(3, 12)
      const b = rng.randomIntBetween(3, 12)
      return { type, a, b }
    }
    if (type === 'tri') {
      const a = rng.randomIntBetween(3, 10)
      const b = rng.randomIntBetween(3, 10)
      return { type, a, b }
    }
    if (type === 'trapezoid') {
      // gleichschenkliges Trapez: a, c parallel, b = d, Höhe h
      const a = rng.randomIntBetween(4, 12)
      const c = rng.randomIntBetween(3, 10)
      const b = rng.randomIntBetween(2, 8)
      const h = rng.randomIntBetween(2, 8)
      return { type, a, b, c, d: b, h }
    }
    if (type === 'parallelogram') {
      const a = rng.randomIntBetween(4, 12)
      const b = rng.randomIntBetween(3, 10)
      const h = rng.randomIntBetween(2, b - 1)
      return { type, a, b, h }
    }
    // circle
    const a = rng.randomIntBetween(2, 9) // r
    return { type, a }
  },
  originalData: { type: 'rect', a: 6, b: 4 },
  constraint() {
    return true
  },
  task({ data }) {
    const { type, a, b, c, d, h } = data
    return (
      <>
        {type === 'rect' && (
          <>
            <p>
              Gegeben ist ein Rechteck mit Seitenlängen{' '}
              <InlineMath math={`a=${a}\\ \\text{cm},\\ b=${b}\\ \\text{cm}`} />
              .
            </p>
            <p>Berechne Umfang und Fläche.</p>
            <svg viewBox="0 0 160 100" className="w-full max-w-xs">
              <rect
                x="20"
                y="20"
                width="120"
                height="60"
                fill="#e5f0ff"
                stroke="#1e40af"
              />
              <text x="80" y="15" textAnchor="middle" fontSize="10">
                {b} cm
              </text>
              <text
                x="10"
                y="50"
                textAnchor="middle"
                fontSize="10"
                transform="rotate(-90,10,50)"
              >
                {a} cm
              </text>
            </svg>
          </>
        )}
        {type === 'tri' && (
          <>
            <p>
              Gegeben ist ein rechtwinkliges Dreieck mit Katheten{' '}
              <InlineMath math={`a=${a}\\ \\text{cm},\\ b=${b}\\ \\text{cm}`} />
              .
            </p>
            <p>Berechne Umfang und Fläche.</p>
            <svg viewBox="0 0 180 120" className="w-full max-w-xs">
              <polyline
                points="30,90 150,90 30,20 30,90"
                fill="#e5f0ff"
                stroke="#1e40af"
              />
              <rect
                x="30"
                y="80"
                width="10"
                height="10"
                fill="white"
                stroke="#1e40af"
              />
              <text x="90" y="105" fontSize="10" textAnchor="middle">
                {b} cm
              </text>
              <text
                x="20"
                y="55"
                fontSize="10"
                textAnchor="middle"
                transform="rotate(-90,20,55)"
              >
                {a} cm
              </text>
            </svg>
          </>
        )}
        {type === 'circle' && (
          <>
            <p>
              Gegeben ist ein Kreis mit Radius{' '}
              <InlineMath math={`r=${a}\\ \\text{cm}`} />.
            </p>
            <p>Berechne Umfang und Fläche.</p>
            <svg viewBox="0 0 120 120" className="w-full max-w-[200px]">
              <circle cx="60" cy="60" r="40" fill="#e5f0ff" stroke="#1e40af" />
              <line x1="60" y1="60" x2="100" y2="60" stroke="#1e40af" />
              <text x="80" y="50" fontSize="10" textAnchor="middle">
                r={a} cm
              </text>
            </svg>
          </>
        )}
        {type === 'trapezoid' && (
          <>
            <p>
              Gegeben ist ein gleichschenkliges Trapez mit den parallelen Seiten{' '}
              <InlineMath math={`a=${a}\\ \\text{cm},\\ c=${c}\\ \\text{cm}`} />
              , den Schenkeln <InlineMath math={`b=d=${b}\\ \\text{cm}`} /> und
              der Höhe <InlineMath math={`h=${h}\\ \\text{cm}`} />.
            </p>
            <p>Berechne Umfang und Fläche.</p>
            <svg viewBox="0 0 180 100" className="w-full max-w-xs">
              <polygon
                points="30,80 150,80 130,30 50,30"
                fill="#e5f0ff"
                stroke="#1e40af"
              />
              <text x="90" y="90" fontSize="10" textAnchor="middle">
                a={a} cm
              </text>
              <text x="90" y="25" fontSize="10" textAnchor="middle">
                c={c} cm
              </text>
              <text
                x="35"
                y="55"
                fontSize="10"
                textAnchor="middle"
                transform="rotate(-70,35,55)"
              >
                b={b} cm
              </text>
              <text
                x="145"
                y="55"
                fontSize="10"
                textAnchor="middle"
                transform="rotate(70,145,55)"
              >
                d={b} cm
              </text>
              <line
                x1="50"
                y1="30"
                x2="50"
                y2="80"
                stroke="#1e40af"
                strokeDasharray="2,2"
              />
              <text x="70" y="55" fontSize="10" textAnchor="middle">
                h={h} cm
              </text>
            </svg>
          </>
        )}
        {type === 'parallelogram' && (
          <>
            <p>
              Gegeben ist ein Parallelogramm mit Grundseite{' '}
              <InlineMath math={`a=${a}\\ \\text{cm}`} />
              {', '}Seite <InlineMath math={`b=${b}\\ \\text{cm}`} /> und Höhe{' '}
              <InlineMath math={`h=${h}\\ \\text{cm}`} /> (zu a).
            </p>
            <p>Berechne Umfang und Fläche.</p>
            <svg viewBox="0 0 180 100" className="w-full max-w-xs">
              <polygon
                points="30,80 150,80 130,30 10,30"
                fill="#e5f0ff"
                stroke="#1e40af"
              />
              <text x="90" y="90" fontSize="10" textAnchor="middle">
                a={a} cm
              </text>
              <text
                x="20"
                y="55"
                fontSize="10"
                textAnchor="middle"
                transform="rotate(70,20,55)"
              >
                b={b} cm
              </text>
              <line
                x1="30"
                y1="80"
                x2="30"
                y2={80 - h! * 4}
                stroke="#1e40af"
                strokeDasharray="2,2"
              />
              <text x="100" y={60 - h! * 2} fontSize="10" textAnchor="middle">
                h={h} cm
              </text>
            </svg>
          </>
        )}
      </>
    )
  },
  solution({ data }) {
    const { type, a, b, c, d, h } = data
    if (type === 'rect') {
      const U = 2 * (a! + b!)
      const A = a! * b!
      return (
        <InlineMath
          math={[
            '\\begin{aligned}',
            'U&=2(a+b)=2(' + a + '+' + b + ')=' + U + '\\,\\text{cm}\\\\',
            'A&=a\\cdot b=' + a + '\\cdot ' + b + '=' + A + '\\,\\text{cm}^2',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (type === 'tri') {
      const c_ = Math.sqrt(a! * a! + b! * b!)
      const U = a! + b! + c_
      const A = (a! * b!) / 2
      return (
        <InlineMath
          math={[
            '\\begin{aligned}',
            'c&=\\sqrt{a^2+b^2}=\\sqrt{' +
              a +
              '^2+' +
              b +
              '^2}=' +
              pp(c_) +
              '\\\\',
            'U&=a+b+c=' +
              a +
              '+' +
              b +
              '+' +
              pp(c_) +
              '=' +
              pp(U) +
              '\\,\\text{cm}\\\\',
            'A&=\\tfrac{1}{2}ab=\\tfrac{1}{2}\\cdot ' +
              a +
              '\\cdot ' +
              b +
              '=' +
              pp(A) +
              '\\,\\text{cm}^2',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (type === 'trapezoid') {
      // Umfang: a + b + c + d, Fläche: ((a + c) / 2) * h
      const U = a! + b! + c! + d!
      const A = ((a! + c!) / 2) * h!
      return (
        <InlineMath
          math={[
            '\\begin{aligned}',
            'U&=a+b+c+d=' +
              a +
              '+' +
              b +
              '+' +
              c +
              '+' +
              d +
              '=' +
              U +
              '\\,\\text{cm}\\\\',
            'A&=\\frac{a+c}{2}\\cdot h=\\frac{' +
              a +
              '+' +
              c +
              '}{2}\\cdot' +
              h +
              '=' +
              pp(A) +
              '\\,\\text{cm}^2',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (type === 'parallelogram') {
      // Umfang: 2(a+b), Fläche: a*h
      const U = 2 * (a! + b!)
      const A = a! * h!
      return (
        <InlineMath
          math={[
            '\\begin{aligned}',
            'U&=2(a+b)=2(' + a + '+' + b + ')=' + U + '\\,\\text{cm}\\\\',
            'A&=a\\cdot h=' +
              a +
              '\\cdot ' +
              h +
              '=' +
              pp(A) +
              '\\,\\text{cm}^2',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    // circle
    const U = Math.round(2 * Math.PI * a * 100) / 100
    const A = Math.round(Math.PI * a * a * 100) / 100
    return (
      <InlineMath
        math={[
          '\\begin{aligned}',
          'U&=2\\pi r=2\\pi\\cdot' +
            a +
            '\\approx' +
            pp(U) +
            '\\,\\text{cm}\\\\',
          'A&=\\pi r^2=\\pi\\cdot' +
            a +
            '^2' +
            '\\approx' +
            pp(A) +
            '\\,\\text{cm}^2',
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
