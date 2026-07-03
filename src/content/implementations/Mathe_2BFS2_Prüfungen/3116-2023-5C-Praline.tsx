// ======================================
// 5C — Praline (Halbkugel) mit Bild 3116.png
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA3116 {
  bowlInnerD: number // Innendurchmesser der Halbkugel (Karamellschale)
  nutD: number // Durchmesser der (kugelförmigen) Haselnuss
  chocR: number // Radius des oben aufgespritzten Schokokreises
  threshold: number // Prozent-Schwelle für die Aussage in (2)
}

export const exercise3116: Exercise<DATA3116> = {
  title: 'Praline',
  source: '2023 Wahlteil Aufgabe 5C',
  useCalculator: true,
  duration: 12,
  points: 12,

  generator(rng) {
    const bowlInnerD = rng.randomItemFromArray([
      3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6,
    ])
    const nutD = rng.randomItemFromArray([
      0.9, 1.0, 1.3, 1.5, 1.6, 1.7, 1.8, 1.2, 1.4,
    ])
    const chocR = rng.randomItemFromArray([1.6, 1.7, 1.8, 1.9, 1.5, 1.4])
    const threshold = rng.randomItemFromArray([50, 55, 60, 65, 70, 75, 80])
    return { bowlInnerD, nutD, chocR, threshold }
  },

  // Originalwerte aus der Prüfung
  originalData: { bowlInnerD: 4.0, nutD: 1.2, chocR: 1.7, threshold: 70 },

  constraint({ data }) {
    // Sinnvolle Positivitäts-Checks
    return (
      data.bowlInnerD > 0 &&
      data.nutD > 0 &&
      data.chocR > 0 &&
      data.threshold > 0 &&
      data.nutD < data.bowlInnerD // Nuss kleiner als Schalen-Durchmesser
    )
  },

  intro() {
    return (
      <>
        <p>
          Eine Hobbybäckerin macht eine bekannte, halbkugelförmige Praline nach.
        </p>
        <img
          src="/content/BW_2BFS/3116.png"
          width={200}
          alt="Pralinen-Skizze"
        />
      </>
    )
  },

  tasks: [
    // (1) Volumen Nougat
    {
      points: 6,
      intro({ data }) {
        return (
          <p>
            Eine Karamellschale mit Innendurchmesser{' '}
            <InlineMath math={`${pp(data.bowlInnerD)}\\,\\text{cm}`} /> wird mit
            Nougat gefüllt. Der Durchmesser der Haselnuss beträgt etwa{' '}
            <InlineMath math={`${pp(data.nutD)}\\,\\text{cm}`} />. Die dunkle
            Schokolade wird kreisförmig mit einem Radius von{' '}
            <InlineMath math={`${pp(data.chocR)}\\,\\text{cm}`} /> aufgespritzt.
          </p>
        )
      },
      task() {
        return <p>Berechnen Sie das Volumen des Nougats.</p>
      },
      solution({ data }) {
        const R = data.bowlInnerD / 2
        const r = data.nutD / 2
        const V = (2 / 3) * Math.PI * R ** 3 - (4 / 3) * Math.PI * r ** 3 // Halbkugel minus Nuss
        const Vround = Math.round(V * 100) / 100

        return (
          <>
            <BlockMath math="V_{\text{Nougat}}=V_{\text{Halbkugel}}-V_{\text{Nuss}}" />
            <BlockMath math="V_{\text{Halbkugel}}=\tfrac{2}{3}\pi R^{3},\quad V_{\text{Nuss}}=\tfrac{4}{3}\pi r^{3}" />
            <BlockMath
              math={`V_{\\text{Nougat}}=\\tfrac{2}{3}\\pi\\,${pp(R)}^{3}-\\tfrac{4}{3}\\pi\\,${pp(
                r,
              )}^{3}`}
            />
            <BlockMath
              math={`V_{\\text{Nougat}}=\\;${pp(Vround)}\\;\\text{cm}^{3}`}
            />
          </>
        )
      },
    },

    // (2) Bedeckter Anteil der oberen Nougatfläche
    {
      points: 6,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Beurteilen Sie die Aussage: &quot;Mehr als{' '}
            <InlineMath math={`${data.threshold}\\,\\%`} /> der Nougatoberfläche
            sind mit dunkler Schokolade bedeckt.&quot;
          </p>
        )
      },
      solution({ data }) {
        // Obere Nougatfläche ist ein Kreis mit Radius R (Innendurchmesser/2)
        const R = data.bowlInnerD / 2
        const covered = (data.chocR ** 2 / R ** 2) * 100
        const coveredRound = Math.round(covered * 100) / 100
        const verdict =
          coveredRound > data.threshold ? 'trifft zu' : 'trifft nicht zu'

        return (
          <>
            <p>Berechne den Anteil der Schokolade an der ganzen Fläche:</p>
            <BlockMath
              math={`\\dfrac{A_{\\text{Schoko}}}{A_{\\text{oben}}}=\\dfrac{\\pi\\cdot${pp(data.chocR)}^{2}}{\\pi\\cdot${pp(R)}^{2}} \\approx \\dfrac{${pp(roundToDigits(Math.PI * data.chocR * data.chocR, 2))}}{${pp(roundToDigits(Math.PI * R * R, 2))}}=\\;${pp(coveredRound)}\\%`}
            />
            <p>
              Der Anteil beträgt <InlineMath math={`${pp(coveredRound)}\\%`} />{' '}
              und ist damit{' '}
              {coveredRound > data.threshold ? 'größer' : 'kleiner'} als{' '}
              <InlineMath math={`${data.threshold}\\%`} />.
            </p>
          </>
        )
      },
    },
  ],
}
