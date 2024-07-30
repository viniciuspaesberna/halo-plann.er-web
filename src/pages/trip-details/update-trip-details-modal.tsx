import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Tag } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/button'
import { DatePickerModal } from '../../components/date-picker-modal'
import { Input } from '../../components/input'
import { Modal } from '../../components/modal'
import { useTripDetails } from '../../contexts/trip-details-context'
import { cn } from '../../utils/cn'

interface UpdateTripDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

const updateTripDetailsFormSchema = z.object({
  destination: z
    .string({ required_error: 'Destino é obrigatório' })
    .min(3, { message: 'Destino deve conter pelo menos 3 letras' }),
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

  function updateTripDatails(data: UpdateTripDetailsFormData) {
    console.log(data)
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
      description="Atuliaze as informações da sua viagem"
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="w-full max-w-[640px]"
    >
      <FormProvider {...form}>
        <form className="space-y-3" onSubmit={handleSubmit(updateTripDatails)}>
          <Input
            errors={errors}
            icon={<Tag className="size-5 shrink-0 text-zinc-400" />}
            {...register('destination')}
          />

          <button
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
            isOpen={isRangeDatePickerOpen}
            onClose={() => setIsRangeDatePickerOpen(false)}
          />

          <Button type="submit" size="full">
            Salvar mudança
          </Button>
        </form>
      </FormProvider>
    </Modal>
  )
}
