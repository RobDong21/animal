import { useEffect, useRef } from 'react'

/**
 * Window keydown while a Words practice round is active.
 * Ignores modified keys and typing inside form fields.
 */
export function useGameKeydown(enabled, onKeyDown) {
  const onKeyDownRef = useRef(onKeyDown)
  onKeyDownRef.current = onKeyDown

  useEffect(() => {
    if (!enabled) return undefined

    function handleKeyDown(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      onKeyDownRef.current(event)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled])
}
