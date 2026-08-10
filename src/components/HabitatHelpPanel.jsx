import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import HabitatIcon from '@/components/HabitatIcon'
import {
  getHabitatById,
  getHabitatVideoStart,
  HABITAT_HELP_VIDEO_ID,
} from '@/data/animals'

export default function HabitatHelpPanel({ habitatId, onClose }) {
  const habitat = habitatId ? getHabitatById(habitatId) : null
  const startSeconds = habitatId ? getHabitatVideoStart(habitatId) : 0
  const embedUrl = `https://www.youtube-nocookie.com/embed/${HABITAT_HELP_VIDEO_ID}?start=${startSeconds}&autoplay=1&rel=0`

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-3 md:items-center md:p-4"
      onClick={onClose}
      role="presentation"
    >
      <Card
        className="flex w-full max-w-4xl flex-col shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-labelledby="habitat-help-title"
        aria-modal="true"
      >
        <CardHeader className="shrink-0 space-y-2 pb-3 text-center">
          {habitat && (
            <div className="flex items-center justify-center gap-3">
              <HabitatIcon habitatId={habitat.id} className="h-10 w-10 text-primary md:h-12 md:w-12" />
              <h2 id="habitat-help-title" className="text-3xl font-bold md:text-4xl">
                {habitat.name}
              </h2>
            </div>
          )}
          {!habitat && (
            <h2 id="habitat-help-title" className="text-3xl font-bold md:text-4xl">
              What is a habitat?
            </h2>
          )}
          <p className="text-lg text-muted-foreground md:text-xl">
            {habitat
              ? `Watch to learn about the ${habitat.name.toLowerCase()}.`
              : 'Watch to learn where animals live.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pb-4">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border-normal border-border bg-black shadow-md">
            <iframe
              src={embedUrl}
              title={habitat ? `${habitat.name} habitat video` : 'Habitats for kids video'}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </CardContent>
        <div className="shrink-0 border-t border-border p-4 pt-3">
          <Button size="lg" className="w-full text-lg md:text-xl" onClick={onClose}>
            Back to game
          </Button>
        </div>
      </Card>
    </div>
  )
}
