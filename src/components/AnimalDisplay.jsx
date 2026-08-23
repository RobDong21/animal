import { useEffect, useState } from 'react'
import { assetUrl } from '@/lib/assets'
import { cn } from '@/lib/utils'

export default function AnimalDisplay({ animal, className }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageError(false)
    setImageLoaded(false)
  }, [animal.id])

  return (
    <div className={cn('flex w-full flex-col items-center gap-4 lg:gap-6', className)}>
      <div className="game-animal-image radius-large relative flex w-full max-h-[34dvh] items-center justify-center overflow-hidden bg-muted/40 md:max-h-[36dvh] lg:max-h-none">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
        )}
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
            className={cn(
              'aspect-[4/3] w-full object-contain transition-opacity duration-200',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true)
              setImageLoaded(true)
            }}
          />
        )}
      </div>

      <h2 className="game-animal-name text-title">{animal.name}</h2>
    </div>
  )
}
