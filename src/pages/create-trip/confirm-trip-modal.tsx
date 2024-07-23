import { Mail, User, X } from "lucide-react"
import type { FormEvent } from "react"
import { Button } from "../../components/button"

interface ConfirmTripModalProps {
  isLoading: boolean
  toggleIsConfirmTripModalOpen: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}

export const ConfirmTripModal = ({
  toggleIsConfirmTripModalOpen,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  isLoading
}: ConfirmTripModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Confirmar criação de viagem</h2>

            <button
              className="size-8 rounded-lg flex items-center justify-center ring-white/60 hover:ring-1"
              onClick={toggleIsConfirmTripModalOpen}
            >
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação de viagem para
            <span className="text-zinc-100 font-semibold ml-1">destination</span>,
            nas datas
            <span className="text-zinc-100 font-semibold mx-1">trip_start</span> à
            <span className="text-zinc-100 font-semibold mx-1">trip_end</span>
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <User className="size-5 ml-2 text-zinc-400" />

            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={e => setOwnerName(e.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <Mail className="size-5 ml-2 text-zinc-400" />

            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={e => setOwnerEmail(e.target.value)}
            />
          </div>

          <Button type="submit" size="full" disabled={isLoading}>
            Confirmar criação de viagem
          </Button>

        </form>
      </div>
    </div>
  )
}
