import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m1: number // Anfangsmasse Auto (kg)
  a1: number // Anfangsbeschleunigung (m/s^2)
  F: number // Antriebskraft (N)
  people: number // Anzahl der Personen, die ein-/aussteigen
  personMass: number // Masse pro Person (kg)
  direction: 'ein' | 'aus' // Personen steigen ein oder aus
  m2: number // neue Masse (kg)
  a2: number // neue Beschleunigung (m/s^2)
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise7004: Exercise<DATA> = {
  title: 'Bewegungsgesetz F = m \\cdot a',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const m1 = rng.randomIntBetween(8, 16) * 100 // 800 ... 1600 kg
    const a1 = rng.randomIntBetween(1, 4) // 1 ... 4 m/s²
    const F = m1 * a1 // N

    const personMass = rng.randomIntBetween(5, 10) * 10
    let direction: 'ein' | 'aus' = rng.randomItemFromArray(['ein', 'aus'])
    const people = rng.randomIntBetween(1, 4)

    let m2 =
      direction === 'ein' ? m1 + people * personMass : m1 - people * personMass

    // Sicherheit: Masse darf nicht zu klein werden – sonst switchen wir auf „einsteigen“
    if (m2 < 600) {
      direction = 'ein'
      m2 = m1 + people * personMass
    }

    const a2 = round2(F / m2)

    return { m1, a1, F, people, personMass, direction, m2, a2 }
  },

  originalData: {
    m1: 1200,
    a1: 2,
    F: 2400,
    people: 3,
    personMass: 70,
    direction: 'ein',
    m2: 1410,
    a2: round2(2400 / 1410),
  },

  constraint({ data }) {
    return data.m1 > 0 && data.m2 > 0 && data.a1 > 0 && data.F > 0
  },

  intro({ data }) {
    const richtungText = data.direction === 'ein' ? 'einsteigen' : 'aussteigen'

    return (
      <>
        <p>
          Ein Auto mit einer Masse von <br></br>
          <InlineMath math={`m = ${pp(data.m1)}\\,\\mathrm{kg}`} /> beschleunigt
          mit{' '}
          <InlineMath math={`a = ${pp(data.a1)}\\frac{m }{\\mathrm{s^{2}}}.`} />{' '}
        </p>
      </>
    )
  },

  tasks: [
    // a) Antriebskraft F bestimmen
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Bestimme die Antriebskraft <InlineMath math="F" /> des Motors
              während der ersten Beschleunigungsphase.
            </p>
          </>
        )
      },
      solution({ data }) {
        const F = data.F
        return (
          <>
            <p>
              Verwende das Bewegungsgesetz <br></br>
              <InlineMath math="F = m\cdot a" /> und setze die bekannten Werte
              ein.
            </p>
            <InlineMath math={`F = m\\cdot a`} />
            <br />
            <InlineMath
              math={`F = ${pp(data.m1)}\\,\\mathrm{kg}\\cdot ${pp(
                data.a1,
              )}\\,\\frac{m }{\\mathrm{s^{2}}}`}
            />
            <br />
            <InlineMath math={`F = ${pp(F)}\\,\\mathrm N`} />
            <p>
              Die Antriebskraft des Motors beträgt<br></br>{' '}
              <InlineMath math={`F = ${pp(F)}\\,\\mathrm N`} />.
            </p>
          </>
        )
      },
    },

    // b) neue Beschleunigung bei veränderter Masse
    {
      points: 21,
      intro({ data }) {
        const richtungText = data.direction === 'ein' ? 'ein' : 'aus'
        return (
          <>
            <p>
              Es steigen <InlineMath math={`${pp(data.people)}`} /> Personen mit
              je <InlineMath math={`${pp(data.personMass)}\\,\\mathrm{kg}`} />{' '}
              {richtungText}. Die Antriebskraft des Motors bleibt gleich groß
              wie davor.
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechne jetzt die neue Beschleunigung <InlineMath math="a" /> des
            </p>
          </>
        )
      },
      solution({ data }) {
        const a2 = round2(data.F / data.m2)
        return (
          <>
            <p>
              Da die Antriebskraft gleich bleibt, gilt weiterhin{' '}
              <InlineMath math={`F = ${pp(data.F)}\\,\\mathrm N`} />, jetzt aber
              mit der neuen Masse <InlineMath math="m" /> und der neuen
              Beschleunigung <InlineMath math="a" />.
            </p>
            <p>Berechne die neue Masse:</p>
            {data.direction === 'ein' ? (
              <InlineMath
                math={`m = ${pp(data.m1)}\\,\\mathrm{kg} + ${pp(data.people)} \\cdot ${pp(data.personMass)}\\,\\mathrm{kg} = ${pp(data.m2)}\\,\\mathrm{kg}`}
              />
            ) : (
              <InlineMath
                math={`m = ${pp(data.m1)}\\,\\mathrm{kg} - ${pp(data.people)} \\cdot ${pp(data.personMass)}\\,\\mathrm{kg} = ${pp(data.m2)}\\,\\mathrm{kg}`}
              />
            )}
            <br />
            <p>Verwende wieder das Bewegungsgesetz:</p>
            <InlineMath math={`F = m\\cdot a`} />
            <br />
            <InlineMath
              math={`${pp(data.F)}\\,\\mathrm N = ${pp(
                data.m2,
              )}\\,\\mathrm{kg}\\cdot a \\quad | : ${pp(
                data.m2,
              )}\\,\\mathrm{kg}`}
            />
            <br />
            <InlineMath
              math={`a = \\tfrac{${pp(data.F)}\\,\\mathrm N}{${pp(
                data.m2,
              )}\\,\\mathrm{kg}}`}
            />
            <br />
            <InlineMath math={`a = ${pp(a2)}\\,\\frac{m }{\\mathrm{s^{2}}}`} />
            <p>
              Die neue Beschleunigung beträgt somit{' '}
              <InlineMath
                math={`a = ${pp(a2)}\\,\\frac{m }{\\mathrm{s^{2}}}`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
