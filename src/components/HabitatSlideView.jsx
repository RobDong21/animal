import HabitatIcon from '@/components/HabitatIcon'
import { getHabitatImages } from '@/data/animals'
import { assetUrl } from '@/lib/assets'
import { cn } from '@/lib/utils'

export default function HabitatSlideView({ habitat, imageClassName }) {
  const images = getHabitatImages(habitat).slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <HabitatIcon habitatId={habitat.id} className="h-10 w-10 text-primary md:h-12 md:w-12" />
        <h3 className="text-3xl font-bold md:text-4xl">{habitat.name}</h3>
      </div>
      <p className="text-center text-lg text-muted-foreground md:text-xl">{habitat.description}</p>
      <div
        className={cn(
          'grid gap-3',
          images.length === 1 && 'grid-cols-1',
          images.length === 2 && 'grid-cols-2',
          images.length >= 3 && 'grid-cols-3'
        )}
      >
        {images.map((image) => (
          <figure key={image.src} className="space-y-2">
            <img
              src={assetUrl(image.src)}
              alt={image.caption || habitat.name}
              className={cn(
                'surface-frame w-full object-cover shadow-md',
                imageClassName ?? 'h-36 md:h-44 lg:h-52'
              )}
            />
            {image.caption && (
              <figcaption className="text-sm font-medium text-muted-foreground md:text-base">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
