import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  A: [number, number]
  B: [number, number]
  C: [number, number]
  D: [number, number]
  mirrored: {
    A: [number, number]
    B: [number, number]
    C: [number, number]
    D: [number, number]
  }
}

export const exercise3200: Exercise<DATA> = {
  title: 'Rechteck im Koordinatensystem',
  source: '2025 Pflichtteil Aufgabe 1A',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    const width = rng.randomIntBetween(2, 5)
    const height = rng.randomIntBetween(2, 5)
    const x = rng.randomIntBetween(-5, -2)
    const y = rng.randomIntBetween(3, 5)

    const A: [number, number] = [x, y]
    const B: [number, number] = [x + width, y]
    const C: [number, number] = [x + width, y - height]
    const D: [number, number] = [x, y - height]

    const mirrored = {
      A: [-A[0], -A[1]] as [number, number],
      B: [-B[0], -B[1]] as [number, number],
      C: [-C[0], -C[1]] as [number, number],
      D: [-D[0], -D[1]] as [number, number],
    }

    const data: DATA = { A, B, C, D, mirrored }
    return data
  },
  originalData: {
    A: [-3, 1.5],
    B: [1, 1.5],
    C: [-1, 4],
    D: [-3, 4],
    mirrored: {
      A: [3, -5],
      B: [-1, -5],
      C: [-1, -4],
      D: [3, -4],
    },
  },
  constraint() {
    return true
  },
  intro() {
    return (
      <>
        <p>Gegeben ist ein Viereck ABCD.</p>
      </>
    )
  },
  tasks: [
    {
      points: 12,
      task({ data }) {
        return (
          <>
            <p>
              Zeichnen Sie das Viereck ABCD mit den Eckpunkten A (
              {pp(data.A[0])}|{pp(data.A[1])}), B({pp(data.B[0])}|
              {pp(data.B[1])}), C({pp(data.C[0])}|{pp(data.C[1])}) und D(
              {pp(data.D[0])}|{pp(data.D[1])}) in ein rechtwinkliges
              Koordinatensystem.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Das Viereck sollte etwa so aussehen:</p>
            <svg viewBox="-10 -10 20 20" width="328" height="328">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                </marker>
              </defs>

              {/* Achsen */}
              <line
                x1="-10"
                y1="0"
                x2="10"
                y2="0"
                stroke="black"
                strokeWidth={0.1}
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="0"
                y1="10"
                x2="0"
                y2="-10"
                stroke="black"
                strokeWidth={0.1}
                markerEnd="url(#arrowhead)"
              />

              {/* Skala auf der x-Achse */}
              {Array.from({ length: 21 }, (_, i) => i - 10).map(
                x =>
                  x !== 0 && (
                    <g key={`x${x}`}>
                      <line
                        x1={x}
                        y1="-0.2"
                        x2={x}
                        y2="0.2"
                        stroke="black"
                        strokeWidth={0.05}
                      />
                      <text x={x - 0.15} y={0.7} fontSize="0.5">
                        {x}
                      </text>
                    </g>
                  ),
              )}

              {/* Skala auf der y-Achse */}
              {Array.from({ length: 21 }, (_, i) => i - 10).map(
                y =>
                  y !== 0 && (
                    <g key={`y${y}`}>
                      <line
                        x1="-0.2"
                        y1={-y}
                        x2="0.2"
                        y2={-y}
                        stroke="black"
                        strokeWidth={0.05}
                      />
                      <text x={0.4} y={-y + 0.2} fontSize="0.5">
                        {y}
                      </text>
                    </g>
                  ),
              )}

              {/* Viereck */}
              <polygon
                points={`${data.A[0]},${-data.A[1]} ${data.B[0]},${-data.B[1]} ${data.C[0]},${-data.C[1]} ${data.D[0]},${-data.D[1]}`}
                fill="none"
                stroke="blue"
                strokeWidth={0.1}
              />

              {/* Punkte-Beschriftungen */}
              {(['A', 'B', 'C', 'D'] as const).map(p => (
                <text
                  key={p}
                  x={data[p][0] + 0.2}
                  y={-data[p][1] - 0.2}
                  fontSize="0.5"
                >
                  {p}
                </text>
              ))}
            </svg>
          </>
        )
      },
    },
    {
      points: 10,
      task() {
        return <p>Begründen Sie, um welche Art von Viereck es sich handelt.</p>
      },
      solution() {
        return (
          <p>
            Die gegenüberliegende Seiten sind gleich lang und parallel und alle
            Winkel sind rechte Winkel. Daher handelt es sich um ein Rechteck.
          </p>
        )
      },
    },
    {
      points: 10,
      task() {
        return (
          <p>
            Das Viereck ABCD wird am Ursprung gespiegelt. Geben Sie die
            Koordinaten der Bildpunkte A‘, B‘, C‘ und D‘ an.
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            Nach einer Spiegelung am Ursprung ergeben sich die Punkte: A′(
            {pp(data.mirrored.A[0])}|{pp(data.mirrored.A[1])}), B′(
            {pp(data.mirrored.B[0])}|{pp(data.mirrored.B[1])}), C′(
            {pp(data.mirrored.C[0])}|{pp(data.mirrored.C[1])}), D′(
            {pp(data.mirrored.D[0])}|{pp(data.mirrored.D[1])}).
          </p>
        )
      },
    },
  ],
}
