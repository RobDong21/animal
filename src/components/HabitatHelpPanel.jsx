import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import HabitatSlideView from '@/components/HabitatSlideView'
import { cn } from '@/lib/utils'

export default function HabitatHelpPanel({ habitats, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const total = habitats.length
  const habitat = habitats[index]

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  function goPrev() {
    setIndex((i) => (i - 1 + total) % total)
  }

  function goNext() {
    setIndex((i) => (i + 1) % total)
  }

  if (!habitat) return null

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
        <CardHeader className="shrink-0 space-y-2 pb-3 text-center">
          <h2 id="habitat-help-title" className="text-3xl font-bold md:text-4xl">
            What is a habitat?
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl">
            Swipe to see each place. A habitat is where an animal lives.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <div className="relative px-10 md:px-12">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Previous habitat"
              className="absolute top-1/2 left-0 h-10 w-10 -translate-y-1/2 rounded-full bg-white/95 shadow-md md:h-11 md:w-11"
              onClick={goPrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <HabitatSlideView habitat={habitat} imageClassName="h-32 w-full object-cover md:h-40 lg:h-48" />

            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Next habitat"
              className="absolute top-1/2 right-0 h-10 w-10 -translate-y-1/2 rounded-full bg-white/95 shadow-md md:h-11 md:w-11"
              onClick={goNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {habitats.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show ${item.name}`}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  dotIndex === index ? 'w-6 bg-primary' : 'w-2.5 bg-primary/30'
                )}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>

          <p className="text-center text-base font-medium text-muted-foreground md:text-lg">
            {index + 1} of {total} · {habitat.name}
          </p>
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
