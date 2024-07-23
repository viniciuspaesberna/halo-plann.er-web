import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

import { Button } from "../../../components/button";
import { useState } from "react";
import { DatePickerModal } from "../date-picker-modal";
import { format } from "date-fns";
import { cn } from "../../../utils/cn";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
import { ptBR } from "date-fns/locale";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  toggleIsGuestsInputOpen: () => void
}

const destinationAndDateStepSchema = z.object({
  destination: z
    .string({ required_error: "Destino é obrigatório" })
    .min(3, { message: "Destino deve conter pelo menos 3 letras" }),
  trip_start_and_end_dates: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }).optional()
})

export const DestinationAndDateStep = ({
  isGuestsInputOpen,
  toggleIsGuestsInputOpen,
}: DestinationAndDateStepProps) => {
  const { control, getValues, setError, clearErrors, formState: { errors } } = useFormContext()
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

    const validation = destinationAndDateStepSchema.safeParse({ destination, trip_start_and_end_dates })

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors

      if (fieldErrors.destination && fieldErrors.destination?.length > 0) {
        return setError('destination', {
          message: fieldErrors.destination[0]
        })
      }
    }

    if (!trip_start_and_end_dates || !trip_start_and_end_dates.from || !trip_start_and_end_dates.to) {
      return setError('trip_start_and_end_dates', {
        message: 'Datas de início e fim da viagem são obrigatórias'
      })
    }

    toggleIsGuestsInputOpen()
  }

  const dateDisplay = trip_start_and_end_dates ?
    `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}`
    : null

  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3 relative">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />

        <Controller
          name="destination"
          control={control}
          render={
            ({ field }) => (
              <input
                {...field}
                disabled={isGuestsInputOpen}
                placeholder="Para onde você vai?"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />

            )
          }
        />
      </div>

      <button onClick={openDatePicker} className="flex items-center gap-2  outline-none text-left" disabled={isGuestsInputOpen}>
        <Calendar className="size-5 shrink-0 text-zinc-400" />

        <span className={cn("w-auto text-lg text-zinc-400 flex-1", dateDisplay && 'text-zinc-100')} >
          {dateDisplay || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <DatePickerModal closeDatePicker={closeDatePicker} />
      )}

      <div className="w-px h-6 bg-zinc-800" />

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
        <small className="absolute -bottom-6 text-rose-400">{errors.destination.message?.toString()}</small>
      )}

      {errors.trip_start_and_end_dates && !isDatePickerOpen && (
        <small className="absolute -bottom-6 text-rose-400">{errors.trip_start_and_end_dates.message?.toString()}</small>
      )}
    </div>
  );
}
