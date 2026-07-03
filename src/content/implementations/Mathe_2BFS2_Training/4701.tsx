import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4701 {
  type: 'zyl' | 'kegel' | 'kugel'
  r: number
  h?: number
}

export const exercise4701: Exercise<D4701> = {
  title: 'Zylinder – Kegel – Kugel',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const type = rng.randomItemFromArray(['zyl', 'kegel', 'kugel'] as const)
    const r = rng.randomIntBetween(2, 8)
    if (type === 'kugel') return { type, r }
    const h = rng.randomIntBetween(3, 12)
    return { type, r, h }
  },
  originalData: { type: 'zyl', r: 4, h: 10 },
  constraint() {
    return true
  },
  task({ data }) {
    const { type, r, h } = data
    return (
      <>
        {type === 'zyl' && (
          <p>
            Gegeben ist ein Zylinder mit Radius<br></br>{' '}
            <InlineMath math={`r=${r}\\ \\mathrm{cm}`} /> und Höhe{' '}
            <InlineMath math={`h=${h}\\ \\mathrm{cm}`} />. Bestimme Oberfläche
            und Volumen.
          </p>
        )}
        {type === 'kegel' && (
          <p>
            Gegeben ist ein Kegel mit Radius<br></br>{' '}
            <InlineMath math={`r=${r}\\ \\mathrm{cm}`} /> und Höhe{' '}
            <InlineMath math={`h=${h}\\ \\mathrm{cm}`} />. Bestimme Oberfläche
            (ohne Grundfläche optional) und Volumen.
          </p>
        )}
        {type === 'kugel' && (
          <p>
            Gegeben ist eine Kugel mit Radius<br></br>{' '}
            <InlineMath math={`r=${r}\\ \\mathrm{cm}`} />. Bestimme Oberfläche
            und Volumen.
          </p>
        )}
      </>
    )
  },
  solution({ data }) {
    const { type, r, h } = data
    if (type === 'zyl') {
      const O = 2 * Math.PI * r * r + 2 * Math.PI * r * h!
      const V = Math.PI * r * r * h!
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            'O&=2\\pi r^2+2\\pi r h=2\\pi\\cdot' +
              r +
              '^2+2\\pi\\cdot' +
              r +
              '\\cdot' +
              h +
              '=' +
              pp(O) +
              '\\ \\mathrm{cm}^2\\\\',
            'V&=\\pi r^2 h=\\pi\\cdot' +
              r +
              '^2\\cdot' +
              h +
              '=' +
              pp(V) +
              '\\ \\mathrm{cm}^3',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (type === 'kegel') {
      const s = Math.sqrt(r * r + h! * h!)
      const O = Math.PI * r * r + Math.PI * r * s
      const V = (Math.PI * r * r * h!) / 3
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            's&=\\sqrt{r^2+h^2}=\\sqrt{' +
              r +
              '^2+' +
              h +
              '^2}=' +
              pp(s) +
              '\\ \\mathrm{cm}\\\\',
            'O&=\\pi r^2+\\pi r s=\\pi\\cdot' +
              r +
              '^2+\\pi\\cdot' +
              r +
              '\\cdot' +
              pp(s) +
              '=' +
              pp(O) +
              '\\ \\mathrm{cm}^2\\\\',
            'V&=\\tfrac{1}{3}\\pi r^2 h=\\tfrac{1}{3}\\pi\\cdot' +
              r +
              '^2\\cdot' +
              h +
              '=' +
              pp(V) +
              '\\ \\mathrm{cm}^3',
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    // kugel
    const O = 4 * Math.PI * r * r
    const V = (4 / 3) * Math.PI * r * r * r
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'O&=4\\pi r^2=4\\pi\\cdot' +
            r +
            '^2=' +
            pp(O) +
            '\\ \\mathrm{cm}^2\\\\',
          'V&=\\tfrac{4}{3}\\pi r^3=\\tfrac{4}{3}\\pi\\cdot' +
            r +
            '^3=' +
            pp(V) +
            '\\ \\mathrm{cm}^3',
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
