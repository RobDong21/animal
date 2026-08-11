import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ChoiceButton({
  label,
  icon,
  disabled,
  eliminated,
  onClick,
  pulse,
  highlight,
  previewButton,
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
          className={cn(
            'game-choice-button surface-interactive-lg h-auto min-h-20 w-full flex-col gap-2 py-3 transition-transform md:py-3.5 lg:min-h-24 lg:py-4',
            pulse && !eliminated && 'animate-pulse border-amber-400 bg-amber-50',
            highlight && 'scale-105 ring-4 ring-primary/40',
            eliminated && 'border-rose-200 bg-rose-50 opacity-60',
            !highlight && !pulse && !eliminated && 'hover:scale-[1.02] active:scale-95'
          )}
          onClick={onClick}
        >
          {icon}
          <span className="text-base font-bold lg:text-lg">{label}</span>
        </Button>
        {eliminated && (
          <div
            className="pointer-events-none absolute inset-1 z-10 flex items-center justify-center text-rose-500"
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
      {previewButton}
    </div>
  )
}
