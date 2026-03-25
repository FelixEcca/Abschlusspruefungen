import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type DATA = {
  // Gleichung: (x - p)(x - q) = k · (x - q)
  p: number
  q: number
  k: number

  // abgeleitet (Normalform x^2 + b x + c = 0)
  b: number
  c: number
  x1: number
  x2: number

  // genau EINE Aussage für Teil b)
  statement: { text: string; truth: boolean }
}

export const exercise3209: Exercise<DATA> = {
  title: 'Quadratische Gleichung',
  source: '2025 Wahlteil Aufgabe 3C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // „schöne“ Zufallswerte – Struktur wie im Original (gemeinsamer Faktor x-q)
    const p = rng.randomIntBetween(1, 9)
    const q = rng.randomIntBetween(1, 9)
    const k = rng.randomItemFromArray([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2])

    const b = -(p + q + k)
    const c = q * (p + k)
    const x1 = q
    const x2 = p + k

    // genau EINE zufällige Aussage
    const pool: { text: string; truth: boolean }[] = [
      {
        text: 'Eine quadratische Gleichung hat immer mindestens eine Lösung.',
        truth: false,
      }, // über ℝ
      {
        text: 'Ist der Wert unter Wurzel der pq-Formel negativ, hat die Gleichung keine Lösungen.',
        truth: true,
      },

      {
        text: 'Ist der Wert unter Wurzel der pq-Formel 0, besitzt die Gleichung keine Lösung.',
        truth: false,
      },
      {
        text: 'Eine quadratische Gleichung kann höchstens zwei Lösungen besitzen.',
        truth: true,
      },
    ]
    const statement = rng.randomItemFromArray(pool)

    return { p, q, k, b, c, x1, x2, statement }
  },

  // Originalaufgabe: (x − 2)(x − 4) = −0,5 · (x − 4)
  originalData: {
    p: 2,
    q: 4,
    k: -0.5,
    b: -(2 + 4 - 0.5), // -5.5
    c: 4 * (2 - 0.5), // 6
    x1: 4,
    x2: 1.5,
    statement: {
      text: 'Eine quadratische Gleichung hat immer mindestens eine Lösung.',
      truth: false,
    },
  } as DATA,

  constraint({ data }) {
    return (
      Number.isFinite(data.p) &&
      Number.isFinite(data.q) &&
      Number.isFinite(data.k) &&
      data.k !== 0
    )
  },

  intro() {
    return null
  },

  tasks: [
    // 1) Gleichung lösen
    {
      points: 24,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Lösen Sie die Gleichung:<br></br>
            <InlineMath
              math={`(x-${pp(data.p)})\\,(x-${pp(data.q)})=${pp(data.k)}\\,(x-${pp(data.q)})`}
            />
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Zuerst wird ausmultipliziert:</p>
            <BlockMath
              math={String.raw`
                \begin{aligned}
              (x-${pp(data.p)})(x-${pp(data.q)})&=${pp(data.k)}(x-${pp(data.q)})\\
              x^2 - ${pp(data.p + data.q)}x + ${pp(data.p * data.q)}&= ${pp(data.k)}x ${pp(-data.k * data.q, 'merge_op')}\quad |${pp(-data.k, 'merge_op')}x\\
              x^2 ${pp(data.b, 'merge_op')}x ${pp(data.p * data.q, 'merge_op')}&= ${pp(-data.k * data.q)}\quad |${pp(data.k * data.q, 'merge_op')}\\
              x^2 ${pp(data.b, 'merge_op')}x ${pp(data.c, 'merge_op')}&= 0\\
\end{aligned}
            `}
            />
            <p>Die Lösung wird mit der abc-Formel berechnet.</p>
            <p>
              Die Gleichung hat die Lösungen&nbsp;
              <InlineMath math={`x_1=${pp(data.x1)}`} />
              &nbsp;und&nbsp;
              <InlineMath math={`x_2=${pp(data.x2)}`} />.
            </p>
          </>
        )
      },
    },

    // 2) Genau EINE Aussage beurteilen
    {
      points: 18,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Beurteilen Sie, ob die folgende Aussage wahr oder falsch ist:
            <br />„{data.statement.text}“
          </p>
        )
      },
      solution({ data }) {
        const t = data.statement.text

        // kurze Begründung je nach Statement
        let explanation: JSX.Element | null = null

        if (
          t.startsWith(
            'Eine quadratische Gleichung hat immer mindestens eine Lösung.',
          )
        ) {
          explanation = (
            <>
              <p>
                Wird der Term unter der Wurzel in der abc-Formel negativ, gibt
                es keine Lösungen.
              </p>
            </>
          )
        } else if (
          t.startsWith('Ist der Wert unter Wurzel der pq-Formel negativ')
        ) {
          explanation = (
            <>
              <p>In der pq-Formel</p>
              <BlockMath
                math={String.raw`
          x_{1,2}=-\frac{p}{2}\pm\sqrt{\left(\frac{p}{2}\right)^2-q}
        `}
              />
              <p>
                liefert ein negativer Wert unter der Wurzel{' '}
                <InlineMath math={`${String.raw`(\frac{p}{2})^2-q<0`}`} /> keine
                Lösungen.
              </p>
            </>
          )
        } else if (t.startsWith('Ist der Wert unter Wurzel der pq-Formel 0')) {
          explanation = (
            <>
              <p>
                Ist der Wert genau <InlineMath math="0" /> , entsteht{' '}
                <em>genau eine</em> Lösung.
              </p>
            </>
          )
        } else if (
          t.startsWith(
            'Eine quadratische Gleichung kann höchstens zwei Lösungen besitzen.',
          )
        ) {
          explanation = (
            <>
              <p>Es gibt entweder keine, eine oder zwei Lösungen.</p>
            </>
          )
        }

        return (
          <div className="space-y-2">
            <p>
              Die Aussage ist&nbsp;
              <strong>{data.statement.truth ? 'wahr' : 'falsch'}</strong>.
            </p>
            {explanation}
          </div>
        )
      },
    },
  ],
}
