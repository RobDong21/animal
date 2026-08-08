import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      visibleToasts={1}
      closeButton
      toastOptions={{
        duration: 5000,
        classNames: {
          toast: 'group kid-toast flex items-start gap-3 px-6 py-5 shadow-xl backdrop-blur-sm',
          title: 'text-xl font-extrabold leading-tight',
          description: 'text-lg font-medium leading-snug',
          icon: 'hidden',
          closeButton: 'rounded-full border-normal bg-white/80 text-foreground hover:bg-white',
          success: 'kid-toast-success !border-emerald-500 !bg-emerald-100 text-emerald-950',
          error: 'kid-toast-error !border-rose-500 !bg-rose-100 text-rose-950',
          info: 'kid-toast-info !border-sky-400 !bg-sky-100 text-sky-950',
        },
      }}
    />
  )
}
