import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind =
  | 'roundMoney'
  | 'shoppingChange'
  | 'timePlan'
  | 'lengthFence'
  | 'paintArea'
  | 'tilesArea'
  | 'boxVolume'
  | 'packageSurface'
  | 'fractionOfAmount'
  | 'fractionCompare'
  | 'mixedFractionShare'
  | 'recipeScale'
  | 'ratioParts'
  | 'directRule'
  | 'inverseRule'
  | 'discount'
  | 'increase'
  | 'percentRate'
  | 'baseValue'
  | 'monthlyInterest'
  | 'mean'
  | 'range'
  | 'tableRead'
  | 'mapScale'
  | 'unitChain'
  | 'circleDiameter'
  | 'examBasics'
  | 'examContext'

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function makeData(kind: Kind, rng: any): DATA {
  if (kind === 'roundMoney') {
    const a = rng.randomItemFromArray([12.49, 18.95, 27.51, 43.89, 68.12])
    return { kind, a, b: Math.round(a), c: 0, d: 0, result: Math.round(a), result2: 0, label: 'Einkauf' }
  }
  if (kind === 'shoppingChange') {
    const price = rng.randomItemFromArray([7.35, 12.8, 18.45, 23.6, 31.75])
    const paid = rng.randomItemFromArray([20, 30, 50])
    return { kind, a: price, b: paid, c: 0, d: 0, result: round2(paid - price), result2: 0, label: 'Kasse' }
  }
  if (kind === 'timePlan') {
    const start = rng.randomItemFromArray([7 * 60 + 45, 8 * 60 + 10, 9 * 60 + 20, 13 * 60 + 35])
    const duration = rng.randomItemFromArray([35, 45, 50, 75, 90, 110])
    return { kind, a: start, b: duration, c: 0, d: 0, result: start + duration, result2: 0, label: 'Termin' }
  }
  if (kind === 'lengthFence') {
    const a = rng.randomItemFromArray([6, 8, 10, 12, 15])
    const b = rng.randomItemFromArray([4, 5, 7, 9, 11])
    return { kind, a, b, c: 0, d: 0, result: 2 * (a + b), result2: a * b, label: 'Garten' }
  }
  if (kind === 'paintArea') {
    const a = rng.randomItemFromArray([3, 4, 5, 6, 8])
    const b = rng.randomItemFromArray([2.2, 2.4, 2.5, 2.8, 3])
    const c = rng.randomItemFromArray([5, 6, 7, 8])
    return { kind, a, b, c, d: 0, result: round2(a * b), result2: round2(a * b * c), label: 'Wand' }
  }
  if (kind === 'tilesArea') {
    const a = rng.randomItemFromArray([4, 5, 6, 8])
    const b = rng.randomItemFromArray([3, 4, 5])
    const c = rng.randomItemFromArray([0.25, 0.5, 1])
    return { kind, a, b, c, d: 0, result: a * b, result2: round2((a * b) / c), label: 'Boden' }
  }
  if (kind === 'boxVolume') {
    const a = rng.randomItemFromArray([20, 30, 40, 50])
    const b = rng.randomItemFromArray([10, 20, 25, 30])
    const c = rng.randomItemFromArray([8, 10, 15, 20])
    return { kind, a, b, c, d: 0, result: a * b * c, result2: round2((a * b * c) / 1000), label: 'Kiste' }
  }
  if (kind === 'packageSurface') {
    const a = rng.randomItemFromArray([20, 30, 40])
    const b = rng.randomItemFromArray([10, 15, 20])
    const c = rng.randomItemFromArray([8, 12, 16])
    return { kind, a, b, c, d: 0, result: 2 * (a * b + a * c + b * c), result2: 0, label: 'Paket' }
  }
  if (kind === 'fractionOfAmount') {
    const b = rng.randomItemFromArray([3, 4, 5, 6, 8])
    const a = rng.randomIntBetween(1, b - 1)
    const c = b * rng.randomItemFromArray([6, 8, 10, 12, 15])
    return { kind, a, b, c, d: 0, result: (c / b) * a, result2: 0, label: 'Gruppe' }
  }
  if (kind === 'fractionCompare') {
    const pairs = [
      [1, 2, 3, 5],
      [2, 3, 3, 4],
      [3, 8, 2, 5],
      [4, 6, 5, 8],
    ]
    const [a, b, c, d] = rng.randomItemFromArray(pairs)
    return { kind, a, b, c, d, result: a / b > c / d ? 1 : 2, result2: 0, label: 'Vergleich' }
  }
  if (kind === 'mixedFractionShare') {
    const options = [
      [1, 2, 1, 3],
      [1, 3, 1, 2],
      [1, 4, 1, 5],
      [2, 3, 2, 4],
      [2, 5, 1, 3],
      [3, 4, 1, 5],
      [3, 5, 3, 3],
    ]
    const [whole, b, a, bottles] = rng.randomItemFromArray(options)
    const improper = whole * b + a
    return { kind, a: whole, b, c: a, d: bottles, result: improper / bottles, result2: improper, label: 'Saft' }
  }
  if (kind === 'recipeScale') {
    const a = rng.randomItemFromArray([2, 3, 4])
    const b = rng.randomItemFromArray([150, 200, 250, 300])
    const c = rng.randomItemFromArray([5, 6, 8, 10])
    return { kind, a, b, c, d: 0, result: round2((b / a) * c), result2: 0, label: 'Rezept' }
  }
  if (kind === 'ratioParts') {
    const a = rng.randomItemFromArray([2, 3, 4])
    const b = rng.randomItemFromArray([1, 2, 3])
    const c = (a + b) * rng.randomItemFromArray([10, 12, 15, 20])
    return { kind, a, b, c, d: 0, result: (c / (a + b)) * a, result2: (c / (a + b)) * b, label: 'Mischung' }
  }
  if (kind === 'directRule') {
    const a = rng.randomItemFromArray([3, 4, 5, 6])
    const b = rng.randomItemFromArray([18, 24, 30, 36, 42])
    const c = rng.randomItemFromArray([7, 8, 9, 10, 12])
    return { kind, a, b, c, d: 0, result: round2((b / a) * c), result2: round2(b / a), label: 'Material' }
  }
  if (kind === 'inverseRule') {
    const a = rng.randomItemFromArray([3, 4, 5, 6])
    const b = rng.randomItemFromArray([6, 8, 10, 12])
    const c = rng.randomItemFromArray([2, 3, 4, 5, 8])
    return { kind, a, b, c, d: 0, result: round2((a * b) / c), result2: a * b, label: 'Arbeit' }
  }
  if (kind === 'discount') {
    const a = rng.randomItemFromArray([40, 60, 80, 120, 150, 200])
    const b = rng.randomItemFromArray([10, 15, 20, 25, 30])
    const result = round2(a * (1 - b / 100))
    return { kind, a, b, c: 0, d: 0, result, result2: round2(a - result), label: 'Rabatt' }
  }
  if (kind === 'increase') {
    const a = rng.randomItemFromArray([50, 80, 100, 120, 200, 250])
    const b = rng.randomItemFromArray([5, 10, 15, 20, 25])
    return { kind, a, b, c: 0, d: 0, result: round2(a * (1 + b / 100)), result2: round2(a * b / 100), label: 'Erhöhung' }
  }
  if (kind === 'percentRate') {
    const a = rng.randomItemFromArray([80, 100, 120, 160, 200])
    const b = rng.randomItemFromArray([10, 20, 25, 40, 50, 75])
    return { kind, a, b: round2((a * b) / 100), c: b, d: 0, result: b, result2: 0, label: 'Anteil' }
  }
  if (kind === 'baseValue') {
    const result = rng.randomItemFromArray([80, 100, 120, 160, 200, 240])
    const b = rng.randomItemFromArray([10, 20, 25, 40, 50, 75])
    return { kind, a: round2((result * b) / 100), b, c: 0, d: 0, result, result2: 0, label: 'Grundwert' }
  }
  if (kind === 'monthlyInterest') {
    const a = rng.randomItemFromArray([600, 900, 1200, 1500, 2000])
    const b = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const c = rng.randomItemFromArray([3, 4, 6, 9])
    return { kind, a, b, c, d: 0, result: round2((a * b * c) / 1200), result2: 0, label: 'Zins' }
  }
  if (kind === 'mean') {
    const a = rng.randomItemFromArray([2, 3, 4, 5])
    const b = rng.randomItemFromArray([6, 7, 8, 9])
    const c = rng.randomItemFromArray([10, 11, 12, 13])
    const d = rng.randomItemFromArray([14, 15, 16, 18])
    return { kind, a, b, c, d, result: round2((a + b + c + d) / 4), result2: 0, label: 'Daten' }
  }
  if (kind === 'range') {
    const a = rng.randomItemFromArray([4, 5, 6])
    const b = rng.randomItemFromArray([8, 9, 10])
    const c = rng.randomItemFromArray([12, 14, 16])
    const d = rng.randomItemFromArray([18, 20, 24])
    return { kind, a, b, c, d, result: d - a, result2: 0, label: 'Messwerte' }
  }
  if (kind === 'tableRead') {
    const a = rng.randomItemFromArray([12, 15, 18, 20])
    const b = rng.randomItemFromArray([8, 10, 14, 16])
    const c = rng.randomItemFromArray([5, 7, 9, 11])
    return { kind, a, b, c, d: 0, result: a + b + c, result2: Math.max(a, b, c), label: 'Tabelle' }
  }
  if (kind === 'mapScale') {
    const a = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const b = rng.randomItemFromArray([100, 200, 250, 500])
    return { kind, a, b, c: 0, d: 0, result: round2(a * b), result2: round2((a * b) / 100), label: 'Plan' }
  }
  if (kind === 'unitChain') {
    const a = rng.randomItemFromArray([1.2, 1.5, 2.4, 3.6, 4.8])
    const b = round2(a * 1000)
    return { kind, a, b, c: 0, d: 0, result: b, result2: 0, label: 'Einheiten' }
  }
  if (kind === 'circleDiameter') {
    const a = rng.randomItemFromArray([4, 6, 8, 10, 12])
    return { kind, a, b: 0, c: 0, d: 0, result: round2(Math.PI * a), result2: round2(a / 2), label: 'Kreis' }
  }
  if (kind === 'examBasics') {
    const a = rng.randomItemFromArray([18, 24, 36, 48])
    const b = rng.randomItemFromArray([3, 4, 6, 8])
    const c = rng.randomItemFromArray([12, 15, 20, 25])
    return { kind, a, b, c, d: 0, result: a / b + c, result2: 0, label: 'Prüfung' }
  }
  const options = [
    [40, 20, 4],
    [48, 25, 3],
    [60, 30, 3],
    [80, 25, 4],
    [100, 20, 5],
    [120, 15, 3],
  ]
  const [a, b, c] = rng.randomItemFromArray(options)
  const result = (a * b) / 100
  return { kind, a, b, c, d: 0, result, result2: result / c, label: 'Kontext' }
}

function timeText(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}:${String(m).padStart(2, '0')} Uhr`
}

function taskFor(data: DATA) {
  switch (data.kind) {
    case 'roundMoney':
      return <>Ein Einkauf kostet <b>{pp(data.a)} €</b>. Runde den Betrag auf ganze €.</>
    case 'shoppingChange':
      return <>Ein Einkauf kostet <b>{pp(data.a)} €</b>. Bezahlt wird mit <b>{pp(data.b)} €</b>. Berechne das Rückgeld.</>
    case 'timePlan':
      return <>Ein Termin beginnt um <b>{timeText(data.a)}</b> und dauert <b>{data.b} Minuten</b>. Wann endet der Termin?</>
    case 'lengthFence':
      return <>Ein rechteckiger Garten ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} /> lang und <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> breit. Berechne Umfang und Fläche.</>
    case 'paintArea':
      return <>Eine Wand ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} /> breit und <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> hoch. Pro Quadratmeter werden <InlineMath math={`${pp(data.c)}\\,€`} /> berechnet. Berechne Fläche und Kosten.</>
    case 'tilesArea':
      return <>Ein Boden ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} /> lang und <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> breit. Eine Fliese bedeckt <InlineMath math={`${pp(data.c)}\\,\\mathrm{m^2}`} />. Wie viele Fliesen werden benötigt?</>
    case 'boxVolume':
      return <>Eine Kiste ist <InlineMath math={`${pp(data.a)}\\,\\mathrm{cm}`} /> lang, <InlineMath math={`${pp(data.b)}\\,\\mathrm{cm}`} /> breit und <InlineMath math={`${pp(data.c)}\\,\\mathrm{cm}`} /> hoch. Berechne das Volumen in <InlineMath math={`\\mathrm{cm^3}`} /> und Litern.</>
    case 'packageSurface':
      return <>Ein Paket hat die Maße <InlineMath math={`${pp(data.a)}\\,\\mathrm{cm}`} />, <InlineMath math={`${pp(data.b)}\\,\\mathrm{cm}`} /> und <InlineMath math={`${pp(data.c)}\\,\\mathrm{cm}`} />. Berechne die Oberfläche.</>
    case 'fractionOfAmount':
      return <>Von <b>{data.c}</b> Personen sind <InlineMath math={`\\frac{${data.a}}{${data.b}}`} /> anwesend. Wie viele Personen sind anwesend?</>
    case 'fractionCompare':
      return <>Vergleiche die Brüche <InlineMath math={`\\frac{${data.a}}{${data.b}}`} /> und <InlineMath math={`\\frac{${data.c}}{${data.d}}`} />. Welcher Bruch ist größer?</>
    case 'mixedFractionShare':
      return <>Es gibt <InlineMath math={`${data.a}\\frac{${data.c}}{${data.b}}`} /> Liter Saft. Der Saft wird gleichmäßig auf <b>{data.d}</b> Flaschen verteilt. Wie viel Liter kommen in eine Flasche?</>
    case 'recipeScale':
      return <>Für <b>{data.a}</b> Personen braucht man <b>{data.b} g</b> Reis. Wie viel Reis braucht man für <b>{data.c}</b> Personen?</>
    case 'ratioParts':
      return <>Eine Mischung besteht aus Saft und Wasser im Verhältnis <b>{data.a}:{data.b}</b>. Insgesamt sind es <b>{data.c} Liter</b>. Berechne beide Anteile.</>
    case 'directRule':
      return <>Für <b>{data.a}</b> gleiche Teile braucht man <b>{data.b} Schrauben</b>. Wie viele Schrauben braucht man für <b>{data.c}</b> Teile?</>
    case 'inverseRule':
      return <> <b>{data.a}</b> Personen brauchen für eine Arbeit <b>{data.b}</b> Stunden. Wie lange brauchen <b>{data.c}</b> Personen bei gleicher Arbeitsleistung?</>
    case 'discount':
      return <>Ein Artikel kostet <b>{pp(data.a)} €</b>. Der Preis wird um <b>{data.b} %</b> reduziert. Berechne Rabatt und neuen Preis.</>
    case 'increase':
      return <>Ein Betrag von <b>{pp(data.a)} €</b> wird um <b>{data.b} %</b> erhöht. Berechne die Erhöhung und den neuen Betrag.</>
    case 'percentRate':
      return <>Von <b>{data.a}</b> Personen haben <b>{data.b}</b> zugestimmt. Wie viel Prozent sind das?</>
    case 'baseValue':
      return <> <b>{pp(data.a)} €</b> sind <b>{data.b} %</b> des ursprünglichen Preises. Berechne den ursprünglichen Preis.</>
    case 'monthlyInterest':
      return <>Ein Kapital von <b>{pp(data.a)} €</b> wird mit <b>{data.b} %</b> pro Jahr verzinst. Berechne die Zinsen für <b>{data.c}</b> Monate.</>
    case 'mean':
      return <>Die Werte lauten: <b>{data.a}, {data.b}, {data.c}, {data.d}</b>. Berechne den Mittelwert.</>
    case 'range':
      return <>Die Messwerte lauten: <b>{data.a}, {data.b}, {data.c}, {data.d}</b>. Berechne die Spannweite.</>
    case 'tableRead':
      return <>In einer Tabelle stehen: Montag <b>{data.a}</b>, Dienstag <b>{data.b}</b>, Mittwoch <b>{data.c}</b>. Berechne die Summe und den größten Wert.</>
    case 'mapScale':
      return <>Auf einem Plan entsprechen <b>1 cm</b> in Wirklichkeit <b>{data.b} cm</b>. Eine Strecke ist auf dem Plan <b>{data.a} cm</b> lang. Berechne die echte Länge in cm und m.</>
    case 'unitChain':
      return <>Wandle <InlineMath math={`${pp(data.a)}\\,\\mathrm l`} /> in Milliliter um.</>
    case 'circleDiameter':
      return <>Ein Kreis hat den Durchmesser <InlineMath math={`d=${pp(data.a)}\\,\\mathrm{cm}`} />. Berechne Radius und Umfang.</>
    case 'examBasics':
      return <>Berechne: <InlineMath math={`${data.a}:${data.b}+${data.c}`} /></>
    case 'examContext':
      return <>In einer Klasse mit <b>{data.a}</b> Schülerinnen und Schülern nehmen <b>{data.b} %</b> an einer AG teil. Diese werden gleichmäßig auf <b>{data.c}</b> Gruppen verteilt. Wie viele sind in einer Gruppe?</>
  }
}

function solutionFor(data: DATA) {
  switch (data.kind) {
    case 'roundMoney':
      return <>Gerundet auf ganze € sind es <b>{pp(data.result)} €</b>.</>
    case 'shoppingChange':
      return <><InlineMath math={`${pp(data.b)}-${pp(data.a)}=${pp(data.result)}`} /><p>Das Rückgeld beträgt <b>{pp(data.result)} €</b>.</p></>
    case 'timePlan':
      return <>Ende: <b>{timeText(data.a)} + {data.b} Minuten = {timeText(data.result)}</b>.</>
    case 'lengthFence':
      return <><InlineMath math={`U=2\\cdot(${pp(data.a)}+${pp(data.b)})=${pp(data.result)}\\,\\mathrm m`} /><br /><InlineMath math={`A=${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result2)}\\,\\mathrm{m^2}`} /></>
    case 'paintArea':
      return <><InlineMath math={`A=${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result)}\\,\\mathrm{m^2}`} /><br /><InlineMath math={`K=${pp(data.result)}\\cdot${pp(data.c)}=${pp(data.result2)}\\,€`} /></>
    case 'tilesArea':
      return <><InlineMath math={`A=${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result)}\\,\\mathrm{m^2}`} /><br /><InlineMath math={`${pp(data.result)}:${pp(data.c)}=${pp(data.result2)}`} /><p>Es werden <b>{pp(data.result2)}</b> Fliesen benötigt.</p></>
    case 'boxVolume':
      return <><InlineMath math={`V=${pp(data.a)}\\cdot${pp(data.b)}\\cdot${pp(data.c)}=${pp(data.result)}\\,\\mathrm{cm^3}`} /><br /><InlineMath math={`${pp(data.result)}\\,\\mathrm{cm^3}=${pp(data.result2)}\\,\\mathrm l`} /></>
    case 'packageSurface':
      return <InlineMath math={`O=2\\cdot(${pp(data.a)}\\cdot${pp(data.b)}+${pp(data.a)}\\cdot${pp(data.c)}+${pp(data.b)}\\cdot${pp(data.c)})=${pp(data.result)}\\,\\mathrm{cm^2}`} />
    case 'fractionOfAmount':
      return <InlineMath math={`${data.c}: ${data.b}\\cdot ${data.a}=${pp(data.result)}`} />
    case 'fractionCompare':
      return <><InlineMath math={`\\frac{${data.a}}{${data.b}}${data.result === 1 ? '>' : '<'}\\frac{${data.c}}{${data.d}}`} /><p>Der {data.result === 1 ? 'erste' : 'zweite'} Bruch ist größer.</p></>
    case 'mixedFractionShare':
      return <><InlineMath math={`${data.a}\\frac{${data.c}}{${data.b}}=\\frac{${data.result2}}{${data.b}}`} /><br /><InlineMath math={`\\frac{${data.result2}}{${data.b}}:${data.d}=\\frac{${data.result}}{${data.b}}`} /><p>In eine Flasche kommen <InlineMath math={`\\frac{${data.result}}{${data.b}}`} /> Liter.</p></>
    case 'recipeScale':
      return <InlineMath math={`${data.b}:${data.a}\\cdot${data.c}=${pp(data.result)}\\,\\mathrm g`} />
    case 'ratioParts':
      return <><InlineMath math={`${data.a}+${data.b}=${data.a + data.b}`} /><br /><InlineMath math={`Saft=${pp(data.result)}\\,\\mathrm l,\\quad Wasser=${pp(data.result2)}\\,\\mathrm l`} /></>
    case 'directRule':
      return <><InlineMath math={`${data.b}:${data.a}=${pp(data.result2)}`} /><br /><InlineMath math={`${pp(data.result2)}\\cdot${data.c}=${pp(data.result)}`} /></>
    case 'inverseRule':
      return <><InlineMath math={`${data.a}\\cdot${data.b}=${pp(data.result2)}`} /><br /><InlineMath math={`${pp(data.result2)}:${data.c}=${pp(data.result)}`} /></>
    case 'discount':
      return <><InlineMath math={`Rabatt=${pp(data.a)}\\cdot\\frac{${data.b}}{100}=${pp(data.result2)}\\,€`} /><br /><InlineMath math={`neu=${pp(data.a)}-${pp(data.result2)}=${pp(data.result)}\\,€`} /></>
    case 'increase':
      return <><InlineMath math={`Erhöhung=${pp(data.a)}\\cdot\\frac{${data.b}}{100}=${pp(data.result2)}\\,€`} /><br /><InlineMath math={`neu=${pp(data.a)}+${pp(data.result2)}=${pp(data.result)}\\,€`} /></>
    case 'percentRate':
      return <InlineMath math={`p=\\frac{${pp(data.b)}}{${pp(data.a)}}\\cdot100\\,\\%=${pp(data.result)}\\,\\%`} />
    case 'baseValue':
      return <InlineMath math={`G=${pp(data.a)}:${data.b}\\cdot100=${pp(data.result)}\\,€`} />
    case 'monthlyInterest':
      return <InlineMath math={`Z=\\frac{${pp(data.a)}\\cdot${data.b}\\cdot${data.c}}{100\\cdot12}=${pp(data.result)}\\,€`} />
    case 'mean':
      return <InlineMath math={`\\bar x=\\frac{${data.a}+${data.b}+${data.c}+${data.d}}{4}=${pp(data.result)}`} />
    case 'range':
      return <InlineMath math={`Spannweite=${data.d}-${data.a}=${data.result}`} />
    case 'tableRead':
      return <><InlineMath math={`Summe=${data.a}+${data.b}+${data.c}=${data.result}`} /><p>Der größte Wert ist <b>{data.result2}</b>.</p></>
    case 'mapScale':
      return <><InlineMath math={`${data.a}\\cdot${data.b}=${pp(data.result)}\\,\\mathrm{cm}`} /><br /><InlineMath math={`${pp(data.result)}\\,\\mathrm{cm}=${pp(data.result2)}\\,\\mathrm m`} /></>
    case 'unitChain':
      return <InlineMath math={`${pp(data.a)}\\,\\mathrm l=${pp(data.result)}\\,\\mathrm{ml}`} />
    case 'circleDiameter':
      return <><InlineMath math={`r=\\frac d2=${pp(data.result2)}\\,\\mathrm{cm}`} /><br /><InlineMath math={`U=\\pi\\cdot d\\approx${pp(data.result)}\\,\\mathrm{cm}`} /></>
    case 'examBasics':
      return <InlineMath math={`${data.a}:${data.b}+${data.c}=${pp(data.a / data.b)}+${data.c}=${pp(data.result)}`} />
    case 'examContext':
      return <><InlineMath math={`${data.a}\\cdot\\frac{${data.b}}{100}=${pp(data.result)}`} /><br /><InlineMath math={`${pp(data.result)}:${data.c}=${pp(data.result2)}`} /><p>In einer Gruppe sind <b>{pp(data.result2)}</b> Personen.</p></>
  }
}

function makeExercise(title: string, source: string, kind: Kind): Exercise<DATA> {
  const originalData = makeData(kind, {
    randomItemFromArray<T>(arr: T[]) {
      return arr[0]
    },
    randomIntBetween(a: number) {
      return a
    },
    randomBoolean() {
      return true
    },
  })

  return {
    title,
    source,
    useCalculator: true,
    duration: 42,
    points: 42,
    generator(rng) {
      return makeData(kind, rng)
    },
    originalData,
    constraint({ data }) {
      return data.kind === kind && Number.isFinite(data.result) && (data.kind !== 'mixedFractionShare' || data.result2 % data.d === 0)
    },
    task({ data }) {
      return (
        <>
          <p>{taskFor(data)}</p>
        </>
      )
    },
    solution({ data }) {
      return (
        <>
          {solutionFor(data)}
        </>
      )
    },
  }
}

export const exercise9608 = makeExercise('Beträge sinnvoll runden', 'Grundlagen', 'roundMoney')
export const exercise9609 = makeExercise('Rückgeld an der Kasse', 'Grundlagen', 'shoppingChange')
export const exercise9610 = makeExercise('Endzeiten berechnen', 'Einheiten', 'timePlan')
export const exercise9611 = makeExercise('Rechteck im Alltag', 'Figuren und Flächen', 'lengthFence')
export const exercise9612 = makeExercise('Wandfläche und Kosten', 'Figuren und Flächen', 'paintArea')
export const exercise9613 = makeExercise('Fliesen für einen Boden', 'Figuren und Flächen', 'tilesArea')
export const exercise9614 = makeExercise('Volumen einer Kiste', 'Körper und Volumen', 'boxVolume')
export const exercise9615 = makeExercise('Oberfläche eines Pakets', 'Körper und Volumen', 'packageSurface')
export const exercise9616 = makeExercise('Bruchteil von einer Menge', 'Bruchrechnen', 'fractionOfAmount')
export const exercise9617 = makeExercise('Brüche im Vergleich', 'Bruchrechnen', 'fractionCompare')
export const exercise9618 = makeExercise('Gemischten Bruch aufteilen', 'Bruchrechnen', 'mixedFractionShare')
export const exercise9619 = makeExercise('Rezept umrechnen', 'Dreisatz', 'recipeScale')
export const exercise9620 = makeExercise('Mischung im Verhältnis', 'Dreisatz', 'ratioParts')
export const exercise9621 = makeExercise('Material proportional berechnen', 'Dreisatz', 'directRule')
export const exercise9622 = makeExercise('Arbeitszeit umgekehrt proportional', 'Dreisatz', 'inverseRule')
export const exercise9623 = makeExercise('Rabatt berechnen', 'Prozentrechnung', 'discount')
export const exercise9624 = makeExercise('Preissteigerung berechnen', 'Prozentrechnung', 'increase')
export const exercise9625 = makeExercise('Prozentsatz aus Anteil', 'Prozentrechnung', 'percentRate')
export const exercise9626 = makeExercise('Ursprünglichen Preis berechnen', 'Prozentrechnung', 'baseValue')
export const exercise9627 = makeExercise('Zinsen für einige Monate', 'Prozentrechnung', 'monthlyInterest')
export const exercise9628 = makeExercise('Mittelwert aus vier Werten', 'Diagramme und Daten', 'mean')
export const exercise9629 = makeExercise('Spannweite bestimmen', 'Diagramme und Daten', 'range')
export const exercise9630 = makeExercise('Tabelle auswerten', 'Diagramme und Daten', 'tableRead')
export const exercise9631 = makeExercise('Maßstab im Plan', 'Einheiten', 'mapScale')
export const exercise9632 = makeExercise('Liter in Milliliter', 'Einheiten', 'unitChain')
export const exercise9633 = makeExercise('Durchmesser, Radius und Umfang', 'Figuren und Flächen', 'circleDiameter')
export const exercise9634 = makeExercise('Rechenregeln in Prüfungsform', 'Grundlagen', 'examBasics')
export const exercise9635 = makeExercise('Prozent und Aufteilen verknüpfen', 'Prüfungsvorbereitung', 'examContext')
