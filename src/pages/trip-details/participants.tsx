import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '../../components/button'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'

export type Participant = {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
  is_owner: boolean
}

interface ParticipantsProps {
  onManageGuestsModalOpen: () => void
}

export const Participants = ({
  onManageGuestsModalOpen,
}: ParticipantsProps) => {
  const [participants, setParticipants] = useState<Participant[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="flex items-baseline gap-2 truncate font-medium text-zinc-100">
                {participant.name && participant.name}
                {!participant.name &&
                  !participant.is_confirmed &&
                  'Não confirmado'}
                {!participant.name &&
                  participant.is_confirmed &&
                  'Nome não informado'}

                <small className="text-xs text-zinc-600">
                  {participant.is_owner ? 'Organizador' : `Convidado ${index}`}
                </small>
              </span>

              <span className="block truncate text-sm text-zinc-400">
                {participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CircleCheck className="size-5 shrink-0 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button onClick={onManageGuestsModalOpen} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}
