import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const BURSTS = [
  { count: 14, top: '36%', left: '50%', delay: 0, distance: '8.5rem' },
  { count: 12, top: '42%', left: '32%', delay: 180, distance: '6.5rem' },
  { count: 12, top: '40%', left: '68%', delay: 280, distance: '6.5rem' },
]

const INTENSE_BURSTS = [
  ...BURSTS,
  { count: 16, top: '22%', left: '22%', delay: 90, distance: '9rem' },
  { count: 16, top: '24%', left: '78%', delay: 140, distance: '9rem' },
  { count: 14, top: '58%', left: '50%', delay: 320, distance: '8rem' },
  { count: 12, top: '18%', left: '50%', delay: 400, distance: '7rem' },
]

const SPARKLE_COUNT = 10
const INTENSE_SPARKLE_COUNT = 18
const BURST_MS = 1800
const INTENSE_BURST_MS = 2400

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
export function SuccessFireworks({ active, className, intense = false, loop = false }) {
  const [burstKey, setBurstKey] = useState(0)
  const [visible, setVisible] = useState(false)
  const duration = intense ? INTENSE_BURST_MS : BURST_MS

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return undefined
    }

    setBurstKey((value) => value + 1)
    setVisible(true)

    if (loop) {
      const timer = window.setInterval(() => {
        setBurstKey((value) => value + 1)
      }, duration)
      return () => window.clearInterval(timer)
    }

    const timer = window.setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => window.clearTimeout(timer)
  }, [active, duration, loop])

  if (!visible) return null

  const bursts = intense ? INTENSE_BURSTS : BURSTS
  const sparkleCount = intense ? INTENSE_SPARKLE_COUNT : SPARKLE_COUNT

  return (
    <div
      key={burstKey}
      className={cn('success-fireworks', className)}
      aria-hidden="true"
    >
      {bursts.map((burst, burstIndex) => (
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

      {Array.from({ length: sparkleCount }, (_, index) => {
        const angle = (360 / sparkleCount) * index + 12
        const color = COLORS[index % COLORS.length]
        const delay = 120 + index * 40

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
