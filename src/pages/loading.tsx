import { LoaderPinwheel } from 'lucide-react'

export const LoadingPage = () => {
  return (
    <div className="flex min-h-screen animate-pulse items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <img src="/logo.svg" alt="" className="scale-125" />

        <p className="text-xl text-zinc-400">
          Convide seus amigos e planeje sua próxima viagem!
        </p>

        <LoaderPinwheel className="animate-spin" />
      </div>
    </div>
  )
}
