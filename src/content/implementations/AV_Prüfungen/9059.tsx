import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  g: number
  kg: number
  l: number
  ml: number
  ct: number
  euro: number
  dm3: number
  m3: number
  cm3: number
  mm3: number
}

export const exercise9059: Exercise<DATA> = {
  title: 'Teil 1: Einheiten umwandeln',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const g = rng.randomItemFromArray([1250, 2500, 4250, 7800])
    const l = rng.randomItemFromArray([1.5, 2.5, 3.75])
    const ct = rng.randomItemFromArray([980, 1280, 2450])
    const dm3 = rng.randomItemFromArray([125, 342, 780])
    const cm3 = rng.randomItemFromArray([4.5, 8.75, 12.4])
    return {
      g,
      kg: g / 1000,
      l,
      ml: l * 1000,
      ct,
      euro: ct / 100,
      dm3,
      m3: dm3 / 1000,
      cm3,
      mm3: cm3 * 1000,
    }
  },

  originalData: {
    g: 4250,
    kg: 4.25,
    l: 2.5,
    ml: 2500,
    ct: 1280,
    euro: 12.8,
    dm3: 342,
    m3: 0.342,
    cm3: 8.75,
    mm3: 8750,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die in Klammern angegebene Einheit um.</p>
        <p>
          {data.g} g (kg)
          <br />
          {pp(data.l)} l (ml)
          <br />
          {data.ct} ct (€)
          <br />
          {data.dm3} dm³ (m³)
          <br />
          {pp(data.cm3)} cm³ (mm³)
        </p>
      </>
    )
  },

  solution({ data }) {
    const conversions = [
      { original: `${data.g} g`, result: `${pp(data.kg)} kg` },
      { original: `${pp(data.l)} l`, result: `${pp(data.ml)} ml` },
      { original: `${data.ct} ct`, result: `${pp(data.euro)} €` },
      { original: `${data.dm3} dm³`, result: `${pp(data.m3)} m³` },
      { original: `${pp(data.cm3)} cm³`, result: `${pp(data.mm3)} mm³` },
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
