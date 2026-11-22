import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  axis: number
  maximum: boolean
}

export const exercise21307: Exercise<DATA> = {
  title: 'Analysis: Funktionen zu vorgegebenen Eigenschaften finden (PLA)',
  source: '2025 Teil A Aufgabe 6 – PLA',
  useCalculator: true,
  duration: 25,
  points: 10,
  generator: rng => ({
    axis: rng.randomIntBetween(-3, 3),
    maximum: rng.randomItemFromArray([true, false]),
  }),
  originalData: { axis: 0, maximum: true },
  task: ({ data: d }) => (
    <>
      <p>
        Bearbeiten Sie die Aufgabe unter Berücksichtigung der einzelnen
        Problemlöseschritte. Dokumentieren und reflektieren Sie Ihre
        Vorgehensweise.
      </p>
      <p>
        Gegeben sind drei Eigenschaften, die eine Funktion f beziehungsweise ihr
        Graph haben kann:
      </p>
      <ul>
        <li>f ist eine Polynomfunktion.</li>
        <li>
          Der Graph ist achsensymmetrisch{' '}
          {d.axis === 0 ? (
            'zur y-Achse'
          ) : (
            <>
              zur Geraden <InlineMath math={`x=${d.axis}`} />
            </>
          )}
          .
        </li>
        <li>
          Der Graph besitzt mindestens einen{' '}
          {d.maximum ? 'Hochpunkt' : 'Tiefpunkt'}.
        </li>
      </ul>
      <p>
        Bestimmen Sie jeweils einen passenden Funktionsterm, sodass f a) genau
        eine, b) genau zwei und c) alle drei Eigenschaften erfüllt.
      </p>
    </>
  ),
  solution: ({ data: d }) => {
    const argument = d.axis === 0 ? 'x' : `(x-(${d.axis}))`,
      sign = d.maximum ? '' : '-'
    return (
      <>
        <p>
          Eine mögliche Strategie ist, mit einfachen Geraden und Parabeln zu
          beginnen und für jeden Vorschlag alle drei Eigenschaften zu prüfen.
        </p>
        <p>
          <strong>a) Genau eine:</strong>{' '}
          <InlineMath math={`f(x)=${argument}`} /> ist eine Polynomfunktion. Der
          Graph ist nicht achsensymmetrisch zur vorgegebenen Achse und besitzt
          keinen Extrempunkt.
        </p>
        <p>
          <strong>b) Genau zwei:</strong>{' '}
          <InlineMath math={`f(x)=${sign}${argument}^2`} /> ist eine
          Polynomfunktion und hat die verlangte Achsensymmetrie. Die Parabel
          besitzt nur einen{' '}
          {d.maximum
            ? 'Tiefpunkt und keinen Hochpunkt'
            : 'Hochpunkt und keinen Tiefpunkt'}
          .
        </p>
        <p>
          <strong>c) Alle drei:</strong>{' '}
          <InlineMath math={`f(x)=${d.maximum ? '-' : ''}${argument}^2`} /> ist
          eine Polynomfunktion, besitzt die verlangte Symmetrie und einen{' '}
          {d.maximum ? 'Hochpunkt' : 'Tiefpunkt'} bei{' '}
          <InlineMath math={String.raw`(${d.axis}\mid0)`} />.
        </p>
        <p>
          <strong>Reflexion:</strong> In b) und c) verändert allein das
          Vorzeichen die Art des Extrempunkts, nicht die Symmetrie oder die
          Eigenschaft als Polynomfunktion. Es gibt viele andere richtige
          Beispiele; entscheidend ist die Prüfung der genauen Anzahl erfüllter
          Eigenschaften.
        </p>
      </>
    )
  },
}
