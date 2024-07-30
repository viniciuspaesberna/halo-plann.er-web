import 'react-day-picker/style.css'

import { addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import { Controller, useFormContext } from 'react-hook-form'

import { Modal } from './modal'

interface DatePickerModalProps {
  isOpen: boolean
  onClose: () => void
}

export const DatePickerModal = ({ onClose, isOpen }: DatePickerModalProps) => {
  const { control } = useFormContext()

  return isOpen ? (
    <Modal
      heading="Selecione a data"
      description="Selecione as datas de início e fim da viagem"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Controller
        name="trip_start_and_end_dates"
        control={control}
        render={({ field }) => (
          <DayPicker
            {...field}
            mode="range"
            locale={ptBR}
            selected={field.value}
            onSelect={field.onChange}
            disabled={{ before: addDays(new Date(), 1) }}
            classNames={{
              chevron: 'fill-lime-300',
              today: 'bg-zinc-700 rounded-full',
              selected:
                'border-none text-zinc-950 font-bold bg-lime-300 rounded-full',
              range_start:
                'bg-lime-300 border-none rounded-l-full rounded-r-none',
              range_middle: 'bg-lime-300/40 border-none rounded-none',
              range_end:
                'bg-lime-300 border-none rounded-l-none rounded-r-full',
            }}
          />
        )}
      />
    </Modal>
  ) : null
}
