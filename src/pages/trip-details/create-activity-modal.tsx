import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Tag } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/button'
import { Modal } from '../../components/modal'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
}

const createActivityFormSchema = z.object({
  title: z
    .string({ required_error: 'Título é obrigatório' })
    .min(3, { message: 'Título deve conter pelo menos 3 letras' }),
  occurs_at: z.coerce.date(),
})

type CreateActivityFormData = z.infer<typeof createActivityFormSchema>

export const CreateActivityModal = ({
  onClose,
  isOpen,
}: CreateActivityModalProps) => {
  const { tripId } = useTripDetails()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateActivityFormData>({
    resolver: zodResolver(createActivityFormSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  async function createActivity(data: CreateActivityFormData) {
    const { title, occurs_at } = data

    setIsLoading(true)
    await api
      .post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
      .then(() => {
        window.document.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Modal
      heading="Cadastrar atividade"
      description="Todos convidados podem ver as atividades."
      onClose={onClose}
      isOpen={isOpen}
      className="w-full max-w-[640px]"
    >
      <form onSubmit={handleSubmit(createActivity)} className="space-y-3">
        <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
          <Tag className="ml-2 size-5 text-zinc-400" />

          <input
            placeholder="Qual a atividade?"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            {...register('title')}
          />

          {errors.title && (
            <small className="text-sm text-zinc-400">
              {errors.title.message}
            </small>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-14 flex-1 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Calendar className="ml-2 size-5 text-zinc-400" />

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
