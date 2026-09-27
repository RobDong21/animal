import { useEffect, useMemo, useState } from 'react'
import {
  Apple,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleX,
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
import { buildListenChoices } from '@/lib/listenAndChoose'
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

export default function ListenAndChoose({ onBack }) {
  const [phase, setPhase] = useState('categories')
  const [categoryId, setCategoryId] = useState(null)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)
  const [wrongWords, setWrongWords] = useState([])
  const [solved, setSolved] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [speechAvailable, setSpeechAvailable] = useState(true)
  const [heardReady, setHeardReady] = useState(false)

  const category = categoryId ? getStartersCategory(categoryId) : null
  const currentWord = round[index] ?? null
  const total = round.length
  const choices = useMemo(() => {
    if (!currentWord || !category) return []
    return buildListenChoices(currentWord, category.words, `${currentWord}:${index}`)
  }, [category, currentWord, index])

  const choicesEnabled = speechAvailable || heardReady

  useEffect(() => {
    setSpeechAvailable(isSpeechSynthesisAvailable())
  }, [])

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    if (phase !== 'practice' || !currentWord) return

    setHeardReady(false)

    if (!isSpeechSynthesisAvailable()) {
      setSpeechAvailable(false)
      return
    }

    setSpeechAvailable(true)
    speakText(currentWord, {
      onError: (reason) => {
        if (reason === 'unavailable') setSpeechAvailable(false)
      },
    })
  }, [phase, currentWord, index])

  function resetCardState() {
    setWrongWords([])
    setSolved(false)
    setFeedback(null)
    setHeardReady(false)
  }

  function startRound(nextCategoryId) {
    const nextCategory = getStartersCategory(nextCategoryId)
    if (!nextCategory) return

    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setCategoryId(nextCategoryId)
    setRound(prepareStartersRound(nextCategory))
    setIndex(0)
    resetCardState()
    setPhase('practice')
  }

  function handlePlayAgain() {
    if (!categoryId) return
    startRound(categoryId)
  }

  function handleChooseCategory() {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setPhase('categories')
    setCategoryId(null)
    setRound([])
    setIndex(0)
    resetCardState()
  }

  function handlePrevious() {
    if (index === 0) return
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    resetCardState()
    setIndex((current) => current - 1)
  }

  function handleNext() {
    if (!solved) return
    if (window.speechSynthesis) window.speechSynthesis.cancel()

    if (index + 1 >= total) {
      setPhase('done')
      resetCardState()
      return
    }

    resetCardState()
    setIndex((current) => current + 1)
  }

  function handleHearWord() {
    if (!currentWord) return

    const started = speakText(currentWord, {
      onError: (reason) => {
        if (reason === 'unavailable') setSpeechAvailable(false)
      },
    })

    if (!started) setSpeechAvailable(false)
  }

  function handleChoice(word) {
    if (!choicesEnabled || solved) return
    if (wrongWords.includes(word)) return

    if (word === currentWord) {
      setSolved(true)
      setFeedback({ tone: 'success', text: `Yes! ${currentWord}.` })
      return
    }

    setWrongWords((previous) => [...previous, word])
    setFeedback({ tone: 'error', text: `Not quite. It is ${currentWord}.` })
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
              <h1 className="text-title">Listen and Choose</h1>
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
            <h1 className="text-title">Great listening!</h1>
            <p className="text-supporting">
              You practised {total} words about {category.name}.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-4 pt-2 pb-8 md:p-6 md:pt-3">
            <Button size="xl" className="cta-primary" onClick={handlePlayAgain}>
              Play Again
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

  if (!currentWord) return null

  const continueLabel = index + 1 >= total ? 'See Results' : 'Next'

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
            className="space-y-2 text-center"
          >
            <h1 className="text-title">Listen</h1>
            <p className="text-supporting">
              {speechAvailable
                ? 'Hear the word, then choose it.'
                : 'Ask an adult to say the word.'}
            </p>
          </div>

          <Button
            size="lg"
            variant="outline"
            className="min-h-14 w-full max-w-md gap-3 px-6 text-lg font-semibold md:min-h-16 md:text-xl [&_svg]:!h-7 [&_svg]:!w-7"
            onClick={handleHearWord}
            aria-label="Hear the word again"
          >
            <Volume2 aria-hidden="true" />
            Hear word
          </Button>

          {!speechAvailable && !heardReady && (
            <Button
              size="lg"
              variant="outline"
              className="cta-secondary max-w-md"
              onClick={() => setHeardReady(true)}
            >
              Heard it
            </Button>
          )}

          <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            {choices.map((word) => {
              const eliminated = wrongWords.includes(word)
              const highlighted = solved && word === currentWord
              const revealed =
                wrongWords.length > 0 && word === currentWord && !solved

              return (
                <Button
                  key={word}
                  size="lg"
                  variant={highlighted ? 'default' : 'outline'}
                  disabled={
                    !choicesEnabled ||
                    eliminated ||
                    (solved && !highlighted)
                  }
                  className={cn(
                    'min-h-16 px-4 text-xl font-bold md:min-h-20 md:text-2xl',
                    eliminated && 'border-error-border bg-error-muted opacity-60',
                    (highlighted || revealed) && 'ring-4 ring-primary/40',
                    revealed &&
                      !highlighted &&
                      'border-success-border border-dashed bg-success-muted text-success-content'
                  )}
                  aria-label={word}
                  onClick={() => handleChoice(word)}
                >
                  {word}
                  {eliminated && <span className="sr-only">incorrect</span>}
                  {(highlighted || revealed) && <span className="sr-only">correct</span>}
                </Button>
              )
            })}
          </div>

          {feedback && (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                'radius-normal border-normal flex w-full max-w-md items-start gap-3 px-3 py-2.5 text-base font-medium leading-snug',
                feedback.tone === 'error'
                  ? 'border-error-border bg-error-muted text-error-content'
                  : 'border-success-border bg-success-muted text-success-content'
              )}
            >
              {feedback.tone === 'error' ? (
                <CircleX className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              )}
              <p>{feedback.text}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex shrink-0 items-stretch gap-3">
        <Button
          size="lg"
          variant="outline"
          className="h-auto min-h-14 shrink-0 gap-1 px-3 text-sm font-semibold text-muted-foreground md:min-h-16 md:px-4 md:text-base"
          onClick={handlePrevious}
          disabled={index === 0}
          aria-label={
            index === 0 ? 'Previous word unavailable on the first word' : 'Previous word'
          }
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
          Previous
        </Button>
        <Button
          size="lg"
          className="cta-primary min-w-0 flex-1 gap-2"
          onClick={handleNext}
          disabled={!solved}
          aria-label={
            solved ? continueLabel : 'Continue unavailable until the correct word is chosen'
          }
        >
          {continueLabel}
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
