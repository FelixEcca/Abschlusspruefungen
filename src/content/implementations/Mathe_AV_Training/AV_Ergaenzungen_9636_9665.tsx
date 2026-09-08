import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind =
  | 'fairDivision'
  | 'estimateProduct'
  | 'bracketTickets'
  | 'decimalLengths'
  | 'decimalPrice'
  | 'timeOverMidnight'
  | 'mixedLength'
  | 'areaUnits'
  | 'compositeArea'
  | 'prismVolume'
  | 'litersFromCuboid'
  | 'reduceContext'
  | 'addSameDenominator'
  | 'fractionMarked'
  | 'unitPrice'
  | 'inverseMachines'
  | 'ratioDistribution'
  | 'percentValueContext'
  | 'offerCompare'
  | 'percentForms'
  | 'pieAngle'
  | 'barCompare'
  | 'textTable'
  | 'examAreaPercent'
  | 'examCashDiscount'
  | 'examRecipe'
  | 'examPackage'
  | 'examTravel'
  | 'examDataPercent'
  | 'examNumberMix'

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

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function clock(minutes: number) {
  const dayMinutes = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(dayMinutes / 60)
  const m = dayMinutes % 60
  return `${h}:${String(m).padStart(2, '0')} Uhr`
}

function makeData(kind: Kind, rng: any): DATA {
  if (kind === 'fairDivision') {
    const b = rng.randomItemFromArray([3, 4, 5, 6, 8])
    const result = rng.randomItemFromArray([6, 7, 8, 9, 12])
    return { kind, a: b * result, b, c: 0, d: 0, result, result2: 0, label: 'Pakete' }
  }
  if (kind === 'estimateProduct') {
    const a = rng.randomItemFromArray([28, 39, 51, 62, 74])
    const b = rng.randomItemFromArray([7, 8, 9, 12])
    const rounded = Math.round(a / 10) * 10
    return { kind, a, b, c: rounded, d: 0, result: rounded * b, result2: a * b, label: 'Überschlag' }
  }
  if (kind === 'bracketTickets') {
    const a = rng.randomItemFromArray([2, 3, 4])
    const b = rng.randomItemFromArray([6, 8, 10])
    const c = rng.randomItemFromArray([3, 4, 5])
    const d = rng.randomItemFromArray([4, 5, 6])
    return { kind, a, b, c, d, result: a * b + c * d, result2: 0, label: 'Kino' }
  }
  if (kind === 'decimalLengths') {
    const a = rng.randomItemFromArray([1.25, 1.8, 2.35, 2.6])
    const b = rng.randomItemFromArray([0.75, 1.15, 1.4, 2.05])
    const c = rng.randomItemFromArray([0.3, 0.45, 0.6, 0.9])
    return { kind, a, b, c, d: 0, result: round2(a + b - c), result2: round2(a + b), label: 'Leisten' }
  }
  if (kind === 'decimalPrice') {
    const a = rng.randomItemFromArray([1.5, 2.5, 3.2, 4.5])
    const b = rng.randomItemFromArray([1.8, 2.4, 3.6, 4.2])
    return { kind, a, b, c: 0, d: 0, result: round2(a * b), result2: 0, label: 'Obst' }
  }
  if (kind === 'timeOverMidnight') {
    const a = rng.randomItemFromArray([22 * 60 + 15, 22 * 60 + 40, 23 * 60 + 10, 23 * 60 + 35])
    const b = rng.randomItemFromArray([55, 80, 95, 120])
    return { kind, a, b, c: 0, d: 0, result: a + b, result2: 0, label: 'Fahrt' }
  }
  if (kind === 'mixedLength') {
    const a = rng.randomItemFromArray([2, 3, 4, 5])
    const b = rng.randomItemFromArray([35, 60, 75, 90])
    return { kind, a, b, c: 0, d: 0, result: a * 100 + b, result2: round2(a + b / 100), label: 'Länge' }
  }
  if (kind === 'areaUnits') {
    const a = rng.randomItemFromArray([12000, 25000, 36000, 48000, 75000])
    return { kind, a, b: 0, c: 0, d: 0, result: round2(a / 10000), result2: 0, label: 'Fläche' }
  }
  if (kind === 'compositeArea') {
    const a = rng.randomItemFromArray([8, 10, 12])
    const b = rng.randomItemFromArray([5, 6, 7])
    const c = rng.randomItemFromArray([2, 3, 4])
    const d = rng.randomItemFromArray([1, 2, 3])
    return { kind, a, b, c, d, result: a * b - c * d, result2: a * b, label: 'Werkstück' }
  }
  if (kind === 'prismVolume') {
    const a = rng.randomItemFromArray([12, 18, 24, 30])
    const b = rng.randomItemFromArray([5, 8, 10, 12])
    return { kind, a, b, c: 0, d: 0, result: a * b, result2: 0, label: 'Prisma' }
  }
  if (kind === 'litersFromCuboid') {
    const a = rng.randomItemFromArray([20, 25, 30, 40])
    const b = rng.randomItemFromArray([10, 20, 25])
    const c = rng.randomItemFromArray([10, 12, 15, 20])
    const volume = a * b * c
    return { kind, a, b, c, d: 0, result: volume, result2: round2(volume / 1000), label: 'Behälter' }
  }
  if (kind === 'reduceContext') {
    const options = [
      [6, 18],
      [8, 20],
      [12, 30],
      [15, 35],
      [18, 42],
    ]
    const [a, b] = rng.randomItemFromArray(options)
    const g = gcd(a, b)
    return { kind, a, b, c: a / g, d: b / g, result: 0, result2: 0, label: 'Kürzen' }
  }
  if (kind === 'addSameDenominator') {
    const b = rng.randomItemFromArray([6, 8, 10, 12])
    const a = rng.randomItemFromArray([1, 2, 3])
    const c = rng.randomItemFromArray([2, 3, 4])
    return { kind, a, b, c, d: 0, result: a + c, result2: b, label: 'Bruchsumme' }
  }
  if (kind === 'fractionMarked') {
    const b = rng.randomItemFromArray([8, 10, 12, 15, 20])
    const a = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const g = gcd(a, b)
    return { kind, a, b, c: a / g, d: b / g, result: 0, result2: 0, label: 'Anteil' }
  }
  if (kind === 'unitPrice') {
    const a = rng.randomItemFromArray([2, 3, 4, 5])
    const b = rng.randomItemFromArray([6, 9, 12, 15, 18])
    return { kind, a, b, c: 0, d: 0, result: round2(b / a), result2: 0, label: 'Preis' }
  }
  if (kind === 'inverseMachines') {
    const a = rng.randomItemFromArray([2, 3, 4])
    const b = rng.randomItemFromArray([6, 8, 12])
    const c = rng.randomItemFromArray([4, 6, 8])
    return { kind, a, b, c, d: 0, result: round2((a * b) / c), result2: a * b, label: 'Maschinen' }
  }
  if (kind === 'ratioDistribution') {
    const a = rng.randomItemFromArray([1, 2, 3])
    const b = rng.randomItemFromArray([2, 3, 4])
    const c = (a + b) * rng.randomItemFromArray([6, 8, 10])
    return { kind, a, b, c, d: 0, result: (c / (a + b)) * a, result2: (c / (a + b)) * b, label: 'Aufteilung' }
  }
  if (kind === 'percentValueContext') {
    const a = rng.randomItemFromArray([60, 80, 120, 160, 200])
    const b = rng.randomItemFromArray([10, 15, 20, 25, 40])
    return { kind, a, b, c: 0, d: 0, result: round2((a * b) / 100), result2: 0, label: 'Prozentwert' }
  }
  if (kind === 'offerCompare') {
    const options = [
      [80, 20, 75, 10],
      [120, 25, 100, 5],
      [60, 10, 55, 5],
      [150, 30, 120, 10],
    ]
    const [a, b, c, d] = rng.randomItemFromArray(options)
    return { kind, a, b, c, d, result: round2(a * (1 - b / 100)), result2: round2(c * (1 - d / 100)), label: 'Angebot' }
  }
  if (kind === 'percentForms') {
    const options = [
      [25, 1, 4],
      [50, 1, 2],
      [75, 3, 4],
      [20, 1, 5],
      [10, 1, 10],
    ]
    const [a, b, c] = rng.randomItemFromArray(options)
    return { kind, a, b, c, d: 0, result: a / 100, result2: 0, label: 'Umwandlung' }
  }
  if (kind === 'pieAngle') {
    const a = rng.randomItemFromArray([10, 20, 25, 30, 40])
    return { kind, a, b: 0, c: 0, d: 0, result: round2(360 * a / 100), result2: 0, label: 'Kreisdiagramm' }
  }
  if (kind === 'barCompare') {
    const a = rng.randomItemFromArray([12, 15, 18, 22])
    const b = rng.randomItemFromArray([20, 24, 28, 30])
    const c = rng.randomItemFromArray([8, 10, 14, 16])
    return { kind, a, b, c, d: 0, result: b - c, result2: a + b + c, label: 'Diagramm' }
  }
  if (kind === 'textTable') {
    const a = rng.randomItemFromArray([9, 12, 15])
    const b = rng.randomItemFromArray([7, 10, 13])
    const c = rng.randomItemFromArray([4, 6, 8])
    return { kind, a, b, c, d: 0, result: a + b + c, result2: Math.max(a, b, c), label: 'Tabelle' }
  }
  if (kind === 'examAreaPercent') {
    const a = rng.randomItemFromArray([8, 10, 12])
    const b = rng.randomItemFromArray([5, 6, 8])
    const c = rng.randomItemFromArray([10, 20, 25])
    const area = a * b
    return { kind, a, b, c, d: 0, result: area, result2: round2(area * c / 100), label: 'Prüfung' }
  }
  if (kind === 'examCashDiscount') {
    const a = rng.randomItemFromArray([45, 60, 80, 120])
    const b = rng.randomItemFromArray([10, 15, 20, 25])
    const c = rng.randomItemFromArray([50, 100, 150])
    const newPrice = round2(a * (1 - b / 100))
    return { kind, a, b, c, d: 0, result: newPrice, result2: round2(c - newPrice), label: 'Prüfung' }
  }
  if (kind === 'examRecipe') {
    const a = rng.randomItemFromArray([2, 3, 4])
    const b = rng.randomItemFromArray([250, 300, 400])
    const c = rng.randomItemFromArray([6, 8, 10])
    const d = rng.randomItemFromArray([2, 4, 5])
    return { kind, a, b, c, d, result: round2((b / a) * c), result2: round2(((b / a) * c) / d), label: 'Prüfung' }
  }
  if (kind === 'examPackage') {
    const a = rng.randomItemFromArray([30, 40, 50])
    const b = rng.randomItemFromArray([20, 25, 30])
    const c = rng.randomItemFromArray([10, 15, 20])
    const d = rng.randomItemFromArray([4, 5, 8])
    const volume = a * b * c
    return { kind, a, b, c, d, result: volume, result2: round2(volume * d / 1000), label: 'Prüfung' }
  }
  if (kind === 'examTravel') {
    const a = rng.randomItemFromArray([7 * 60 + 20, 8 * 60 + 45, 13 * 60 + 10])
    const b = rng.randomItemFromArray([25, 40, 55])
    const c = rng.randomItemFromArray([15, 20, 30])
    return { kind, a, b, c, d: 0, result: a + b + c, result2: 0, label: 'Prüfung' }
  }
  if (kind === 'examDataPercent') {
    const a = rng.randomItemFromArray([20, 24, 30, 40])
    const b = rng.randomItemFromArray([5, 6, 8, 10])
    return { kind, a, b, c: 0, d: 0, result: a - b, result2: round2((b / a) * 100), label: 'Prüfung' }
  }
  const a = rng.randomItemFromArray([36, 48, 60, 72])
  const b = rng.randomItemFromArray([4, 6, 8])
  const c = rng.randomItemFromArray([12, 18, 24])
  return { kind, a, b, c, d: 0, result: a / b + c, result2: (a / b + c) * 2, label: 'Prüfung' }
}

function taskFor(data: DATA) {
  switch (data.kind) {
    case 'fairDivision':
      return <>In einer Werkstatt werden <b>{data.a}</b> Schrauben gleichmäßig auf <b>{data.b}</b> Kisten verteilt. Wie viele Schrauben kommen in eine Kiste?</>
    case 'estimateProduct':
      return <>Schätze zuerst: <b>{data.a}</b> Teile kosten jeweils <b>{data.b} €</b>. Runde die Anzahl auf Zehner und berechne den Überschlag.</>
    case 'bracketTickets':
      return <>Für einen Ausflug werden <b>{data.a}</b> Erwachsenenkarten zu <b>{data.b} €</b> und <b>{data.c}</b> Schülerkarten zu <b>{data.d} €</b> gekauft. Berechne die Gesamtkosten.</>
    case 'decimalLengths':
      return <>Eine Leiste ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} /> lang. Eine zweite Leiste ist <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> lang. Davon werden <InlineMath math={`${pp(data.c)}\\,\\mathrm m`} /> abgesägt. Wie viel bleibt übrig?</>
    case 'decimalPrice':
      return <>Ein Kilogramm Obst kostet <b>{pp(data.b)} €</b>. Gekauft werden <b>{pp(data.a)} kg</b>. Berechne den Preis.</>
    case 'timeOverMidnight':
      return <>Eine Fahrt beginnt um <b>{clock(data.a)}</b> und dauert <b>{data.b} Minuten</b>. Wann endet die Fahrt?</>
    case 'mixedLength':
      return <>Wandle <b>{data.a} m {data.b} cm</b> in Zentimeter und in Meter um.</>
    case 'areaUnits':
      return <>Wandle <InlineMath math={`${data.a}\\,\\mathrm{cm^2}`} /> in <InlineMath math={`\\mathrm{m^2}`} /> um.</>
    case 'compositeArea':
      return <>Aus einem Rechteck <InlineMath math={`${data.a}\\,\\mathrm m\\times${data.b}\\,\\mathrm m`} /> wird ein kleineres Rechteck <InlineMath math={`${data.c}\\,\\mathrm m\\times${data.d}\\,\\mathrm m`} /> herausgeschnitten. Berechne die Restfläche.</>
    case 'prismVolume':
      return <>Ein Prisma hat eine Grundfläche von <InlineMath math={`${data.a}\\,\\mathrm{cm^2}`} /> und eine Höhe von <InlineMath math={`${data.b}\\,\\mathrm{cm}`} />. Berechne das Volumen.</>
    case 'litersFromCuboid':
      return <>Ein Behälter ist <b>{data.a} cm</b> lang, <b>{data.b} cm</b> breit und <b>{data.c} cm</b> hoch. Berechne das Volumen in <InlineMath math={`\\mathrm{cm^3}`} /> und Litern.</>
    case 'reduceContext':
      return <>In einer Klasse haben <b>{data.a}</b> von <b>{data.b}</b> Personen Sportschuhe dabei. Gib den Anteil als gekürzten Bruch an.</>
    case 'addSameDenominator':
      return <>Addiere die Brüche <InlineMath math={`\\frac{${data.a}}{${data.b}}+\\frac{${data.c}}{${data.b}}`} />.</>
    case 'fractionMarked':
      return <>Von <b>{data.b}</b> Feldern sind <b>{data.a}</b> markiert. Gib den Anteil als Bruch an und kürze, wenn möglich.</>
    case 'unitPrice':
      return <> <b>{data.a} kg</b> Äpfel kosten <b>{pp(data.b)} €</b>. Berechne den Preis für <b>1 kg</b>.</>
    case 'inverseMachines':
      return <> <b>{data.a}</b> gleiche Maschinen brauchen <b>{data.b}</b> Stunden. Wie lange brauchen <b>{data.c}</b> Maschinen?</>
    case 'ratioDistribution':
      return <>Eine Summe von <b>{data.c} €</b> wird im Verhältnis <b>{data.a}:{data.b}</b> aufgeteilt. Berechne beide Beträge.</>
    case 'percentValueContext':
      return <>In einem Lager sind <b>{data.a}</b> Teile. Davon sind <b>{data.b} %</b> beschädigt. Wie viele Teile sind beschädigt?</>
    case 'offerCompare':
      return <>Vergleiche zwei Angebote: A kostet <b>{data.a} €</b> mit <b>{data.b} %</b> Rabatt. B kostet <b>{data.c} €</b> mit <b>{data.d} %</b> Rabatt. Welches Angebot ist günstiger?</>
    case 'percentForms':
      return <>Wandle <b>{data.a} %</b> in eine Dezimalzahl und in einen Bruch um.</>
    case 'pieAngle':
      return <>In einem Kreisdiagramm entspricht ein Anteil von <b>{data.a} %</b> einem Winkel. Berechne den Winkel.</>
    case 'barCompare':
      return <>In einem Säulendiagramm stehen die Werte <b>{data.a}</b>, <b>{data.b}</b> und <b>{data.c}</b>. Berechne den Unterschied zwischen größtem und kleinstem Wert sowie die Summe.</>
    case 'textTable':
      return <>Aus einem Text: Es melden sich <b>{data.a}</b> Personen für Fußball, <b>{data.b}</b> für Musik und <b>{data.c}</b> für Technik. Berechne die Gesamtzahl und die größte Gruppe.</>
    case 'examAreaPercent':
      return <>Ein rechteckiger Raum ist <b>{data.a} m</b> lang und <b>{data.b} m</b> breit. <b>{data.c} %</b> der Fläche sollen frei bleiben. Berechne Gesamtfläche und freie Fläche.</>
    case 'examCashDiscount':
      return <>Ein Werkzeug kostet <b>{data.a} €</b>. Es gibt <b>{data.b} %</b> Rabatt. Bezahlt wird mit <b>{data.c} €</b>. Berechne den neuen Preis und das Rückgeld.</>
    case 'examRecipe':
      return <>Für <b>{data.a}</b> Personen werden <b>{data.b} g</b> Nudeln benötigt. Berechne die Menge für <b>{data.c}</b> Personen und teile sie anschließend gleichmäßig auf <b>{data.d}</b> Portionen auf.</>
    case 'examPackage':
      return <>Ein Paket hat die Maße <b>{data.a} cm</b>, <b>{data.b} cm</b> und <b>{data.c} cm</b>. Es werden <b>{data.d}</b> Pakete gepackt. Berechne das Gesamtvolumen in Litern.</>
    case 'examTravel':
      return <>Eine Gruppe startet um <b>{clock(data.a)}</b>. Der Fußweg dauert <b>{data.b} Minuten</b>, danach wartet die Gruppe <b>{data.c} Minuten</b>. Wann geht es weiter?</>
    case 'examDataPercent':
      return <>Von <b>{data.a}</b> abgegebenen Arbeiten sind <b>{data.b}</b> noch fehlerhaft. Berechne die Anzahl der fehlerfreien Arbeiten und den Prozentanteil der fehlerhaften Arbeiten.</>
    case 'examNumberMix':
      return <>Berechne zuerst <InlineMath math={`${data.a}:${data.b}+${data.c}`} /> und verdopple anschließend das Ergebnis.</>
  }
}

function solutionFor(data: DATA) {
  switch (data.kind) {
    case 'fairDivision':
      return <InlineMath math={`${data.a}:${data.b}=${data.result}`} />
    case 'estimateProduct':
      return <><InlineMath math={`${data.a}\\approx${data.c}`} /><br /><InlineMath math={`${data.c}\\cdot${data.b}=${data.result}\\,€`} /></>
    case 'bracketTickets':
      return <InlineMath math={`${data.a}\\cdot${data.b}+${data.c}\\cdot${data.d}=${data.result}\\,€`} />
    case 'decimalLengths':
      return <><InlineMath math={`${pp(data.a)}+${pp(data.b)}=${pp(data.result2)}`} /><br /><InlineMath math={`${pp(data.result2)}-${pp(data.c)}=${pp(data.result)}\\,\\mathrm m`} /></>
    case 'decimalPrice':
      return <InlineMath math={`${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result)}\\,€`} />
    case 'timeOverMidnight':
      return <>Die Fahrt endet um <b>{clock(data.result)}</b>.</>
    case 'mixedLength':
      return <><InlineMath math={`${data.a}\\,\\mathrm m=${data.a * 100}\\,\\mathrm{cm}`} /><br /><InlineMath math={`${data.a * 100}+${data.b}=${data.result}\\,\\mathrm{cm}=${pp(data.result2)}\\,\\mathrm m`} /></>
    case 'areaUnits':
      return <InlineMath math={`${data.a}\\,\\mathrm{cm^2}=${pp(data.result)}\\,\\mathrm{m^2}`} />
    case 'compositeArea':
      return <><InlineMath math={`${data.a}\\cdot${data.b}=${data.result2}`} /><br /><InlineMath math={`${data.result2}-${data.c}\\cdot${data.d}=${data.result}\\,\\mathrm{m^2}`} /></>
    case 'prismVolume':
      return <InlineMath math={`V=G\\cdot h=${data.a}\\cdot${data.b}=${data.result}\\,\\mathrm{cm^3}`} />
    case 'litersFromCuboid':
      return <><InlineMath math={`V=${data.a}\\cdot${data.b}\\cdot${data.c}=${data.result}\\,\\mathrm{cm^3}`} /><br /><InlineMath math={`${data.result}\\,\\mathrm{cm^3}=${pp(data.result2)}\\,\\mathrm l`} /></>
    case 'reduceContext':
      return <InlineMath math={`\\frac{${data.a}}{${data.b}}=\\frac{${data.c}}{${data.d}}`} />
    case 'addSameDenominator':
      return <InlineMath math={`\\frac{${data.a}}{${data.b}}+\\frac{${data.c}}{${data.b}}=\\frac{${data.result}}{${data.result2}}`} />
    case 'fractionMarked':
      return <InlineMath math={`\\frac{${data.a}}{${data.b}}=\\frac{${data.c}}{${data.d}}`} />
    case 'unitPrice':
      return <InlineMath math={`${pp(data.b)}:${data.a}=${pp(data.result)}\\,€`} />
    case 'inverseMachines':
      return <><InlineMath math={`${data.a}\\cdot${data.b}=${data.result2}`} /><br /><InlineMath math={`${data.result2}:${data.c}=${pp(data.result)}\\,\\mathrm h`} /></>
    case 'ratioDistribution':
      return <><InlineMath math={`${data.a}+${data.b}=${data.a + data.b}`} /><br /><InlineMath math={`${pp(data.result)}\\,€\\quad \\text{und}\\quad ${pp(data.result2)}\\,€`} /></>
    case 'percentValueContext':
      return <InlineMath math={`${data.a}\\cdot\\frac{${data.b}}{100}=${pp(data.result)}`} />
    case 'offerCompare':
      return <><InlineMath math={`A=${data.a}\\cdot(1-\\frac{${data.b}}{100})=${pp(data.result)}\\,€`} /><br /><InlineMath math={`B=${data.c}\\cdot(1-\\frac{${data.d}}{100})=${pp(data.result2)}\\,€`} /><p>{data.result < data.result2 ? 'Angebot A' : 'Angebot B'} ist günstiger.</p></>
    case 'percentForms':
      return <><InlineMath math={`${data.a}\\,\\%=${pp(data.result)}`} /><br /><InlineMath math={`${data.a}\\,\\%=\\frac{${data.b}}{${data.c}}`} /></>
    case 'pieAngle':
      return <InlineMath math={`360^\\circ\\cdot\\frac{${data.a}}{100}=${pp(data.result)}^\\circ`} />
    case 'barCompare':
      return <><InlineMath math={`${data.b}-${data.c}=${data.result}`} /><br /><InlineMath math={`${data.a}+${data.b}+${data.c}=${data.result2}`} /></>
    case 'textTable':
      return <><InlineMath math={`${data.a}+${data.b}+${data.c}=${data.result}`} /><p>Die größte Gruppe hat <b>{data.result2}</b> Personen.</p></>
    case 'examAreaPercent':
      return <><InlineMath math={`A=${data.a}\\cdot${data.b}=${data.result}\\,\\mathrm{m^2}`} /><br /><InlineMath math={`${data.result}\\cdot\\frac{${data.c}}{100}=${pp(data.result2)}\\,\\mathrm{m^2}`} /></>
    case 'examCashDiscount':
      return <><InlineMath math={`${data.a}\\cdot(1-\\frac{${data.b}}{100})=${pp(data.result)}\\,€`} /><br /><InlineMath math={`${data.c}-${pp(data.result)}=${pp(data.result2)}\\,€`} /></>
    case 'examRecipe':
      return <><InlineMath math={`${data.b}:${data.a}\\cdot${data.c}=${pp(data.result)}\\,\\mathrm g`} /><br /><InlineMath math={`${pp(data.result)}:${data.d}=${pp(data.result2)}\\,\\mathrm g`} /></>
    case 'examPackage':
      return <><InlineMath math={`${data.a}\\cdot${data.b}\\cdot${data.c}=${data.result}\\,\\mathrm{cm^3}`} /><br /><InlineMath math={`${data.result}\\cdot${data.d}:1000=${pp(data.result2)}\\,\\mathrm l`} /></>
    case 'examTravel':
      return <>Es geht um <b>{clock(data.result)}</b> weiter.</>
    case 'examDataPercent':
      return <><InlineMath math={`${data.a}-${data.b}=${data.result}`} /><br /><InlineMath math={`${data.b}:${data.a}\\cdot100=${pp(data.result2)}\\,\\%`} /></>
    case 'examNumberMix':
      return <><InlineMath math={`${data.a}:${data.b}+${data.c}=${pp(data.result)}`} /><br /><InlineMath math={`${pp(data.result)}\\cdot2=${pp(data.result2)}`} /></>
  }
}

function makeExercise(title: string, source: string, kind: Kind): Exercise<DATA> {
  const originalData = makeData(kind, {
    randomItemFromArray<T>(arr: T[]) {
      return arr[0]
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
      return data.kind === kind && Number.isFinite(data.result)
    },
    task({ data }) {
      return <p>{taskFor(data)}</p>
    },
    solution({ data }) {
      return <>{solutionFor(data)}</>
    },
  }
}

export const exercise9636 = makeExercise('Gerecht verteilen', 'Grundlagen', 'fairDivision')
export const exercise9637 = makeExercise('Überschlag mit Preisen', 'Grundlagen', 'estimateProduct')
export const exercise9638 = makeExercise('Klammern im Sachkontext', 'Grundlagen', 'bracketTickets')
export const exercise9639 = makeExercise('Kommazahlen mit Längen', 'Grundlagen', 'decimalLengths')
export const exercise9640 = makeExercise('Preis mit Kommazahlen', 'Grundlagen', 'decimalPrice')
export const exercise9641 = makeExercise('Zeit über Mitternacht', 'Einheiten', 'timeOverMidnight')
export const exercise9642 = makeExercise('Meter und Zentimeter verbinden', 'Einheiten', 'mixedLength')
export const exercise9643 = makeExercise('Quadratzentimeter in Quadratmeter', 'Einheiten', 'areaUnits')
export const exercise9644 = makeExercise('Restfläche berechnen', 'Figuren und Flächen', 'compositeArea')
export const exercise9645 = makeExercise('Volumen eines Prismas mit Grundfläche', 'Körper und Volumen', 'prismVolume')
export const exercise9646 = makeExercise('Behältervolumen in Litern', 'Körper und Volumen', 'litersFromCuboid')
export const exercise9647 = makeExercise('Anteil als gekürzter Bruch', 'Bruchrechnen', 'reduceContext')
export const exercise9648 = makeExercise('Brüche mit gleichem Nenner addieren', 'Bruchrechnen', 'addSameDenominator')
export const exercise9649 = makeExercise('Markierte Felder als Bruch', 'Bruchrechnen', 'fractionMarked')
export const exercise9650 = makeExercise('Kilopreis berechnen', 'Dreisatz', 'unitPrice')
export const exercise9651 = makeExercise('Maschinen und Arbeitszeit', 'Dreisatz', 'inverseMachines')
export const exercise9652 = makeExercise('Geld im Verhältnis aufteilen', 'Dreisatz', 'ratioDistribution')
export const exercise9653 = makeExercise('Beschädigte Teile berechnen', 'Prozentrechnung', 'percentValueContext')
export const exercise9654 = makeExercise('Zwei Angebote vergleichen', 'Prozentrechnung', 'offerCompare')
export const exercise9655 = makeExercise('Prozent, Dezimalzahl und Bruch', 'Prozentrechnung', 'percentForms')
export const exercise9656 = makeExercise('Winkel im Kreisdiagramm', 'Diagramme und Daten', 'pieAngle')
export const exercise9657 = makeExercise('Säulenwerte vergleichen', 'Diagramme und Daten', 'barCompare')
export const exercise9658 = makeExercise('Daten aus Text ordnen', 'Diagramme und Daten', 'textTable')
export const exercise9659 = makeExercise('Fläche mit Prozentanteil', 'Prüfungsvorbereitung', 'examAreaPercent')
export const exercise9660 = makeExercise('Einkauf mit Rabatt und Rückgeld', 'Prüfungsvorbereitung', 'examCashDiscount')
export const exercise9661 = makeExercise('Rezept und Portionen', 'Prüfungsvorbereitung', 'examRecipe')
export const exercise9662 = makeExercise('Mehrere Pakete und Volumen', 'Prüfungsvorbereitung', 'examPackage')
export const exercise9663 = makeExercise('Zeitplan in Schritten', 'Prüfungsvorbereitung', 'examTravel')
export const exercise9664 = makeExercise('Daten mit Prozentanteil', 'Prüfungsvorbereitung', 'examDataPercent')
export const exercise9665 = makeExercise('Rechenmix in zwei Schritten', 'Prüfungsvorbereitung', 'examNumberMix')
