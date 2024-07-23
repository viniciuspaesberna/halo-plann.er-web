import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

import { Button } from "../../../components/button";
import { useState } from "react";
import { DatePickerModal } from "../date-picker-modal";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { cn } from "../../../utils/cn";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  toggleIsGuestsInputOpen: () => void
  setDestination: (destination: string) => void
  tripStartAndEndDates: DateRange | undefined
  setTripStartAndEndDates: (range: DateRange | undefined) => void
}

export const DestinationAndDateStep = ({
  isGuestsInputOpen,
  toggleIsGuestsInputOpen,
  setDestination,
  tripStartAndEndDates,
  setTripStartAndEndDates
}: DestinationAndDateStepProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)


  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const dateDisplay = tripStartAndEndDates?.from && tripStartAndEndDates.to ?
    `${format(tripStartAndEndDates.from, "d' de 'LLL")} até ${format(tripStartAndEndDates.to, "d' de 'LLL")}`
    : null

  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          onChange={e => setDestination(e.target.value)}
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>

      <button onClick={openDatePicker} className="flex items-center gap-2  outline-none text-left" disabled={isGuestsInputOpen}>
        <Calendar className="size-5 shrink-0 text-zinc-400" />

        <span className={cn("w-auto text-lg text-zinc-400 flex-1", dateDisplay && 'text-zinc-100')} >
          {dateDisplay || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <DatePickerModal closeDatePicker={closeDatePicker} selected={tripStartAndEndDates} onSelect={setTripStartAndEndDates} />
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {!isGuestsInputOpen ? (
        <Button onClick={toggleIsGuestsInputOpen}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      ) : (
        <Button variant="secondary" onClick={toggleIsGuestsInputOpen}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      )}
    </div>
  );
}
