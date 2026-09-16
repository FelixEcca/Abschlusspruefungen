import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Material = 'steel' | 'aluminium' | 'brass' | 'copper'
type Shape = 'plate' | 'roundBar' | 'tube'

interface DATA {
  material: Material
  shape: Shape
  a: number
  b: number
  c: number
}

function materialData(material: Material) {
  if (material === 'aluminium') return { name: 'Aluminium', density: 2.7 }
  if (material === 'brass') return { name: 'Messing', density: 8.5 }
  if (material === 'copper') return { name: 'Kupfer', density: 8.96 }
  return { name: 'Stahl', density: 7.85 }
}

function workpieceContent(data: DATA) {
  if (data.shape === 'plate') {
    const length = (data.a + 10) * 10
    const width = (data.b + 8) * 10
    const thickness = data.c
    const volume = length * width * thickness
    return {
      description: `Platte ${length} mm × ${width} mm × ${thickness} mm`,
      calculation: `V=${length}\\cdot${width}\\cdot${thickness}=${volume}\\,\\mathrm{mm}^3=${pp(volume / 1000)}\\,\\mathrm{cm}^3`,
      volumeCm3: volume / 1000,
    }
  }

  if (data.shape === 'roundBar') {
    const diameter = (data.a + 3) * 5
    const length = (data.b + 10) * 10
    const volume = Math.PI * (diameter / 2) ** 2 * length
    return {
      description: `Rundstab d = ${diameter} mm, l = ${length} mm`,
      calculation: `V=\\pi\\left(\\frac{${diameter}}{2}\\right)^2\\cdot${length}\\approx${pp(volume)}\\,\\mathrm{mm}^3=${pp(volume / 1000)}\\,\\mathrm{cm}^3`,
      volumeCm3: volume / 1000,
    }
  }

  const innerDiameter = data.a * 5
  const outerDiameter = innerDiameter + data.c * 5
  const length = (data.b + 10) * 10
  const volume =
    (Math.PI / 4) * (outerDiameter ** 2 - innerDiameter ** 2) * length
  return {
    description: `Rohrabschnitt D = ${outerDiameter} mm, d = ${innerDiameter} mm, l = ${length} mm`,
    calculation: `V=\\frac{\\pi}{4}\\left(${outerDiameter}^2-${innerDiameter}^2\\right)\\cdot${length}\\approx${pp(volume)}\\,\\mathrm{mm}^3=${pp(volume / 1000)}\\,\\mathrm{cm}^3`,
    volumeCm3: volume / 1000,
  }
}

function MassSketch({ data }: { data: DATA }) {
  const material = materialData(data.material)

  if (data.shape === 'plate') {
    const length = (data.a + 10) * 10
    const width = (data.b + 8) * 10
    const thickness = data.c
    return (
      <svg
        viewBox="0 0 370 220"
        className="mx-auto my-4 w-full max-w-[420px]"
        role="img"
        aria-label="Prinzipskizze einer Platte"
      >
        <path
          d="M 45 75 L 270 75 L 325 40 L 100 40 Z M 45 75 L 270 75 L 270 145 L 45 145 Z M 270 75 L 325 40 L 325 110 L 270 145 Z"
          fill="#eef5ff"
          stroke="#1e3a5f"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <text x="110" y="170" fontSize="14" fill="#172033">
          l = {length} mm
        </text>
        <text x="276" y="150" fontSize="14" fill="#172033">
          b = {width} mm
        </text>
        <text x="5" y="115" fontSize="14" fill="#172033">
          s = {thickness} mm
        </text>
        <text x="120" y="205" fontSize="14" fill="#52647a">
          Werkstoff: {material.name}
        </text>
      </svg>
    )
  }

  const length = (data.b + 10) * 10
  const innerDiameter = data.a * 5
  const outerDiameter =
    data.shape === 'tube' ? innerDiameter + data.c * 5 : (data.a + 3) * 5
  return (
    <svg
      viewBox="0 0 390 220"
      className="mx-auto my-4 w-full max-w-[440px]"
      role="img"
      aria-label={
        data.shape === 'tube'
          ? 'Prinzipskizze eines Rohres'
          : 'Prinzipskizze eines Rundstabs'
      }
    >
      <ellipse
        cx="85"
        cy="100"
        rx="52"
        ry="66"
        fill="#eef5ff"
        stroke="#1e3a5f"
        strokeWidth="3"
      />
      {data.shape === 'tube' && (
        <ellipse
          cx="85"
          cy="100"
          rx="25"
          ry="33"
          fill="white"
          stroke="#2563eb"
          strokeWidth="3"
        />
      )}
      <path
        d="M 85 34 L 300 34 M 85 166 L 300 166"
        stroke="#1e3a5f"
        strokeWidth="3"
      />
      <ellipse
        cx="300"
        cy="100"
        rx="52"
        ry="66"
        fill="#eef5ff"
        fillOpacity="0.45"
        stroke="#1e3a5f"
        strokeWidth="3"
      />
      {data.shape === 'tube' && (
        <ellipse
          cx="300"
          cy="100"
          rx="25"
          ry="33"
          fill="white"
          stroke="#2563eb"
          strokeWidth="3"
        />
      )}
      <text x="34" y="190" fontSize="14" fill="#172033">
        {data.shape === 'tube' ? 'D' : 'd'} = {outerDiameter} mm
      </text>
      {data.shape === 'tube' && (
        <text x="108" y="105" fontSize="14" fill="#1d4ed8">
          d = {innerDiameter} mm
        </text>
      )}
      <text x="170" y="24" fontSize="14" fill="#172033">
        l = {length} mm
      </text>
      <text x="145" y="205" fontSize="14" fill="#52647a">
        Werkstoff: {material.name}
      </text>
    </svg>
  )
}

export const exercise13025: Exercise<DATA> = {
  title: 'Masse eines Werkstücks bestimmen',
  source: 'Vorbereitungskurs Meister · Längen, Flächen, Volumen',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    return {
      material: rng.randomItemFromArray<Material>([
        'steel',
        'aluminium',
        'brass',
        'copper',
      ]),
      shape: rng.randomItemFromArray<Shape>(['plate', 'roundBar', 'tube']),
      a: rng.randomIntBetween(3, 12),
      b: rng.randomIntBetween(3, 10),
      c: rng.randomIntBetween(2, 8),
    }
  },
  originalData: {
    material: 'steel',
    shape: 'roundBar',
    a: 7,
    b: 10,
    c: 4,
  },
  constraint({ data }) {
    return data.a > 0 && data.b > 0 && data.c > 0
  },
  intro({ data }) {
    const material = materialData(data.material)
    const workpiece = workpieceContent(data)
    return (
      <p>
        Für eine Materialbestellung wird die Masse eines Werkstücks aus{' '}
        {material.name} benötigt: {workpiece.description}. Verwenden Sie ρ ={' '}
        {pp(material.density)} g/cm³.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <MassSketch data={data} />
            <p>
              Berechnen Sie zunächst das Werkstückvolumen in mm³ und wandeln Sie
              es anschließend in cm³ um.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <MassSketch data={data} />
            <BlockMath math={workpieceContent(data).calculation} />
          </>
        )
      },
    },
    {
      points: 4,
      task() {
        return (
          <p>
            Berechnen Sie mit der Dichteformel die Masse in Gramm und geben Sie
            das Ergebnis zusätzlich in Kilogramm an.
          </p>
        )
      },
      solution({ data }) {
        const material = materialData(data.material)
        const volume = workpieceContent(data).volumeCm3
        const mass = volume * material.density
        return (
          <BlockMath
            math={`m=\\rho\\cdot V=${pp(material.density)}\\,\\frac{\\mathrm{g}}{\\mathrm{cm}^3}\\cdot${pp(volume)}\\,\\mathrm{cm}^3\\approx${pp(mass)}\\,\\mathrm{g}=${pp(mass / 1000)}\\,\\mathrm{kg}`}
          />
        )
      },
    },
  ],
}
