import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import { Mail, UserRound } from "lucide-react"

import { Button } from "../../components/button"
import { useTripDetails } from "../../contexts/trip-details-context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { api } from "../../lib/axios"
import type { Participant } from "../trip-details/participants"

const confirmParticipationFormSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }).min(3, 'Nome deve conter pelo menos 3 letras'),
  email: z.string({ required_error: 'E-mail é obrigatório' }).email('E-mail inválido')
})

type ConfirmParticipationFormData = z.infer<typeof confirmParticipationFormSchema>

export const ConfirmParticipationPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { trip, tripId } = useTripDetails()

  const email = searchParams.get('email')

  const { handleSubmit, register, formState: { errors } } = useForm<ConfirmParticipationFormData>({
    resolver: zodResolver(confirmParticipationFormSchema),
    defaultValues: {
      email: email || ''
    }
  })

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => {
      const participants = response.data.participants
      const participant: Participant = participants.find((participant: Participant) => participant.id === params.participantId)

      if (participant.is_confirmed) {
        navigate(`/trips/${trip.id}`)
      }
    })
  }, [tripId])


  async function confirmParticipation(data: ConfirmParticipationFormData) {
    const { name, email } = data

    setIsLoading(true)

    await api.put(`/participants/${params.participantId}/confirm`, {
      name,
      email
    }).then(() => {
      navigate(`/trips/${trip.id}`)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const dateDisplay = trip ?
    `${format(trip.starts_at, "d' de 'LLL", { locale: ptBR })} até ${format(trip.ends_at, "d' de 'LLL", { locale: ptBR })}`
    : null

  return (
    <form onSubmit={handleSubmit(confirmParticipation)} className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="" />

          <p className="text-zinc-300 text-lg">Um amigo te convidou para uma viagem!</p>

          <p className="text-md text-zinc-400">
            Para confimar sua participação na viagem para
            <span className="text-zinc-100 font-semibold ml-1">{trip.destination}</span>,
            de {` `} <span className="text-zinc-100 font-semibold ml-1">{dateDisplay}</span>, {` `}
            preencha seus dados abaixo:
          </p>
        </div>

        <main className="space-y-4">
          <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3 relative">
            <div className="flex items-center gap-2 flex-1">
              <UserRound className="size-5 text-zinc-400" />

              <input
                placeholder="Nome completo"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                {...register('name')}
              />

              {errors.name && (
                <small className="text-rose-400 text-sm">{errors.name.message}</small>
              )}
            </div>
          </div>

          <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3 relative">
            <div className="flex items-center gap-2 flex-1">
              <Mail className="size-5 text-zinc-400" />

              <input
                placeholder="Seu e-mail"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                {...register('email')}
              />
              {errors.email && (
                <small className="text-rose-400 text-sm">{errors.email.message}</small>
              )}
            </div>
          </div>

          <Button type='submit' size='full' isLoading={isLoading}>
            Confirmar participação
          </Button>
        </main>

        <p className="text-zinc-500 text-sm">
          Ao confirmar sua participação nesta viagem, você automaticamente concorda <br /> com nossos
          <a href="#" className="mx-1 text-zinc-300 underline">termos de uso</a>
          e
          <a href="#" className="mx-1 text-zinc-300 underline">políticas de privacidade</a>
        </p>
      </div>

    </form>
  )
}