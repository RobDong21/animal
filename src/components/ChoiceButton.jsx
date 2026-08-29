import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ChoiceButton({
  label,
  icon,
  disabled,
  eliminated,
  revealed,
  onClick,
  highlight,
  ariaLabel,
}) {
  return (
    <div className="relative">
      <div className="relative w-full">
        <Button
          variant={highlight ? 'default' : 'outline'}
          size="lg"
          disabled={disabled}
          aria-label={ariaLabel ?? label}
          aria-pressed={highlight}
          className={cn(
            'game-choice-button surface-interactive-lg h-auto min-h-20 w-full flex-col gap-2 px-2 py-3 transition-transform md:px-3 md:py-4 lg:min-h-24',
            highlight && 'scale-105 ring-4 ring-primary/40',
            revealed &&
              'border-success-border border-dashed bg-success-muted text-success-content hover:bg-success-muted',
            eliminated && 'border-error-border bg-error-muted opacity-60',
            !highlight && !eliminated && 'hover:scale-[1.02] active:scale-95'
          )}
          onClick={onClick}
        >
          {icon}
          <span className="max-w-full whitespace-normal px-1 text-center text-base font-semibold leading-[1.1] break-words lg:text-lg">
            {label}
          </span>
        </Button>
        {revealed && !highlight && (
          <span
            className="pointer-events-none absolute top-1 right-1 rounded-full bg-success-content px-2 py-0.5 text-xs font-bold text-success-foreground"
            aria-hidden="true"
          >
            Try this
          </span>
        )}
        {eliminated && (
          <div
            className="pointer-events-none absolute inset-1 z-10 flex items-center justify-center text-error"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-full w-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
