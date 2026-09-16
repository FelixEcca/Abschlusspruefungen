import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Shape = 'rectangle' | 'triangle' | 'circle' | 'parallelogram'

interface DATA {
  shape: Shape
  dimensionA: number
  dimensionB: number
}

function shapeContent(data: DATA) {
  if (data.shape === 'rectangle') {
    const length = data.dimensionA * 10
    const width = data.dimensionB * 5
    const area = length * width
    return {
      situation: `Eine rechteckige Abdeckplatte besitzt eine Länge von ${length} mm und einen Flächeninhalt von ${area} mm². Bestimmen Sie die Breite b.`,
      formula: 'A=l\\cdot b',
      rearranged: 'b=\\frac{A}{l}',
      calculation: `b=\\frac{${area}\\,\\mathrm{mm}^2}{${length}\\,\\mathrm{mm}}=${width}\\,\\mathrm{mm}`,
    }
  }

  if (data.shape === 'triangle') {
    const base = data.dimensionA * 10
    const height = data.dimensionB * 5
    const area = (base * height) / 2
    return {
      situation: `Ein dreieckiges Knotenblech hat eine Grundseite von ${base} mm und einen Flächeninhalt von ${area} mm². Berechnen Sie die zugehörige Höhe h.`,
      formula: 'A=\\frac{g\\cdot h}{2}',
      rearranged: 'h=\\frac{2A}{g}',
      calculation: `h=\\frac{2\\cdot${area}\\,\\mathrm{mm}^2}{${base}\\,\\mathrm{mm}}=${height}\\,\\mathrm{mm}`,
    }
  }

  if (data.shape === 'circle') {
    const radius = data.dimensionB * 5
    const area = Math.PI * radius ** 2
    return {
      situation: `Eine kreisförmige Flanschfläche beträgt ${pp(area)} mm². Bestimmen Sie den Radius r und den Durchmesser d.`,
      formula: 'A=\\pi r^2',
      rearranged: 'r=\\sqrt{\\frac{A}{\\pi}}',
      calculation: `r=\\sqrt{\\frac{${pp(area)}\\,\\mathrm{mm}^2}{\\pi}}\\approx${radius}\\,\\mathrm{mm},\\qquad d=2r=${2 * radius}\\,\\mathrm{mm}`,
    }
  }

  const base = data.dimensionA * 10
  const height = data.dimensionB * 5
  const area = base * height
  return {
    situation: `Die Seitenfläche einer schrägen Halterung wird als Parallelogramm modelliert. Bei einer Grundseite von ${base} mm beträgt der Flächeninhalt ${area} mm². Bestimmen Sie die senkrechte Höhe h.`,
    formula: 'A=g\\cdot h',
    rearranged: 'h=\\frac{A}{g}',
    calculation: `h=\\frac{${area}\\,\\mathrm{mm}^2}{${base}\\,\\mathrm{mm}}=${height}\\,\\mathrm{mm}`,
  }
}

function ShapeSketch({
  data,
  solved = false,
}: {
  data: DATA
  solved?: boolean
}) {
  const base = data.dimensionA * 10
  const height = data.dimensionB * 5
  const unknownHeight = solved ? `${height} mm` : '?'

  return (
    <svg
      viewBox="0 0 340 220"
      className="mx-auto my-4 w-full max-w-[380px]"
      role="img"
      aria-label="Skizze der zu berechnenden Fläche"
    >
      {data.shape === 'rectangle' && (
        <>
          <rect
            x="55"
            y="35"
            width="230"
            height="130"
            fill="#eef5ff"
            stroke="#1e3a5f"
            strokeWidth="3"
          />
          <text x="130" y="194" fontSize="16" fill="#172033">
            l = {base} mm
          </text>
          <text x="291" y="105" fontSize="16" fill="#1d4ed8">
            b = {unknownHeight}
          </text>
        </>
      )}
      {data.shape === 'triangle' && (
        <>
          <path
            d="M 45 170 L 295 170 L 175 35 Z"
            fill="#eef5ff"
            stroke="#1e3a5f"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line
            x1="175"
            y1="35"
            x2="175"
            y2="170"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="125" y="198" fontSize="16" fill="#172033">
            g = {base} mm
          </text>
          <text x="183" y="105" fontSize="16" fill="#1d4ed8">
            h = {unknownHeight}
          </text>
        </>
      )}
      {data.shape === 'circle' && (
        <>
          <circle
            cx="170"
            cy="105"
            r="70"
            fill="#eef5ff"
            stroke="#1e3a5f"
            strokeWidth="3"
          />
          <line
            x1="170"
            y1="105"
            x2="240"
            y2="105"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <circle cx="170" cy="105" r="4" fill="#1e3a5f" />
          <text x="185" y="96" fontSize="16" fill="#1d4ed8">
            r = {solved ? `${height} mm` : '?'}
          </text>
        </>
      )}
      {data.shape === 'parallelogram' && (
        <>
          <path
            d="M 85 35 L 295 35 L 255 170 L 45 170 Z"
            fill="#eef5ff"
            stroke="#1e3a5f"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line
            x1="85"
            y1="35"
            x2="85"
            y2="170"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="125" y="198" fontSize="16" fill="#172033">
            g = {base} mm
          </text>
          <text x="93" y="105" fontSize="16" fill="#1d4ed8">
            h = {unknownHeight}
          </text>
        </>
      )}
      <text x="103" y="216" fontSize="12" fill="#52647a">
        Skizze nicht maßstäblich
      </text>
    </svg>
  )
}

export const exercise13021: Exercise<DATA> = {
  title: 'Fehlende Maße aus Flächen bestimmen',
  source: 'Vorbereitungskurs Meister · Längen, Flächen, Volumen',
  useCalculator: true,
  duration: 8,
  generator(rng) {
    return {
      shape: rng.randomItemFromArray<Shape>([
        'rectangle',
        'triangle',
        'circle',
        'parallelogram',
      ]),
      dimensionA: rng.randomIntBetween(3, 15),
      dimensionB: rng.randomIntBetween(2, 12),
    }
  },
  originalData: {
    shape: 'triangle',
    dimensionA: 12,
    dimensionB: 8,
  },
  constraint({ data }) {
    return data.dimensionA > 0 && data.dimensionB > 0
  },
  intro({ data }) {
    return <p>{shapeContent(data).situation}</p>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <ShapeSketch data={data} />
            <p>
              Notieren Sie die Flächenformel und stellen Sie diese nach der
              gesuchten Länge um.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <ShapeSketch data={data} solved />
            <BlockMath math={shapeContent(data).rearranged} />
          </>
        )
      },
    },
    {
      points: 3,
      task() {
        return <p>Berechnen Sie das fehlende Maß mit Einheit.</p>
      },
      solution({ data }) {
        return <BlockMath math={shapeContent(data).calculation} />
      },
    },
  ],
}
