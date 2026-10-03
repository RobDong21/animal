import { CheckCircle2, CircleX, Home, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function WordsRoundHeader({
  onHome,
  progressLabel,
  progressRatio,
  categoryName,
  children,
}) {
  const clamped = Math.min(1, Math.max(0, progressRatio ?? 0))

  return (
    <div className="flex shrink-0 flex-col gap-3">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="outline"
          className="toolbar-button-icon"
          onClick={onHome}
          aria-label="Home"
        >
          <Home />
        </Button>
        <div className="min-w-0 flex-1 space-y-2 text-center">
          <div className="text-component-title">{progressLabel}</div>
          <div className="h-4 overflow-hidden rounded-full bg-muted md:h-5">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${Math.round(clamped * 100)}%` }}
            />
          </div>
          {categoryName ? <p className="text-supporting">{categoryName}</p> : null}
        </div>
        <div className="h-12 w-12 shrink-0 md:h-14 md:w-14" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}

export function WordsHearWordButton({ onClick, ariaLabel, className }) {
  return (
    <Button
      size="lg"
      variant="outline"
      className={cn(
        'min-h-14 w-full max-w-md gap-3 px-6 text-lg font-semibold md:min-h-16 md:text-xl [&_svg]:!h-7 [&_svg]:!w-7',
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Volume2 aria-hidden="true" />
      Hear word
    </Button>
  )
}

export function WordsFeedbackBanner({ feedback }) {
  const isError = feedback?.tone === 'error'

  return (
    <div
      className="flex min-h-14 w-full max-w-md items-center"
      aria-hidden={!feedback}
    >
      {feedback ? (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={cn(
            'radius-normal border-normal flex min-h-14 w-full items-center gap-3 px-3 py-2.5 text-base font-medium leading-snug',
            isError
              ? 'border-error-border bg-error-muted text-error-content'
              : 'border-success-border bg-success-muted text-success-content'
          )}
        >
          {isError ? (
            <CircleX className="h-5 w-5 shrink-0" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          )}
          <p>{feedback.text}</p>
        </div>
      ) : null}
    </div>
  )
}
