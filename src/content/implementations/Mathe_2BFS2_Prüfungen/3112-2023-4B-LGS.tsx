// ======================================
// 4B — LGS:  -a·x = a(y + c)  ;  x + (p/q)·y = (r/s)
// (Einsetzen; „Klammer zuerst auflösen“ in (1))
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA3112 {
  // Gleichung (1):  -A x = A (y + c)
  A: number
  c: number
  // Gleichung (2):  x + (p/q) y = r/s
  p: number
  q: number
  r: number
  s: number
  // Für Teil (2): ein echtes Vielfaches von (1)
  kMulti: number
}

export const exercise3112: Exercise<DATA3112> = {
  title: 'Lineares Gleichungssystem (Einsetzungsverfahren)',
  source: '2023 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    // „nette“ Zahlen
    const A = rng.randomItemFromArray([2, 3, 4])
    const c = rng.randomItemFromArray([1, 2, 3])

    // Brüche wie im Original (kleine Zähler/Nenner)
    const fracChoices = [
      { p: 1, q: 4, r: 1, s: 2 },
      { p: 1, q: 3, r: 2, s: 3 },
      { p: 2, q: 5, r: 3, s: 5 },
    ]
    const F = rng.randomItemFromArray(fracChoices)
    const kMulti = rng.randomItemFromArray([2, 3, 4])

    return { A, c, p: F.p, q: F.q, r: F.r, s: F.s, kMulti }
  },

  // Originalaufgabe:  -2x = 2(y+1) ; x + (1/4)y = 1/2
  originalData: { A: 2, c: 1, p: 1, q: 4, r: 1, s: 2, kMulti: 3 },

  constraint() {
    return true
  },

  intro({ data }) {
    const g1 = `-${pp(data.A)}x=${pp(data.A)}\\,(y+${pp(data.c)})`
    const g2 = `x+\\tfrac{${pp(data.p)}}{${pp(data.q)}}y=\\tfrac{${pp(
      data.r,
    )}}{${pp(data.s)}}`
    return (
      <>
        <p>Gegeben ist das folgende lineare Gleichungssystem.</p>
        (1) <InlineMath math={g1} />
        <br />
        (2) <InlineMath math={g2} />
      </>
    )
  },

  tasks: [
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return <p>Bestimmen Sie die Lösung des Gleichungssystems.</p>
      },
      solution({ data }) {
        // Einsetzen: aus (1) nach x auflösen, dann in (2) einsetzen
        // (1):  -A x = A(y+c)  | :(-A)  ⇒  x = -(y+c)
        const xInTermsOfY = (y: number) => -(y + data.c)
        // (2): x + (p/q) y = r/s
        // setze x=-(y+c):  -(y+c) + (p/q) y = r/s
        // ⇒ y * ( -1 + p/q ) = r/s + c
        const leftCoeff = -1 + data.p / data.q
        const rightConst = data.r / data.s + data.c
        const y = rightConst / leftCoeff
        const x = xInTermsOfY(y)

        return (
          <div className="space-y-2">
            <BlockMath
              math={`\\text{Aus (1):}\\quad -${data.A}x=${data.A}(y+${data.c})\\;\\Big|:(-${data.A})`}
            />
            <BlockMath math={`\\Rightarrow\\; x=-y-${pp(data.c)}`} />
            <BlockMath
              math={String.raw`
                \text{In (2) einsetzen:}\quad -y-${pp(
                  data.c,
                )}+\frac{${pp(data.p)}}{${pp(data.q)}}y=\frac{${pp(
                  data.r,
                )}}{${pp(data.s)}}
              `}
            />
            <BlockMath
              math={String.raw`
                -y+\frac{${pp(data.p)}}{${pp(
                  data.q,
                )}}y=\frac{${pp(data.r)}}{${pp(data.s)}}+${pp(data.c)}
              `}
            />
            <BlockMath
              math={String.raw`
                \frac{${pp(data.p - data.q)}}{${pp(
                  data.q,
                )}}y=\frac{${pp(data.r + data.c * data.s)}}{${pp(data.s)}}\quad\big| \cdot ${pp(data.q)}
              `}
            />
            <BlockMath
              math={String.raw`
                ${pp(data.p - data.q)}y=${pp(data.r + data.c * data.s)}\quad\big| : ${pp(data.p - data.q)}
              `}
            />
            <BlockMath
              math={String.raw`
                y=${pp(y)}
              `}
            />
            <p>Setze y in Gleichung 1 ein:</p>
            <BlockMath math={`-${data.A}x=${data.A}(${pp(y)}+${pp(data.c)})`} />
            <BlockMath math={`-${data.A}x=${pp(data.A * (y + data.c))}`} />
            <BlockMath math={`x=${pp(x)}`} />
            <BlockMath
              math={`\\Rightarrow\\; (x\\mid y)=(${pp(x)}\\mid ${pp(y)})`}
            />
          </div>
        )
      },
    },

    {
      points: 3,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Ein anderes lineares Gleichungssystem hat ebenfalls die Gleichung
            (1). Geben Sie eine weitere Gleichung an, so dass das neue
            Gleichungssystem unendlich viele Lösungen hat.
          </p>
        )
      },
      solution({ data }) {
        // Jede Vielfache/äquivalente Form von (1) ist möglich
        const k = data.kMulti
        // k·(1):  -(kA)x = kA(y+c)
        const eq = `-${pp(k * data.A)}x=${pp(k * data.A)}(y+${pp(data.c)})`
        return (
          <>
            <p>Eine Möglichkeit (Vielfaches von (1)):</p>
            <InlineMath math={eq} />
            <p>
              Genau dann stellen die beiden Gleichungen Geraden dar, die
              aufeinander liegen und unendlich viele Schnittpunkte haben.
            </p>
          </>
        )
      },
    },
  ],
}
