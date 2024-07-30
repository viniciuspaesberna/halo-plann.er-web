import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, Tag } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/button'
import { Modal } from '../../components/modal'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'

interface CreateLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

const createLinkFormSchema = z.object({
  title: z
    .string({ required_error: 'Título é obrigatório' })
    .min(3, { message: 'Título deve conter pelo menos 3 letras' }),
  url: z
    .string({ required_error: 'URL é obrigatório' })
    .url({ message: 'Formato de URL incorreto' }),
})

type CreateLinkFormData = z.infer<typeof createLinkFormSchema>

export const CreateLinkModal = ({ isOpen, onClose }: CreateLinkModalProps) => {
  const { tripId } = useTripDetails()

  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkFormSchema),
  })

  async function createLink(data: CreateLinkFormData) {
    const { title, url } = data

    setIsLoading(true)

    console.log(title, url)

    await api
      .post(`/trips/${tripId}/links`, {
        title,
        url,
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
      heading="Cadastrar novo link"
      description="Todos os convidados poderão acessar esse link."
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[640px]"
    >
      <form onSubmit={handleSubmit(createLink)} className="space-y-3">
        <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
          <Tag className="ml-2 size-5 text-zinc-400" />

          <input
            placeholder="Título do link"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            {...register('title')}
          />

          {errors.title && (
            <small className="text-sm text-zinc-400">
              {errors.title.message}
            </small>
          )}
        </div>

        <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
          <Link2 className="ml-2 size-5 text-zinc-400" />

          <input
            placeholder="URL"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            {...register('url')}
          />

          {errors.url && (
            <small className="text-sm text-zinc-400">
              {errors.url.message}
            </small>
          )}
        </div>

        <Button type="submit" size="full" isLoading={isLoading}>
          Salvar link
        </Button>
      </form>
    </Modal>
  )
}
