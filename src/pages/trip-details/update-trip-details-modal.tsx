import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/button'
import { DatePickerModal } from '../../components/date-picker-modal'
import { Input } from '../../components/input'
import { Modal } from '../../components/modal'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'
import { cn } from '../../utils/cn'

interface UpdateTripDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

const updateTripDetailsFormSchema = z.object({
  destination: z
    .string({ required_error: 'Destino é obrigatório' })
    .min(4, { message: 'Destino deve conter pelo menos 4 letras' }),
  trip_start_and_end_dates: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
})

type UpdateTripDetailsFormData = z.infer<typeof updateTripDetailsFormSchema>

export const UpdateTripDetailsModal = ({
  isOpen,
  onClose,
}: UpdateTripDetailsModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRangeDatePickerOpen, setIsRangeDatePickerOpen] = useState(false)

  const { trip } = useTripDetails()

  const form = useForm<UpdateTripDetailsFormData>({
    resolver: zodResolver(updateTripDetailsFormSchema),
    defaultValues: {
      destination: trip.destination,
      trip_start_and_end_dates: {
        from: new Date(trip.starts_at),
        to: new Date(trip.ends_at),
      },
    },
  })

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = form

  const trip_start_and_end_dates = getValues('trip_start_and_end_dates')

  async function updateTripDatails(data: UpdateTripDetailsFormData) {
    console.log(data)

    const { trip_start_and_end_dates, destination } = data

    if (
      !trip_start_and_end_dates ||
      !trip_start_and_end_dates.from ||
      !trip_start_and_end_dates.to
    ) {
      return form.setError('trip_start_and_end_dates', {
        message: 'Datas de início e fim da viagem são obrigatórias',
      })
    }

    setIsLoading(true)

    await api
      .put(`/trips/${trip.id}`, {
        destination,
        starts_at: trip_start_and_end_dates.from,
        ends_at: trip_start_and_end_dates.to,
      })
      .then(() => {
        window.document.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCloseModal() {
    setIsRangeDatePickerOpen(false)
    onClose()
  }

  const dateDisplay =
    trip_start_and_end_dates &&
    trip_start_and_end_dates.from &&
    trip_start_and_end_dates.to
      ? `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}`
      : null

  return (
    <Modal
      heading="Detalhes da viagem"
      description="Aqui você pode alterar as informações da sua viagem"
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="w-full max-w-[640px]"
    >
      <FormProvider {...form}>
        <form className="space-y-3" onSubmit={handleSubmit(updateTripDatails)}>
          <Input
            error={errors.destination?.message}
            icon={<MapPin className="size-5 shrink-0 text-zinc-400" />}
            {...register('destination')}
            placeholder="Para onde você vai?"
          />

          <button
            type="button"
            onClick={() => setIsRangeDatePickerOpen(true)}
            className="flex h-14 w-full items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4"
          >
            <Calendar className="size-5 shrink-0 text-zinc-400" />

            <div>
              <span
                className={cn(
                  'w-auto flex-1 text-lg text-zinc-400',
                  dateDisplay && 'text-zinc-100',
                )}
              >
                {dateDisplay || 'Quando?'}
              </span>
            </div>

            {errors.trip_start_and_end_dates && (
              <small className="text-sm text-zinc-400">
                {errors.trip_start_and_end_dates.message?.toString()}
              </small>
            )}
          </button>

          <DatePickerModal
            fieldName="trip_start_and_end_dates"
            isOpen={isRangeDatePickerOpen}
            onClose={() => setIsRangeDatePickerOpen(false)}
          />

          <Button type="submit" isLoading={isLoading} size="full">
            Salvar mudança
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
