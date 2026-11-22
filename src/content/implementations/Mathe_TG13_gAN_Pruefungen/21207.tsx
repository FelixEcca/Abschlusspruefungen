import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  gainCents: number
}

export const exercise21207: Exercise<DATA> = {
  title: 'Stochastik: Ein mehrstufiges Glücksspiel entwerfen (PLA)',
  source: '2024 Teil A Aufgabe 6 – PLA',
  useCalculator: true,
  duration: 25,
  points: 10,
  generator: rng => ({ gainCents: 10 * rng.randomIntBetween(5, 50) }),
  originalData: { gainCents: 100 },
  task: ({ data }) => (
    <>
      <p>
        Bearbeiten Sie die Aufgabe unter Berücksichtigung der einzelnen
        Problemlöseschritte. Dokumentieren und reflektieren Sie Ihre
        Vorgehensweise.
      </p>
      <p>
        Eine Klasse will ein Glücksspiel in Form eines Zufallsexperiments
        anbieten, bei dem sie im langfristigen Mittel {pp(data.gainCents / 100)}{' '}
        € Gewinn pro Spiel macht.
      </p>
      <p>
        Entwerfen und beschreiben Sie ein dazu passendes mehrstufiges
        Zufallsexperiment.
      </p>
    </>
  ),
  solution: ({ data }) => (
    <>
      <p>Eine mögliche Lösung:</p>
      <p>
        <strong>Planen:</strong> Eine faire Münze wird zweimal unabhängig
        geworfen. Nur bei zweimal Kopf erhält der Spieler 4 € ausgezahlt, sonst
        0 €. Vor dem Spiel zahlt er {pp(data.gainCents / 100 + 1)} € Einsatz.
      </p>
      <p>
        <strong>Berechnen:</strong> Die Ergebnisse KK, KZ, ZK und ZZ haben
        jeweils die Wahrscheinlichkeit <InlineMath math={String.raw`\frac14`} />
        . Die mittlere Auszahlung ist{' '}
        <InlineMath math={String.raw`E(A)=\frac14\cdot4+\frac34\cdot0=1`} />{' '}
        Euro.
      </p>
      <p>
        Der mittlere Gewinn der Klasse ist deshalb{' '}
        <InlineMath
          math={`${pp(data.gainCents / 100 + 1)}-1=${pp(data.gainCents / 100)}`}
        />{' '}
        Euro pro Spiel.
      </p>
      <p>
        <strong>Prüfen und reflektieren:</strong> Beide Würfe beeinflussen den
        Gewinnfall; das Experiment ist mehrstufig. Der berechnete Erwartungswert
        erfüllt die Vorgabe. Der Gewinn ist nicht in jedem einzelnen Spiel
        garantiert. Andere Spielregeln sind ebenso richtig, sofern ihre
        Wahrscheinlichkeiten und der erwartete Gewinn nachvollziehbar stimmen.
      </p>
    </>
  ),
}
