import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SHORT_ROUND_SIZE } from '@/data/animals'
import { assetUrl } from '@/lib/assets'

export default function Home({ onPlay }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="space-y-5 pb-2">
          <img
            src={assetUrl('/habitats/forest.jpg')}
            alt="Animals in nature"
            className="surface-frame mx-auto h-48 w-full object-cover shadow-md md:h-64"
          />
          <h1 className="text-4xl font-bold md:text-5xl">Animal World</h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Learn where animals live! Pick the habitat for each animal.
          </p>
        </CardHeader>
        <CardContent className="space-y-5 pb-8">
          <Button
            size="xl"
            className="h-16 w-full text-2xl shadow-md md:h-20 md:text-3xl"
            onClick={() => onPlay({ roundSize: SHORT_ROUND_SIZE })}
          >
            ⚡ Quick Play ({SHORT_ROUND_SIZE} animals)
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 w-full text-xl md:h-16 md:text-2xl"
            onClick={() => onPlay({ roundSize: null })}
          >
            🌍 Full Adventure (all animals)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
