export function timeText(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}:${String(remainingMinutes).padStart(2, '0')} Uhr`
}

export function clock(minutes: number) {
  const minutesInDay = ((minutes % 1440) + 1440) % 1440
  return timeText(minutesInDay)
}
