import { cn } from '@/lib/utils'

export const EASY_TRY_LIMIT = 4

/**
 * Friendly 4-part flower. Each miss adds a part. Complete picture = this word is lost.
 */
export function EasyTryDrawing({ misses, className }) {
  const parts = Math.min(EASY_TRY_LIMIT, Math.max(0, misses))
  const remaining = EASY_TRY_LIMIT - parts
  const complete = parts >= EASY_TRY_LIMIT

  return (
    <div
      className={cn('flex flex-col items-center gap-1.5', className)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={
        complete
          ? 'The picture is complete. This round is over.'
          : remaining === 1
            ? '1 try left'
            : `${remaining} tries left`
      }
    >
      <svg
        viewBox="0 0 64 72"
        className="h-16 w-14 md:h-[4.5rem] md:w-16"
        aria-hidden="true"
      >
        {parts >= 1 && (
          <path
            d="M32 62 V34"
            fill="none"
            stroke="var(--color-success-content)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}
        {parts >= 2 && (
          <>
            <path
              d="M32 50 Q20 46 16 54"
              fill="none"
              stroke="var(--color-success-content)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M32 50 Q44 46 48 54"
              fill="none"
              stroke="var(--color-success-content)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
        {parts >= 3 && (
          <>
            <ellipse cx="32" cy="22" rx="8" ry="12" fill="color-mix(in oklab, var(--color-primary) 55%, white)" />
            <ellipse cx="32" cy="22" rx="12" ry="8" fill="color-mix(in oklab, var(--color-primary) 45%, white)" />
            <ellipse cx="22" cy="22" rx="8" ry="10" fill="color-mix(in oklab, var(--color-primary) 50%, white)" />
            <ellipse cx="42" cy="22" rx="8" ry="10" fill="color-mix(in oklab, var(--color-primary) 50%, white)" />
          </>
        )}
        {parts >= 4 && (
          <circle cx="32" cy="22" r="6" fill="var(--color-warning)" />
        )}
        {parts === 0 && (
          <circle
            cx="32"
            cy="58"
            r="4"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        )}
      </svg>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: EASY_TRY_LIMIT }, (_, index) => (
          <span
            key={index}
            className={cn(
              'h-2 w-2 rounded-full',
              index < parts ? 'bg-error' : 'bg-muted-foreground/30'
            )}
          />
        ))}
      </div>
    </div>
  )
}
