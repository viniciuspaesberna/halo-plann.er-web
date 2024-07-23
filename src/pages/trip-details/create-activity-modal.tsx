import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { useState, type FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export const CreateActivityModal = ({
  closeCreateActivityModal,
}: CreateActivityModalProps) => {
  const { tripId } = useParams()

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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar atividade</h2>

            <button
              className="size-8 rounded-lg flex items-center justify-center ring-white/60 hover:ring-1"
              onClick={closeCreateActivityModal}
            >
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem ver as atividades.
          </p>
        </div>

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
      </div>
    </div>
  )
}