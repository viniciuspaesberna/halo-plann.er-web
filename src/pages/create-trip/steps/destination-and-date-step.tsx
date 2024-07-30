import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../../components/button'
import { DatePickerModal } from '../../../components/date-picker-modal'
import { cn } from '../../../utils/cn'

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  toggleIsGuestsInputOpen: () => void
}

const destinationAndDateStepSchema = z.object({
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

export const DestinationAndDateStep = ({
  isGuestsInputOpen,
  toggleIsGuestsInputOpen,
}: DestinationAndDateStepProps) => {
  const {
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const destination = getValues('destination')
  const trip_start_and_end_dates = getValues('trip_start_and_end_dates')

  function destinationAndDateStepValidation() {
    clearErrors(['destination', 'trip_start_and_end_dates'])

    const validation = destinationAndDateStepSchema.safeParse({
      destination,
      trip_start_and_end_dates,
    })

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors

      if (fieldErrors.destination && fieldErrors.destination?.length > 0) {
        return setError('destination', {
          message: fieldErrors.destination[0],
        })
      }
    }

    if (
      !trip_start_and_end_dates ||
      !trip_start_and_end_dates.from ||
      !trip_start_and_end_dates.to
    ) {
      return setError('trip_start_and_end_dates', {
        message: 'Datas de início e fim da viagem são obrigatórias',
      })
    }

    toggleIsGuestsInputOpen()
  }

  const dateDisplay =
    trip_start_and_end_dates &&
    trip_start_and_end_dates.from &&
    trip_start_and_end_dates.to
      ? `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}`
      : null

  return (
    <div className="relative flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              disabled={isGuestsInputOpen}
              placeholder="Para onde você vai?"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          )}
        />
      </div>

      <button
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left outline-none"
        disabled={isGuestsInputOpen}
      >
        <Calendar className="size-5 shrink-0 text-zinc-400" />

        <span
          className={cn(
            'w-auto flex-1 text-lg text-zinc-400',
            dateDisplay && 'text-zinc-100',
          )}
        >
          {dateDisplay || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <DatePickerModal onClose={closeDatePicker} isOpen={isDatePickerOpen} />
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {!isGuestsInputOpen ? (
        <Button onClick={destinationAndDateStepValidation}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" onClick={toggleIsGuestsInputOpen}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}

      {errors.destination && (
        <small className="absolute -bottom-6 text-rose-400">
          {errors.destination.message?.toString()}
        </small>
      )}

      {errors.trip_start_and_end_dates && !isDatePickerOpen && (
        <small className="absolute -bottom-6 text-rose-400">
          {errors.trip_start_and_end_dates.message?.toString()}
        </small>
      )}
    </div>
  )
}
