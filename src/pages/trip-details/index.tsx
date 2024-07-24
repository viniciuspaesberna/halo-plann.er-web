import { useState } from "react"

import { AlertTriangle } from "lucide-react"

import { useTripDetails } from "../../contexts/trip-details-context"

import { Activities } from "./activities"
import { TripDetailsHeader } from "./trip-details-header"
import { CreateActivityModal } from "./create-activity-modal"
import { ImportantLinks } from "./important-links"
import { Participants } from "./participants"


export const TripDetailsPage = () => {
  const { trip } = useTripDetails()
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  console.log(trip?.is_confirmed)

  return (

    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <TripDetailsHeader />

      <main className="flex gap-16 px-4">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <aside className="w-80 space-y-6">
          {!trip?.is_confirmed && (
            <div className="space-y-2 shadow-shape bg-zinc-900 text-zinc-100 p-4 rounded-lg">
              <strong className="text-lg flex items-center justify-between w-full font-semibold text-zinc-100">
                Confirme a viagem
                <AlertTriangle className="size-5 text-amber-300 animate-pulse" />
              </strong>
              <p className="text-sm text-zinc-400">Um e-mail foi enviado para você, leia-o e confirme a viagem para que os convidados recebam o e-mail de participação.</p>
            </div>
          )}

          <ImportantLinks />

          <div className="h-px w-full bg-zinc-800" />

          <Participants />
        </aside>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  )
}