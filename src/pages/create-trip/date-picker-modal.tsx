import { addDays } from "date-fns"

import { Controller, useFormContext } from "react-hook-form"
import { DayPicker } from "react-day-picker"

import { X } from "lucide-react"

import "react-day-picker/style.css"

interface DatePickerModalProps {
  closeDatePicker: () => void
}

export const DatePickerModal = ({
  closeDatePicker,
}: DatePickerModalProps) => {
  const { control } = useFormContext()

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Selecione a data</h2>

            <button
              className="size-8 rounded-lg flex items-center justify-center ring-white/60 hover:ring-1"
              onClick={closeDatePicker}
            >
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400 text-left">
            Selecione as datas de início e fim da viagem
          </p>
        </div>

        <Controller
          name="trip_start_and_end_dates"
          control={control}
          render={
            ({ field }) => (
              <DayPicker
                {...field}
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                disabled={{ before: addDays(new Date(), 1) }}
                classNames={{
                  chevron: 'fill-lime-300',
                  today: '',
                  selected: 'border-none text-zinc-950 font-bold bg-lime-300 rounded-full',
                  range_start: 'bg-lime-300 border-none rounded-l-full rounded-r-none',
                  range_middle: 'bg-lime-300/40 border-none rounded-none',
                  range_end: 'bg-lime-300 border-none rounded-l-none rounded-r-full',
                }}
              />
            )
          }
        />
      </div>
    </div>
  )
}
