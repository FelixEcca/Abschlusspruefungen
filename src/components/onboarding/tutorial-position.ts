export type TourRect = {
  left: number
  top: number
  width: number
  height: number
}

export function positionGuide(
  target: TourRect,
  width: number,
  height: number,
  viewport: { width: number; height: number },
) {
  const gap = 16
  const right = target.left + target.width
  const bottom = target.top + target.height
  const candidates = [
    { left: target.left + target.width / 2 - width / 2, top: bottom + gap },
    {
      left: target.left + target.width / 2 - width / 2,
      top: target.top - height - gap,
    },
    { left: right + gap, top: target.top + target.height / 2 - height / 2 },
    {
      left: target.left - width - gap,
      top: target.top + target.height / 2 - height / 2,
    },
  ]
  return candidates
    .map(candidate => {
      const left = Math.max(
        12,
        Math.min(candidate.left, viewport.width - width - 12),
      )
      const top = Math.max(
        12,
        Math.min(candidate.top, viewport.height - height - 12),
      )
      const overlap =
        Math.max(
          0,
          Math.min(left + width, right) - Math.max(left, target.left),
        ) *
        Math.max(0, Math.min(top + height, bottom) - Math.max(top, target.top))
      const displacement =
        Math.abs(left - candidate.left) + Math.abs(top - candidate.top)
      return { left, top, score: overlap * 100 + displacement }
    })
    .sort((a, b) => a.score - b.score)[0]
}

export function guideWidth(
  target: TourRect | null,
  viewportWidth: number,
  viewportHeight: number,
) {
  const defaultWidth = Math.min(360, viewportWidth - 24)
  if (target && target.height > viewportHeight / 2) {
    const sideSpace =
      Math.max(target.left, viewportWidth - target.left - target.width) - 32
    if (sideSpace >= 220) return Math.min(defaultWidth, sideSpace)
  }
  return defaultWidth
}
