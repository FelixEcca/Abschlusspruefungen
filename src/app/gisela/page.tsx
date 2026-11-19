import dynamic from 'next/dynamic'

const GiselaLooks = dynamic(() => import('./GiselaLooks'), { ssr: false })

export default function GiselaLooksPage() {
  return <GiselaLooks />
}
