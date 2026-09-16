import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'

type Plate = 'step' | 'uPlate' | 'tPlate' | 'frame'

interface DATA {
  plate: Plate
  length: number
  height: number
  a: number
  b: number
}

function measures(data: DATA) {
  const { plate, length, height, a, b } = data
  if (plate === 'step') {
    const x = length - a
    const y = height - b
    return { x, y, area: length * y + a * b, calculation: `${length}\\cdot${y}+${a}\\cdot${b}` }
  }
  if (plate === 'uPlate') {
    const x = length - 2 * a
    const y = height - b
    return { x, y, area: length * height - x * y, calculation: `${length}\\cdot${height}-${x}\\cdot${y}` }
  }
  if (plate === 'tPlate') {
    const x = (length - a) / 2
    const y = height - b
    return { x, y, area: length * b + a * y, calculation: `${length}\\cdot${b}+${a}\\cdot${y}` }
  }
  const x = length - 2 * a
  const y = height - 2 * b
  return { x, y, area: length * height - x * y, calculation: `${length}\\cdot${height}-${x}\\cdot${y}` }
}

function PlateSketch({ data, solved = false }: { data: DATA; solved?: boolean }) {
  const { plate } = data
  const { x, y } = measures(data)
  const shape =
    plate === 'step'
      ? 'M50 55 H170 V110 H300 V195 H50 Z'
      : plate === 'uPlate'
        ? 'M50 55 H300 V195 H50 Z M95 55 V150 H255 V55 Z'
        : plate === 'tPlate'
          ? 'M50 55 H300 V95 H205 V195 H145 V95 H50 Z'
          : 'M50 55 H300 V195 H50 Z M95 95 V155 H255 V95 Z'

  return (
    <svg viewBox="0 0 360 245" className="mx-auto my-4 w-full max-w-[420px]" role="img" aria-label="Technische Maßskizze; die Anordnung ist nicht maßstäblich">
      <path d={shape} fill="#eaf3ff" fillRule="evenodd" stroke="#1e3a5f" strokeWidth="3" strokeLinejoin="round" />
      <text x="125" y="234" fontSize="15" fill="#172033">L = {data.length} mm</text>
      <line x1="34" y1="55" x2="34" y2="195" stroke="#52647a" />
      <line x1="29" y1="55" x2="39" y2="55" stroke="#52647a" />
      <line x1="29" y1="195" x2="39" y2="195" stroke="#52647a" />
      <text x="8" y="38" fontSize="15" fill="#172033">H = {data.height} mm</text>
      {plate === 'step' && (
        <>
          <text x="84" y="47" fontSize="15">a = {data.a} mm</text>
          <text x="173" y="104" fontSize="15">b = {data.b} mm</text>
          <text x="208" y="128" fontSize="15" fill="#1d4ed8">x = {solved ? `${x} mm` : '?'}</text>
          <text x="225" y="176" fontSize="15" fill="#1d4ed8">y = {solved ? `${y} mm` : '?'}</text>
        </>
      )}
      {plate === 'uPlate' && (
        <>
          <text x="57" y="83" fontSize="14">a = {data.a} mm</text>
          <text x="200" y="185" fontSize="14">b = {data.b} mm</text>
          <text x="117" y="85" fontSize="15" fill="#1d4ed8">x = {solved ? `${x} mm` : '?'}</text>
          <text x="154" y="127" fontSize="15" fill="#1d4ed8">y = {solved ? `${y} mm` : '?'}</text>
        </>
      )}
      {plate === 'tPlate' && (
        <>
          <text x="155" y="175" fontSize="14">a = {data.a} mm</text>
          <text x="226" y="86" fontSize="14">b = {data.b} mm</text>
          <text x="66" y="115" fontSize="15" fill="#1d4ed8">x = {solved ? `${x} mm` : '?'}</text>
          <text x="215" y="143" fontSize="15" fill="#1d4ed8">y = {solved ? `${y} mm` : '?'}</text>
        </>
      )}
      {plate === 'frame' && (
        <>
          <text x="57" y="86" fontSize="14">a = {data.a} mm</text>
          <text x="211" y="186" fontSize="14">b = {data.b} mm</text>
          <text x="115" y="120" fontSize="15" fill="#1d4ed8">x = {solved ? `${x} mm` : '?'}</text>
          <text x="154" y="145" fontSize="15" fill="#1d4ed8">y = {solved ? `${y} mm` : '?'}</text>
        </>
      )}
    </svg>
  )
}

const plateNames: Record<Plate, string> = {
  step: 'ein Stufenblech',
  uPlate: 'eine U-förmige Platte',
  tPlate: 'eine T-förmige Platte',
  frame: 'einen rechteckigen Blechrahmen',
}

export const exercise13023: Exercise<DATA> = {
  title: 'Maße aus technischen Skizzen ableiten',
  source: 'Vorbereitungskurs Meister · Längen, Flächen, Volumen',
  useCalculator: false,
  duration: 10,
  generator(rng) {
    return {
      plate: rng.randomItemFromArray<Plate>(['step', 'uPlate', 'tPlate', 'frame']),
      length: rng.randomIntBetween(22, 32) * 10,
      height: rng.randomIntBetween(13, 20) * 10,
      a: rng.randomIntBetween(3, 8) * 10,
      b: rng.randomIntBetween(2, 5) * 10,
    }
  },
  originalData: { plate: 'step', length: 260, height: 140, a: 110, b: 50 },
  constraint({ data }) {
    return data.length > 2 * data.a && data.height > 2 * data.b && data.a > 0 && data.b > 0
  },
  intro({ data }) {
    return <p>Die Skizze zeigt {plateNames[data.plate]}. Alle Maße sind in Millimetern angegeben. Die Zeichnung ist nicht maßstäblich.</p>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <PlateSketch data={data} />
            <p>Bestimmen Sie die beiden fehlenden Maße x und y aus den Maßketten.</p>
          </>
        )
      },
      solution({ data }) {
        const { x, y } = measures(data)
        const xRule = data.plate === 'step' ? `${data.length}-${data.a}` : data.plate === 'tPlate' ? `\\frac{${data.length}-${data.a}}{2}` : `${data.length}-2\\cdot${data.a}`
        const yRule = data.plate === 'frame' ? `${data.height}-2\\cdot${data.b}` : `${data.height}-${data.b}`
        return (
          <>
            <PlateSketch data={data} solved />
            <BlockMath math={`x=${xRule}=${x}\\,\\mathrm{mm},\\qquad y=${yRule}=${y}\\,\\mathrm{mm}`} />
          </>
        )
      },
    },
    {
      points: 4,
      task() {
        return <p>Zerlegen Sie die Fläche in einfache Teilflächen oder ziehen Sie die Aussparung ab. Berechnen Sie den Flächeninhalt.</p>
      },
      solution({ data }) {
        const { area, calculation } = measures(data)
        return <BlockMath math={`A=${calculation}=${area}\\,\\mathrm{mm}^2`} />
      },
    },
  ],
}
