import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import HabitatIcon from '@/components/HabitatIcon'
import { getHabitatHelpSlides } from '@/data/animals'
import { assetUrl } from '@/lib/assets'
import { cn } from '@/lib/utils'

export default function HabitatHelpPanel({ habitats, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
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

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
      role="presentation"
    >
      <Card
        ref={dialogRef}
        className="elevation-overlay relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="habitat-help-title"
        aria-modal="true"
      >
        <Button
          ref={closeButtonRef}
          type="button"
          variant="outline"
          size="icon"
          className="toolbar-button-icon surface-interactive-lg absolute top-4 right-4 z-10 font-bold transition-transform hover:scale-[1.02] active:scale-95"
          onClick={onClose}
          aria-label="Close"
        >
          <X />
        </Button>
        <CardHeader className="shrink-0 space-y-4 px-16 pb-4 text-center">
          {selectedHabitat && (
            <div className="flex items-center justify-center gap-2">
              <HabitatIcon habitatId={selectedHabitat.id} className="h-10 w-10 text-primary md:h-12 md:w-12" />
              <h2 id="habitat-help-title" className="text-title">
                {selectedHabitat.name}
              </h2>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            {habitats.map((habitat) => (
              <Button
                key={habitat.id}
                type="button"
                variant={habitat.id === selectedHabitatId ? 'default' : 'outline'}
                className="habitat-tab"
                onClick={() => setSelectedHabitatId(habitat.id)}
              >
                <HabitatIcon habitatId={habitat.id} className="h-4 w-4 md:h-5 md:w-5" />
                {habitat.name}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="min-h-0 space-y-4 overflow-y-auto pb-4">
          <div className="flex justify-center">
            <div className="radius-large relative aspect-[4/3] w-[80%] overflow-hidden border-normal border-border bg-muted">
              {currentSlide && (
                <img
                  src={assetUrl(currentSlide.src)}
                  alt={currentSlide.caption}
                  className="h-full w-full object-cover"
                />
              )}
              {hasMultipleSlides && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Previous picture"
                    className="carousel-control absolute top-1/2 left-2 -translate-y-1/2"
                    onClick={showPreviousSlide}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Next picture"
                    className="carousel-control absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={showNextSlide}
                  >
                    <ChevronRight />
                  </Button>
                </>
              )}
            </div>
          </div>

          {currentSlide && (
            <p className="text-component-title text-center">
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
                  className="slide-dot-button"
                  onClick={() => setSlideIndex(index)}
                >
                  <span
                    className={cn(
                      'slide-dot',
                      index === slideIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
