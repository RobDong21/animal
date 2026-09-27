import { useState } from 'react'
import {
  Apple,
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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getStartersCategory, startersCategories } from '@/data/startersWords'
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

export default function StartersWordList({ onBack }) {
  const [listCategoryId, setListCategoryId] = useState(startersCategories[0]?.id ?? null)
  const listCategory = listCategoryId ? getStartersCategory(listCategoryId) : null
  const totalWords = startersCategories.reduce((count, item) => count + item.words.length, 0)

  function selectListCategory(nextCategoryId) {
    if (!getStartersCategory(nextCategoryId)) return
    setListCategoryId(nextCategoryId)
  }

  if (!listCategory) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 px-4">
        <p className="text-supporting">No Starters words are available.</p>
        <Button size="lg" variant="outline" className="cta-secondary" onClick={onBack}>
          Back to Home
        </Button>
      </div>
    )
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
          <h1 className="text-title">Word list</h1>
          <p className="text-supporting">{totalWords} words</p>
        </div>
        <div className="h-12 w-12 shrink-0 md:h-14 md:w-14" aria-hidden="true" />
      </div>

      <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] md:gap-4">
        <Card className="min-h-0 overflow-hidden">
          <CardContent className="h-full min-h-0 overflow-y-auto p-2 md:p-3">
            <ul className="flex flex-col gap-1" aria-label="Word list categories">
              {startersCategories.map((item) => {
                const Icon = CATEGORY_ICONS[item.id]
                const selected = item.id === listCategory.id
                return (
                  <li key={item.id}>
                    <Button
                      size="lg"
                      variant="outline"
                      className={cn(
                        'min-h-12 w-full justify-start gap-2 px-3 text-left md:min-h-14 [&_svg]:!h-5 [&_svg]:!w-5',
                        selected && 'border-primary bg-accent'
                      )}
                      aria-pressed={selected}
                      aria-current={selected ? 'true' : undefined}
                      onClick={() => selectListCategory(item.id)}
                    >
                      {Icon && (
                        <Icon className="text-primary" strokeWidth={2.5} aria-hidden="true" />
                      )}
                      <span className="truncate text-sm font-semibold md:text-base">
                        {item.name} · {item.words.length}
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
            <h2 className="text-component-title">{listCategory.name}</h2>
            <p className="text-supporting">{listCategory.words.length} words</p>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto p-0">
            <ul className="divide-y divide-border" aria-label={`${listCategory.name} words`}>
              {listCategory.words.map((word) => (
                <li
                  key={`${listCategory.id}-${word}`}
                  className="px-4 py-3 text-left text-lg font-medium md:px-5 md:text-xl"
                >
                  {word}
                </li>
              ))}
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
