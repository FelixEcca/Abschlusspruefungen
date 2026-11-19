type Props = {
  expression?: 'friendly' | 'thinking'
  decorative?: boolean
  className?: string
}

export function GiselaAvatar({
  expression = 'friendly',
  decorative = false,
  className = '',
}: Props) {
  return (
    <img
      src={
        expression === 'thinking'
          ? '/img/gisela/gisela-thinking-v1.webp'
          : '/img/gisela/gisela-head-v1.webp'
      }
      width={256}
      height={256}
      alt={
        decorative
          ? ''
          : expression === 'thinking'
            ? 'Gisela denkt nach'
            : 'Gisela'
      }
      aria-hidden={decorative || undefined}
      draggable={false}
      className={`block aspect-square shrink-0 object-contain ${className}`}
    />
  )
}
