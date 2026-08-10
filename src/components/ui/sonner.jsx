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
        duration: 5000,
        classNames: {
          toast:
            'group kid-toast flex cursor-pointer items-start gap-3 shadow-xl backdrop-blur-sm active:opacity-90',
          title: 'text-xl font-extrabold leading-tight',
          description: 'text-lg font-medium leading-snug',
          icon: 'hidden',
          success: 'kid-toast-success !border-emerald-500 !bg-emerald-100 text-emerald-950',
          error: 'kid-toast-error !border-rose-500 !bg-rose-100 text-rose-950',
          info: 'kid-toast-info !border-sky-400 !bg-sky-100 text-sky-950',
        },
      }}
    />
  )
}
