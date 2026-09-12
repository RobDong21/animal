import { useEffect, useState } from 'react'
import {
  Apple,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Hash,
  Home,
  House,
  Palette,
  PawPrint,
  Puzzle,
  Shirt,
  Smile,
  Star,
  Users,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  getStartersCategory,
  prepareStartersRound,
  startersCategories,
} from '@/data/startersWords'
import { getStartersChunks } from '@/lib/startersChunks'
import { isSpeechSynthesisAvailable, speakText } from '@/lib/sounds'

const CATEGORY_ICONS = {
  Animals: PawPrint,
  'Body and Face': Smile,
  Clothes: Shirt,
  Colours: Palette,
  'Family & People': Users,
  'Food and Drink': Apple,
  'The Home': House,
  'Toys & Play': Puzzle,
  Actions: Footprints,
  Descriptive: Star,
  Numbers: Hash,
}

export default function StartersWords({ onBack }) {
  const [phase, setPhase] = useState('categories')
  const [categoryId, setCategoryId] = useState(null)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)
  const [heardWord, setHeardWord] = useState(false)
  const [splitOpen, setSplitOpen] = useState(false)
  const [speechAvailable, setSpeechAvailable] = useState(true)

  const category = categoryId ? getStartersCategory(categoryId) : null
  const currentWord = round[index] ?? null
  const total = round.length
  const chunks = currentWord ? getStartersChunks(currentWord) : []

  useEffect(() => {
    setSpeechAvailable(isSpeechSynthesisAvailable())
  }, [])

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  function resetCardSupport() {
    setHeardWord(false)
    setSplitOpen(false)
  }

  function startRound(nextCategoryId) {
    const nextCategory = getStartersCategory(nextCategoryId)
    if (!nextCategory) return

    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setCategoryId(nextCategoryId)
    setRound(prepareStartersRound(nextCategory))
    setIndex(0)
    resetCardSupport()
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
    resetCardSupport()
  }

  function handlePrevious() {
    if (index === 0) return
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    resetCardSupport()
    setIndex((current) => current - 1)
  }

  function handleNext() {
    if (!heardWord) return
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    if (index + 1 >= total) {
      setPhase('done')
      resetCardSupport()
      return
    }
    resetCardSupport()
    setIndex((current) => current + 1)
  }

  function handleHearWord() {
    if (!currentWord) return

    const started = speakText(currentWord, {
      onEnd: () => setHeardWord(true),
      onError: (reason) => {
        if (reason === 'unavailable') setSpeechAvailable(false)
      },
    })

    if (!started) setSpeechAvailable(false)
  }

  function handleHearChunk(chunk) {
    speakText(chunk)
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
              {startersCategories.map((item) => {
                const Icon = CATEGORY_ICONS[item.id]
                return (
                  <Button
                    key={item.id}
                    size="xl"
                    variant="outline"
                    className="cta-secondary justify-start gap-3 text-left [&_svg]:!h-7 [&_svg]:!w-7"
                    onClick={() => startRound(item.id)}
                  >
                    {Icon && (
                      <Icon className="text-primary" strokeWidth={2.5} aria-hidden="true" />
                    )}
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">{item.name}</span>
                      <span className="text-sm font-medium text-muted-foreground md:text-base">
                        {item.words.length} words
                      </span>
                    </span>
                  </Button>
                )
              })}
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
        <CardContent className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-y-auto p-4 md:gap-6 md:p-8">
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="flex w-full max-w-2xl flex-col items-center gap-4"
          >
            {splitOpen ? (
              <>
                <p className="text-title text-center text-muted-foreground">{currentWord}</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {chunks.map((chunk, chunkIndex) => (
                    <div key={`${chunk}-${chunkIndex}`} className="flex items-center gap-2">
                      {chunkIndex > 0 && (
                        <span className="text-2xl font-semibold text-muted-foreground" aria-hidden="true">
                          ·
                        </span>
                      )}
                      <Button
                        size="lg"
                        variant="outline"
                        className="min-h-12 px-4 text-xl font-semibold md:min-h-14 md:text-2xl"
                        onClick={() => handleHearChunk(chunk)}
                        aria-label={`Speak chunk ${chunk}`}
                      >
                        {chunk}
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-display max-w-full px-2 text-center break-words">{currentWord}</p>
            )}
          </div>

          <div className="flex w-full max-w-md flex-col items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="min-h-14 w-full gap-3 px-6 text-lg font-semibold md:min-h-16 md:text-xl [&_svg]:!h-7 [&_svg]:!w-7"
              onClick={handleHearWord}
              aria-label={`Speak ${currentWord}`}
            >
              <Volume2 aria-hidden="true" />
              Hear word
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="min-h-11 text-base font-semibold text-muted-foreground md:min-h-12 md:text-lg"
              onClick={() => setSplitOpen((open) => !open)}
              aria-label={splitOpen ? 'Put the word together' : 'Break the word apart'}
            >
              {splitOpen ? 'Put together' : 'Break it apart'}
            </Button>

            {!speechAvailable && (
              <div className="w-full space-y-3 text-center">
                <p className="text-supporting">
                  Speech is unavailable on this device. An adult can read the word aloud.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="cta-secondary"
                  onClick={() => setHeardWord(true)}
                >
                  Heard it
                </Button>
              </div>
            )}
          </div>
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
          disabled={!heardWord}
          aria-label={
            heardWord
              ? 'Next word'
              : 'Next word unavailable until the word is heard'
          }
        >
          Next
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
