// =====================================
// 4C (3063) – Strahlensatzgleichung
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'

import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  leftTop: number // z.B. 5
  rightTop: number // z.B. 10
  extra: number // z.B. 2  (x+extra)
}

export const exercise3063: Exercise<DATA> = {
  title: 'Strahlensatzfigur beschriften und x bestimmen',
  source: '2022 Aufgabe 4C',
  useCalculator: false,
  duration: 10,

  generator(rng) {
    const leftTop = rng.randomItemFromArray([4, 5, 6])
    const rightTop = leftTop * 2
    const extra = rng.randomItemFromArray([1, 2, 3])
    return { leftTop, rightTop, extra }
  },

  // Originalgleichung: 5/x = 10/(x+2)
  originalData: { leftTop: 5, rightTop: 10, extra: 2 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <div className="space-y-2">
        <p>Gegeben sind Strahlen mit parallelen Geraden und die Gleichung:</p>
        <BlockMath
          math={`\\dfrac{${data.leftTop}\\,\\text{cm}}{x\\,\\text{cm}}=\\dfrac{${data.rightTop}\\,\\text{cm}}{x+${data.extra}\\,\\text{cm}}`}
        />
        <p>
          Beschriften Sie die Figur passend und berechnen Sie{' '}
          <InlineMath math="x" />.
        </p>
        <img
          src="/content/BW_2BFS/3063.png"
          width={320}
          alt="Strahlensatzfigur"
        />
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
            <b>1.</b> Beschriftung der Figur (Längen wie in der Gleichung).
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Die obere linke Strecke erhält {data.leftTop} cm, die obere rechte{' '}
            {data.rightTop} cm. Die zugehörigen Grundstrecken sind unten{' '}
            <InlineMath math="x" /> bzw. <InlineMath math={`x+${data.extra}`} />{' '}
            cm.
          </p>
        )
      },
    },
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>2.</b> Bestimmen Sie <InlineMath math="x" /> (Formel → Einsetzen
            → Lösen).
          </p>
        )
      },
      solution({ data }) {
        const x = (data.leftTop * data.extra) / (data.rightTop - data.leftTop)
        return buildEquation([
          ['Formel', '', '\\dfrac{a}{x}=\\dfrac{A}{x+e}'],
          [
            'Einsetzen',
            '\\Rightarrow',
            `\\dfrac{${data.leftTop}}{x}=\\dfrac{${data.rightTop}}{x+${data.extra}}`,
          ],
          [
            'Kreuzprod.',
            '\\Rightarrow',
            `${data.leftTop}(x+${data.extra})=${data.rightTop}x`,
          ],
          ['Lösen', '\\Rightarrow', `${pp(x)}`],
        ])
      },
    },
  ],
}
