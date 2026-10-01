import { Exercise } from '@/data/types'

interface DATA {
  stockLengthM: number
  pieceCount: number
  pieceLengthCm: number
}

export const exercise14000: Exercise<DATA> = {
  title: 'Materialbedarf beim Zuschnitt',
  source: 'AV BFK Metall',
  useCalculator: false,
  duration: 5,
  points: 2,
  generator(rng) {
    return {
      stockLengthM: rng.randomIntBetween(-2, 2),
      pieceCount: rng.randomIntBetween(-8, 8),
      pieceLengthCm: rng.randomIntBetween(-90, 90, 15),
    }
  },
  originalData: {
    stockLengthM: 2,
    pieceCount: 5,
    pieceLengthCm: 75,
  },
  task({ data }) {
    return (
      <p>
        Ein Schloser soll aus einer {data.stockLengthM} m langen
        Flachstahlstange {data.pieceCount} Werkstücke mit jeweils{' '}
        {data.pieceLengthCm} cm Länge zuschneiden. Berechne, wie viel Material
        nach dem Zuschnitt übrig bleibt.
      </p>
    )
  },
  solution({ data }) {
    const availableLengthCm = data.stockLengthM * 100
    const requiredLengthCm = data.pieceCount * data.pieceLengthCm
    const remainingLengthCm = availableLengthCm - requiredLengthCm

    return (
      <p>
        Für {data.pieceCount} Werkstücke werden insgesamt {requiredLengthCm} cm
        Flachstahl benötigt. Die vorhandene Stange ist {availableLengthCm} cm
        lang. Der Materialrest beträgt {remainingLengthCm} cm.
      </p>
    )
  },
}
