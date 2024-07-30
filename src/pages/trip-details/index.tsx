import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'

import { useTripDetails } from '../../contexts/trip-details-context'
import { Activities } from './activities'
import { CreateActivityModal } from './create-activity-modal'
import { CreateLinkModal } from './create-link-modal'
import { ImportantLinks } from './important-links'
import { ManageGuestsModal } from './manage-guests-modal'
import { Participants } from './participants'
import { TripDetailsHeader } from './trip-details-header'
import { UpdateTripDetailsModal } from './update-trip-details-modal'

export const TripDetailsPage = () => {
  const { trip } = useTripDetails()

  const [isCreateLinksModalOpen, setIsCreateLinksModalOpen] = useState(false)
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)
  const [isUpdateTripDetailsOpen, setIsUpdateTripDetailsOpen] = useState(false)
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        <TripDetailsHeader
          onUpdateTripDetailsOpen={setIsUpdateTripDetailsOpen}
        />

        <main className="flex gap-16 px-4">
          <Activities
            onOpenCreateActivityModal={() => setIsCreateLinksModalOpen(true)}
          />

          <aside className="w-80 space-y-6">
            {!trip?.is_confirmed && (
              <div className="space-y-2 rounded-lg bg-zinc-900 p-4 text-zinc-100 shadow-shape">
                <strong className="flex w-full items-center justify-between text-lg font-semibold text-zinc-100">
                  Confirme a viagem
                  <AlertTriangle className="size-5 animate-pulse text-amber-300" />
                </strong>
                <p className="text-sm text-zinc-400">
                  Um e-mail foi enviado para você, leia-o e confirme a viagem
                  para que os convidados recebam o e-mail de participação.
                </p>
              </div>
            )}

            <ImportantLinks
              onOpenCreateLinkModal={() => setIsCreateLinksModalOpen(true)}
            />

            <div className="h-px w-full bg-zinc-800" />

            <Participants
              onManageGuestsModalOpen={() => setIsManageGuestsModalOpen(true)}
            />
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

      <UpdateTripDetailsModal
        isOpen={isUpdateTripDetailsOpen}
        onClose={() => setIsUpdateTripDetailsOpen(false)}
      />

      <ManageGuestsModal
        isOpen={isManageGuestsModalOpen}
        onClose={() => setIsManageGuestsModalOpen(false)}
      />
    </>
  )
}
