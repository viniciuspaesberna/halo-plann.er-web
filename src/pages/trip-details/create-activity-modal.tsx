import { Calendar, Tag } from "lucide-react"
import { Button } from "../../components/button"
import { useState, type FormEvent } from "react"
import { api } from "../../lib/axios"
import { useTripDetails } from "../../contexts/trip-details-context"
import { Modal } from "../../components/modal"

interface CreateActivityModalProps {
  isCreateActivityModalOpen: boolean
  closeCreateActivityModal: () => void
}

export const CreateActivityModal = ({
  closeCreateActivityModal,
  isCreateActivityModalOpen
}: CreateActivityModalProps) => {
  const { tripId } = useTripDetails()

  const [isLoading, setIsLoading] = useState(false)

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    setIsLoading(true)
    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    }).then(() => {
      setIsLoading(false)
      window.document.location.reload()
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
    })
  }

  return (
    <Modal
      heading="Cadastrar atividade"
      description="Todos convidados podem ver as atividades."
      onClose={closeCreateActivityModal}
      isOpen={isCreateActivityModalOpen}
      className="max-w-[640px] w-full"
    >
      <form onSubmit={createActivity} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
          <Tag className="size-5 ml-2 text-zinc-400" />

          <input
            name="title"
            placeholder="Qual a atividade?"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <Calendar className="size-5 ml-2 text-zinc-400" />

            <input
              name="occurs_at"
              type="datetime-local"
              placeholder="Data e horário da atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
        </div>

        <Button type="submit" isLoading={isLoading} size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}
