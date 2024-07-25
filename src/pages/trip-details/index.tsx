import { useState } from "react"

import { AlertTriangle } from "lucide-react"

import { useTripDetails } from "../../contexts/trip-details-context"

import { Activities } from "./activities"
import { TripDetailsHeader } from "./trip-details-header"
import { ImportantLinks } from "./important-links"
import { Participants } from "./participants"
import { CreateActivityModal } from "./create-activity-modal"
import { CreateLinkModal } from "./create-link-modal"


export const TripDetailsPage = () => {
  const { trip } = useTripDetails()
  const [isCreateLinksModalOpen, setIsCreateLinksModalOpen] = useState(false)
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  return (
    <>
      <div className="max-w-6xl px-6 py-8 mx-auto space-y-8">
        <TripDetailsHeader />

        <main className="flex gap-16 px-4">
          <Activities onOpenCreateActivityModal={openCreateActivityModal} />

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

            <ImportantLinks onOpenCreateLinkModal={() => setIsCreateLinksModalOpen(true)} />

            <div className="h-px w-full bg-zinc-800" />

            <Participants />
          </aside>
        </main>
      </div>

      <CreateLinkModal
        isOpen={isCreateLinksModalOpen}
        onClose={() => setIsCreateLinksModalOpen(false)}
      />

      <CreateActivityModal
        isOpen={isCreateActivityModalOpen}
        onClose={() => setIsCreateActivityModalOpen(false)}
      />
    </>
  )
}