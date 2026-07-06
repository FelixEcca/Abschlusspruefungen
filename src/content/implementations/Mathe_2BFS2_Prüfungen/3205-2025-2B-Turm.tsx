import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

type DATA = {
  // Geometrie/Preise (randomisiert)
  d: number // Außendurchmesser des Turms [m]
  hz: number // zylindrische Höhe des Turms [m]
  hD: number // Höhe des kegeligen Dachs [m]
  price: number // €/m² für Ziegel
  deliveredA: number // gelieferte Ziegelfläche [m²]
  w: number // Wanddicke [m]
  hWall: number // Höhe des Hohlraums bzw. der Wand [m]

  // abgeleitet
  R: number // Außenradius
  r: number // Innenradius
  s: number // Mantellinie des Kegels
  roofArea: number // Dachmantelfläche
  wallVolume: number // Volumen der Zylinderwand
  costDelivered: number // Kosten für gelieferte Ziegel
}

export const exercise3205: Exercise<DATA> = {
  title: 'Turm',
  source: '2025 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // ### Randomisierung (wertefreundlich, ganzzahlig, realistisch)
    const d = rng.randomIntBetween(16, 28) // m
    const hz = rng.randomIntBetween(20, 32) // m
    const hD = rng.randomIntBetween(8, 16) // m
    const price = rng.randomItemFromArray([25, 30, 35, 40]) // €/m²
    const deliveredA = (rng.randomIntBetween(420, 780) * 10) / 10 // in m², grob 420..780
    const w = rng.randomItemFromArray([2, 3, 4, 5]) // m
    const hWall = hz // wie in Vorlage: Hohlraumhöhe = Turmhöhe

    const R = d / 2
    const r = Math.max(0.5, R - w) // Sicherheitskappe, echte Prüfung via constraint()
    const s = Math.sqrt(R * R + hD * hD)
    const roofArea = Math.PI * R * s
    const wallVolume = Math.PI * hWall * (R * R - r * r)
    const costDelivered = price * deliveredA

    return {
      d,
      hz,
      hD,
      price,
      deliveredA,
      w,
      hWall,
      R,
      r,
      s,
      roofArea,
      wallVolume,
      costDelivered,
    }
  },

  // Feste Originaldaten aus der Abbildung (nutzen wir als deterministisches Beispiel)
  originalData: {
    d: 21,
    hz: 28,
    hD: 12,
    price: 35,
    deliveredA: 560,
    w: 4,
    hWall: 28,

    R: 10.5,
    r: 6.5,
    s: Math.sqrt(10.5 * 10.5 + 12 * 12),
    roofArea: Math.PI * 10.5 * Math.sqrt(10.5 * 10.5 + 12 * 12),
    wallVolume: Math.PI * 28 * (10.5 * 10.5 - 6.5 * 6.5),
    costDelivered: 35 * 560,
  } as DATA,

  constraint({ data }) {
    // Sinnvolle Geometrie + Aufgabenstellung:
    // - Wanddicke echt: r = R - w > 0
    // - Dachfläche > 0, Volumen > 0
    // - Preis und gelieferte Fläche positiv
    const R = data.R ?? data.d / 2
    const r = data.r ?? data.d / 2 - data.w
    const s = data.s ?? Math.sqrt((data.d / 2) ** 2 + data.hD ** 2)

    const okDims =
      R > 0 && r > 0 && r < R && data.hz > 0 && data.hD > 0 && s > 0
    const okGiven = data.price > 0 && data.deliveredA > 0
    const okWalls = Math.PI * (R * R - r * r) > 0
    return !!(okDims && okGiven && okWalls)
  },

  intro({ data }) {
    return (
      <div className="space-y-3">
        <p>
          Die Abbildung zeigt einen zylinderförmigen Turm mit Durchmesser{' '}
          <InlineMath math={`d=${data.d}\\,\\text{m}`} />. Er hat ein
          kegelförmiges Dach mit der Höhe{' '}
          <InlineMath math={`h_D=${data.hD}\\,\\text{m}`} />. <br></br>Für das
          Dach wurden <InlineMath math={`${data.deliveredA}\\,\\text{m}^2`} />{' '}
          Ziegel geliefert.
        </p>

        {/* Geometrie-Grafik: unverändertes Hintergrundbild */}
        <svg viewBox="0 0 328 250" className="w-full border rounded">
          <image
            href="/content/Mathe_2BFS2/3205.png"
            x="0"
            y="0"
            width="328"
            height="250"
          />
          {/* Durchmesser d */}

          <text x={65} y={245} fontSize={16} textAnchor="middle" fill="black">
            d = {data.d} m
          </text>
          <text x={250} y={245} fontSize={16} textAnchor="middle" fill="black">
            d = {data.d} m
          </text>

          {/* Höhe Turm hz */}

          <text
            x={150}
            y={20}
            fontSize={16}
            textAnchor="end"
            fill="black "
            transform="rotate(-90 195 70)"
          >
            h = {data.hz} m
          </text>
          <text
            x={150}
            y={198}
            fontSize={16}
            textAnchor="end"
            fill="black "
            transform="rotate(-90 195 70)"
          >
            h = {data.hz} m
          </text>

          {/* Höhe Dach hD */}

          <text
            x={245}
            y={20}
            fontSize={16}
            textAnchor="end"
            fill="black"
            transform="rotate(-90 195 70)"
          >
            hD = {data.hD} m
          </text>

          {/* Marker definitions for arrows */}
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
        </svg>
      </div>
    )
  },

  tasks: [
    // (1) Kosten der gelieferten Ziegel
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              1&nbsp;m<sup>2</sup> Ziegel kostet{' '}
              <InlineMath math={`${data.price}\\,\\text{EUR}`} />. Berechnen Sie
              die Kosten der gelieferten Ziegelmenge.
            </p>
          </>
        )
      },
      solution({ data }) {
        const cost = data.price * data.deliveredA
        return (
          <div className="space-y-2">
            <BlockMath
              math={`Kosten = ${data.price}\\cdot ${data.deliveredA} = ${cost}\\,\\text{EUR}`}
            />
            <p>
              Kosten:&nbsp;<strong>{cost.toLocaleString('de-DE')}</strong>
              &nbsp;EUR.
            </p>
          </div>
        )
      },
    },

    // (2) Reicht die gelieferte Menge für das Dach?
    {
      points: 14,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechnen Sie, ob die gelieferte Menge an Dachziegeln ausreicht.
            </p>
          </>
        )
      },
      solution({ data }) {
        const R = data.d / 2
        const s = Math.sqrt(R * R + data.hD * data.hD)
        const A = Math.PI * R * s
        const ok = data.deliveredA >= A
        return (
          <>
            <p>
              Berechne die Schräge s im rechtwinkligen Dreieck und anschließend
              die Dachfläche.
            </p>
            <svg viewBox="0 0 328 250">
              <image
                href="/content/Mathe_2BFS2/3205_2.png"
                x="0"
                y="0"
                width="328"
                height="250"
              />
            </svg>
            <div className="space-y-2">
              <BlockMath
                math={String.raw`
              \begin{aligned}
              R            &= \frac{${data.d}}{2} =\, ${pp(Math.round(100 * R) / 100)}\,\text{m} \\
              s            &= \sqrt{R^2 + h_D^2} \\
                     &= \sqrt{${pp(Math.round(100 * R) / 100)}^2 + ${data.hD}^2} \\
                     &=\, ${pp(Math.round(100 * s) / 100)}\,\text{m} \\
              A_{\text{Dach}} &= \pi \cdot R \cdot s \\
                     &= \pi \cdot ${pp(Math.round(100 * R) / 100)} \cdot ${pp(Math.round(100 * s) / 100)} \\
                     &=\, ${pp(Math.round(100 * A) / 100)}\,\text{m}^2
              \end{aligned}
              `}
              />
              <p>
                Geliefert:{' '}
                <InlineMath math={`${data.deliveredA}\\,\\text{m}^2`} />.
              </p>
              <p>
                Ergebnis:{' '}
                {ok ? (
                  <strong>Die Menge reicht aus.</strong>
                ) : (
                  <strong>Die Menge reicht nicht aus.</strong>
                )}
              </p>
            </div>
          </>
        )
      },
    },

    // (3) Volumen der Zylinderwand
    {
      points: 14,
      intro({ data }) {
        return (
          <p>
            Der Turm hat einen zylindrischen Hohlraum in der Mitte mit Höhe{' '}
            <InlineMath math={`h=${data.hWall}\\,\\text{m}`} />. Die Wand
            besitzt eine Dicke von{' '}
            <InlineMath math={`w=${data.w}\\,\\text{m}`} />.
          </p>
        )
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie das Volumen der Wand.</p>
          </>
        )
      },
      solution({ data }) {
        const R = data.d / 2
        const r = R - data.w
        const V = Math.PI * data.hWall * (R * R - r * r)
        return (
          <div className="space-y-2">
            <BlockMath
              math={`R=\\tfrac{${data.d}}{2}=\\,${pp(Math.round(R * 100) / 100)}\\,\\text{m},\\\\ r=R-w=\\,${pp(Math.round(r * 100) / 100)}\\,\\text{m}`}
            />
            <p>Berechne das Volumen der Wand mit der Formel:</p>
            <BlockMath
              math={`V=\\pi\\,h\\,(R^2-r^2)=\\pi\\cdot ${data.hWall}\\cdot (${pp(Math.round(R * 100) / 100)}^2-${pp(Math.round(r * 100) / 100)}^2)=\\,${pp(Math.round(V * 100) / 100)}\\,\\text{m}^3`}
            />
            <p>
              Das Wandvolumen beträgt{' '}
              <strong>{pp(Math.round(V * 100) / 100)} m³</strong>.
            </p>
          </div>
        )
      },
    },
  ],
}
