// exercise9024.tsx
import { Exercise } from '@/data/types'

interface DATA {
  labels: string[]
  values: number[]
}

export const exercise9024: Exercise<DATA> = {
  title: 'Teil 2: Säulendiagramm',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const labels = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
    const values = [
      rng.randomItemFromArray([5.5, 6.5, 7.5, 8.5]),
      rng.randomItemFromArray([4, 5, 6, 7]),
      rng.randomItemFromArray([5.5, 6.5, 7.5, 8]),
      rng.randomItemFromArray([4.5, 5.5, 6.5, 7]),
      rng.randomItemFromArray([3, 4, 5, 6]),
    ]
    return { labels, values }
  },

  originalData: {
    labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
    values: [8.5, 6, 7.5, 6.5, 4],
  },

  constraint({ data }) {
    return data.labels.length === data.values.length
  },

  task({ data }) {
    return (
      <>
        <p>Ihr Lehrer hat Arbeitszeiten notiert:</p>
        <p>
          {data.labels.map((label, i) => (
            <span key={label}>
              {label}: {data.values[i]} Stunden
              <br />
            </span>
          ))}
        </p>
        <p>Stellen Sie die notierten Zeiten in einem Säulendiagramm dar.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Ein mögliches Säulendiagramm sieht so aus:</p>

        <svg viewBox="0 0 328 230">
          <line x1="45" y1="190" x2="305" y2="190" stroke="black" />
          <line x1="45" y1="25" x2="45" y2="190" stroke="black" />

          {Array.from({ length: 10 }, (_, i) => i).map(v => (
            <g key={v}>
              <line
                x1="42"
                y1={190 - v * 16}
                x2="45"
                y2={190 - v * 16}
                stroke="black"
              />
              <text x="25" y={194 - v * 16} fontSize="10">
                {v}
              </text>
            </g>
          ))}

          {data.values.map((v, i) => {
            const x = 65 + i * 48
            const h = v * 16
            return (
              <g key={i}>
                <rect x={x} y={190 - h} width="28" height={h} fill="#888" />
                <text x={x + 2} y={185 - h} fontSize="10">
                  {v}
                </text>
                <text x={x + 8} y="208" fontSize="9">
                  {data.labels[i].slice(0, 2)}
                </text>
              </g>
            )
          })}
        </svg>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Säulendiagramm:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/N3w-hBbgLqY"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
