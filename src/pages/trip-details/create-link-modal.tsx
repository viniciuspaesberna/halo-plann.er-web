import { useForm } from "react-hook-form";
import { Modal } from "../../components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link2, Tag } from "lucide-react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useState } from "react";
import { useTripDetails } from "../../contexts/trip-details-context";

interface CreateLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

const createLinkFormSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" }).min(3, { message: "Título deve conter pelo menos 3 letras" }),
  url: z.string({ required_error: "URL é obrigatório" }).url({ message: "Formato de URL incorreto" })
})

type CreateLinkFormData = z.infer<typeof createLinkFormSchema>

export const CreateLinkModal = ({
  isOpen,
  onClose
}: CreateLinkModalProps) => {
  const { tripId } = useTripDetails()

  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkFormSchema)
  })

  async function createLink(data: CreateLinkFormData) {
    const { title, url } = data

    setIsLoading(true)

    console.log(title, url)

    await api.post(`/trips/${tripId}/links`, {
      title,
      url
    }).then(() => {
      window.document.location.reload()
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <Modal
      heading="Cadastrar novo link"
      description="Todos os convidados poderão acessar esse link."
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[640px] w-full"
    >
      <form onSubmit={handleSubmit(createLink)} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
          <Tag className="size-5 ml-2 text-zinc-400" />

          <input
            placeholder="Título do link"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            {...register('title')}
          />

          {errors.title && (
            <small className="text-zinc-400 text-sm">
              {errors.title.message}
            </small>
          )}
        </div>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
          <Link2 className="size-5 ml-2 text-zinc-400" />

          <input
            placeholder="URL"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            {...register('url')}
          />

          {errors.url && (
            <small className="text-zinc-400 text-sm">
              {errors.url.message}
            </small>
          )}
        </div>

        <Button type="submit" size="full" isLoading={isLoading}>
          Salvar link
        </Button>
      </form>
    </Modal>
  );
}
