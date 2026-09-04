// exercise6014.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  alpha: number
  s: number
  fh: number
  a: number
  t: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6014: Exercise<DATA> = {
  title: 'Schiefe Ebene',
  source: 'Kraft',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const m = rng.randomItemFromArray([20, 25, 30, 40, 50, 60])
    const alpha = rng.randomItemFromArray([10, 15, 20, 25, 30, 35])
    const s = rng.randomItemFromArray([8, 10, 12, 15, 20])

    const fh = round2(m * 9.81 * Math.sin((alpha * Math.PI) / 180))
    const a = round2(fh / m)
    const t = round2(Math.sqrt((2 * s) / a))

    return { m, alpha, s, fh, a, t }
  },

  originalData: {
    m: 30,
    alpha: 20,
    s: 10,
    fh: 100.65,
    a: 3.36,
    t: 2.44,
  },

  constraint({ data }) {
    return data.m > 0 && data.alpha > 0 && data.s > 0 && data.fh > 0
  },

  intro({ data }) {
    return (
      <>
        <p>
          Ein Körper mit der Masse{' '}
          <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> befindet sich
          auf einer schiefen Ebene.
        </p>

        <p>
          Die Ebene besitzt einen Winkel von{' '}
          <InlineMath math={`\\alpha=${pp(data.alpha)}^{\\circ}`} /> zur
          Horizontalen.
        </p>

        <svg viewBox="0 0 328 220">
          <image
            href="/content/Physik_TG11/6012.png"
            width="328"
            height="220"
          />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 14,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie die Hangabtriebskraft <InlineMath math={`F_H`} />.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Für die Hangabtriebskraft gilt:</p>
            <InlineMath math={`F_H=m\\cdot g\\cdot\\sin(\\alpha)`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`F_H=${pp(
                data.m,
              )}\\,\\mathrm{kg}\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot\\sin(${pp(
                data.alpha,
              )}^{\\circ})`}
            />
            <br />
            <InlineMath math={`F_H\\approx ${pp(data.fh)}\\,\\mathrm N`} />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie mit dem Bewegungsgesetz die Beschleunigung des
            Körpers.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Es gilt das Bewegungsgesetz:</p>
            <InlineMath math={`F=m\\cdot a`} />

            <p>Nach der Beschleunigung umstellen:</p>
            <InlineMath math={`a=\\frac{F_H}{m}`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`a=\\frac{${pp(data.fh)}\\,\\mathrm N}{${pp(
                data.m,
              )}\\,\\mathrm{kg}}`}
            />
            <br />
            <InlineMath
              math={`a\\approx ${pp(
                data.a,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Die schiefe Ebene ist{' '}
            <InlineMath math={`s=${pp(data.s)}\\,\\mathrm m`} /> lang. Berechnen
            Sie, nach welcher Zeit der Körper unten ankommt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Für eine gleichmäßig beschleunigte Bewegung aus der Ruhe gilt:
            </p>
            <InlineMath math={`s=\\frac12\\cdot a\\cdot t^2`} />

            <p>Nach der Zeit umstellen:</p>
            <InlineMath math={`t=\\sqrt{\\frac{2s}{a}}`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`t=\\sqrt{\\frac{2\\cdot ${pp(data.s)}\\,\\mathrm m}{${pp(
                data.a,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}}`}
            />
            <br />
            <InlineMath math={`t\\approx ${pp(data.t)}\\,\\mathrm s`} />
          </>
        )
      },
    },
  ],
}
