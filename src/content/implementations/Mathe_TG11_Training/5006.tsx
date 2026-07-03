// ======================================
// 5006 — Mittelpunkte von Strecken
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  Ax: number
  Ay: number
  Az: number
  Bx: number
  By: number
  Bz: number
}

export const exercise5006: Exercise<DATA> = {
  title: 'Mittelpunkte von Strecken',
  source: 'Vektoren',
  useCalculator: false,
  duration: 6,
  points: 4,

  generator(rng) {
    const r = () => rng.randomIntBetween(-5, 5)
    let Ax = r(),
      Ay = r(),
      Az = r()
    let Bx = r(),
      By = r(),
      Bz = r()
    // A und B sollen verschieden sein
    while (Ax === Bx && Ay === By && Az === Bz) {
      Bx = r()
      By = r()
      Bz = r()
    }
    return { Ax, Ay, Az, Bx, By, Bz }
  },

  // Beispiel-/Originaldaten
  originalData: {
    Ax: -2,
    Ay: 3,
    Az: 1,
    Bx: 4,
    By: -1,
    Bz: 5,
  } as DATA,

  constraint({ data }) {
    // keine Sonderfälle: A ≠ B
    return !(data.Ax === data.Bx && data.Ay === data.By && data.Az === data.Bz)
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
        . Bestimmen Sie den Mittelpunkt <InlineMath math="M" /> der Strecke{' '}
        <InlineMath math="\overline{AB}" />.
      </p>
    )
  },

  solution({ data }) {
    // Verbindungsvektor AB und Mittelpunkt
    const vABx = data.Bx - data.Ax
    const vABy = data.By - data.Ay
    const vABz = data.Bz - data.Az

    const halfx = vABx / 2
    const halfy = vABy / 2
    const halfz = vABz / 2

    const Mx = data.Ax + halfx
    const My = data.Ay + halfy
    const Mz = data.Az + halfz

    return (
      <>
      <p>Schematische Skizze:</p>
      <svg viewBox="0 0 328 200"><image href="/content/BW_TG11/5006.jpg" height="200" width="328" /></svg>
      <p>Bestimme den Vektor, der auf M zeigt:</p>
        <BlockMath math="\overrightarrow{M} = \overrightarrow{A} + \tfrac{1}{2}\,\overrightarrow{AB}" />
        <BlockMath
          math={String.raw`
            \overrightarrow{AB}
            =
            \begin{pmatrix}
              ${pp(data.Bx)}- ${pp(data.Ax)}\\
              ${pp(data.By)}- ${pp(data.Ay)}\\
              ${pp(data.Bz)}- ${pp(data.Az)}
            \end{pmatrix}
            =
            \begin{pmatrix}
              ${pp(vABx)}\\
              ${pp(vABy)}\\
              ${pp(vABz)}
            \end{pmatrix}
          `}
        />
        <BlockMath
          math={String.raw`
            \tfrac{1}{2}\,\overrightarrow{AB}
            =
            \begin{pmatrix}
              ${pp(halfx)}\\
              ${pp(halfy)}\\
              ${pp(halfz)}
            \end{pmatrix}
          `}
        />
        <BlockMath
          math={String.raw`
            \overrightarrow{M}
            =
            \overrightarrow{A} + \tfrac{1}{2}\,\overrightarrow{AB}
            =
            \begin{pmatrix}
              ${pp(data.Ax)}\\
              ${pp(data.Ay)}\\
              ${pp(data.Az)}
            \end{pmatrix}
            +
            \begin{pmatrix}
              ${pp(halfx)}\\
              ${pp(halfy)}\\
              ${pp(halfz)}
            \end{pmatrix}
            =
            \begin{pmatrix}
              ${pp(Mx)}\\
              ${pp(My)}\\
              ${pp(Mz)}
            \end{pmatrix}
          `}
        />
        <p>Der Punkt M hat damit die Koordinaten: <InlineMath math={`M\\,(${pp(Mx)}\\mid ${pp(My)}\\mid ${pp(Mz)})`} /></p>
      </>
    )
  },
}
