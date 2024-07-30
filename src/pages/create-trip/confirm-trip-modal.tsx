import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Mail, User } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '../../components/button'
import { Modal } from '../../components/modal'

interface ConfirmTripModalProps {
  isLoading: boolean
  isConfirmTripModalOpen: boolean
  toggleIsConfirmTripModalOpen: () => void
}

export const ConfirmTripModal = ({
  toggleIsConfirmTripModalOpen,
  isConfirmTripModalOpen,
  isLoading,
}: ConfirmTripModalProps) => {
  const { control, getValues } = useFormContext()

  const destination = getValues('destination')
  const trip_start_and_end_dates = getValues('trip_start_and_end_dates')

  const dateDisplay = trip_start_and_end_dates
    ? `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}`
    : null

  return (
    <Modal
      heading="Confirmar criação de viagem"
      description={
        <p className="text-sm text-zinc-400">
          Para concluir a criação de viagem para
          <span className="ml-1 font-semibold text-zinc-100">
            {destination}
          </span>
          , de {` `}{' '}
          <span className="ml-1 font-semibold text-zinc-100">
            {dateDisplay}
          </span>
          , {` `}
          preencha seus dados abaixo:
        </p>
      }
      className="w-[640px]"
      onClose={toggleIsConfirmTripModalOpen}
      isOpen={isConfirmTripModalOpen}
    >
      <div className="space-y-3">
        <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
          <User className="ml-2 size-5 text-zinc-400" />

          <Controller
            name="ownerName"
            control={control}
            render={({ field, formState: { errors } }) => (
              <>
                <input
                  {...field}
                  placeholder="Seu nome completo"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
                {errors.ownerName && (
                  <small className="text-zinc-400">
                    {errors.ownerName.message?.toString()}
                  </small>
                )}
              </>
            )}
          />
        </div>

        <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
          <Mail className="ml-2 size-5 text-zinc-400" />

          <Controller
            name="ownerEmail"
            control={control}
            render={({ field, formState: { errors } }) => (
              <>
                <input
                  {...field}
                  type="email"
                  placeholder="Seu e-mail pessoal"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
                {errors.ownerEmail && (
                  <small className="text-zinc-400">
                    {errors.ownerEmail.message?.toString()}
                  </small>
                )}
              </>
            )}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          form="create_trip"
          size="full"
        >
          Confirmar criação de viagem
        </Button>
      </div>
    </Modal>
  )
}
