import { useMemo, useRef, useState } from 'react'
import { CheckCircle2, HelpCircle, Home } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AnimalDisplay from '@/components/AnimalDisplay'
import AnimalTypeIcon from '@/components/AnimalTypeIcon'
import ChoiceButton from '@/components/ChoiceButton'
import HabitatHelpPanel from '@/components/HabitatHelpPanel'
import HabitatIcon from '@/components/HabitatIcon'
import {
  formatHabitatNames,
  getAnimalsForMode,
  getHabitatById,
  getHabitatsForMode,
  getTypeById,
  getTypesForMode,
  isCorrectHabitat,
  isCorrectType,
  prepareRound,
} from '@/data/animals'
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

function advanceRound({
  index,
  total,
  setIndex,
  setFinished,
  setIsAdvancing,
  setCorrectHabitatId,
  setCorrectTypeId,
  setWrongHabitats,
  setWrongTypes,
  setWrongHabitatPulseId,
  setWrongTypePulseId,
}) {
  setTimeout(() => {
    setCorrectHabitatId(null)
    setCorrectTypeId(null)
    setWrongHabitats([])
    setWrongTypes([])
    setWrongHabitatPulseId(null)
    setWrongTypePulseId(null)
    setIsAdvancing(false)

    if (index + 1 >= total) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }, 600)
}

export default function Game({ onBack, roundSize, mode = 'normal' }) {
  const modeAnimals = useMemo(() => getAnimalsForMode(mode), [mode])
  const modeHabitats = useMemo(() => getHabitatsForMode(mode), [mode])
  const modeTypes = useMemo(() => getTypesForMode(mode), [mode])
  const initialRound = useMemo(() => prepareRound(modeAnimals, roundSize), [modeAnimals, roundSize])
  const isEasy = mode === 'easy'

  const [shuffled, setShuffled] = useState(initialRound)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [wrongHabitatPulseId, setWrongHabitatPulseId] = useState(null)
  const [wrongTypePulseId, setWrongTypePulseId] = useState(null)
  const [wrongHabitats, setWrongHabitats] = useState([])
  const [wrongTypes, setWrongTypes] = useState([])
  const [correctHabitatId, setCorrectHabitatId] = useState(null)
  const [correctTypeId, setCorrectTypeId] = useState(null)
  const [helpOpen, setHelpOpen] = useState(false)
  const helpButtonRef = useRef(null)

  const current = shuffled[index]
  const total = shuffled.length
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
    setWrongHabitatPulseId(null)
    setWrongTypePulseId(null)
  }

  function completeAnimal(habitatId, typeId) {
    const habitat = getHabitatById(habitatId)
    const type = getTypeById(typeId)
    const alsoFound =
      current.habitats.length > 1 ? `Also lives in: ${formatHabitatNames(current.habitats)}` : undefined

    const successDescription = alsoFound
      ? `${current.name} is a ${type?.name.toLowerCase()} in the ${habitat?.name}! ${alsoFound}`
      : `${current.name} is a ${type?.name.toLowerCase()} in the ${habitat?.name}!`

    setScore((s) => s + 1)
    setIsAdvancing(true)
    playCorrectSound()

    toast.success('🎉 Yay! Great job!', {
      description: successDescription,
      duration: 4000,
      id: 'game-toast',
    })

    advanceRound({
      index,
      total,
      setIndex,
      setFinished,
      setIsAdvancing,
      setCorrectHabitatId,
      setCorrectTypeId,
      setWrongHabitats,
      setWrongTypes,
      setWrongHabitatPulseId,
      setWrongTypePulseId,
    })
  }

  function handleHabitatGuess(habitatId) {
    if (isAdvancing || finished || habitatComplete || wrongHabitats.includes(habitatId)) return

    const habitat = getHabitatById(habitatId)
    if (habitat) {
      speakHabitatName(habitat.name)
    }

    if (isCorrectHabitat(current, habitatId)) {
      setCorrectHabitatId(habitatId)
      if (typeComplete) {
        completeAnimal(habitatId, correctTypeId)
      }
    } else {
      setWrongHabitats((prev) => [...prev, habitatId])
      playWrongSound()
      setWrongHabitatPulseId(habitatId)
      toast.error('🤔 Oops! Try again!', {
        description: `That is not the best home for ${current.name}!`,
        duration: 3000,
        id: 'game-toast',
      })
      setTimeout(
        () => setWrongHabitatPulseId((activeId) => (activeId === habitatId ? null : activeId)),
        700
      )
    }
  }

  function handleTypeGuess(typeId) {
    if (isAdvancing || finished || typeComplete || wrongTypes.includes(typeId)) return

    const type = getTypeById(typeId)
    if (type) {
      speakTypeName(type.name)
    }

    if (isCorrectType(current, typeId)) {
      setCorrectTypeId(typeId)
      if (habitatComplete) {
        completeAnimal(correctHabitatId, typeId)
      }
    } else {
      setWrongTypes((prev) => [...prev, typeId])
      playWrongSound()
      setWrongTypePulseId(typeId)
      toast.error('🤔 Oops! Try again!', {
        description: `${current.name} is not a ${type?.name.toLowerCase()}!`,
        duration: 3000,
        id: 'game-toast',
      })
      setTimeout(
        () => setWrongTypePulseId((activeId) => (activeId === typeId ? null : activeId)),
        700
      )
    }
  }

  function handlePlayAgain() {
    toast.dismiss()
    setShuffled(prepareRound(modeAnimals, roundSize))
    setIndex(0)
    setScore(0)
    setIsAdvancing(false)
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
            <CardContent className="space-y-4 p-4 lg:p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-component-title">1. What is it?</p>
                  {typeComplete && <CheckCircle2 className="h-5 w-5 text-success" aria-label="Complete" />}
                </div>
                <div className={cn('grid gap-2', isEasy ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3')}>
                  {modeTypes.map((type) => {
                    const eliminated = wrongTypes.includes(type.id)
                    const highlight = correctTypeId === type.id

                    return (
                      <ChoiceButton
                        key={type.id}
                        label={type.name}
                        disabled={isAdvancing || eliminated || typeComplete}
                        eliminated={eliminated}
                        pulse={wrongTypePulseId === type.id}
                        highlight={highlight}
                        onClick={() => handleTypeGuess(type.id)}
                        icon={
                          <AnimalTypeIcon
                            typeId={type.id}
                            className={cn(
                              'game-type-icon !h-10 !w-10 md:!h-11 md:!w-11',
                              highlight ? 'text-primary-foreground' : 'text-primary'
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
                <div className={cn('grid gap-2', isEasy ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-4')}>
                  {modeHabitats.map((habitat) => {
                    const eliminated = wrongHabitats.includes(habitat.id)
                    const highlight = correctHabitatId === habitat.id

                    return (
                      <ChoiceButton
                        key={habitat.id}
                        label={habitat.name}
                        disabled={isAdvancing || eliminated || habitatComplete}
                        eliminated={eliminated}
                        pulse={wrongHabitatPulseId === habitat.id}
                        highlight={highlight}
                        onClick={() => handleHabitatGuess(habitat.id)}
                        icon={
                          <HabitatIcon
                            habitatId={habitat.id}
                            className={cn(
                              'game-habitat-icon !h-9 !w-9 md:!h-10 md:!w-10',
                              highlight ? 'text-primary-foreground' : 'text-primary'
                            )}
                          />
                        }
                      />
                    )
                  })}
                </div>
              </div>
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
