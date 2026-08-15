import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SHORT_ROUND_SIZE } from '@/data/animals'
import { assetUrl } from '@/lib/assets'

export default function Home({ onPlay }) {
  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center overflow-y-auto px-4 py-3 pt-[max(0.5rem,env(safe-area-inset-top))] md:px-6 md:py-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="space-y-4 pb-2 md:space-y-5">
          <img
            src={assetUrl('/habitats/forest.jpg')}
            alt="Animals in nature"
            className="surface-frame mx-auto h-40 w-full object-cover shadow-md md:h-48 lg:h-64"
          />
          <h1 className="text-4xl font-bold md:text-5xl">Animal World</h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Learn what animals are and where they live!
          </p>
        </CardHeader>
        <CardContent className="space-y-5 pb-8">
          <Button
            size="xl"
            className="h-16 w-full text-2xl shadow-md md:h-20 md:text-3xl"
            onClick={() => onPlay({ mode: 'easy', roundSize: SHORT_ROUND_SIZE })}
          >
            🌱 Easy
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="h-16 w-full text-2xl md:h-20 md:text-3xl"
            onClick={() => onPlay({ mode: 'normal', roundSize: SHORT_ROUND_SIZE })}
          >
            ⭐ Normal
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 w-full text-xl md:h-16 md:text-2xl"
            onClick={() => onPlay({ mode: 'normal', roundSize: null })}
          >
            🌍 Full Adventure (all animals)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
