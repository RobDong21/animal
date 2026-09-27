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
} from 'lucide-react'
import {
  WordsHearWordButton,
  WordsRoundHeader,
} from '@/components/WordsPracticeChrome'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  getStartersCategory,
  prepareStartersRound,
  startersCategories,
} from '@/data/startersWords'
import { getStartersChunks } from '@/lib/startersChunks'
import { selectStartersReviewWords } from '@/lib/startersReview'
import { isSpeechSynthesisAvailable, speakText } from '@/lib/sounds'
import { cn } from '@/lib/utils'

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
  const [marksByIndex, setMarksByIndex] = useState({})
  const [reviewQueue, setReviewQueue] = useState([])
  const [reviewIndex, setReviewIndex] = useState(0)
  const [reviewMark, setReviewMark] = useState(null)
  const [heardWord, setHeardWord] = useState(false)
  const [splitOpen, setSplitOpen] = useState(false)
  const [speechAvailable, setSpeechAvailable] = useState(true)

  const category = categoryId ? getStartersCategory(categoryId) : null
  const isReview = phase === 'review'
  const currentWord = isReview ? (reviewQueue[reviewIndex] ?? null) : (round[index] ?? null)
  const total = round.length
  const reviewTotal = reviewQueue.length
  const chunks = currentWord ? getStartersChunks(currentWord) : []
  const currentMark = isReview ? reviewMark : (marksByIndex[index] ?? null)
  const canContinue = heardWord && currentMark != null

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

  function clearRoundState() {
    setRound([])
    setIndex(0)
    setMarksByIndex({})
    setReviewQueue([])
    setReviewIndex(0)
    setReviewMark(null)
    resetCardSupport()
  }

  function startRound(nextCategoryId) {
    const nextCategory = getStartersCategory(nextCategoryId)
    if (!nextCategory) return

    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setCategoryId(nextCategoryId)
    setRound(prepareStartersRound(nextCategory))
    setIndex(0)
    setMarksByIndex({})
    setReviewQueue([])
    setReviewIndex(0)
    setReviewMark(null)
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
    clearRoundState()
  }

  function handleMark(mark) {
    if (!heardWord) return

    if (isReview) {
      setReviewMark(mark)
      return
    }

    setMarksByIndex((previous) => ({
      ...previous,
      [index]: mark,
    }))
  }

  function handlePrevious() {
    if (window.speechSynthesis) window.speechSynthesis.cancel()

    if (isReview) {
      if (reviewIndex === 0) return
      resetCardSupport()
      setReviewMark(null)
      setReviewIndex((current) => current - 1)
      return
    }

    if (index === 0) return
    resetCardSupport()
    setIndex((current) => current - 1)
  }

  function handleNext() {
    if (!canContinue) return
    if (window.speechSynthesis) window.speechSynthesis.cancel()

    if (isReview) {
      if (reviewIndex + 1 >= reviewTotal) {
        setPhase('done')
        resetCardSupport()
        setReviewMark(null)
        return
      }

      resetCardSupport()
      setReviewMark(null)
      setReviewIndex((current) => current + 1)
      return
    }

    if (index + 1 >= total) {
      const reviews = selectStartersReviewWords(round, marksByIndex)
      if (reviews.length > 0) {
        setReviewQueue(reviews)
        setReviewIndex(0)
        setReviewMark(null)
        resetCardSupport()
        setPhase('review')
      } else {
        setReviewQueue([])
        setPhase('done')
        resetCardSupport()
      }
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
            {reviewTotal > 0 && (
              <p className="text-supporting">You also did {reviewTotal} Quick Reviews.</p>
            )}
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

  const progressCurrent = isReview ? reviewIndex + 1 : index + 1
  const progressTotal = isReview ? reviewTotal : total
  const previousDisabled = isReview ? reviewIndex === 0 : index === 0
  const continueLabel = isReview
    ? reviewIndex + 1 >= reviewTotal
      ? 'See Results'
      : 'Next Review'
    : 'Next'

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
      <WordsRoundHeader
        onHome={onBack}
        progressLabel={`${isReview ? 'Review' : 'Word'} ${progressCurrent} of ${progressTotal}`}
        progressRatio={progressCurrent / progressTotal}
        categoryName={category?.name}
      >
        {isReview && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-center"
          >
            <h1 className="text-component-title">Quick Review</h1>
            <p className="text-supporting">Let&apos;s try a few again.</p>
          </div>
        )}
      </WordsRoundHeader>

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
              <p className="text-reading max-w-full px-2 text-center break-words">{currentWord}</p>
            )}
          </div>

          <div className="flex w-full max-w-md flex-col items-center gap-3">
            <WordsHearWordButton
              onClick={handleHearWord}
              ariaLabel={`Speak ${currentWord}`}
              className="w-full max-w-none"
            />

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

            {heardWord && (
              <div className="flex w-full gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    'min-h-12 flex-1 text-base font-semibold md:min-h-14 md:text-lg',
                    currentMark === 'got-it' && 'border-primary bg-accent'
                  )}
                  aria-pressed={currentMark === 'got-it'}
                  aria-label="Got it"
                  onClick={() => handleMark('got-it')}
                >
                  Got it
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    'min-h-12 flex-1 text-base font-semibold md:min-h-14 md:text-lg',
                    currentMark === 'practise-again' && 'border-primary bg-accent'
                  )}
                  aria-pressed={currentMark === 'practise-again'}
                  aria-label="Practise again"
                  onClick={() => handleMark('practise-again')}
                >
                  Practise again
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex shrink-0 items-stretch gap-3">
        <Button
          size="lg"
          variant="outline"
          className="h-auto min-h-14 shrink-0 gap-1 px-3 text-sm font-semibold text-muted-foreground md:min-h-16 md:px-4 md:text-base"
          onClick={handlePrevious}
          disabled={previousDisabled}
          aria-label={
            previousDisabled ? 'Previous word unavailable on the first word' : 'Previous word'
          }
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
          Previous
        </Button>
        <Button
          size="lg"
          className="cta-primary min-w-0 flex-1 gap-2"
          onClick={handleNext}
          disabled={!canContinue}
          aria-label={
            canContinue
              ? continueLabel
              : 'Continue unavailable until the word is heard and marked'
          }
        >
          {continueLabel}
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
