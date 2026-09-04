export function constrainedGeneration<T>(
  gen: () => T,
  constraint: (data: T) => boolean,
  warn?: boolean,
) {
  let limit = 1000
  for (;;) {
    const data = gen()
    if (constraint(data)) {
      return data
    }

    if (--limit == 0) {
      if (warn) {
        alert('Contraint konnte nach 1000 Versuchen nicht erfüllt werden')
      }
      break
    }
  }
  return gen()
}
