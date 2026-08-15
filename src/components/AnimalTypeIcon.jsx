import { cn } from '@/lib/utils'

const typeEmojis = {
  mammal: '🐾',
  bird: '🐦',
  fish: '🐟',
  insect: '🐛',
  reptile: '🦎',
  'sea-creature': '🦀',
}

export default function AnimalTypeIcon({ typeId, className }) {
  const emoji = typeEmojis[typeId]
  if (!emoji) return null

  return (
    <span className={cn('leading-none', className)} aria-hidden="true">
      {emoji}
    </span>
  )
}
