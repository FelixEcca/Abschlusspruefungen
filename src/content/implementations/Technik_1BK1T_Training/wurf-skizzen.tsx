function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = '#334155',
  both = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  both?: boolean
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const head = (x: number, y: number, a: number) =>
    `${x},${y} ${x - 7 * Math.cos(a - 0.4)},${y - 7 * Math.sin(a - 0.4)} ${x - 7 * Math.cos(a + 0.4)},${y - 7 * Math.sin(a + 0.4)}`
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" />
      <polygon points={head(x2, y2, angle)} stroke="none" />
      {both && <polygon points={head(x1, y1, angle + Math.PI)} stroke="none" />}
    </g>
  )
}

export function HorizontalWurfSkizze({
  height,
  distance,
  speed,
  impact = false,
}: {
  height: string
  distance: string
  speed: string
  impact?: boolean
}) {
  return (
    <svg
      viewBox="0 0 440 310"
      className="my-4 w-full max-w-xl"
      role="img"
      aria-label="Horizontaler Wurf von einer erhöhten Kante mit Fallstrecke y, horizontaler Entfernung x und Anfangsgeschwindigkeit v null"
    >
      <rect x="48" y="65" width="52" height="170" fill="#e2e8f0" />
      <path
        d="M35 65H100 M35 235H410"
        stroke="#334155"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M100 65 Q220 65 340 235"
        stroke="#2563eb"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="100" cy="65" r="4" fill="#2563eb" />
      <Arrow x1={100} y1={65} x2={395} y2={65} />
      <Arrow x1={100} y1={65} x2={100} y2={250} />
      <text x="402" y="69" fontSize="15">
        x
      </text>
      <text x="92" y="268" fontSize="15">
        y
      </text>
      <Arrow x1={100} y1={65} x2={185} y2={65} color="#2563eb" />
      <text x="120" y="47" fontSize="14" fill="#1d4ed8">
        {speed}
      </text>
      <line
        x1="340"
        y1="235"
        x2="340"
        y2="286"
        stroke="#94a3b8"
        strokeDasharray="4 4"
      />
      <line x1="100" y1="250" x2="100" y2="286" stroke="#94a3b8" />
      <Arrow x1={100} y1={281} x2={340} y2={281} both />
      <text x="220" y="303" textAnchor="middle" fontSize="14">
        {distance}
      </text>
      <line
        x1="340"
        y1="65"
        x2="415"
        y2="65"
        stroke="#94a3b8"
        strokeDasharray="4 4"
      />
      <Arrow x1={410} y1={65} x2={410} y2={235} both />
      <text x="400" y="150" textAnchor="end" fontSize="14">
        {height}
      </text>
      {impact && (
        <g>
          <line
            x1="340"
            y1="235"
            x2="390"
            y2="235"
            stroke="#94a3b8"
            strokeDasharray="3 3"
          />
          <Arrow x1={340} y1={235} x2={380} y2={263} color="#dc2626" />
          <path
            d="M360 235 A20 20 0 0 1 356.4 246.5"
            stroke="#dc2626"
            fill="none"
          />
          <text x="373" y="248" fontSize="13" fill="#dc2626">
            α
          </text>
          <text x="385" y="269" fontSize="14" fill="#dc2626">
            v
          </text>
        </g>
      )}
      <text x="35" y="20" fontSize="12" fill="#64748b">
        Prinzipskizze, nicht maßstäblich
      </text>
    </svg>
  )
}

// Every curve follows x = vx*t and y = vy*t - g*t²/2; g is scaled for the sketch.
export function FlugbahnVergleich({ variant }: { variant: number }) {
  const configurations = [
    [
      [4, 5, 0],
      [4, 5, 2],
    ],
    [
      [6 * Math.cos(Math.PI / 6), 3, 0],
      [3, 6 * Math.sin(Math.PI / 3), 0],
    ],
    [
      [4, 3, 0],
      [4, 5, 0],
    ],
    [[4, 4, 0]],
    [
      [4, 0, 2],
      [4, 3, 2],
    ],
    [
      [4, 4, 0],
      [6, 4, 0],
    ],
    [
      [3, 4, 0],
      [6, 4, 0],
    ],
    [[4, 4, 0]],
    [[4, 4, 0]],
    [[4, 4, 2]],
  ]
  const curves = configurations[variant] ?? configurations[0]
  const gravity = 4
  const flights = curves.map(([vx, vy, h]) => {
    const time = (vy + Math.sqrt(vy ** 2 + 2 * gravity * h)) / gravity
    return { vx, vy, h, time }
  })
  const maxX = Math.max(...flights.map(f => f.vx * f.time))
  const maxY = Math.max(...flights.map(f => f.h + f.vy ** 2 / (2 * gravity)))
  // One scale for both axes preserves angles in the 30°/60° comparison.
  const scale = Math.min(300 / maxX, 130 / Math.max(maxY, 1))
  const px = (x: number) => 60 + x * scale
  const py = (y: number) => 205 - y * scale
  return (
    <svg
      viewBox="0 0 410 270"
      className="my-4 w-full max-w-xl"
      role="img"
      aria-label="Prinzipskizze der im Text beschriebenen Flugbahnen; Wurf 1 blau, Wurf 2 orange gestrichelt"
    >
      <text x="20" y="18" fontSize="12" fill="#64748b">
        Prinzipskizze ohne Luftwiderstand
      </text>
      <Arrow x1={40} y1={205} x2={385} y2={205} />
      <Arrow x1={60} y1={220} x2={60} y2={35} />
      <text x="389" y="209" fontSize="14">
        x
      </text>
      <text x="46" y="36" fontSize="14">
        y
      </text>
      {flights.map((f, index) => {
        const color = index === 0 ? '#2563eb' : '#c2410c'
        const points = Array.from({ length: 81 }, (_, i) => {
          const t = (f.time * i) / 80
          return `${px(f.vx * t)},${py(f.h + f.vy * t - (gravity * t ** 2) / 2)}`
        }).join(' ')
        const peakTime = f.vy / gravity
        const peakX = px(f.vx * peakTime)
        const peakY = py(f.h + f.vy ** 2 / (2 * gravity))
        return (
          <g key={index}>
            {f.h > 0 && (
              <line
                x1="60"
                y1={py(f.h)}
                x2={px(f.vx * f.time)}
                y2={py(f.h)}
                stroke="#94a3b8"
                strokeDasharray="3 4"
              />
            )}
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeDasharray={index === 1 ? '7 4' : undefined}
            />
            <circle cx="60" cy={py(f.h)} r="4" fill={color} />
            {variant === 8 &&
              [0.5, 1.5].map(t => (
                <g key={t}>
                  <circle
                    cx={px(f.vx * t)}
                    cy={py(f.h + f.vy * t - (gravity * t ** 2) / 2)}
                    r="4"
                    fill={color}
                  />
                  <text
                    x={px(f.vx * t) + 7}
                    y={py(f.h + f.vy * t - (gravity * t ** 2) / 2) - 8}
                    fontSize="13"
                  >
                    {t < 1 ? 'P' : 'Q'}
                  </text>
                </g>
              ))}
            {variant === 1 && (
              <text
                x={index === 0 ? 98 : 69}
                y={index === 0 ? 192 : 168}
                fontSize="13"
                fill={color}
              >
                {index === 0 ? '30°' : '60°'}
              </text>
            )}
            {flights.length === 1 && (
              <>
                <circle cx={peakX} cy={peakY} r="4" fill={color} />
                <Arrow
                  x1={peakX}
                  y1={peakY}
                  x2={peakX + 48}
                  y2={peakY}
                  color={color}
                />
                <text x={peakX + 50} y={peakY - 7} fontSize="13" fill={color}>
                  vₓ
                </text>
                <Arrow
                  x1={peakX}
                  y1={peakY + 6}
                  x2={peakX}
                  y2={peakY + 48}
                  color="#dc2626"
                />
                <text x={peakX + 8} y={peakY + 47} fontSize="13" fill="#dc2626">
                  g
                </text>
              </>
            )}
          </g>
        )
      })}
      <text x="65" y="250" fontSize="13" fill="#2563eb">
        {flights.length > 1 ? 'Wurf 1 (durchgezogen)' : 'Flugbahn'}
      </text>
      {flights.length > 1 && (
        <text x="230" y="250" fontSize="13" fill="#c2410c">
          Wurf 2 (gestrichelt)
        </text>
      )}
    </svg>
  )
}
