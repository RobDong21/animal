import {
  Home,
  Snowflake,
  Sun,
  Sunrise,
  Tractor,
  TreePalm,
  Trees,
  Waves,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const habitatIcons = {
  home: Home,
  farm: Tractor,
  forest: Trees,
  ocean: Waves,
  desert: Sun,
  jungle: TreePalm,
  polar: Snowflake,
  savannah: Sunrise,
}

export default function HabitatIcon({ habitatId, className }) {
  const Icon = habitatIcons[habitatId]
  if (!Icon) return null
  return <Icon className={cn('shrink-0', className)} aria-hidden="true" />
}
