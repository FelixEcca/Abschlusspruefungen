import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'

type Conversion = 'length' | 'area' | 'volume'

interface DATA {
  conversion: Conversion
  factor: number
  baseValue: number
}

export const exercise13020: Exercise<DATA> = {
  title: 'Länge, Fläche und Volumen unterscheiden',
  source: 'Vorbereitungskurs Meister · Längen, Flächen, Volumen',
  useCalculator: false,
  duration: 7,
  generator(rng) {
    return {
      conversion: rng.randomItemFromArray<Conversion>([
        'length',
        'area',
        'volume',
      ]),
      factor: rng.randomIntBetween(2, 12),
      baseValue: rng.randomIntBetween(2, 20),
    }
  },
  originalData: {
    conversion: 'area',
    factor: 6,
    baseValue: 12,
  },
  constraint({ data }) {
    return data.factor > 0 && data.baseValue > 0
  },
  intro() {
    return (
      <p>
        In technischen Unterlagen muss die Einheit zur angegebenen Größe passen.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      task({ data }) {
        return (
          <>
            <p>
              Korrigieren Sie nur die falschen Einheiten im Prüfprotokoll.
              Lassen Sie die Zahlenwerte unverändert.
            </p>
            <ul className="list-disc pl-6">
              <li>Schnittlänge: {data.baseValue * 100} mm</li>
              <li>Blechfläche: {data.factor * 1000} mm</li>
              <li>Behälterinhalt: {data.baseValue * data.factor} dm²</li>
              <li>Randlänge einer Platte: {data.baseValue * 10} mm²</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <ul className="list-disc pl-6">
            <li>Schnittlänge: {data.baseValue * 100} mm (bereits korrekt).</li>
            <li>
              Blechfläche: {data.factor * 1000} mm².
            </li>
            <li>
              Behälterinhalt: {' '}
              {data.baseValue * data.factor} dm³.
            </li>
            <li>Randlänge einer Platte: {data.baseValue * 10} mm.</li>
          </ul>
        )
      },
    },
    {
      points: 3,
      task({ data }) {
        const prompt =
          data.conversion === 'length'
            ? `${data.baseValue * 100}\\,\\mathrm{mm}`
            : data.conversion === 'area'
              ? `${data.baseValue * 100}\\,\\mathrm{mm}^2`
              : `${data.baseValue * 1000}\\,\\mathrm{cm}^3`
        const target =
          data.conversion === 'length'
            ? 'cm'
            : data.conversion === 'area'
              ? 'cm²'
              : 'dm³'
        return (
          <>
            <p>Rechnen Sie in {target} um.</p>
            <BlockMath math={prompt} />
          </>
        )
      },
      solution({ data }) {
        const calculation =
          data.conversion === 'length'
            ? `${data.baseValue * 100}\\,\\mathrm{mm}=${data.baseValue * 10}\\,\\mathrm{cm}`
            : data.conversion === 'area'
              ? `${data.baseValue * 100}\\,\\mathrm{mm}^2=${data.baseValue}\\,\\mathrm{cm}^2`
              : `${data.baseValue * 1000}\\,\\mathrm{cm}^3=${data.baseValue}\\,\\mathrm{dm}^3`
        return <BlockMath math={calculation} />
      },
    },
  ],
}
