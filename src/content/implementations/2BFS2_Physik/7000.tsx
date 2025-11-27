import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'v' | 's' | 't'
type System = 'si' | 'everyday'

interface DATA {
  target: Target // welche Größe ist gesucht?
  system: System // si = m, s, m/s; everyday = km, h, km/h
  s: number // Weg
  t: number // Zeit
  v: number // Geschwindigkeit
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise7000: Exercise<DATA> = {
  title: 'Gleichförmige Bewegung',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    // Wähle zufällig eine der 6 Varianten
    const target: Target = rng.randomItemFromArray(['v', 's', 't'])
    const system: System = rng.randomItemFromArray(['si', 'everyday'])

    let s = 0,
      t = 0,
      v = 0

    if (system === 'si') {
      // SI: s in m, t in s, v in m/s
      if (target === 'v') {
        // s und t so wählen, dass s/t ganzzahlig ist
        t = rng.randomIntBetween(4, 12)
        const vInt = rng.randomIntBetween(5, 25)
        v = vInt
        s = v * t
      } else if (target === 's') {
        t = rng.randomIntBetween(5, 20)
        v = rng.randomIntBetween(4, 18)
        s = v * t
      } else {
        // target === 't'
        v = rng.randomIntBetween(6, 24)
        const k = rng.randomIntBetween(5, 18) // t = k; s = v*k
        t = k
        s = v * t
      }
    } else {
      // Alltags-System: s in km, t in h, v in km/h
      if (target === 'v') {
        t = rng.randomItemFromArray([0.5, 0.75, 1, 1.5, 2])
        const vInt = rng.randomItemFromArray([40, 50, 60, 70, 80, 90, 100, 120])
        v = vInt
        s = round2(v * t)
      } else if (target === 's') {
        t = rng.randomItemFromArray([0.5, 0.75, 1, 1.25, 1.5, 2])
        v = rng.randomItemFromArray([30, 45, 60, 75, 90, 100, 110])
        s = round2(v * t)
      } else {
        // target === 't'
        v = rng.randomItemFromArray([40, 50, 60, 80, 90, 100, 120])
        // s so wählen, dass s/v eine „schöne“ Zeit ergibt
        const factor = rng.randomItemFromArray([0.5, 0.75, 1, 1.25, 1.5, 2])
        t = factor
        s = round2(v * t)
      }
    }

    // In den Daten speichern wir IMMER alle drei Größen (die gesuchte wird nur nicht verraten)
    return { target, system, s, t, v }
  },

  originalData: {
    // Beispiel: Geschwindigkeit in km/h gesucht
    target: 'v',
    system: 'everyday',
    s: 90, // km
    t: 1.5, // h
    v: 60, // km/h
  },

  constraint() {
    return true
  },

  task({ data }) {
    const isSI = data.system === 'si'
    const unitS = isSI ? '\\mathrm{m}' : '\\mathrm{km}'
    const unitT = isSI ? '\\mathrm{s}' : '\\mathrm{h}'
    const unitV = isSI
      ? '\\tfrac{\\mathrm m}{\\mathrm s}'
      : '\\tfrac{\\mathrm{km}}{\\mathrm h}'

    // Formuliere die Fragestellung je nach gesuchter Größe
    const ask =
      data.target === 'v' ? (
        <>
          Berechne die Geschwindigkeit <InlineMath math="v" />.
        </>
      ) : data.target === 's' ? (
        <>
          Berechne die Strecke <InlineMath math="s" />.
        </>
      ) : (
        <>
          Berechne die Zeit <InlineMath math="t" />.
        </>
      )

    // Zeige gegebene Größen: die gesuchte Größe wird als □ dargestellt
    const givenList = (
      <>
        {data.target === 's' ? null : (
          <li>
            <InlineMath math={`s = ${pp(data.s)}\\;${unitS}`} />
          </li>
        )}

        {data.target === 't' ? null : (
          <li>
            <InlineMath math={`t = ${pp(data.t)}\\;${unitT}`} />
          </li>
        )}

        {data.target === 'v' ? null : (
          <li>
            <InlineMath math={`v = ${pp(data.v)}\\;${unitV}`} />
          </li>
        )}
      </>
    )

    return (
      <>
        <p>Ein Auto fährt gleichförmig.</p>
        <p>{ask}</p>
        <p>Gegeben:</p>
        <ul className="list-disc ml-6">{givenList}</ul>
        <p>
          Formel:&nbsp;
          <InlineMath math={`v=\\tfrac{s}{t}`} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const isSI = data.system === 'si'
    const unitS = isSI ? '\\mathrm{m}' : '\\mathrm{km}'
    const unitT = isSI ? '\\mathrm{s}' : '\\mathrm{h}'
    const unitV = isSI
      ? '\\tfrac{\\mathrm m}{\\mathrm s}'
      : '\\tfrac{\\mathrm{km}}{\\mathrm h}'

    if (data.target === 'v') {
      const val = round2(data.s / data.t)
      return (
        <>
          <p>
            Setze die bekannten Werte ein und berechne <InlineMath math="v" />.
          </p>
          <InlineMath math={`v=\\tfrac{s}{t}`} />
          <br />
          <InlineMath
            math={`v=\\tfrac{${pp(data.s)}\\,${unitS}}{${pp(data.t)}\\,${unitT}}`}
          />
          <br />
          <InlineMath math={`v=${pp(val)}\\,${unitV}`} />
          <p>
            Die Geschwindigkeit beträgt{' '}
            <InlineMath math={`v=${pp(val)}\\,${unitV}`} />.
          </p>
        </>
      )
    }

    if (data.target === 's') {
      const val = round2(data.v * data.t)
      return (
        <>
          <p>
            Setze die bekannten Werte ein und forme die Gleichung nach{' '}
            <InlineMath math="s" /> um.
          </p>
          <InlineMath math={`v=\\tfrac{s}{t}`} />
          <br />
          <InlineMath
            math={`${pp(data.v)}\\,${unitV}=\\tfrac{s}{${pp(data.t)}\\,${unitT}}\\quad |\\cdot ${pp(data.t)}\\,${unitT}`}
          />
          <br />
          <InlineMath
            math={`s=${pp(data.v)}\\,${unitV}\\cdot ${pp(data.t)}\\,${unitT}`}
          />
          <br />
          <InlineMath math={`s=${pp(val)}\\,${unitS}`} />
          <p>
            Das Auto fährt <InlineMath math={`s=${pp(val)}\\,${unitS}`} />.
          </p>
        </>
      )
    }

    // data.target === 't'
    const val = round2(data.s / data.v)
    return (
      <>
        <InlineMath math={`v=\\tfrac{s}{t}`} />
        <br />
        <p>
          Setze die bekannten Werte ein und forme die Gleichung nach{' '}
          <InlineMath math="t" /> um.
        </p>
        <InlineMath
          math={`${pp(data.v)}\\,${unitV}=\\tfrac{${pp(data.s)}\\,${unitS}}{t}\\quad |\\cdot t`}
        />
        <br />
        <InlineMath
          math={`${pp(data.v)}\\,${unitV} \\cdot t=${pp(data.s)}\\,${unitS}\\quad |: ${pp(data.v)}\\,${unitV}`}
        />
        <br />
        <InlineMath
          math={`t=\\tfrac{${pp(data.s)}\\,${unitS}}{${pp(data.v)}\\,${unitV}}`}
        />
        <br />
        <InlineMath math={`t=${pp(val)}\\,${unitT}`} />
        <p>
          Das Auto benötigt <InlineMath math={`t=${pp(val)}\\,${unitT}`} />.
        </p>
      </>
    )
  },
}
