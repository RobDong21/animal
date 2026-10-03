export function HappyWinDrawing({ className }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className}
      aria-hidden="true"
    >
      <circle cx="80" cy="80" r="36" fill="var(--color-warning)" />
      <g stroke="var(--color-warning)" strokeWidth="6" strokeLinecap="round">
        <path d="M80 14 V28" />
        <path d="M80 132 V146" />
        <path d="M14 80 H28" />
        <path d="M132 80 H146" />
        <path d="M32 32 L42 42" />
        <path d="M118 118 L128 128" />
        <path d="M128 32 L118 42" />
        <path d="M42 118 L32 128" />
      </g>
      <circle cx="68" cy="74" r="5" fill="var(--color-foreground)" />
      <circle cx="92" cy="74" r="5" fill="var(--color-foreground)" />
      <path
        d="M62 92 Q80 108 98 92"
        fill="none"
        stroke="var(--color-foreground)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}
