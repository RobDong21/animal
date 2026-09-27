import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const BURSTS = [
  { count: 14, top: '36%', left: '50%', delay: 0, distance: '8.5rem' },
  { count: 12, top: '42%', left: '32%', delay: 180, distance: '6.5rem' },
  { count: 12, top: '40%', left: '68%', delay: 280, distance: '6.5rem' },
]

const SPARKLE_COUNT = 10
const BURST_MS = 1800

const COLORS = [
  'var(--color-primary)',
  'var(--color-success-content)',
  '#f59e0b',
  '#ef4444',
  '#3b82f6',
  '#ec4899',
  '#a855f7',
  '#22d3ee',
]

/**
 * Brief multi-burst fireworks for correct answers.
 * Decorative only — does not block interaction.
 */
export function SuccessFireworks({ active, className }) {
  const [burstKey, setBurstKey] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return undefined
    }

    setBurstKey((value) => value + 1)
    setVisible(true)

    const timer = window.setTimeout(() => {
      setVisible(false)
    }, BURST_MS)

    return () => window.clearTimeout(timer)
  }, [active])

  if (!visible) return null

  return (
    <div
      key={burstKey}
      className={cn('success-fireworks', className)}
      aria-hidden="true"
    >
      {BURSTS.map((burst, burstIndex) => (
        <div
          key={burstIndex}
          className="success-fireworks__burst"
          style={{
            '--fw-top': burst.top,
            '--fw-left': burst.left,
            '--fw-burst-delay': `${burst.delay}ms`,
            '--fw-distance': burst.distance,
          }}
        >
          <span className="success-fireworks__flash" />
          <span className="success-fireworks__ring" />
          {Array.from({ length: burst.count }, (_, index) => {
            const angle = (360 / burst.count) * index + burstIndex * 8
            const color = COLORS[(index + burstIndex * 3) % COLORS.length]
            const delay = burst.delay + (index % 5) * 30
            const shape =
              index % 4 === 0 ? 'streak' : index % 3 === 0 ? 'diamond' : 'dot'

            return (
              <span
                key={index}
                className={cn(
                  'success-fireworks__particle',
                  `success-fireworks__particle--${shape}`
                )}
                style={{
                  '--fw-angle': `${angle}deg`,
                  '--fw-color': color,
                  '--fw-delay': `${delay}ms`,
                }}
              />
            )
          })}
        </div>
      ))}

      {Array.from({ length: SPARKLE_COUNT }, (_, index) => {
        const angle = (360 / SPARKLE_COUNT) * index + 12
        const color = COLORS[index % COLORS.length]
        const delay = 120 + index * 55

        return (
          <span
            key={`sparkle-${index}`}
            className="success-fireworks__sparkle"
            style={{
              '--fw-angle': `${angle}deg`,
              '--fw-color': color,
              '--fw-delay': `${delay}ms`,
              '--fw-sparkle-dist': `${5 + (index % 4)}rem`,
            }}
          />
        )
      })}
    </div>
  )
}
