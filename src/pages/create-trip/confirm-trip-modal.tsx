import { Mail, User } from "lucide-react"
import { Button } from "../../components/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import { Controller, useFormContext } from "react-hook-form"
import { Modal } from "../../components/modal";

interface ConfirmTripModalProps {
  isLoading: boolean
  isConfirmTripModalOpen: boolean
  toggleIsConfirmTripModalOpen: () => void
}

export const ConfirmTripModal = ({
  toggleIsConfirmTripModalOpen,
  isConfirmTripModalOpen,
  isLoading
}: ConfirmTripModalProps) => {
  const { control, getValues } = useFormContext()

  const destination = getValues('destination')
  const trip_start_and_end_dates = getValues('trip_start_and_end_dates')

  const dateDisplay = trip_start_and_end_dates ?
    `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}`
    : null

  return (
    <Modal
      heading="Confirmar criação de viagem"
      description={
        <p className="text-sm text-zinc-400">
          Para concluir a criação de viagem para
          <span className="text-zinc-100 font-semibold ml-1">{destination}</span>,
          de {` `} <span className="text-zinc-100 font-semibold ml-1">{dateDisplay}</span>, {` `}
          preencha seus dados abaixo:
        </p>
      }
      className="w-[640px]"
      onClose={toggleIsConfirmTripModalOpen}
      isOpen={isConfirmTripModalOpen}
    >
      <div className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
          <User className="size-5 ml-2 text-zinc-400" />

          <Controller
            name="ownerName"
            control={control}
            render={
              ({ field, formState: { errors } }) => (
                <>
                  <input
                    {...field}
                    placeholder="Seu nome completo"
                    className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                  />
                  {errors.ownerName && (
                    <small className="text-zinc-400">{errors.ownerName.message?.toString()}</small>
                  )}
                </>
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
              ({ field, formState: { errors } }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    placeholder="Seu e-mail pessoal"
                    className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                  />
                  {errors.ownerEmail && (
                    <small className="text-zinc-400">{errors.ownerEmail.message?.toString()}</small>
                  )}
                </>
              )
            }
          />
        </div>

        <Button type="submit" isLoading={isLoading} form="create_trip" size="full">
          Confirmar criação de viagem
        </Button>
      </div>
    </Modal>
  )
}
