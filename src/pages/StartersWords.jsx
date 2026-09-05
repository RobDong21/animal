import { useEffect, useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, Home, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  getStartersCategory,
  prepareStartersRound,
  startersCategories,
} from '@/data/startersWords'
import { speakText } from '@/lib/sounds'

export default function StartersWords({ onBack }) {
  const [phase, setPhase] = useState('categories')
  const [categoryId, setCategoryId] = useState(null)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)

  const category = categoryId ? getStartersCategory(categoryId) : null
  const currentWord = round[index] ?? null
  const total = round.length

  useEffect(() => {
    if (phase !== 'practice' || !currentWord) return

    speakText(currentWord)
  }, [phase, currentWord, index])

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  function startRound(nextCategoryId) {
    const nextCategory = getStartersCategory(nextCategoryId)
    if (!nextCategory) return

    setCategoryId(nextCategoryId)
    setRound(prepareStartersRound(nextCategory))
    setIndex(0)
    setPhase('practice')
  }

  function handlePracticeAgain() {
    if (!categoryId) return
    startRound(categoryId)
  }

  function handleChooseCategory() {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setPhase('categories')
    setCategoryId(null)
    setRound([])
    setIndex(0)
  }

  function handlePrevious() {
    if (index === 0) return
    setIndex((current) => current - 1)
  }

  function handleNext() {
    if (index + 1 >= total) {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
      setPhase('done')
      return
    }
    setIndex((current) => current + 1)
  }

  if (phase === 'categories') {
    return (
      <div className="h-full min-h-0 overflow-y-auto px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="toolbar-button-icon"
              onClick={onBack}
              aria-label="Home"
            >
              <Home />
            </Button>
            <div className="min-w-0 flex-1 text-center">
              <h1 className="text-title">Starters Words</h1>
              <p className="text-supporting">Choose a category to practise.</p>
            </div>
            <div className="h-12 w-12 shrink-0 md:h-14 md:w-14" aria-hidden="true" />
          </div>

          <Card>
            <CardContent className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:p-6">
              {startersCategories.map((item) => (
                <Button
                  key={item.id}
                  size="xl"
                  variant="outline"
                  className="cta-secondary justify-start gap-3 text-left [&_svg]:!h-7 [&_svg]:!w-7"
                  onClick={() => startRound(item.id)}
                >
                  <BookOpen className="text-primary" aria-hidden="true" />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate">{item.name}</span>
                    <span className="text-sm font-medium text-muted-foreground md:text-base">
                      {item.words.length} words
                    </span>
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (phase === 'done' && category) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-4 py-4 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6">
        <Card className="w-full max-w-xl text-center">
          <CardHeader
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="space-y-2 p-4 pb-2 md:p-6 md:pb-3"
          >
            <h1 className="text-title">Great reading!</h1>
            <p className="text-supporting">
              You practised {total} words about {category.name}.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-4 pt-2 pb-8 md:p-6 md:pt-3">
            <Button size="xl" className="cta-primary" onClick={handlePracticeAgain}>
              Practice Again
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="cta-secondary"
              onClick={handleChooseCategory}
            >
              Choose Category
            </Button>
            <Button size="lg" variant="outline" className="cta-secondary" onClick={onBack}>
              Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
      <div className="flex shrink-0 items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="toolbar-button-icon"
          onClick={onBack}
          aria-label="Home"
        >
          <Home />
        </Button>
        <div className="min-w-0 flex-1 space-y-2 text-center">
          <div className="text-component-title">
            Word {index + 1} of {total}
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-muted md:h-5">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }}
            />
          </div>
          <p className="text-supporting">{category?.name}</p>
        </div>
        <div className="h-12 w-12 shrink-0 md:h-14 md:w-14" aria-hidden="true" />
      </div>

      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 p-4 md:p-8">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-display max-w-full px-2 text-center break-words"
          >
            {currentWord}
          </p>
          <Button
            size="lg"
            variant="outline"
            className="min-h-14 gap-3 px-6 text-lg font-semibold md:min-h-16 md:text-xl [&_svg]:!h-7 [&_svg]:!w-7"
            onClick={() => currentWord && speakText(currentWord)}
            aria-label={`Speak ${currentWord}`}
          >
            <Volume2 aria-hidden="true" />
            Hear word
          </Button>
        </CardContent>
      </Card>

      <div className="flex shrink-0 gap-3">
        <Button
          size="lg"
          variant="outline"
          className="cta-secondary flex-1 gap-2"
          onClick={handlePrevious}
          disabled={index === 0}
          aria-label="Previous word"
        >
          <ChevronLeft aria-hidden="true" />
          Previous
        </Button>
        <Button
          size="lg"
          className="cta-primary flex-1 gap-2"
          onClick={handleNext}
          aria-label="Next word"
        >
          Next
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
