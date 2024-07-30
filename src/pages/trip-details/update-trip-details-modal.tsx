import { FormProvider, useForm } from "react-hook-form"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { useTripDetails } from "../../contexts/trip-details-context"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { DatePickerModal } from "../../components/date-picker-modal"
import { cn } from "../../utils/cn"
import { Calendar, Tag } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { Button } from "../../components/button"

interface UpdateTripDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

const updateTripDetailsFormSchema = z.object({
  destination: z
  .string({ required_error: "Destino é obrigatório" })
  .min(3, { message: "Destino deve conter pelo menos 3 letras" }),
  trip_start_and_end_dates: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }).optional(),
})

type UpdateTripDetailsFormData = z.infer<typeof updateTripDetailsFormSchema>

export const UpdateTripDetailsModal = ({
  isOpen,
  onClose,
}: UpdateTripDetailsModalProps) => {
  const [isRangeDatePickerOpen, setIsRangeDatePickerOpen] = useState(false)
  
  const { trip } =  useTripDetails()
  
  const form = useForm<UpdateTripDetailsFormData>({
    resolver: zodResolver(updateTripDetailsFormSchema),
    defaultValues: {
      destination: trip.destination,
      trip_start_and_end_dates: {
        from: new Date(trip.starts_at),
        to: new Date(trip.ends_at)
      },
    },
  })

  const { handleSubmit, register, getValues, formState: { errors } } = form

  const trip_start_and_end_dates = getValues('trip_start_and_end_dates')

  function updateTripDatails(data: UpdateTripDetailsFormData) {
    console.log(data)
  }

  function handleCloseModal() {
    setIsRangeDatePickerOpen(false)
    onClose()
  }

  const dateDisplay = trip_start_and_end_dates &&
  trip_start_and_end_dates.from &&
  trip_start_and_end_dates.to ?
  `${format(trip_start_and_end_dates.from, "d' de 'LLL", { locale: ptBR })} até ${format(trip_start_and_end_dates.to, "d' de 'LLL", { locale: ptBR })}` :
  null

  return (
    <Modal
      heading="Detalhes da viagem"
      description="Atuliaze as informações da sua viagem"
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="max-w-[640px] w-full"
    >
      <FormProvider {...form}>
        <form className="space-y-3" onSubmit={handleSubmit(updateTripDatails)}>        
          <Input 
            errors={errors}
            icon={
              <Tag className="size-5 shrink-0 text-zinc-400" />
            }
            {...register('destination')}
          />

          <button onClick={() => setIsRangeDatePickerOpen(true)} className="h-14 px-4 w-full bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <Calendar className="size-5 shrink-0 text-zinc-400" />

            <div>
              <span className={cn("w-auto text-lg text-zinc-400 flex-1", dateDisplay && 'text-zinc-100')} >
                {dateDisplay || 'Quando?'}
              </span>
            </div>

            {errors.trip_start_and_end_dates && (
              <small className="text-zinc-400 text-sm">
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
