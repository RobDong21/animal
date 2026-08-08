import { useState } from 'react'
import { assetUrl } from '@/lib/assets'
import { cn } from '@/lib/utils'

export default function AnimalDisplay({ animal, className }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={cn('flex w-full flex-col items-center gap-5 md:gap-6', className)}>
      <div className="surface-frame relative flex w-full items-center justify-center overflow-hidden bg-muted/40 shadow-lg">
        {imageError ? (
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-muted">
            <span className="text-7xl font-bold text-muted-foreground md:text-8xl">
              {animal.name.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={assetUrl(animal.image)}
            alt={animal.name}
            className="aspect-[4/3] w-full object-contain p-2 md:p-3"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{animal.name}</h2>
    </div>
  )
}
