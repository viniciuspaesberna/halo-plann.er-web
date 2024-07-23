import { Calendar, MapPin, Settings2 } from "lucide-react"

import { Button } from "../../components/button"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

type Trip = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export const TripDetailsHeader = () => {
  const [trip, setTrip] = useState<Trip | undefined>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  const dateDisplay = trip ?
    `${format(trip.starts_at, "d' de 'LLL")} até ${format(trip.ends_at, "d' de 'LLL")}`
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

        <Button variant="secondary">
          Alterar local / data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </header>
  )
}