import { Mail, User, X } from "lucide-react"
import { Button } from "../../components/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import { Controller, useFormContext } from "react-hook-form"

interface ConfirmTripModalProps {
  isLoading: boolean
  toggleIsConfirmTripModalOpen: () => void
}

export const ConfirmTripModal = ({
  toggleIsConfirmTripModalOpen,
  isLoading
}: ConfirmTripModalProps) => {
  const { control, getValues } = useFormContext()

  const destination = getValues('destination')
  const trip_start_and_end_dates = getValues('trip_start_and_end_dates')

  const dateDisplay = trip_start_and_end_dates ?
    `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}`
    : null

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
            <span className="text-zinc-100 font-semibold ml-1">{destination}</span>,
            de {` `} {dateDisplay} {` `}
            preencha seus dados abaixo:
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <User className="size-5 ml-2 text-zinc-400" />

            <Controller
              name="ownerName"
              control={control}
              render={
                ({ field }) => (
                  <input
                    {...field}
                    placeholder="Seu nome completo"
                    className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                  />
                )
              }
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <Mail className="size-5 ml-2 text-zinc-400" />

            <Controller
              name="ownerEmail"
              control={control}
              render={
                ({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Seu e-mail pessoal"
                    className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                  />
                )
              }
            />
          </div>

          <Button type="submit" form="create_trip" size="full" disabled={isLoading}>
            Confirmar criação de viagem
          </Button>
        </div>
      </div>
    </div>
  )
}
