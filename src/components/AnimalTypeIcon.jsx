import { Bird, Bug, Droplets, Fish, PawPrint, Shell, Turtle } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeIcons = {
  mammal: PawPrint,
  bird: Bird,
  fish: Fish,
  reptile: Turtle,
  amphibian: Droplets,
  insect: Bug,
  'other-invertebrate': Shell,
}

export default function AnimalTypeIcon({ typeId, className }) {
  const Icon = typeIcons[typeId]
  if (!Icon) return null

  return <Icon className={cn('shrink-0', className)} strokeWidth={2.5} aria-hidden="true" />
}
