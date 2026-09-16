import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Cutout = 'bores' | 'corner' | 'window'

interface DATA {
  cutout: Cutout
  length: number
  width: number
  cutoutA: number
  cutoutB: number
  boreCount: number
}

function removedArea(data: DATA) {
  if (data.cutout === 'bores') {
    return data.boreCount * Math.PI * (data.cutoutA / 2) ** 2
  }
  return data.cutoutA * data.cutoutB
}

function PlateDiagram({ data }: { data: DATA }) {
  const circles = [80, 130, 180, 230]
  return (
    <svg
      viewBox="0 0 310 210"
      className="mx-auto my-4 w-full max-w-[360px]"
      role="img"
      aria-label="Skizze einer Blechplatte mit Aussparung"
    >
      <rect
        x="30"
        y="25"
        width="250"
        height="145"
        rx="3"
        fill="#eef5ff"
        stroke="#1e3a5f"
        strokeWidth="3"
      />
      {data.cutout === 'bores' &&
        circles
          .slice(0, data.boreCount)
          .map(x => (
            <circle
              key={x}
              cx={x}
              cy="98"
              r="14"
              fill="white"
              stroke="#1e3a5f"
              strokeWidth="3"
            />
          ))}
      {data.cutout === 'corner' && (
        <path
          d="M 30 25 L 105 25 L 105 80 L 30 80 Z"
          fill="white"
          stroke="#1e3a5f"
          strokeWidth="3"
        />
      )}
      {data.cutout === 'window' && (
        <rect
          x="105"
          y="68"
          width="100"
          height="60"
          fill="white"
          stroke="#1e3a5f"
          strokeWidth="3"
        />
      )}
      <text x="120" y="198" fontSize="16" fill="#172033">
        l = {data.length} mm
      </text>
      <text x="3" y="103" fontSize="16" fill="#172033">
        b
      </text>
    </svg>
  )
}

export const exercise13022: Exercise<DATA> = {
  title: 'Blechflächen mit Aussparungen',
  source: 'Vorbereitungskurs Meister · Längen, Flächen, Volumen',
  useCalculator: true,
  duration: 9,
  generator(rng) {
    const cutout = rng.randomItemFromArray<Cutout>([
      'bores',
      'corner',
      'window',
    ])
    const length = rng.randomIntBetween(18, 32) * 10
    const width = rng.randomIntBetween(10, 20) * 10
    return {
      cutout,
      length,
      width,
      cutoutA:
        cutout === 'bores'
          ? rng.randomIntBetween(2, 5) * 10
          : rng.randomIntBetween(3, 8) * 10,
      cutoutB: rng.randomIntBetween(2, 6) * 10,
      boreCount: rng.randomIntBetween(2, 4),
    }
  },
  originalData: {
    cutout: 'bores',
    length: 240,
    width: 140,
    cutoutA: 30,
    cutoutB: 40,
    boreCount: 3,
  },
  constraint({ data }) {
    return (
      data.cutoutA < data.length / 2 &&
      data.cutoutB < data.width / 2 &&
      removedArea(data) < data.length * data.width * 0.5
    )
  },
  intro({ data }) {
    const detail =
      data.cutout === 'bores'
        ? `${data.boreCount} Durchgangsbohrungen mit d = ${data.cutoutA} mm`
        : data.cutout === 'corner'
          ? `eine rechteckige Eckausklinkung mit ${data.cutoutA} mm × ${data.cutoutB} mm`
          : `eine rechteckige Innenaussparung mit ${data.cutoutA} mm × ${data.cutoutB} mm`
    return (
      <p>
        Aus einer {data.length} mm × {data.width} mm großen Blechplatte wird{' '}
        {detail} herausgetrennt. Schnittfugen werden vernachlässigt.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <PlateDiagram data={data} />
            <p>
              Zerlegen Sie die Fläche in Grundfläche und Aussparung. Berechnen
              Sie die verbleibende Blechfläche.
            </p>
          </>
        )
      },
      solution({ data }) {
        const gross = data.length * data.width
        const removed = removedArea(data)
        const formula =
          data.cutout === 'bores'
            ? `A_\\mathrm{aus}=${data.boreCount}\\cdot\\pi\\left(\\frac{${data.cutoutA}}{2}\\right)^2\\approx${pp(removed)}\\,\\mathrm{mm}^2`
            : `A_\\mathrm{aus}=${data.cutoutA}\\cdot${data.cutoutB}=${pp(removed)}\\,\\mathrm{mm}^2`
        return (
          <>
            <PlateDiagram data={data} />
            <BlockMath
              math={`A_\\mathrm{brutto}=${data.length}\\cdot${data.width}=${gross}\\,\\mathrm{mm}^2`}
            />
            <BlockMath math={formula} />
            <BlockMath
              math={`A_\\mathrm{netto}=A_\\mathrm{brutto}-A_\\mathrm{aus}\\approx${pp(gross - removed)}\\,\\mathrm{mm}^2`}
            />
          </>
        )
      },
    },
    {
      points: 3,
      task() {
        return <p>Berechnen Sie den prozentualen Materialabtrag.</p>
      },
      solution({ data }) {
        const gross = data.length * data.width
        const percentage = (removedArea(data) / gross) * 100
        return (
          <BlockMath
            math={`p=\\frac{A_\\mathrm{aus}}{A_\\mathrm{brutto}}\\cdot100\\,\\%\\approx${pp(percentage)}\\,\\%`}
          />
        )
      },
    },
  ],
}
