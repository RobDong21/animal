import { BookOpen, Ear, Puzzle, Sparkles, Sprout, WholeWord } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DISCOVER_ROUND_SIZE, EXPLORER_ROUND_SIZE } from '@/data/animals'

function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="text-component-title text-left text-muted-foreground">
      {children}
    </h2>
  )
}

function PlayButton({ icon: Icon, title, description, onClick, ariaLabel }) {
  return (
    <Button
      size="xl"
      variant="outline"
      className="cta-secondary h-full min-h-14 w-full justify-start gap-3 whitespace-normal px-4 py-3 text-left md:min-h-16 md:px-5 md:py-4 [&_svg]:!h-7 [&_svg]:!w-7 md:[&_svg]:!h-8 md:[&_svg]:!w-8"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
    >
      <Icon className="shrink-0 text-primary" aria-hidden="true" />
      <span className="flex min-w-0 flex-col">
        <span>{title}</span>
        <span className="text-sm font-medium text-muted-foreground md:text-base">{description}</span>
      </span>
    </Button>
  )
}

export default function Home({
  onPlay,
  onOpenStarters,
  onOpenMissingLetter,
  onOpenBuildTheWord,
  onOpenListenAndChoose,
  onOpenAnimalList,
  onOpenWordList,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-4 py-4 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6">
      <Card className="w-full max-w-4xl text-center">
        <CardHeader className="space-y-2 pb-4">
          <h1 className="text-display">Camimi Learn</h1>
          <p className="text-supporting">Play with animals and words!</p>
        </CardHeader>
        <CardContent className="space-y-6 pb-8 text-left">
          <section aria-labelledby="home-animals-heading" className="space-y-3">
            <SectionHeading id="home-animals-heading">Animals</SectionHeading>
            <div className="grid grid-cols-2 gap-3">
              <PlayButton
                icon={Sprout}
                title="Discover"
                description="Familiar animals with fewer choices."
                onClick={() => onPlay({ mode: 'discover', roundSize: DISCOVER_ROUND_SIZE })}
              />
              <PlayButton
                icon={Sparkles}
                title="Explorer"
                description="More animals, types, and habitats."
                onClick={() => onPlay({ mode: 'explorer', roundSize: EXPLORER_ROUND_SIZE })}
              />
            </div>
          </section>

          <section aria-labelledby="home-words-heading" className="space-y-3">
            <SectionHeading id="home-words-heading">Words</SectionHeading>
            <div className="grid grid-cols-2 gap-3">
              <PlayButton
                icon={BookOpen}
                title="Starters Words"
                description="Practice reading words."
                onClick={onOpenStarters}
              />
              <PlayButton
                icon={WholeWord}
                title="Missing Letter"
                description="Find the missing letter in a word."
                onClick={onOpenMissingLetter}
              />
              <PlayButton
                icon={Ear}
                title="Listen and Choose"
                description="Hear a word and choose it."
                onClick={onOpenListenAndChoose}
              />
              <PlayButton
                icon={Puzzle}
                title="Build the Word"
                description="Build the word from letters."
                onClick={onOpenBuildTheWord}
              />
            </div>
          </section>

          <nav
            aria-label="For parents"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1"
          >
            <p className="text-sm font-medium text-muted-foreground/80">Parents</p>
            <Button
              variant="link"
              className="h-auto min-h-11 px-1 text-sm font-medium text-muted-foreground"
              onClick={onOpenAnimalList}
            >
              Animal list
            </Button>
            <span className="text-muted-foreground/50" aria-hidden="true">
              ·
            </span>
            <Button
              variant="link"
              className="h-auto min-h-11 px-1 text-sm font-medium text-muted-foreground"
              onClick={onOpenWordList}
            >
              Word list
            </Button>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
