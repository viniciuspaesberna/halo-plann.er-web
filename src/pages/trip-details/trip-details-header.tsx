import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Calendar, MapPin, Settings2 } from "lucide-react"

import { Button } from "../../components/button"
import { useTripDetails } from "../../contexts/trip-details-context"

interface TripDetailsHeaderProps {
  onUpdateTripDetailsOpen: (isOpen: boolean) => void
}

export const TripDetailsHeader = ({
  onUpdateTripDetailsOpen
}: TripDetailsHeaderProps) => {
  const { trip } = useTripDetails()

  const dateDisplay = trip ?
    `${format(trip.starts_at, "d' de 'LLL", { locale: ptBR })} até ${format(trip.ends_at, "d' de 'LLL", { locale: ptBR })}`
    : null

  return (
    <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5" />
        <span className="text-lg text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{dateDisplay}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button onClick={() => onUpdateTripDetailsOpen(true)} variant="secondary">
          Alterar local / data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </header>
  )
}