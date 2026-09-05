import { BookOpen, Sparkles, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DISCOVER_ROUND_SIZE, EXPLORER_ROUND_SIZE } from '@/data/animals'
import { assetUrl } from '@/lib/assets'

export default function Home({ onPlay, onOpenStarters }) {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-4 py-4 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="space-y-4 pb-4">
          <img
            src={assetUrl('/camimi.webp')}
            alt="Camimi with farm animals"
            className="radius-large mx-auto h-48 w-full object-cover object-[center_35%] md:h-56 lg:h-72"
          />
          <h1 className="text-display">Animal World</h1>
          <p className="text-supporting">
            Learn what animals are and where they live!
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pb-8">
          <Button
            size="xl"
            variant="outline"
            className="cta-secondary justify-start gap-4 text-left [&_svg]:!h-8 [&_svg]:!w-8"
            onClick={() => onPlay({ mode: 'discover', roundSize: DISCOVER_ROUND_SIZE })}
          >
            <Sprout className="text-primary" aria-hidden="true" />
            <span className="flex flex-col">
              <span>Discover</span>
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                Familiar animals with fewer choices.
              </span>
            </span>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="cta-secondary justify-start gap-4 text-left [&_svg]:!h-8 [&_svg]:!w-8"
            onClick={() => onPlay({ mode: 'explorer', roundSize: EXPLORER_ROUND_SIZE })}
          >
            <Sparkles className="text-primary" aria-hidden="true" />
            <span className="flex flex-col">
              <span>Explorer</span>
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                More animals, types, and habitats.
              </span>
            </span>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="cta-secondary justify-start gap-4 text-left [&_svg]:!h-8 [&_svg]:!w-8"
            onClick={onOpenStarters}
          >
            <BookOpen className="text-primary" aria-hidden="true" />
            <span className="flex flex-col">
              <span>Starters Words</span>
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                Practice Cambridge Pre A1 words.
              </span>
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
