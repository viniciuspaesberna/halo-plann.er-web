import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useTripDetails } from "../../contexts/trip-details-context";

type Participant = {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
  is_owner: boolean
}

export const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={participant.id} className="flex gap-4 items-center justify-between">
            <div className="space-y-1.5">
              <span
                className="font-medium text-zinc-100 truncate flex items-baseline gap-2"
              >
                {participant.name || 'Não confirmado'}
                <small className="text-xs text-zinc-600">{participant.is_owner ? 'Organizador' : `Convidado ${index}`}</small>
              </span>

              <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
            </div>

            {participant.is_confirmed ? (
              <CircleCheck className="shrink-0 text-lime-300 size-5" />
            ) : (
              <CircleDashed className="shrink-0 text-zinc-400 size-5" />
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}