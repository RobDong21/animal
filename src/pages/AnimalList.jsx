import { useMemo, useState } from 'react'
import { Home, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AnimalTypeIcon from '@/components/AnimalTypeIcon'
import {
  animalTypes,
  animals,
  formatHabitatNames,
  getAnimalsForMode,
  getTypeById,
  isAnimalInDiscover,
} from '@/data/animals'
import { cn } from '@/lib/utils'

const ALL_TYPES_ID = 'all'
const MODE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'discover', label: 'Discover' },
  { id: 'explorer', label: 'Explorer' },
]

function getModeLabels(animal) {
  const inDiscover = isAnimalInDiscover(animal)
  if (inDiscover) return 'Discover · Explorer'
  return 'Explorer'
}

export default function AnimalList({ onBack }) {
  const [modeFilter, setModeFilter] = useState('all')
  const [selectedTypeId, setSelectedTypeId] = useState(ALL_TYPES_ID)

  const filteredAnimals = useMemo(() => {
    if (modeFilter === 'discover') return getAnimalsForMode('discover')
    if (modeFilter === 'explorer') return getAnimalsForMode('explorer')
    return animals
  }, [modeFilter])

  const typeRows = useMemo(() => {
    const rows = [
      {
        id: ALL_TYPES_ID,
        name: 'All animals',
        count: filteredAnimals.length,
      },
      ...animalTypes.map((type) => ({
        id: type.id,
        name: type.name,
        count: filteredAnimals.filter((animal) => animal.type === type.id).length,
      })),
    ]
    return rows
  }, [filteredAnimals])

  const activeTypeId = useMemo(() => {
    const selected = typeRows.find((row) => row.id === selectedTypeId)
    if (selected && selected.count > 0) return selectedTypeId
    return ALL_TYPES_ID
  }, [selectedTypeId, typeRows])

  const visibleAnimals = useMemo(() => {
    if (activeTypeId === ALL_TYPES_ID) return filteredAnimals
    return filteredAnimals.filter((animal) => animal.type === activeTypeId)
  }, [activeTypeId, filteredAnimals])

  const selectedTypeName =
    activeTypeId === ALL_TYPES_ID
      ? 'All animals'
      : (getTypeById(activeTypeId)?.name ?? 'Animals')

  function handleModeFilter(nextFilter) {
    setModeFilter(nextFilter)
  }

  function handleSelectType(typeId) {
    setSelectedTypeId(typeId)
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden px-4 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:gap-4 md:px-6">
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
        <div className="min-w-0 flex-1 text-center">
          <h1 className="text-title">Animal list</h1>
          <p className="text-supporting">{animals.length} animals</p>
        </div>
        <div className="h-12 w-12 shrink-0 md:h-14 md:w-14" aria-hidden="true" />
      </div>

      <div
        className="flex shrink-0 flex-wrap justify-center gap-2"
        role="group"
        aria-label="Mode filter"
      >
        {MODE_FILTERS.map((filter) => {
          const selected = filter.id === modeFilter
          return (
            <Button
              key={filter.id}
              size="lg"
              variant="outline"
              className={cn(
                'min-h-11 px-4 text-base font-semibold md:min-h-12',
                selected && 'border-primary bg-accent'
              )}
              aria-pressed={selected}
              onClick={() => handleModeFilter(filter.id)}
            >
              {filter.label}
            </Button>
          )
        })}
      </div>

      <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] md:gap-4">
        <Card className="min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 overflow-y-auto p-2 md:p-3">
            <ul className="flex flex-col gap-1" aria-label="Animal types">
              {typeRows.map((row) => {
                const selected = row.id === activeTypeId
                return (
                  <li key={row.id}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        'min-h-12 w-full justify-start gap-2 px-3 text-left md:min-h-14 [&_svg]:!h-5 [&_svg]:!w-5',
                        selected && 'border-primary bg-accent'
                      )}
                      aria-pressed={selected}
                      aria-current={selected ? 'true' : undefined}
                      onClick={() => handleSelectType(row.id)}
                    >
                      {row.id === ALL_TYPES_ID ? (
                        <PawPrint
                          className="text-primary"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      ) : (
                        <AnimalTypeIcon typeId={row.id} className="text-primary" />
                      )}
                      <span className="truncate text-sm font-semibold md:text-base">
                        {row.name} · {row.count}
                      </span>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex min-h-0 flex-col overflow-hidden">
          <CardHeader className="shrink-0 space-y-1 p-4 pb-2 md:p-5 md:pb-2">
            <h2 className="text-component-title">{selectedTypeName}</h2>
            <p className="text-supporting">
              {visibleAnimals.length} {visibleAnimals.length === 1 ? 'animal' : 'animals'}
            </p>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
            <ul className="divide-y divide-border" aria-label={`${selectedTypeName} animals`}>
              {visibleAnimals.map((animal) => {
                const type = getTypeById(animal.type)
                return (
                  <li key={animal.id} className="px-4 py-3 text-left md:px-5 md:py-4">
                    <p className="text-lg font-semibold md:text-xl">{animal.name}</p>
                    <p className="text-sm font-medium text-muted-foreground md:text-base">
                      {type?.name ?? 'Animal'}
                      {animal.habitats.length > 0
                        ? ` · ${formatHabitatNames(animal.habitats)}`
                        : ''}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">
                      {getModeLabels(animal)}
                    </p>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Button
        size="lg"
        variant="ghost"
        className="mx-auto min-h-11 shrink-0 px-4 text-base font-semibold text-muted-foreground"
        onClick={onBack}
      >
        Back to Home
      </Button>
    </div>
  )
}
