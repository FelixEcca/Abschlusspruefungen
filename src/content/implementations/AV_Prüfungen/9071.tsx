import { Exercise } from '@/data/types'

interface DATA {
  categories: string[]
  values: number[]
  total: number
}

export const exercise9071: Exercise<DATA> = {
  title: 'Teil 2: Säulendiagramm',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const categories = ['Sparen', 'Eltern', 'Freizeit', 'Bildung']
    const values = [
      rng.randomItemFromArray([200, 250, 300]),
      rng.randomItemFromArray([100, 150, 200]),
      rng.randomItemFromArray([250, 300, 350]),
      rng.randomItemFromArray([50, 70, 90]),
    ]
    return { categories, values, total: values.reduce((a, b) => a + b, 0) }
  },

  originalData: {
    categories: ['Sparen', 'Eltern', 'Schöne Dinge', 'Bildung'],
    values: [250, 150, 300, 70],
    total: 770,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Sie haben jeden Monat folgende Ausgaben:</p>
        <ul>
          {data.categories.map((category, index) => (
            <li key={category}>
              {category}: {data.values[index]} €
            </li>
          ))}
        </ul>
        <p>Erstellen Sie für die monatlichen Ausgaben ein Säulendiagramm.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <svg viewBox="0 0 360 220">
          <line x1="40" y1="190" x2="330" y2="190" stroke="black" />
          <line x1="40" y1="20" x2="40" y2="190" stroke="black" />
          {data.values.map((value, index) => (
            <rect
              key={index}
              x={65 + index * 65}
              y={190 - value / 2}
              width="35"
              height={value / 2}
              fill="#999"
              stroke="black"
            />
          ))}
        </svg>
        <p>Gesamtausgaben: {data.total} €.</p>
      </>
    )
  },
}
