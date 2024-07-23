import { useState } from "react"

import { Activities } from "./activities"
import { TripDetailsHeader } from "./trip-details-header"
import { CreateActivityModal } from "./create-activity-modal"
import { ImportantLinks } from "./important-links"
import Participants from "./participants"


export const TripDetailsPage = () => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <TripDetailsHeader />

      <main className="flex gap-16 px-4">
        <Activities openCreateActivityModal={openCreateActivityModal} />

        <aside className="w-80 space-y-6">
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