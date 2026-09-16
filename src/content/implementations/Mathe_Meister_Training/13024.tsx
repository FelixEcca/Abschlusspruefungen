import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Workpiece =
  | 'drilledBlock'
  | 'steppedShaft'
  | 'sleeve'
  | 'flange'
  | 'angleProfile'
  | 'hollowSection'

interface DATA {
  workpiece: Workpiece
  a: number
  b: number
  c: number
  d: number
}

function volumeContent(data: DATA) {
  if (data.workpiece === 'drilledBlock') {
    const length = (data.a + 10) * 10
    const width = (data.b + 8) * 10
    const height = data.c * 5
    const bore = data.d * 5
    const volume = length * width * height - Math.PI * (bore / 2) ** 2 * height
    return {
      situation: 'Ein quaderförmiger Metallblock besitzt eine zylindrische Durchgangsbohrung.',
      dimensions: [`l = ${length} mm`, `b = ${width} mm`, `h = ${height} mm`, `Bohrung: d = ${bore} mm`],
      model: 'Vom Quader wird der Zylinder der Durchgangsbohrung abgezogen.',
      calculation: `V=${length}\\cdot${width}\\cdot${height}-\\pi\\left(\\frac{${bore}}{2}\\right)^2\\cdot${height}\\approx${pp(Math.round(volume * 10) / 10)}\\,\\mathrm{mm}^3`,
      volume,
    }
  }

  if (data.workpiece === 'steppedShaft') {
    const small = data.a * 5
    const large = small + data.d * 5
    const l1 = data.b * 10
    const l2 = data.c * 10
    const volume = Math.PI * (large / 2) ** 2 * l1 + Math.PI * (small / 2) ** 2 * l2
    return {
      situation: 'Eine abgesetzte Welle besteht aus zwei zylindrischen Abschnitten.',
      dimensions: [`d₁ = ${large} mm`, `l₁ = ${l1} mm`, `d₂ = ${small} mm`, `l₂ = ${l2} mm`],
      model: 'Die Volumina der beiden Zylinder werden addiert.',
      calculation: `V=\\pi\\left(\\frac{${large}}{2}\\right)^2\\cdot${l1}+\\pi\\left(\\frac{${small}}{2}\\right)^2\\cdot${l2}\\approx${pp(Math.round(volume * 10) / 10)}\\,\\mathrm{mm}^3`,
      volume,
    }
  }

  if (data.workpiece === 'sleeve' || data.workpiece === 'flange') {
    const inner = data.a * 5
    const outer = inner + data.d * (data.workpiece === 'flange' ? 10 : 5)
    const length = data.workpiece === 'flange' ? data.c * 5 : data.b * 10
    const volume = (Math.PI / 4) * (outer ** 2 - inner ** 2) * length
    return {
      situation: data.workpiece === 'flange'
        ? 'Ein ringförmiger Befestigungsflansch besitzt eine mittige Durchgangsöffnung.'
        : 'Eine zylindrische Buchse besitzt eine mittige Durchgangsöffnung.',
      dimensions: [`Außen: D = ${outer} mm`, `Innen: d = ${inner} mm`, `${data.workpiece === 'flange' ? 'Dicke' : 'Länge'}: l = ${length} mm`],
      model: 'Vom Außenzylinder wird der Innenzylinder abgezogen.',
      calculation: `V=\\frac{\\pi}{4}\\left(${outer}^2-${inner}^2\\right)\\cdot${length}\\approx${pp(Math.round(volume * 10) / 10)}\\,\\mathrm{mm}^3`,
      volume,
    }
  }

  if (data.workpiece === 'angleProfile') {
    const leg = (data.a + 5) * 10
    const thickness = data.d * 5
    const length = (data.b + 5) * 20
    const section = 2 * leg * thickness - thickness ** 2
    const volume = section * length
    return {
      situation: 'Ein gleichschenkliges Winkelprofil hat eine L-förmige Querschnittsfläche und eine konstante Länge.',
      dimensions: [`Schenkellänge: s = ${leg} mm`, `Wanddicke: t = ${thickness} mm`, `Profil-Länge: l = ${length} mm`],
      model: 'Die Querschnittsfläche besteht aus zwei Rechtecken. Das Eckquadrat wurde doppelt gezählt und wird einmal abgezogen.',
      calculation: `V=\\left(2\\cdot${leg}\\cdot${thickness}-${thickness}^2\\right)\\cdot${length}=${volume}\\,\\mathrm{mm}^3`,
      volume,
    }
  }

  const width = (data.a + 8) * 10
  const height = (data.c + 8) * 10
  const thickness = data.d * 5
  const length = (data.b + 5) * 20
  const innerWidth = width - 2 * thickness
  const innerHeight = height - 2 * thickness
  const volume = (width * height - innerWidth * innerHeight) * length
  return {
    situation: 'Ein rechteckiges Hohlprofil besitzt eine gleichmäßige Wanddicke.',
    dimensions: [`Außen: B = ${width} mm`, `Außen: H = ${height} mm`, `Wand: t = ${thickness} mm`, `Länge: l = ${length} mm`],
    model: 'Von der äußeren Querschnittsfläche wird die innere Öffnung abgezogen. Die verbleibende Fläche wird mit der Profillänge multipliziert.',
    calculation: `V=\\left(${width}\\cdot${height}-${innerWidth}\\cdot${innerHeight}\\right)\\cdot${length}=${volume}\\,\\mathrm{mm}^3`,
    volume,
  }
}

function WorkpieceSketch({ data }: { data: DATA }) {
  const common = { fill: '#eaf3ff', stroke: '#1e3a5f', strokeWidth: 3 }
  const cutout = { fill: 'white', stroke: '#2563eb', strokeWidth: 3 }
  return (
    <div className="my-4 rounded-xl border border-slate-200 bg-white p-3">
      <svg viewBox="0 0 420 190" className="mx-auto w-full max-w-[450px]" role="img" aria-label="Vorder- und Seitenansicht des Werkstücks, nicht maßstäblich">
        <text x="65" y="20" fontSize="13" fill="#52647a">Vorderansicht</text>
        <text x="279" y="20" fontSize="13" fill="#52647a">Seitenansicht</text>
        {data.workpiece === 'drilledBlock' && (
          <>
            <rect x="45" y="40" width="150" height="115" {...common} />
            <circle cx="120" cy="97" r="24" {...cutout} />
            <rect x="255" y="50" width="125" height="105" {...common} />
            <path d="M255 78 H380 M255 116 H380" fill="none" stroke="#2563eb" strokeDasharray="6 5" strokeWidth="2" />
          </>
        )}
        {data.workpiece === 'steppedShaft' && (
          <>
            <circle cx="120" cy="97" r="55" {...common} />
            <circle cx="120" cy="97" r="34" fill="none" stroke="#2563eb" strokeDasharray="6 5" strokeWidth="2" />
            <path d="M255 48 H320 V70 H380 V124 H320 V146 H255 Z" {...common} />
            <line x1="255" y1="97" x2="380" y2="97" stroke="#52647a" strokeDasharray="6 5" />
          </>
        )}
        {(data.workpiece === 'sleeve' || data.workpiece === 'flange') && (
          <>
            <circle cx="120" cy="97" r={data.workpiece === 'flange' ? 58 : 52} {...common} />
            <circle cx="120" cy="97" r="25" {...cutout} />
            <rect x="260" y={data.workpiece === 'flange' ? 43 : 52} width={data.workpiece === 'flange' ? 85 : 120} height={data.workpiece === 'flange' ? 108 : 90} {...common} />
            <rect x="260" y="79" width={data.workpiece === 'flange' ? 85 : 120} height="36" {...cutout} />
          </>
        )}
        {data.workpiece === 'angleProfile' && (
          <>
            <path d="M50 42 H83 V123 H187 V155 H50 Z" {...common} />
            <rect x="260" y="67" width="120" height="60" {...common} />
          </>
        )}
        {data.workpiece === 'hollowSection' && (
          <>
            <rect x="45" y="40" width="150" height="115" {...common} />
            <rect x="73" y="66" width="94" height="63" {...cutout} />
            <rect x="255" y="52" width="125" height="90" {...common} />
            <path d="M255 70 H380 M255 124 H380" stroke="#2563eb" strokeDasharray="6 5" strokeWidth="2" />
          </>
        )}
      </svg>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-700">
        {volumeContent(data).dimensions.map((dimension) => <span key={dimension}>{dimension}</span>)}
      </div>
      <p className="mt-2 text-xs text-slate-500">Prinzipdarstellung, nicht maßstäblich</p>
    </div>
  )
}

export const exercise13024: Exercise<DATA> = {
  title: 'Volumen zusammengesetzter Werkstücke',
  source: 'Vorbereitungskurs Meister · Längen, Flächen, Volumen',
  useCalculator: true,
  duration: 12,
  generator(rng) {
    return {
      workpiece: rng.randomItemFromArray<Workpiece>([
        'drilledBlock', 'steppedShaft', 'sleeve', 'flange', 'angleProfile', 'hollowSection',
      ]),
      a: rng.randomIntBetween(3, 12),
      b: rng.randomIntBetween(3, 10),
      c: rng.randomIntBetween(2, 10),
      d: rng.randomIntBetween(2, 6),
    }
  },
  originalData: { workpiece: 'sleeve', a: 6, b: 8, c: 5, d: 3 },
  constraint({ data }) {
    return data.a > 0 && data.b > 0 && data.c > 0 && data.d > 0
  },
  intro({ data }) {
    return <p>{volumeContent(data).situation}</p>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <WorkpieceSketch data={data} />
            <p>Beschreiben Sie die Zerlegung in Grundkörper beziehungsweise Querschnittsflächen. Welche Flächen oder Volumina werden addiert, welche abgezogen?</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <WorkpieceSketch data={data} />
            <p>{volumeContent(data).model}</p>
          </>
        )
      },
    },
    {
      points: 4,
      task() {
        return <p>Berechnen Sie das Werkstückvolumen in mm³ und wandeln Sie das Ergebnis anschließend in cm³ um.</p>
      },
      solution({ data }) {
        const content = volumeContent(data)
        return (
          <>
            <BlockMath math={content.calculation} />
            <BlockMath math={`V\\approx${pp(Math.round(content.volume / 10) / 100)}\\,\\mathrm{cm}^3`} />
          </>
        )
      },
    },
  ],
}
