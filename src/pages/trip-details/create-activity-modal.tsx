import { Calendar, Tag } from "lucide-react"
import { Button } from "../../components/button"
import { useState } from "react"
import { api } from "../../lib/axios"
import { useTripDetails } from "../../contexts/trip-details-context"
import { Modal } from "../../components/modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
}

const createActivityFormSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" }).min(3, { message: "Título deve conter pelo menos 3 letras" }),
  occurs_at: z.coerce.date()
})

type CreateActivityFormData = z.infer<typeof createActivityFormSchema>

export const CreateActivityModal = ({
  onClose,
  isOpen
}: CreateActivityModalProps) => {
  const { tripId } = useTripDetails()

  const { handleSubmit, register, formState: { errors } } = useForm<CreateActivityFormData>({
    resolver: zodResolver(createActivityFormSchema)
  })

  const [isLoading, setIsLoading] = useState(false)

  async function createActivity(data: CreateActivityFormData) {

    const { title, occurs_at } = data

    setIsLoading(true)
    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    }).then(() => {
      window.document.location.reload()
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <Modal
      heading="Cadastrar atividade"
      description="Todos convidados podem ver as atividades."
      onClose={onClose}
      isOpen={isOpen}
      className="max-w-[640px] w-full"
    >
      <form onSubmit={handleSubmit(createActivity)} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
          <Tag className="size-5 ml-2 text-zinc-400" />

          <input
            placeholder="Qual a atividade?"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            {...register('title')}
          />

          {errors.title && (
            <small className="text-sm text-zinc-400">{errors.title.message}</small>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
            <Calendar className="size-5 ml-2 text-zinc-400" />

            <input
              type="datetime-local"
              placeholder="Data e horário da atividade"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              {...register('occurs_at')}
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
