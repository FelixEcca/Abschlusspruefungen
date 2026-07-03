import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  order: Array<number>
  item1: number
  item2: number
  item0: number
}

const prompts = [
  'Stellen Sie die Formel für den Oberflächeninhalt einer Kugel nach dem Radius um.',
  'Stellen Sie die Formel für die Fläche eines Kreises nach dem Radius um.',
  'Stellen Sie die Formel für das Volumen einer Kugel nach dem Radius um.',
]

// Aussagen – mit LaTeX inlined
const richtig = [
  <>
    Wird der Radius einer Kugel verdreifacht, verneunfacht sich ihr
    Oberflächeninhalt (<InlineMath math={'O=4\\pi r^2'} />
    ).
  </>,
  <>
    Wird der Radius einer Kugel verdoppelt, vervierfacht sich ihr
    Oberflächeninhalt (<InlineMath math={'O=4\\pi r^2'} />
    ).
  </>,
  <>
    Wird der Radius einer Kugel verdoppelt, verachtfacht sich ihr Volumen (
    <InlineMath math={'V=\\tfrac{4}{3}\\pi r^3'} />
    ).
  </>,
]
const richtig2 = [
  <>
    Richtig. Setzt man <InlineMath math={'3r'} /> in{' '}
    <InlineMath math={'O=4\\pi r^2'} /> ein, ergibt sich{' '}
    <InlineMath math={'(3r)^2=9r^2'} /> → das Neunfache.
  </>,
  <>
    Richtig. Setzt man <InlineMath math={'2r'} /> in{' '}
    <InlineMath math={'O=4\\pi r^2'} /> ein, ergibt sich{' '}
    <InlineMath math={'(2r)^2=4r^2'} /> → das Vierfache.
  </>,
  <>
    Richtig. Setzt man <InlineMath math={'2r'} /> in{' '}
    <InlineMath math={'V=\\tfrac{4}{3}\\pi r^3'} /> ein, ergibt sich{' '}
    <InlineMath math={'(2r)^3=8r^3'} /> → das Achtfache.
  </>,
]
const falsch = [
  <>Wird der Radius einer Kugel verdoppelt, vervierfacht sich ihr Volumen.</>,
  <>Wird der Radius einer Kugel verdoppelt, verdoppelt sich ihr Volumen.</>,
  <>
    Wird der Radius einer Kugel verdoppelt, verdoppelt sich ihr
    Oberflächeninhalt.
  </>,
]
const falsch2 = [
  <>
    Falsch. In <InlineMath math={'V=\\tfrac{4}{3}\\pi r^3'} /> ergibt{' '}
    <InlineMath math={'(2r)^3=8r^3'} /> → Achtfach, nicht Vierfach.
  </>,
  <>
    Falsch. In <InlineMath math={'V=\\tfrac{4}{3}\\pi r^3'} /> ergibt{' '}
    <InlineMath math={'(2r)^3=8r^3'} /> → Achtfach, nicht Doppelt.
  </>,
  <>
    Falsch. In <InlineMath math={'O=4\\pi r^2'} /> ergibt{' '}
    <InlineMath math={'(2r)^2=4r^2'} /> → Vierfach, nicht Doppelt.
  </>,
]

export const exercise3007: Exercise<DATA> = {
  title: 'Formeln',
  source: '2021 Wahlteil Aufgabe 2C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      order: rng.shuffleArray([0, 1]),
      item1: rng.randomIntBetween(0, 2),
      item2: rng.randomIntBetween(0, 2),
      item0: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { order: [0, 1], item1: 0, item2: 0, item0: 0 },
  constraint() {
    return true
  },
  intro() {
    return null
  },
  tasks: [
    // (1) Formel nach r umstellen
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return <p>{prompts[data.item0]}</p>
      },
      solution({ data }) {
        return (
          <>
            {data.item0 === 0 && (
              <>
                <p>Formel des Kugeloberflächeninhalts:</p>
                <BlockMath math={'O=4\\pi r^{2}'} />
                <p>Nach dem Radius umgestellt:</p>
                <BlockMath
                  math={String.raw`
\begin{aligned}
r^{2} &= \frac{O}{4\pi}\\
r &= \sqrt{\frac{O}{4\pi}}
\end{aligned}`}
                />
              </>
            )}

            {data.item0 === 1 && (
              <>
                <p>Formel der Kreisfläche:</p>
                <BlockMath math={'A=\\pi r^{2}'} />
                <p>Nach dem Radius umgestellt:</p>
                <BlockMath
                  math={String.raw`
\begin{aligned}
r^{2} &= \frac{A}{\pi}\\
r &= \sqrt{\frac{A}{\pi}}
\end{aligned}`}
                />
              </>
            )}

            {data.item0 === 2 && (
              <>
                <p>Formel des Kugelvolumens:</p>
                <BlockMath math={'V=\\tfrac{4}{3}\\,\\pi r^{3}'} />
                <p>Nach dem Radius umgestellt:</p>
                <BlockMath
                  math={String.raw`
\begin{aligned}
r^{3} &= \frac{3V}{4\pi}\\
r &= \sqrt[3]{\frac{3V}{4\pi}}
\end{aligned}`}
                />
              </>
            )}
          </>
        )
      },
    },

    // (2) Aussagen zum Skalieren des Radius – richtig/falsch
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        const listItems = [
          <li key="r1">{richtig[data.item1]}</li>,
          <li key="f1">{falsch[data.item1]}</li>,
        ]
        const shuffled = data.order.map(i => listItems[i])
        return <ol>{shuffled}</ol>
      },
      solution({ data }) {
        const listItems = [
          <li key="r2">{richtig2[data.item1]}</li>,
          <li key="f2">{falsch2[data.item1]}</li>,
        ]
        const shuffled = data.order.map(i => listItems[i])
        return <ol>{shuffled}</ol>
      },
    },
  ],
}
