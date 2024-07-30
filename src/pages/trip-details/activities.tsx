import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '../../components/button'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'

interface TripScheduleProps {
  onOpenCreateActivityModal: () => void
}

type Activity = {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export const Activities = ({
  onOpenCreateActivityModal,
}: TripScheduleProps) => {
  const [activities, setActivities] = useState<Activity[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>

        <Button onClick={onOpenCreateActivityModal}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      <div className="space-y-8">
        {activities.map((activity) => {
          const day = format(activity.date, 'd')
          const weekDay = format(activity.date, 'EEEE', { locale: ptBR })

          return (
            <div key={activity.date} className="space-y-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-zinc-300">
                  Dia {day}
                </span>
                <span className="text-xs text-zinc-500">{weekDay}</span>
              </div>

              {activity.activities.length > 0 ? (
                <div className="space-y-2.5">
                  {activity.activities.map((category) => {
                    const formatedHour = format(category.occurs_at, 'HH:mm')

                    return (
                      <div
                        key={category.id}
                        className="relative flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape"
                      >
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{category.title}</span>

                        <span className="ml-auto text-sm text-zinc-400">
                          {formatedHour}h
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">
                  Nenhuma Atividade cadastrada nessa data, bora relaxar!
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
