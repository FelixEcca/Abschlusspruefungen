import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { Dartboard } from './diagrams'
import { frac } from './math'

interface DATA {
  radii: [number, number, number]
  payouts: [number, number, number]
}

export const exercise21303: Exercise<DATA> = {
  title: 'Stochastik: Zielscheibe, Flächenanteile und fairer Einsatz',
  source: '2025 Teil A Aufgabe 4 – Auswahl I',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const inner = rng.randomIntBetween(1, 2),
      middle = inner + rng.randomIntBetween(1, 2)
    return {
      radii: [inner, middle, middle + rng.randomIntBetween(1, 2)],
      payouts: [rng.randomIntBetween(5, 9), rng.randomIntBetween(2, 4), 1],
    }
  },
  originalData: { radii: [1, 2, 4], payouts: [6, 2, 1] },
  intro: ({ data: d }) => (
    <>
      <p>
        Bei einem Glücksspiel wird ein Pfeil auf die dargestellte Scheibe
        geworfen. Jeder Pfeil trifft die Scheibe. Die Skalierung gibt die Radien
        der einzelnen Kreise an.
      </p>
      <Dartboard radii={d.radii} />
      <p>
        Die Trefferwahrscheinlichkeiten sind: rot{' '}
        <InlineMath math={frac(d.radii[0] ** 2, d.radii[2] ** 2)} />, blau{' '}
        <InlineMath
          math={frac(d.radii[1] ** 2 - d.radii[0] ** 2, d.radii[2] ** 2)}
        />
        , grün{' '}
        <InlineMath
          math={frac(d.radii[2] ** 2 - d.radii[1] ** 2, d.radii[2] ** 2)}
        />
        .
      </p>
    </>
  ),
  tasks: [
    {
      points: 2,
      task: ({ data: d }) => (
        <p>
          Ein Spieler bezahlt einen Einsatz von a Euro. Bei rot erhält er{' '}
          {d.payouts[0]} €, bei blau {d.payouts[1]} € und bei grün{' '}
          {d.payouts[2]} € ausgezahlt. Berechnen Sie den maximalen Einsatz a,
          sodass der Spieler auf lange Sicht keinen Verlust macht.
        </p>
      ),
      solution: ({ data: d }) => {
        const [r, s, t] = d.radii,
          [red, blue, green] = d.payouts
        return (
          <>
            <p>Die mittlere Auszahlung beträgt</p>
            <p>
              <InlineMath
                math={String.raw`E(A)=${frac(r * r, t * t)}\cdot${red}+${frac(s * s - r * r, t * t)}\cdot${blue}+${frac(t * t - s * s, t * t)}\cdot${green}=${frac(r * r * red + (s * s - r * r) * blue + (t * t - s * s) * green, t * t)}`}
              />{' '}
              Euro.
            </p>
            <p>
              Für den mittleren Spielergewinn gilt{' '}
              <InlineMath math="E(G)=E(A)-a" />. Er ist genau dann nicht
              negativ, wenn der Einsatz höchstens der mittleren Auszahlung
              entspricht. Der maximale Einsatz ist also der berechnete
              Erwartungswert.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: () => (
        <p>
          Der Flächeninhalt eines Kreises mit Radius r beträgt{' '}
          <InlineMath math={String.raw`\pi r^2`} />. Zeigen Sie, dass die
          angegebenen Wahrscheinlichkeiten den jeweiligen Flächenanteilen
          entsprechen.
        </p>
      ),
      solution: ({ data: d }) => {
        const [r, s, t] = d.radii
        return (
          <>
            <p>
              Die Gesamtfläche ist{' '}
              <InlineMath math={String.raw`A_{\mathrm{ges}}=${t * t}\pi`} />.
              Rot ist ein Kreis, blau und grün sind Kreisringe:
            </p>
            <p>
              <InlineMath
                math={String.raw`\frac{A_{\mathrm{rot}}}{A_{\mathrm{ges}}}=\frac{${r}^2\pi}{${t}^2\pi}=${frac(r * r, t * t)}`}
              />
            </p>
            <p>
              <InlineMath
                math={String.raw`\frac{A_{\mathrm{blau}}}{A_{\mathrm{ges}}}=\frac{(${s}^2-${r}^2)\pi}{${t}^2\pi}=${frac(s * s - r * r, t * t)}`}
              />
            </p>
            <p>
              <InlineMath
                math={String.raw`\frac{A_{\text{grün}}}{A_{\mathrm{ges}}}=\frac{(${t}^2-${s}^2)\pi}{${t}^2\pi}=${frac(t * t - s * s, t * t)}`}
              />
            </p>
            <p>
              Damit stimmen alle drei Flächenanteile mit den vorgegebenen
              Wahrscheinlichkeiten überein.
            </p>
          </>
        )
      },
    },
  ],
}
