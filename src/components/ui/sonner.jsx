import { useEffect } from 'react'
import { Toaster as Sonner, toast } from 'sonner'

export function Toaster() {
  useEffect(() => {
    function dismissToast(event) {
      const toaster = event.target.closest('[data-sonner-toaster]')
      if (!toaster) return

      const toastEl = event.target.closest('[data-sonner-toast][data-dismissible="true"]')
      if (!toastEl || toastEl.getAttribute('data-visible') === 'false') return

      if (event.target.closest('[data-button], [data-cancel], [data-action]')) return

      toast.dismiss()
    }

    function handleClick(event) {
      dismissToast(event)
    }

    function handleKeyDown(event) {
      if (event.key !== 'Enter' && event.key !== ' ') return

      const toastEl = event.target.closest('[data-sonner-toast][data-dismissible="true"]')
      if (!toastEl || toastEl !== document.activeElement) return

      event.preventDefault()
      toast.dismiss()
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Sonner
      position="top-center"
      visibleToasts={1}
      closeButton={false}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            'group kid-toast flex cursor-pointer items-start gap-3 backdrop-blur-sm active:opacity-90',
          title: 'text-xl font-extrabold leading-tight',
          description: 'text-lg font-medium leading-snug',
          icon: 'hidden',
          success: 'kid-toast-success !border-success-border !bg-success-muted text-success-content',
          error: 'kid-toast-error !border-error-border !bg-error-muted text-error-content',
          info: 'kid-toast-info !border-info-border !bg-info-muted text-info-content',
        },
      }}
    />
  )
}
