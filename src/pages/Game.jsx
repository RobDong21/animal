import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AnimalDisplay from '@/components/AnimalDisplay'
import AnimalTypeIcon from '@/components/AnimalTypeIcon'
import ChoiceButton from '@/components/ChoiceButton'
import HabitatHelpPanel from '@/components/HabitatHelpPanel'
import HabitatIcon from '@/components/HabitatIcon'
import {
  animals,
  animalTypes,
  formatHabitatNames,
  getHabitatById,
  getTypeById,
  habitats,
  hasHabitatVideo,
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
      <div className="flex items-center justify-between text-base font-medium md:text-lg">
        <span>Animal {current} of {total}</span>
        <span className="text-primary">{pct}%</span>
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
  setScore,
  setIsAdvancing,
  setCorrectHabitatId,
  setCorrectTypeId,
  setWrongHabitats,
  setWrongTypes,
  setWrongPulse,
}) {
  setTimeout(() => {
    setCorrectHabitatId(null)
    setCorrectTypeId(null)
    setWrongHabitats([])
    setWrongTypes([])
    setWrongPulse(false)
    setIsAdvancing(false)

    if (index + 1 >= total) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }, 600)
}

export default function Game({ onBack, roundSize }) {
  const initialRound = useMemo(() => prepareRound(animals, roundSize), [roundSize])

  const [shuffled, setShuffled] = useState(initialRound)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [wrongPulse, setWrongPulse] = useState(false)
  const [wrongHabitats, setWrongHabitats] = useState([])
  const [wrongTypes, setWrongTypes] = useState([])
  const [correctHabitatId, setCorrectHabitatId] = useState(null)
  const [correctTypeId, setCorrectTypeId] = useState(null)
  const [videoHabitatId, setVideoHabitatId] = useState(undefined)

  const current = shuffled[index]
  const total = shuffled.length
  const videoModalOpen = videoHabitatId !== undefined
  const habitatComplete = correctHabitatId !== null
  const typeComplete = correctTypeId !== null

  function openHabitatVideo(habitatId) {
    setVideoHabitatId(habitatId)
  }

  function closeHabitatVideo() {
    setVideoHabitatId(undefined)
  }

  function resetRoundChoices() {
    setCorrectHabitatId(null)
    setCorrectTypeId(null)
    setWrongHabitats([])
    setWrongTypes([])
    setWrongPulse(false)
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
      setScore,
      setIsAdvancing,
      setCorrectHabitatId,
      setCorrectTypeId,
      setWrongHabitats,
      setWrongTypes,
      setWrongPulse,
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
      setWrongPulse(true)
      toast.error('🤔 Oops! Try again!', {
        description: `That is not the best home for ${current.name}!`,
        duration: 3000,
        id: 'game-toast',
      })
      setTimeout(() => setWrongPulse(false), 1200)
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
      setWrongPulse(true)
      toast.error('🤔 Oops! Try again!', {
        description: `${current.name} is not a ${type?.name.toLowerCase()}!`,
        duration: 3000,
        id: 'game-toast',
      })
      setTimeout(() => setWrongPulse(false), 1200)
    }
  }

  function handlePlayAgain() {
    toast.dismiss()
    setShuffled(prepareRound(animals, roundSize))
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
      <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-4 py-3 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6 md:py-4">
        <Card className="w-full max-w-lg text-center md:max-w-xl">
          <CardHeader className="space-y-4 pb-2">
            <div className="text-5xl md:text-6xl">{'⭐'.repeat(stars)}</div>
            <img
              src={assetUrl('/animals/lion.jpg')}
              alt=""
              className="surface-frame mx-auto h-40 w-40 object-cover shadow-md md:h-52 md:w-52"
            />
            <h2 className="text-3xl font-bold md:text-4xl">Amazing job!</h2>
            <p className="text-xl text-muted-foreground md:text-2xl">
              You matched {score} out of {total} animals!
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pb-8">
            <Button size="xl" className="w-full text-xl md:text-2xl" onClick={handlePlayAgain}>
              Play Again
            </Button>
            <Button size="lg" variant="outline" className="w-full text-lg md:text-xl" onClick={onBack}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col overflow-hidden px-4 pb-3 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-5 md:pb-4 lg:px-8 lg:pb-6">
      <div className="mb-3 shrink-0 space-y-3 md:mb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <ProgressBar current={index + 1} total={total} />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="shrink-0 text-base md:text-lg"
            onClick={() => openHabitatVideo(null)}
          >
            ❓ Habitats
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:items-start lg:gap-6 lg:overflow-hidden">
        <Card className="lg:min-w-0">
          <CardHeader className="items-center gap-3 pb-3 pt-4 text-center md:gap-4 md:px-4 md:py-4 lg:gap-6 lg:px-8 lg:py-6">
            <AnimalDisplay animal={current} />
            <div className="space-y-1">
              <p className="text-xl font-semibold md:text-2xl lg:text-3xl">What kind of animal is it?</p>
              <p className="text-xl font-semibold md:text-2xl lg:text-3xl">Where does it live?</p>
            </div>
          </CardHeader>
        </Card>

        <div className="flex min-w-0 shrink-0 flex-col gap-3 pb-1 lg:shrink lg:overflow-y-auto">
          <Card>
            <CardContent className="space-y-4 p-3 md:p-4 lg:p-6">
              <div className="space-y-2">
                <p className="text-center text-sm font-semibold text-muted-foreground md:text-base">Type</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-2.5">
                  {animalTypes.map((type) => {
                    const eliminated = wrongTypes.includes(type.id)
                    const highlight = correctTypeId === type.id

                    return (
                      <ChoiceButton
                        key={type.id}
                        label={type.name}
                        disabled={isAdvancing || eliminated || typeComplete}
                        eliminated={eliminated}
                        pulse={wrongPulse && !eliminated}
                        highlight={highlight}
                        onClick={() => handleTypeGuess(type.id)}
                        icon={
                          <AnimalTypeIcon
                            typeId={type.id}
                            className={cn(
                              'game-type-icon text-4xl lg:text-5xl',
                              highlight && 'drop-shadow-sm'
                            )}
                          />
                        }
                      />
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-center text-sm font-semibold text-muted-foreground md:text-base">Habitat</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-2.5 lg:grid-cols-4">
                  {habitats.map((habitat) => {
                    const eliminated = wrongHabitats.includes(habitat.id)
                    const highlight = correctHabitatId === habitat.id

                    return (
                      <ChoiceButton
                        key={habitat.id}
                        label={habitat.name}
                        disabled={isAdvancing || eliminated || habitatComplete}
                        eliminated={eliminated}
                        pulse={wrongPulse && !eliminated}
                        highlight={highlight}
                        onClick={() => handleHabitatGuess(habitat.id)}
                        icon={
                          <HabitatIcon
                            habitatId={habitat.id}
                            className={cn(
                              'game-habitat-icon h-14 w-14 lg:h-16 lg:w-16',
                              highlight ? 'text-primary-foreground' : 'text-primary'
                            )}
                          />
                        }
                        previewButton={
                          hasHabitatVideo(habitat.id) ? (
                            <Button
                              type="button"
                              variant="secondary"
                              size="icon"
                              aria-label={`Watch a video about ${habitat.name}`}
                              className="absolute top-1.5 right-1.5 h-8 w-8 rounded-full border-normal bg-white/95 text-base shadow-md md:h-9 md:w-9"
                              onClick={(event) => {
                                event.stopPropagation()
                                openHabitatVideo(habitat.id)
                              }}
                            >
                              👀
                            </Button>
                          ) : null
                        }
                      />
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            size="lg"
            className="w-full text-base md:text-lg"
            onClick={onBack}
          >
            ← Home
          </Button>
        </div>
      </div>

      {videoModalOpen && (
        <HabitatHelpPanel habitatId={videoHabitatId} onClose={closeHabitatVideo} />
      )}
    </div>
  )
}
