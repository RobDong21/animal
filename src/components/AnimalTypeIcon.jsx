import { Bird, Bug, Fish, PawPrint, Shell, Turtle } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeIcons = {
  mammal: PawPrint,
  bird: Bird,
  fish: Fish,
  insect: Bug,
  reptile: Turtle,
  'sea-creature': Shell,
}

export default function AnimalTypeIcon({ typeId, className }) {
  const Icon = typeIcons[typeId]
  if (!Icon) return null

  return <Icon className={cn('shrink-0', className)} strokeWidth={2.5} aria-hidden="true" />
}
