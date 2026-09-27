import { useEffect, useMemo, useState } from 'react'
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
  WordsFeedbackBanner,
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
import { buildMissingLetterPuzzle, formatMissingLetterDisplay } from '@/lib/missingLetter'
import { speakText } from '@/lib/sounds'
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

export default function MissingLetter({ onBack }) {
  const [phase, setPhase] = useState('categories')
  const [categoryId, setCategoryId] = useState(null)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)
  const [wrongLetters, setWrongLetters] = useState([])
  const [solved, setSolved] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const category = categoryId ? getStartersCategory(categoryId) : null
  const currentWord = round[index] ?? null
  const total = round.length
  const puzzle = useMemo(
    () => (currentWord ? buildMissingLetterPuzzle(currentWord, index) : null),
    [currentWord, index]
  )

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  function resetCardState() {
    setWrongLetters([])
    setSolved(false)
    setFeedback(null)
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
    speakText(currentWord)
  }

  function handleLetterChoice(letter) {
    if (!puzzle || solved) return

    const selected = letter.toLowerCase()
    if (wrongLetters.includes(selected)) return

    if (selected === puzzle.correctLetter) {
      setSolved(true)
      setFeedback({
        tone: 'success',
        text: `Yes! The letter is ${puzzle.displayLetter}.`,
      })
      return
    }

    setWrongLetters((previous) => [...previous, selected])
    setFeedback({
      tone: 'error',
      text: `Not quite. The missing letter is ${puzzle.displayLetter}. ${puzzle.word}.`,
    })
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
              <h1 className="text-title">Missing Letter</h1>
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
            <h1 className="text-title">Great letter work!</h1>
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

  if (!puzzle) return null

  const continueLabel = index + 1 >= total ? 'See Results' : 'Next'
  const letterRevealed = solved || wrongLetters.length > 0
  const puzzleDisplay = formatMissingLetterDisplay(
    puzzle.word,
    puzzle.blankIndex,
    letterRevealed
  )
  const puzzleAriaLabel = letterRevealed
    ? puzzle.word
    : `Word with a missing letter: ${puzzleDisplay}`

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
      <WordsRoundHeader
        onHome={onBack}
        progressLabel={`Word ${index + 1} of ${total}`}
        progressRatio={(index + 1) / total}
        categoryName={category?.name}
      />

      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-y-auto p-4 md:gap-6 md:p-8">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            aria-label={puzzleAriaLabel}
            className="text-reading max-w-full px-2 text-center break-words"
          >
            {puzzleDisplay}
          </p>

          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            {puzzle.choices.map((letter) => {
              const key = letter.toLowerCase()
              const eliminated = wrongLetters.includes(key)
              const highlighted = solved && key === puzzle.correctLetter

              return (
                <Button
                  key={letter}
                  size="lg"
                  variant={highlighted ? 'default' : 'outline'}
                  disabled={eliminated || (solved && !highlighted)}
                  className={cn(
                    'min-h-16 text-2xl font-bold md:min-h-20 md:text-3xl',
                    eliminated && 'border-error-border bg-error-muted opacity-60',
                    highlighted && 'ring-4 ring-primary/40'
                  )}
                  aria-label={`Letter ${letter}`}
                  onClick={() => handleLetterChoice(letter)}
                >
                  {letter}
                  {eliminated && <span className="sr-only">incorrect</span>}
                  {highlighted && <span className="sr-only">correct</span>}
                </Button>
              )
            })}
          </div>

          <WordsHearWordButton
            onClick={handleHearWord}
            ariaLabel={`Speak ${currentWord}`}
          />

          <WordsFeedbackBanner feedback={feedback} />
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
            solved ? continueLabel : 'Continue unavailable until the correct letter is chosen'
          }
        >
          {continueLabel}
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
