import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  a: number
  volume: number
}

export const exercise3009: Exercise<DATA> = {
  title: 'Kerze',
  source: '2021 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 10),
      volume: rng.randomIntBetween(8, 20) * 10,
    }
  },
  originalData: { a: 5, volume: 100 },
  constraint({ data }) {
    const h = (data.volume * 3) / (data.a * data.a)
    return h % 1 == 0
  },
  intro({ data }) {
    return (
      <>
        <p>
          Eine Wachskerze hat die Form einer Pyramide mit quadratischer
          Grundfläche. Die Seitenlänge <InlineMath math="a" /> der Grundfläche
          beträgt <InlineMath math={`${data.a}\\,\\text{cm}`} /> und das Volumen
          der Wachskerze beträgt{' '}
          <InlineMath math={`${data.volume}\\,\\text{cm}^3`} />.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie den Flächeninhalt der quadratischen Grundfläche der
            Pyramide und die Höhe <InlineMath math="h" /> der Wachskerze.
          </p>
        )
      },
      solution({ data }) {
        const A = data.a * data.a
        const h = (data.volume * 3) / (data.a * data.a)
        return (
          <>
            <p>Fläche der quadratischen Grundfläche:</p>
            <BlockMath
              math={String.raw`
\begin{aligned}
A &= a^2 \\
  &= (${data.a}\,\text{cm})^2 \\
  &= ${A}\,\text{cm}^2
\end{aligned}
`}
            />
            <p>Höhe aus dem Volumen der Pyramide:</p>
            <BlockMath
              math={String.raw`
\begin{aligned}
V &= \tfrac13\,G\,h \quad\text{mit } G=A=a^2\\
${data.volume} &= \tfrac13\cdot ${A}\cdot h \\
3\cdot ${data.volume} &= ${A}\cdot h \\
h &= \dfrac{3\cdot ${data.volume}}{${A}} \\
  &= ${h}\,\text{cm}
\end{aligned}
`}
            />
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie den Winkel zwischen der Seitenfläche und der
            Grundfläche.
          </p>
        )
      },
      solution({ data }) {
        const h = (data.volume * 3) / (data.a * data.a)
        const alpha =
          Math.round(
            100 * Math.atan(h / ((1 / 2) * data.a)) * (180 / Math.PI),
          ) / 100

        return (
          <>
            <p>Die Skizze zeigt die Pyramide von der Seite.</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/3009.png"
                height="328"
                width="328"
              />
            </svg>

            <p>
              Im rechtwinkligen Dreieck mit Katheten <InlineMath math="h" /> und{' '}
              <InlineMath math="a/2" /> gilt{' '}
              <InlineMath math={`\\tan(\\alpha)=\\dfrac{h}{a/2}`} />.
            </p>

            <BlockMath
              math={String.raw`
    \begin{aligned}
    \tan(\alpha) &= \dfrac{h}{a/2} \\
         &= \dfrac{${h}}{${data.a}/2} \\
    \alpha        &= \tan^{-1}\!\left(\dfrac{${h}}{${data.a}/2}\right) \\
          &\approx ${pp(alpha)}^\circ
    \end{aligned}
    `}
            />
            <p>
              Der Winkel <InlineMath math="\alpha" /> beträgt{' '}
              <InlineMath math={`${pp(alpha)}^{\\circ}`} />.
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Die Wachskerze wird komplett eingeschmolzen und in Kugelform
            gegossen. Berechnen Sie den Durchmesser der kugelförmigen Kerze.
          </p>
        )
      },
      solution({ data }) {
        const r =
          Math.round(100 * Math.cbrt((data.volume * 3) / (4 * Math.PI))) / 100
        const d = (2 * Math.round(100 * r)) / 100

        return (
          <>
            <p>
              Das Volumen <InlineMath math="V" /> ist nun das Volumen der Kugel:{' '}
              <InlineMath math={`V=${data.volume}\\,\\text{cm}^3`} />.
            </p>

            <BlockMath
              math={String.raw`
\begin{aligned}
V &= \tfrac{4}{3}\,\pi\,r^3 \\
${data.volume} &= \tfrac{4}{3}\,\pi\,r^3 \\
3\cdot ${data.volume} &= 4\pi r^3 \\
r^3 &= \dfrac{3\cdot ${data.volume}}{4\pi} \quad | \sqrt[3]{}\\
r &\approx ${pp(r)}\,\text{cm}
\end{aligned}
`}
            />

            <p>
              Durchmesser: <InlineMath math="d=2r" />{' '}
              <InlineMath
                math={`\\Rightarrow\\ d\\approx ${pp(d)}\\,\\text{cm}`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
