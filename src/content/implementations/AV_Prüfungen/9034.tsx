// exercise9034.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  km: number

  cm: number
  dm: number

  mm: number
  cm2: number

  km2: number
  m2: number

  cm_2: number
  m_2: number
}

export const exercise9034: Exercise<DATA> = {
  title: 'Teil 1: Einheiten umrechnen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const m = rng.randomIntBetween(1000, 9000)
    const cm = rng.randomIntBetween(100, 900)
    const mm = rng.randomIntBetween(10, 90)
    const km2 = rng.randomItemFromArray([1.2, 2.4, 3.8, 4.74])
    const cm_2 = rng.randomIntBetween(1000, 9000)

    return {
      m,
      km: m / 1000,
      cm,
      dm: cm / 10,
      mm,
      cm2: mm / 10,
      km2,
      m2: km2 * 1000,
      cm_2,
      m_2: cm_2 / 100,
    }
  },

  originalData: {
    m: 1657,
    km: 1.657,
    cm: 427,
    dm: 42.7,
    mm: 27,
    cm2: 2.7,
    km2: 4.74,
    m2: 4740,
    cm_2: 17.8,
    m_2: 0.178,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die angegebene Einheit um.</p>

        <p>
          {data.m} m (km)
          <br />
          {data.cm} cm (dm)
          <br />
          {data.mm} mm (cm)
          <br />
          {pp(data.km2)} km (m)
          <br />
          {pp(data.cm_2)} cm (m)
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`${data.m}\\,m=${pp(data.km)}\\,km`} />
        <br />
        <InlineMath math={`${data.cm}\\,cm=${pp(data.dm)}\\,dm`} />
        <br />
        <InlineMath math={`${data.mm}\\,mm=${pp(data.cm2)}\\,cm`} />
        <br />
        <InlineMath math={`${pp(data.km2)}\\,km=${pp(data.m2)}\\,m`} />
        <br />
        <InlineMath math={`${data.cm_2}\\,cm=${pp(data.m_2)}\\,m`} />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zu Klammern:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/iRh4wA6TVy4"
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
