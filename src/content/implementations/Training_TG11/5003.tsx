// =====================================================
// 5003 — Verbindungs- und Gegenvektor (in R^3)
// =====================================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // Zwei verschiedene Punkte A, B in R^3
  Ax: number
  Ay: number
  Az: number
  Bx: number
  By: number
  Bz: number
  // Für Teil (2): ein beliebiger Vektor v
  vx: number
  vy: number
  vz: number
}

export const exercise5003: Exercise<DATA> = {
  title: 'Verbindungs- und Gegenvektor',
  source: 'Vektoren',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    const r = () => rng.randomIntBetween(-5, 5)
    // A und B verschieden wählen
    let Ax = r(),
      Ay = r(),
      Az = r()
    let Bx = r(),
      By = r(),
      Bz = r()
    while (Ax === Bx && Ay === By && Az === Bz) {
      Bx = r()
      By = r()
      Bz = r()
    }
    // Gegenvektor-Aufgabe: „nette“ Komponenten, nicht alle 0
    let vx = r(),
      vy = r(),
      vz = r()
    while (vx === 0 && vy === 0 && vz === 0) {
      vx = r()
      vy = r()
      vz = r()
    }
    return { Ax, Ay, Az, Bx, By, Bz, vx, vy, vz }
  },

  // Beispiel-/Originaldaten
  originalData: {
    Ax: -2,
    Ay: 1,
    Az: 4,
    Bx: 3,
    By: -1,
    Bz: 0,
    vx: 2,
    vy: -5,
    vz: 3,
  } as DATA,

  constraint({ data }) {
    // A ≠ B, v ≠ 0
    const diff = !(
      data.Ax === data.Bx &&
      data.Ay === data.By &&
      data.Az === data.Bz
    )
    const vnonzero = !(data.vx === 0 && data.vy === 0 && data.vz === 0)
    return diff && vnonzero
  },

  intro() {
    return null
  },

  tasks: [
    // (1) Verbindungsvektor \overrightarrow{AB}
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Gegeben sind die Punkte{' '}
            <InlineMath
              math={`A\\,(${pp(data.Ax)}\\mid ${pp(data.Ay)}\\mid ${pp(data.Az)})`}
            />{' '}
            und{' '}
            <InlineMath
              math={`B\\,(${pp(data.Bx)}\\mid ${pp(data.By)}\\mid ${pp(data.Bz)})`}
            />
            . Bestimmen Sie den Verbindungsvektor{' '}
            <InlineMath math="\overrightarrow{AB}" />.
          </p>
        )
      },
      solution({ data }) {
        const vx = data.Bx - data.Ax
        const vy = data.By - data.Ay
        const vz = data.Bz - data.Az
        return (
          <>
            <p>Hinweis: &quot;Spitze minus Anfang&quot;</p>
            <BlockMath
              math={String.raw`
              \overrightarrow{AB}=
              \begin{pmatrix}
              ${pp(data.Bx)}- ${pp(data.Ax)}\\
              ${pp(data.By)}- ${pp(data.Ay)}\\
              ${pp(data.Bz)}- ${pp(data.Az)}
              \end{pmatrix}
              =
              \begin{pmatrix}
              ${pp(vx)}\\
              ${pp(vy)}\\
              ${pp(vz)}
              \end{pmatrix}
            `}
            />
          </>
        )
      },
    },

    // (2) Gegenvektor
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Gegeben ist der Vektor{' '}
            <InlineMath
              math={`\\vec v=\\begin{pmatrix}${pp(data.vx)}\\\\${pp(data.vy)}\\\\${pp(
                data.vz,
              )}\\end{pmatrix}`}
            />
            . Geben Sie den <b>Gegenvektor</b> <InlineMath math="-\vec v" /> an.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <BlockMath
              math={String.raw`
              -\vec v
              
              =
              \begin{pmatrix}
              ${pp(-data.vx)}\\
              ${pp(-data.vy)}\\
              ${pp(-data.vz)}
              \end{pmatrix}
            `}
            />
          </>
        )
      },
    },
  ],
}
