import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Context =
  | 'scrap'
  | 'utilization'
  | 'surcharge'
  | 'usableMass'
  | 'defectRate'

interface DATA {
  context: Context
  base: number
  rate: number
  part: number
  result: number
}

export const exercise13005: Exercise<DATA> = {
  title: 'Prozentrechnung im Metallbetrieb',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: true,
  duration: 9,
  points: 4,
  generator(rng) {
    const context = rng.randomItemFromArray<Context>([
      'scrap',
      'utilization',
      'surcharge',
      'usableMass',
      'defectRate',
    ])
    const rate = rng.randomItemFromArray([2, 3, 4, 5, 8, 10, 12.5, 15, 20, 25])

    if (context === 'scrap' || context === 'defectRate') {
      const base = rng.randomItemFromArray([200, 400, 600, 800, 1200, 1600])
      const part = (base * rate) / 100
      return {
        context,
        base,
        rate,
        part,
        result: context === 'defectRate' ? rate : part,
      }
    }

    if (context === 'utilization') {
      const base = rng.randomItemFromArray([160, 200, 240, 320, 400])
      const utilizationRate = rng.randomItemFromArray([65, 70, 75, 80, 85, 90])
      const part = (base * utilizationRate) / 100
      return { context, base, rate: utilizationRate, part, result: part }
    }

    if (context === 'surcharge') {
      const base = rng.randomItemFromArray([800, 1200, 1600, 2400, 3200])
      const part = (base * rate) / 100
      return { context, base, rate, part, result: base + part }
    }

    const base = rng.randomItemFromArray([400, 600, 800, 1000, 1200])
    const part = (base * rate) / 100
    return { context, base, rate, part, result: base - part }
  },
  originalData: {
    context: 'scrap',
    base: 800,
    rate: 5,
    part: 40,
    result: 40,
  },
  constraint({ data }) {
    return (
      data.base > 0 &&
      data.rate > 0 &&
      data.rate < 100 &&
      data.part > 0 &&
      Number.isFinite(data.result)
    )
  },
  task({ data }) {
    if (data.context === 'scrap') {
      return (
        <p>
          In einem Fertigungslos werden <b>{pp(data.base)} Bauteile</b>{' '}
          hergestellt. Die Ausschussquote beträgt <b>{pp(data.rate)} %</b>.
          Berechnen Sie die Anzahl der Ausschussteile.
        </p>
      )
    }
    if (data.context === 'utilization') {
      return (
        <p>
          Eine Maschine ist für <b>{pp(data.base)} Stunden</b> eingeplant. Ihre
          zeitliche Auslastung beträgt <b>{pp(data.rate)} %</b>. Berechnen Sie
          die tatsächliche Laufzeit.
        </p>
      )
    }
    if (data.context === 'surcharge') {
      return (
        <p>
          Ein Materialauftrag kostet zunächst <b>{pp(data.base)} €</b>. Es wird
          ein Legierungszuschlag von <b>{pp(data.rate)} %</b> berechnet. Wie
          hoch ist der neue Gesamtpreis?
        </p>
      )
    }
    if (data.context === 'usableMass') {
      return (
        <p>
          Von <b>{pp(data.base)} kg</b> eingesetztem Rohmaterial gehen beim
          Zuschneiden <b>{pp(data.rate)} %</b> verloren. Welche Masse bleibt für
          die Werkstücke nutzbar?
        </p>
      )
    }
    return (
      <p>
        Bei der Qualitätskontrolle werden von <b>{pp(data.base)} Bauteilen</b>{' '}
        genau <b>{pp(data.part)}</b> beanstandet. Berechnen Sie die Fehlerquote
        in Prozent.
      </p>
    )
  },
  solution({ data }) {
    if (data.context === 'defectRate') {
      return (
        <>
          <p>Der Grundwert ist die gesamte geprüfte Menge.</p>
          <BlockMath
            math={`p=\\frac{W}{G}\\cdot100\\%=\\frac{${pp(data.part)}}{${pp(data.base)}}\\cdot100\\%=${pp(data.result)}\\%`}
          />
        </>
      )
    }

    const unit =
      data.context === 'scrap'
        ? '\\text{ Bauteile}'
        : data.context === 'utilization'
          ? '\\,\\mathrm{h}'
          : data.context === 'surcharge'
            ? '\\,\\mathrm{EUR}'
            : '\\,\\mathrm{kg}'
    return (
      <>
        <p>Zuerst wird der Prozentwert berechnet.</p>
        <BlockMath
          math={`W=G\\cdot\\frac{p}{100}=${pp(data.base)}\\cdot\\frac{${pp(data.rate)}}{100}=${pp(data.part)}${unit}`}
        />
        {data.context === 'surcharge' && (
          <BlockMath
            math={`${pp(data.base)}\\,\\mathrm{EUR}+${pp(data.part)}\\,\\mathrm{EUR}=${pp(data.result)}\\,\\mathrm{EUR}`}
          />
        )}
        {data.context === 'usableMass' && (
          <BlockMath
            math={`${pp(data.base)}\\,\\mathrm{kg}-${pp(data.part)}\\,\\mathrm{kg}=${pp(data.result)}\\,\\mathrm{kg}`}
          />
        )}
        <p>
          Ergebnis:{' '}
          <b>
            {pp(data.result)}{' '}
            {data.context === 'scrap'
              ? 'Ausschussteile'
              : data.context === 'utilization'
                ? 'Stunden'
                : data.context === 'surcharge'
                  ? '€'
                  : 'kg'}
          </b>
        </p>
      </>
    )
  },
}
