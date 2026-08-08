import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      expand
      visibleToasts={3}
      gap={12}
      closeButton
      toastOptions={{
        duration: 5000,
        classNames: {
          toast: 'group kid-toast flex items-start gap-3 px-6 py-5 shadow-xl backdrop-blur-sm',
          title: 'text-xl font-extrabold leading-tight',
          description: 'text-lg font-medium leading-snug',
          icon: 'hidden',
          closeButton: 'rounded-full border-normal bg-white/80 text-foreground hover:bg-white',
          success: 'kid-toast-success !border-emerald-400 bg-emerald-50 text-emerald-950',
          error: 'kid-toast-error !border-amber-400 bg-amber-50 text-amber-950',
          info: 'kid-toast-info !border-sky-400 bg-sky-50 text-sky-950',
        },
      }}
    />
  )
}
