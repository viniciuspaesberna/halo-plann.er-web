import { format } from "date-fns";
import { CircleCheck, Plus } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useTripDetails } from "../../contexts/trip-details-context";

interface TripScheduleProps {
  openCreateActivityModal: () => void
}

type Activity = {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export const Activities = ({ openCreateActivityModal }: TripScheduleProps) => {
  const [activities, setActivities] = useState<Activity[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, [tripId, activities])

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>

        <Button onClick={openCreateActivityModal}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      <div className="space-y-8">
        {activities.map(activity => {
          const day = format(activity.date, 'd')
          const weekDay = format(activity.date, 'EEEE', { locale: ptBR })

          return (
            <div key={activity.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl font-semibold text-zinc-300">Dia {day}</span>
                <span className="text-xs text-zinc-500">{weekDay}</span>
              </div>

              {activity.activities.length > 0 ? (
                <div className="space-y-2.5">
                  {activity.activities.map(category => {
                    const formatedHour = format(category.occurs_at, "HH:mm")

                    return (
                      <div key={category.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3 relative">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">
                          {category.title}
                        </span>

                        <span className="ml-auto text-zinc-400 text-sm">{formatedHour}h</span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">Nenhuma Atividade cadastrada nessa data, bora relaxar!</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
