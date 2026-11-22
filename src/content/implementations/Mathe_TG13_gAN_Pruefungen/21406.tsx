import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  angle: number
}

export const exercise21406: Exercise<DATA> = {
  title: 'Stochastik: Glücksrad aus der Trefferwahrscheinlichkeit bestimmen',
  source: '2026 Teil A Aufgabe 5 – Auswahl II',
  useCalculator: false,
  duration: 12,
  points: 5,
  generator: rng => ({
    angle: rng.randomItemFromArray([30, 45, 60, 72, 90, 120, 135, 144, 150]),
  }),
  originalData: { angle: 120 },
  task: ({ data: d }) => (
    <p>
      Ein Glücksrad besteht aus einem roten und einem weißen Sektor. Die
      Wahrscheinlichkeit, beim zweimaligen unabhängigen Drehen zweimal die
      gleiche Farbe zu erhalten, beträgt{' '}
      <InlineMath math={frac(d.angle ** 2 + (360 - d.angle) ** 2, 360 ** 2)} />.
      Ermitteln Sie die Größe des Mittelpunktswinkels des kleineren Sektors.
    </p>
  ),
  solution: ({ data: d }) => (
    <>
      <p>
        Sei p die Wahrscheinlichkeit für rot. Für zweimal die gleiche Farbe gilt
      </p>
      <p>
        <InlineMath
          math={String.raw`p^2+(1-p)^2=${frac(d.angle ** 2 + (360 - d.angle) ** 2, 360 ** 2)}`}
        />
        .
      </p>
      <p>Nach Ausmultiplizieren ergibt sich die quadratische Gleichung</p>
      <p>
        <InlineMath
          math={String.raw`2p^2-2p+${frac(2 * d.angle * (360 - d.angle), 360 ** 2)}=0`}
        />
        .
      </p>
      <p>Division durch 2 und die p-q-Formel liefern</p>
      <p>
        <InlineMath
          math={String.raw`p=\frac12\pm\sqrt{\frac14-${frac(d.angle * (360 - d.angle), 360 ** 2)}}=\frac12\pm${frac(180 - d.angle, 360)}`}
        />
        .
      </p>
      <p>
        Damit sind die beiden Lösungen{' '}
        <InlineMath
          math={String.raw`p_1=${frac(d.angle, 360)},\quad p_2=${frac(360 - d.angle, 360)}`}
        />
        . Das kann man durch Einsetzen überprüfen; beide Lösungen vertauschen
        nur die Farben der Sektoren.
      </p>
      <p>
        Der kleinere Anteil ist <InlineMath math={frac(d.angle, 360)} />. Da die
        Sektorgröße proportional zur Trefferwahrscheinlichkeit ist, gilt{' '}
        <InlineMath
          math={String.raw`\alpha=360^\circ\cdot${frac(d.angle, 360)}=${d.angle}^\circ`}
        />
        .
      </p>
    </>
  ),
}
