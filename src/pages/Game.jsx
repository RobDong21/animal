import { useMemo, useRef, useState } from 'react'
import { CheckCircle2, CircleX, HelpCircle, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AnimalDisplay from '@/components/AnimalDisplay'
import AnimalTypeIcon from '@/components/AnimalTypeIcon'
import ChoiceButton from '@/components/ChoiceButton'
import HabitatHelpPanel from '@/components/HabitatHelpPanel'
import HabitatIcon from '@/components/HabitatIcon'
import {
  getAnimalsForMode,
  getHabitatsForMode,
  getTypeById,
  getTypeChoicesForAnimal,
  isCorrectHabitat,
  isCorrectType,
  prepareRound,
} from '@/data/animals'
import {
  buildAnimalSummary,
  buildCorrectHabitatFeedback,
  buildCorrectTypeFeedback,
  buildIncorrectHabitatFeedback,
  buildIncorrectTypeFeedback,
} from '@/lib/feedback'
import { playCorrectSound, playWrongSound, speakHabitatName, speakTypeName } from '@/lib/sounds'
import { assetUrl } from '@/lib/assets'
import { cn } from '@/lib/utils'

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="space-y-2">
      <div className="text-component-title">
        <span>Animal {current} of {total}</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-muted md:h-5">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function Game({ onBack, roundSize, mode = 'explorer' }) {
  const modeAnimals = useMemo(() => getAnimalsForMode(mode), [mode])
  const modeHabitats = useMemo(() => getHabitatsForMode(mode), [mode])
  const initialRound = useMemo(() => prepareRound(modeAnimals, roundSize), [modeAnimals, roundSize])
  const isDiscover = mode === 'discover'

  const [shuffled, setShuffled] = useState(initialRound)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [wrongHabitats, setWrongHabitats] = useState([])
  const [wrongTypes, setWrongTypes] = useState([])
  const [correctHabitatId, setCorrectHabitatId] = useState(null)
  const [correctTypeId, setCorrectTypeId] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [animalComplete, setAnimalComplete] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const helpButtonRef = useRef(null)

  const current = shuffled[index]
  const total = shuffled.length
  const typeChoices = useMemo(() => getTypeChoicesForAnimal(current, mode), [current, mode])
  const habitatComplete = correctHabitatId !== null
  const typeComplete = correctTypeId !== null

  function openHabitatHelp() {
    setHelpOpen(true)
  }

  function closeHabitatHelp() {
    setHelpOpen(false)
    requestAnimationFrame(() => helpButtonRef.current?.focus())
  }

  function resetRoundChoices() {
    setCorrectHabitatId(null)
    setCorrectTypeId(null)
    setWrongHabitats([])
    setWrongTypes([])
    setFeedback(null)
    setAnimalComplete(false)
  }

  function completeAnimal() {
    setScore((s) => s + 1)
    setAnimalComplete(true)
    setFeedback({ tone: 'summary', text: buildAnimalSummary(current) })
    playCorrectSound()
  }

  function handleHabitatGuess(habitatId) {
    if (finished || animalComplete || habitatComplete || wrongHabitats.includes(habitatId)) return

    const habitat = modeHabitats.find((option) => option.id === habitatId)
    if (habitat) {
      speakHabitatName(habitat.name)
    }

    if (isCorrectHabitat(current, habitatId)) {
      setCorrectHabitatId(habitatId)
      if (typeComplete) {
        completeAnimal()
      } else {
        setFeedback({ tone: 'success', text: buildCorrectHabitatFeedback(current) })
        playCorrectSound()
      }
    } else {
      setWrongHabitats((prev) => [...prev, habitatId])
      setFeedback({
        tone: 'error',
        text: buildIncorrectHabitatFeedback(current, habitatId),
      })
      playWrongSound()
    }
  }

  function handleTypeGuess(typeId) {
    if (finished || animalComplete || typeComplete || wrongTypes.includes(typeId)) return

    const type = getTypeById(typeId)
    if (type) {
      speakTypeName(type.name)
    }

    if (isCorrectType(current, typeId)) {
      setCorrectTypeId(typeId)
      if (habitatComplete) {
        completeAnimal()
      } else {
        setFeedback({ tone: 'success', text: buildCorrectTypeFeedback(current) })
        playCorrectSound()
      }
    } else {
      setWrongTypes((prev) => [...prev, typeId])
      setFeedback({
        tone: 'error',
        text: buildIncorrectTypeFeedback(current, typeId),
      })
      playWrongSound()
    }
  }

  function handleNextAnimal() {
    resetRoundChoices()
    if (index + 1 >= total) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  function handlePlayAgain() {
    setShuffled(prepareRound(modeAnimals, roundSize))
    setIndex(0)
    setScore(0)
    resetRoundChoices()
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / total) * 100)
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1

    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-4 py-4 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6">
        <Card className="w-full max-w-lg text-center md:max-w-xl">
          <CardHeader className="space-y-4 pb-4">
            <div className="text-5xl md:text-6xl">{'⭐'.repeat(stars)}</div>
            <img
              src={assetUrl(current.image)}
              alt={current.name}
              className="radius-large mx-auto h-40 w-40 object-cover md:h-52 md:w-52"
            />
            <h2 className="text-title">Amazing job!</h2>
            <p className="text-supporting">
              You matched {score} out of {total} animals!
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pb-8">
            <Button size="xl" className="cta-primary" onClick={handlePlayAgain}>
              Play Again
            </Button>
            <Button size="lg" variant="outline" className="cta-secondary" onClick={onBack}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col overflow-hidden px-4 pb-4 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6 lg:px-8 lg:pb-6">
      <div className="mb-4 shrink-0 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="toolbar-button-icon game-toolbar-icon surface-interactive-lg transition-transform hover:scale-[1.02] active:scale-95"
            onClick={onBack}
            aria-label="Home"
          >
            <Home />
          </Button>
          <div className="min-w-0 flex-1">
            <ProgressBar current={index + 1} total={total} />
          </div>
          <Button
            ref={helpButtonRef}
            variant="outline"
            className="toolbar-button-label game-toolbar-label surface-interactive-lg transition-transform hover:scale-[1.02] active:scale-95"
            onClick={openHabitatHelp}
          >
            <HelpCircle className="shrink-0" />
            Habitat Help
          </Button>
        </div>
        <p className="text-center text-base font-semibold text-muted-foreground md:text-lg">
          Pick what it is and where it lives
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-6 lg:overflow-hidden">
        <Card className="lg:min-w-0">
          <CardHeader className="items-center gap-4 p-4 text-center lg:gap-6 lg:p-6">
            <AnimalDisplay animal={current} />
          </CardHeader>
        </Card>

        <div className="flex min-w-0 shrink-0 flex-col gap-4 lg:shrink lg:overflow-y-auto">
          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-component-title">1. What is it?</p>
                  {typeComplete && <CheckCircle2 className="h-5 w-5 text-success" aria-label="Complete" />}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {typeChoices.map((type) => {
                    const eliminated = wrongTypes.includes(type.id)
                    const highlight = correctTypeId === type.id
                    const revealed = wrongTypes.length > 0 && type.id === current.type && !typeComplete

                    return (
                      <ChoiceButton
                        key={type.id}
                        label={type.name}
                        disabled={eliminated || typeComplete || animalComplete}
                        eliminated={eliminated}
                        revealed={revealed}
                        highlight={highlight}
                        ariaLabel={
                          eliminated
                            ? `${type.name}, incorrect choice`
                            : revealed
                              ? `${type.name}, correct answer revealed. Try this answer`
                              : highlight
                                ? `${type.name}, selected correct answer`
                                : type.name
                        }
                        onClick={() => handleTypeGuess(type.id)}
                        icon={
                          <AnimalTypeIcon
                            typeId={type.id}
                            className={cn(
                              'game-type-icon !h-10 !w-10 md:!h-11 md:!w-11',
                              highlight
                                ? 'text-primary-foreground'
                                : revealed
                                  ? 'text-success-content'
                                  : 'text-primary'
                            )}
                          />
                        }
                      />
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-component-title">2. Where does it live?</p>
                  {habitatComplete && <CheckCircle2 className="h-5 w-5 text-success" aria-label="Complete" />}
                </div>
                <div className={cn('grid gap-2', isDiscover ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-4')}>
                  {modeHabitats.map((habitat) => {
                    const eliminated = wrongHabitats.includes(habitat.id)
                    const highlight = correctHabitatId === habitat.id
                    const revealed =
                      wrongHabitats.length > 0 &&
                      current.habitats.includes(habitat.id) &&
                      !habitatComplete

                    return (
                      <ChoiceButton
                        key={habitat.id}
                        label={habitat.name}
                        disabled={eliminated || habitatComplete || animalComplete}
                        eliminated={eliminated}
                        revealed={revealed}
                        highlight={highlight}
                        ariaLabel={
                          eliminated
                            ? `${habitat.name}, incorrect choice`
                            : revealed
                              ? `${habitat.name}, correct answer revealed. Try this answer`
                              : highlight
                                ? `${habitat.name}, selected correct answer`
                                : habitat.name
                        }
                        onClick={() => handleHabitatGuess(habitat.id)}
                        icon={
                          <HabitatIcon
                            habitatId={habitat.id}
                            className={cn(
                              'game-habitat-icon !h-9 !w-9 md:!h-10 md:!w-10',
                              highlight
                                ? 'text-primary-foreground'
                                : revealed
                                  ? 'text-success-content'
                                  : 'text-primary'
                            )}
                          />
                        }
                      />
                    )
                  })}
                </div>
              </div>

              {feedback && (
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className={cn(
                    'game-feedback radius-normal border-normal flex items-start gap-3 px-3 py-2.5 text-base font-medium leading-snug',
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

              {animalComplete && (
                <Button
                  size="lg"
                  className="min-h-14 w-full text-lg font-bold md:text-xl"
                  onClick={handleNextAnimal}
                >
                  Next Animal
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {helpOpen && (
        <HabitatHelpPanel habitats={modeHabitats} onClose={closeHabitatHelp} />
      )}
    </div>
  )
}
