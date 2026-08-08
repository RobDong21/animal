import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AnimalDisplay from '@/components/AnimalDisplay'
import HabitatIcon from '@/components/HabitatIcon'
import {
  animals,
  formatHabitatNames,
  getHabitatById,
  habitats,
  isCorrectHabitat,
  prepareRound,
} from '@/data/animals'
import { playCorrectSound, speakHabitatName, playWrongSound } from '@/lib/sounds'
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

function HabitatButton({ habitat, disabled, onClick, pulse, highlight }) {
  return (
    <Button
      variant={highlight ? 'default' : 'outline'}
      size="lg"
      disabled={disabled}
      aria-label={habitat.name}
      className={cn(
        'surface-interactive-lg h-auto min-h-20 flex-col gap-2 py-3 transition-transform md:py-3.5 lg:min-h-24 lg:py-4',
        pulse && 'animate-pulse border-amber-400 bg-amber-50',
        highlight && 'scale-105 ring-4 ring-primary/40',
        !highlight && !pulse && 'hover:scale-[1.02] active:scale-95'
      )}
      onClick={onClick}
    >
      <HabitatIcon
        habitatId={habitat.id}
        className={cn(
          'h-14 w-14 lg:h-16 lg:w-16',
          highlight ? 'text-primary-foreground' : 'text-primary'
        )}
      />
      <span className="text-base font-bold lg:text-lg">{habitat.name}</span>
    </Button>
  )
}

export default function Game({ onBack, roundSize }) {
  const initialRound = useMemo(() => prepareRound(animals, roundSize), [roundSize])

  const [shuffled, setShuffled] = useState(initialRound)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [highlightHabitat, setHighlightHabitat] = useState(null)
  const [wrongPulse, setWrongPulse] = useState(false)

  const current = shuffled[index]
  const total = shuffled.length

  function handleGuess(habitatId) {
    if (isAdvancing || finished) return

    const habitat = getHabitatById(habitatId)
    if (habitat) {
      speakHabitatName(habitat.name)
    }

    if (isCorrectHabitat(current, habitatId)) {
      const habitatName = habitat?.name
      const alsoFound =
        current.habitats.length > 1
          ? `Also found in: ${formatHabitatNames(current.habitats)}`
          : undefined

      const successDescription = alsoFound
        ? `${current.name} can live in the ${habitatName}! ${alsoFound}`
        : `${current.name} can live in the ${habitatName}!`

      setScore((s) => s + 1)
      setIsAdvancing(true)
      setHighlightHabitat(habitatId)
      playCorrectSound()

      toast.success('🎉 Yay! Great job!', {
        description: successDescription,
        duration: 6000,
        id: 'game-toast',
      })

      setTimeout(() => {
        setHighlightHabitat(null)
        setIsAdvancing(false)
        if (index + 1 >= total) {
          setFinished(true)
        } else {
          setIndex((i) => i + 1)
        }
      }, 600)
    } else {
      playWrongSound()
      setWrongPulse(true)

      toast.error('🤔 Oops! Try again!', {
        description: `Keep looking for the best home for ${current.name}!`,
        duration: 5000,
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
    setHighlightHabitat(null)
    setWrongPulse(false)
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
      <div className="mb-3 shrink-0 md:mb-4">
        <ProgressBar current={index + 1} total={total} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto lg:flex-row lg:items-start lg:gap-6 lg:overflow-hidden">
        <Card className="lg:sticky lg:top-4 lg:w-[58%] lg:shrink-0">
          <CardHeader className="items-center gap-3 pb-3 pt-4 text-center md:gap-4 md:px-4 md:py-4 lg:gap-6 lg:px-8 lg:py-6">
            <AnimalDisplay animal={current} />
            <p className="text-xl font-semibold md:text-2xl lg:text-3xl">Where does this animal live?</p>
          </CardHeader>
        </Card>

        <div className="flex shrink-0 flex-col gap-3 pb-1 lg:w-[42%] lg:shrink-0 lg:overflow-y-auto">
          <Card>
            <CardContent className="p-3 md:p-4 lg:p-6">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-2.5 lg:grid-cols-2 lg:gap-3">
                {habitats.map((habitat) => (
                  <HabitatButton
                    key={habitat.id}
                    habitat={habitat}
                    disabled={isAdvancing}
                    pulse={wrongPulse}
                    highlight={highlightHabitat === habitat.id}
                    onClick={() => handleGuess(habitat.id)}
                  />
                ))}
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
    </div>
  )
}
