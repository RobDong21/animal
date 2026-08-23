import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import HabitatIcon from '@/components/HabitatIcon'
import { getHabitatHelpSlides } from '@/data/animals'
import { assetUrl } from '@/lib/assets'
import { cn } from '@/lib/utils'

export default function HabitatHelpPanel({ habitats, onClose }) {
  const [selectedHabitatId, setSelectedHabitatId] = useState(habitats[0]?.id ?? null)
  const selectedHabitat = habitats.find((habitat) => habitat.id === selectedHabitatId) ?? null
  const slides = getHabitatHelpSlides(selectedHabitatId)
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    setSelectedHabitatId(habitats[0]?.id ?? null)
    setSlideIndex(0)
  }, [habitats])

  useEffect(() => {
    setSlideIndex(0)
  }, [selectedHabitatId])

  const currentSlide = slides[slideIndex]
  const hasMultipleSlides = slides.length > 1

  function showPreviousSlide() {
    setSlideIndex((index) => (index === 0 ? slides.length - 1 : index - 1))
  }

  function showNextSlide() {
    setSlideIndex((index) => (index + 1) % slides.length)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-3 md:items-center md:p-4"
      onClick={onClose}
      role="presentation"
    >
      <Card
        className="flex w-full max-w-4xl flex-col shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="habitat-help-title"
        aria-modal="true"
      >
        <CardHeader className="shrink-0 space-y-3 pb-3 text-center">
          {selectedHabitat && (
            <div className="flex items-center justify-center gap-3">
              <HabitatIcon habitatId={selectedHabitat.id} className="h-10 w-10 text-primary md:h-12 md:w-12" />
              <h2 id="habitat-help-title" className="text-3xl font-bold md:text-4xl">
                {selectedHabitat.name}
              </h2>
            </div>
          )}
          <p className="text-lg text-muted-foreground md:text-xl">
            {selectedHabitat
              ? `Learn about the ${selectedHabitat.name.toLowerCase()}.`
              : 'Learn where animals live.'}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {habitats.map((habitat) => (
              <Button
                key={habitat.id}
                type="button"
                variant={habitat.id === selectedHabitatId ? 'default' : 'outline'}
                size="sm"
                className="gap-1.5 text-sm md:text-base"
                onClick={() => setSelectedHabitatId(habitat.id)}
              >
                <HabitatIcon habitatId={habitat.id} className="h-4 w-4 md:h-5 md:w-5" />
                {habitat.name}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border-normal border-border bg-muted shadow-md">
              {currentSlide && (
                <img
                  src={assetUrl(currentSlide.src)}
                  alt={currentSlide.caption}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            {hasMultipleSlides && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label="Previous picture"
                  className="absolute top-1/2 left-2 h-12 w-12 -translate-y-1/2 rounded-full border-normal bg-white/95 text-2xl shadow-md md:left-3 md:h-14 md:w-14"
                  onClick={showPreviousSlide}
                >
                  ‹
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label="Next picture"
                  className="absolute top-1/2 right-2 h-12 w-12 -translate-y-1/2 rounded-full border-normal bg-white/95 text-2xl shadow-md md:right-3 md:h-14 md:w-14"
                  onClick={showNextSlide}
                >
                  ›
                </Button>
              </>
            )}
          </div>

          {currentSlide && (
            <p className="text-center text-xl font-semibold leading-snug md:text-2xl">
              {currentSlide.caption}
            </p>
          )}

          {hasMultipleSlides && (
            <div className="flex items-center justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Show picture ${index + 1} of ${slides.length}`}
                  className={cn(
                    'h-3 w-3 rounded-full transition-colors',
                    index === slideIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                  onClick={() => setSlideIndex(index)}
                />
              ))}
            </div>
          )}
        </CardContent>
        <div className="shrink-0 border-t border-border p-4 pt-3">
          <Button size="lg" className="w-full text-lg md:text-xl" onClick={onClose}>
            Back to game
          </Button>
        </div>
      </Card>
    </div>
  )
}
