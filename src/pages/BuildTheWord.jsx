import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Apple,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleX,
  Footprints,
  HandHelping,
  Hash,
  Home,
  House,
  Palette,
  PawPrint,
  Puzzle,
  Shirt,
  Smile,
  Star,
  Undo2,
  Users,
  Volume2,
  X,
} from 'lucide-react'
import { SuccessFireworks } from '@/components/SuccessFireworks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  getStartersCategory,
  prepareStartersRound,
  startersCategories,
} from '@/data/startersWords'
import {
  assembleWord,
  buildLetterTiles,
  buildWordStructure,
  countLetterSlots,
  getNextExpectedLetter,
} from '@/lib/buildTheWord'
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

const MODES = [
  {
    id: 'easy',
    title: 'Easy',
    name: 'Build with Help',
    description: 'Check each letter as you go.',
    icon: HandHelping,
  },
  {
    id: 'normal',
    title: 'Normal',
    name: 'Build the Word',
    description: 'Build the whole word, then check.',
    icon: Puzzle,
  },
]

export default function BuildTheWord({ onBack }) {
  const [phase, setPhase] = useState('categories')
  const [categoryId, setCategoryId] = useState(null)
  const [mode, setMode] = useState(null)
  const [round, setRound] = useState([])
  const [index, setIndex] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [placedIds, setPlacedIds] = useState([])
  const [solved, setSolved] = useState(false)
  const [locked, setLocked] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const resetTimerRef = useRef(null)
  const helpErrorTimerRef = useRef(null)

  const category = categoryId ? getStartersCategory(categoryId) : null
  const currentWord = round[index] ?? null
  const total = round.length
  const roundKey = currentWord ? `${currentWord}:${index}:${attempt}` : ''
  const structure = useMemo(
    () => (currentWord ? buildWordStructure(currentWord) : []),
    [currentWord]
  )
  const tiles = useMemo(
    () => (currentWord ? buildLetterTiles(currentWord, roundKey) : []),
    [currentWord, roundKey]
  )
  const letterSlotCount = countLetterSlots(structure)
  const tileById = useMemo(() => new Map(tiles.map((tile) => [tile.id, tile])), [tiles])
  const placedCharacters = placedIds.map((id) => tileById.get(id)?.character ?? '')
  const bankTiles = tiles.filter((tile) => !placedIds.includes(tile.id))
  const easyHasWrong =
    mode === 'easy' &&
    placedIds.length > 0 &&
    placedCharacters[placedIds.length - 1] !==
      getNextExpectedLetter(structure, placedIds.length - 1)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
      if (helpErrorTimerRef.current) window.clearTimeout(helpErrorTimerRef.current)
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  function clearResetTimer() {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }

  function clearHelpErrorTimer() {
    if (helpErrorTimerRef.current) {
      window.clearTimeout(helpErrorTimerRef.current)
      helpErrorTimerRef.current = null
    }
  }

  function resetCardState() {
    clearResetTimer()
    clearHelpErrorTimer()
    setPlacedIds([])
    setAttempt(0)
    setSolved(false)
    setLocked(false)
    setFeedback(null)
  }

  function handleSelectCategory(nextCategoryId) {
    const nextCategory = getStartersCategory(nextCategoryId)
    if (!nextCategory) return

    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setCategoryId(nextCategoryId)
    setMode(null)
    setRound([])
    setIndex(0)
    resetCardState()
    setPhase('modes')
  }

  function startPractice(nextMode, nextCategoryId = categoryId) {
    const nextCategory = getStartersCategory(nextCategoryId)
    if (!nextCategory || !nextMode) return

    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setCategoryId(nextCategoryId)
    setMode(nextMode)
    setRound(prepareStartersRound(nextCategory))
    setIndex(0)
    resetCardState()
    setPhase('practice')
  }

  function handlePlayAgain() {
    if (!categoryId || !mode) return
    startPractice(mode, categoryId)
  }

  function handleChooseCategory() {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setPhase('categories')
    setCategoryId(null)
    setMode(null)
    setRound([])
    setIndex(0)
    resetCardState()
  }

  function handleBackFromModes() {
    if (window.speechSynthesis) window.speechSynthesis.cancel()
    setPhase('categories')
    setCategoryId(null)
    setMode(null)
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

  function markSolved() {
    setSolved(true)
    setLocked(false)
    setFeedback({ tone: 'success', text: `Yes! ${currentWord}.` })
  }

  function evaluateFullBuild(nextPlacedIds) {
    const characters = nextPlacedIds.map((id) => tileById.get(id)?.character ?? '')
    const built = assembleWord(structure, characters)

    if (built === currentWord) {
      markSolved()
      return
    }

    setLocked(true)
    setFeedback({ tone: 'error', text: `Not quite. It is ${currentWord}.` })
    clearResetTimer()
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = null
      setPlacedIds([])
      setAttempt((value) => value + 1)
      setLocked(false)
    }, 1000)
  }

  function showHelpError() {
    clearHelpErrorTimer()
    setFeedback({ tone: 'error', text: 'Not quite. Try the next letter.' })
    helpErrorTimerRef.current = window.setTimeout(() => {
      helpErrorTimerRef.current = null
      setFeedback((current) => (current?.tone === 'error' ? null : current))
    }, 1200)
  }

  function handlePlaceTile(tileId) {
    if (solved || locked || easyHasWrong) return
    if (placedIds.includes(tileId)) return
    if (placedIds.length >= letterSlotCount) return

    const tile = tileById.get(tileId)
    if (!tile) return

    if (mode === 'easy') {
      const expected = getNextExpectedLetter(structure, placedIds.length)
      const nextPlacedIds = [...placedIds, tileId]
      setPlacedIds(nextPlacedIds)

      if (tile.character !== expected) {
        showHelpError()
        return
      }

      clearHelpErrorTimer()
      setFeedback(null)

      if (nextPlacedIds.length === letterSlotCount) {
        markSolved()
      }
      return
    }

    setFeedback((current) => (current?.tone === 'error' ? current : null))
    const nextPlacedIds = [...placedIds, tileId]
    setPlacedIds(nextPlacedIds)

    if (nextPlacedIds.length === letterSlotCount) {
      evaluateFullBuild(nextPlacedIds)
    }
  }

  function handleUndo() {
    if (solved || placedIds.length === 0) return
    if (mode === 'normal' && locked) return

    clearHelpErrorTimer()
    setFeedback((current) => (current?.tone === 'error' ? null : current))
    setPlacedIds((previous) => previous.slice(0, -1))
  }

  function slotMark(slotIndex, character) {
    if (mode !== 'easy' || !character) return null
    const expected = getNextExpectedLetter(structure, slotIndex)
    return character === expected ? 'correct' : 'incorrect'
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
              <h1 className="text-title">Build the Word</h1>
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
                    onClick={() => handleSelectCategory(item.id)}
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

  if (phase === 'modes') {
    return (
      <div className="h-full min-h-0 overflow-y-auto px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6">
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col gap-4 py-4">
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
              <h1 className="text-title">How do you want to build?</h1>
              <p className="text-supporting">Pick one, then start.</p>
            </div>
            <div className="h-12 w-12 shrink-0 md:h-14 md:w-14" aria-hidden="true" />
          </div>

          <Card>
            <CardContent className="flex flex-col gap-3 p-4 md:p-6">
              {MODES.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant="outline"
                    className="cta-secondary !h-auto min-h-14 items-start justify-start gap-4 !whitespace-normal px-4 py-3 text-left md:min-h-16 md:px-6 md:py-4 [&_svg]:!h-8 [&_svg]:!w-8 [&_svg]:mt-1"
                    onClick={() => startPractice(item.id)}
                    aria-label={`${item.title}. ${item.name}. ${item.description}`}
                  >
                    <Icon className="shrink-0 text-primary" aria-hidden="true" />
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span>{item.title}</span>
                      <span className="text-sm font-medium text-muted-foreground md:text-base">
                        {item.name}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground md:text-base">
                        {item.description}
                      </span>
                    </span>
                  </Button>
                )
              })}
              <Button
                size="lg"
                variant="ghost"
                className="min-h-11 text-base font-semibold text-muted-foreground"
                onClick={handleBackFromModes}
              >
                Back to categories
              </Button>
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
            <h1 className="text-title">Great building!</h1>
            <p className="text-supporting">
              You built {total} words about {category.name}.
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
  let letterCursor = 0
  const slotAria = structure
    .map((part) => {
      if (part.type === 'fixed') return part.character === ' ' ? 'space' : part.character
      const character = placedCharacters[letterCursor]
      const mark = slotMark(letterCursor, character)
      letterCursor += 1
      if (!character) return 'empty'
      if (mark === 'correct') return `${character}, correct`
      if (mark === 'incorrect') return `${character}, incorrect`
      return character
    })
    .join(', ')

  const bankDisabled = solved || locked || easyHasWrong

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

      <Card className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <SuccessFireworks active={solved} />
        <CardContent className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-y-auto p-4 md:gap-6 md:p-8">
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            aria-label={solved ? currentWord : `Building word: ${slotAria}`}
            className="flex max-w-full flex-wrap items-center justify-center gap-1.5 md:gap-2"
          >
            {(() => {
              let nextLetter = 0
              return structure.map((part) => {
                if (part.type === 'fixed') {
                  return (
                    <span
                      key={`fixed-${part.index}`}
                      className="text-reading px-1 text-muted-foreground"
                      aria-hidden="true"
                    >
                      {part.character === ' ' ? '\u00A0' : part.character}
                    </span>
                  )
                }

                const character = placedCharacters[nextLetter]
                const slotIndex = nextLetter
                const mark = slotMark(slotIndex, character)
                nextLetter += 1

                return (
                  <button
                    key={`slot-${part.index}`}
                    type="button"
                    className={cn(
                      'radius-normal border-normal relative flex h-14 min-w-12 items-center justify-center border-dashed bg-muted px-2 text-3xl font-bold md:h-16 md:min-w-14 md:text-4xl',
                      character ? 'border-solid border-primary bg-card' : 'border-border',
                      mark === 'incorrect' && 'border-error-border bg-error-muted'
                    )}
                    onClick={() => {
                      if (slotIndex === placedIds.length - 1) handleUndo()
                    }}
                    aria-label={
                      character
                        ? mark === 'correct'
                          ? `Letter ${character.toUpperCase()}, correct`
                          : mark === 'incorrect'
                            ? `Letter ${character.toUpperCase()}, incorrect`
                            : `Slot ${slotIndex + 1}, letter ${character.toUpperCase()}`
                        : `Slot ${slotIndex + 1}, empty`
                    }
                  >
                    {character ? character.toUpperCase() : ''}
                    {mark === 'correct' && (
                      <Check
                        className="absolute right-0.5 bottom-0.5 h-3.5 w-3.5 text-success md:h-4 md:w-4"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    )}
                    {mark === 'incorrect' && (
                      <X
                        className="absolute right-0.5 bottom-0.5 h-3.5 w-3.5 text-error md:h-4 md:w-4"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })
            })()}
          </div>

          <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-2 md:gap-3">
            {bankTiles.map((tile) => (
              <Button
                key={tile.id}
                size="lg"
                variant="outline"
                className="min-h-14 min-w-14 px-3 text-2xl font-bold md:min-h-16 md:min-w-16 md:text-3xl"
                disabled={bankDisabled}
                aria-label={`Letter ${tile.label}`}
                onClick={() => handlePlaceTile(tile.id)}
              >
                {tile.label}
              </Button>
            ))}
          </div>

          <div className="flex w-full max-w-md flex-col gap-3">
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
              className="min-h-11 gap-2 text-base font-semibold text-muted-foreground"
              onClick={handleUndo}
              disabled={
                solved ||
                placedIds.length === 0 ||
                (mode === 'normal' && locked)
              }
              aria-label="Undo last letter"
            >
              <Undo2 className="h-5 w-5" aria-hidden="true" />
              Undo
            </Button>
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
            solved ? continueLabel : 'Continue unavailable until the word is built correctly'
          }
        >
          {continueLabel}
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
