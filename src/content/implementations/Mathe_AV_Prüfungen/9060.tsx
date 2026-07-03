import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  dm: number
  m: number
  cm: number
  mm: number
  m2: number
  dm2: number
  dm3: number
  cm3: number
  mm2: number
  cm2: number
}

export const exercise9060: Exercise<DATA> = {
  title: 'Teil 1: Längeneinheiten',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const dm = rng.randomItemFromArray([120, 270, 340])
    const cm = rng.randomItemFromArray([12.5, 17.9, 24.3])
    const m2 = rng.randomItemFromArray([15, 25, 40])
    const dm3 = rng.randomItemFromArray([12.5, 62.125, 80.4])
    const mm2 = rng.randomItemFromArray([450, 763, 1280])
    return {
      dm,
      m: dm / 10,
      cm,
      mm: cm * 10,
      m2,
      dm2: m2 * 10,
      dm3,
      cm3: dm3 * 10,
      mm2,
      cm2: mm2 / 10,
    }
  },

  originalData: {
    dm: 270,
    m: 27,
    cm: 17.9,
    mm: 179,
    m2: 25,
    dm2: 250,
    dm3: 62.125,
    cm3: 621.25,
    mm2: 763,
    cm2: 76.3,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die in Klammern angegebene Einheit um.</p>
        <p>
          {data.dm} dm (m)
          <br />
          {pp(data.cm)} cm (mm)
          <br />
          {data.m2} m (dm)
          <br />
          {pp(data.dm3)} dm (cm)
          <br />
          {data.mm2} mm (cm)
        </p>
      </>
    )
  },

  solution({ data }) {
    const conversions = [
      { original: `${data.dm} dm`, result: `${pp(data.m)} m` },
      { original: `${pp(data.cm)} cm`, result: `${pp(data.mm)} mm` },
      { original: `${data.m2} m`, result: `${pp(data.dm2)} dm` },
      { original: `${pp(data.dm3)} dm`, result: `${pp(data.cm3)} cm` },
      { original: `${data.mm2} mm`, result: `${pp(data.cm2)} cm` },
    ]

    return (
      <>
        <p style={{ marginBottom: '20px' }}>Die Lösungen:</p>
        <div
          style={{
            display: 'grid',
            gap: '12px',
          }}
        >
          {conversions.map((conv, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                backgroundColor: '#f5f5f5',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  minWidth: '120px',
                }}
              >
                {conv.original}
              </span>
              <span style={{ fontSize: '18px', color: '#0066cc' }}>→</span>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#0066cc',
                  flex: 1,
                }}
              >
                {conv.result}
              </span>
            </div>
          ))}
        </div>
      </>
    )
  },
}
