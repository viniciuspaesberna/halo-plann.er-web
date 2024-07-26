import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form'

import { api } from "../../lib/axios"
import { createTripFormSchema, type CreateTripFormData } from "../../schemas/create-trip-form"

import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"

export const CreateTripPage = () => {
  const navigate = useNavigate()

  const form = useForm<CreateTripFormData>({
    resolver: zodResolver(createTripFormSchema),
    defaultValues: {
      emailsToInvite: []
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  function toggleIsGuestsInputOpen() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function toggleIsGuestsModalOpen() {
    setIsGuestsModalOpen(!isGuestsModalOpen)
  }

  function toggleIsConfirmTripModalOpen() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
  }

  async function createTrip(data: CreateTripFormData) {
    const {
      destination,
      trip_start_and_end_dates,
      emailsToInvite,
      ownerName,
      ownerEmail,
    } = data

    setIsLoading(true)

    let validatedEmailsToInvite = emailsToInvite

    if (emailsToInvite.includes(ownerEmail)) {
      validatedEmailsToInvite = emailsToInvite.filter(email => email !== ownerEmail)
    }

    if (!trip_start_and_end_dates || !trip_start_and_end_dates.from || !trip_start_and_end_dates.to) {
      return form.setError('trip_start_and_end_dates', {
        message: 'Datas de início e fim da viagem são obrigatórias'
      })
    }

    await api.post<{ tripId: string }>('trips', {
      destination,
      emails_to_invite: validatedEmailsToInvite,
      starts_at: trip_start_and_end_dates.from,
      ends_at: trip_start_and_end_dates.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
    }).then((response) => {
      const { tripId } = response.data

      navigate(`/trips/${tripId}`)
    }).catch(error => {
      console.log(error)
      setIsLoading(false)
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(createTrip)} id="create_trip" className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="" />
            <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep
              isGuestsInputOpen={isGuestsInputOpen}
              toggleIsGuestsInputOpen={toggleIsGuestsInputOpen}
            />

            {isGuestsInputOpen && (
              <InviteGuestsStep
                toggleIsConfirmTripModalOpen={toggleIsConfirmTripModalOpen}
                toggleIsGuestsModalOpen={toggleIsGuestsModalOpen}
              />
            )}
          </div>

          <p className="text-zinc-500 text-sm">
            Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos
            <a href="#" className="mx-1 text-zinc-300 underline">termos de uso</a>
            e
            <a href="#" className="mx-1 text-zinc-300 underline">políticas de privacidade</a>
          </p>
        </div>

        {isGuestsModalOpen && (
          <InviteGuestsModal
            toggleIsGuestsModalOpen={toggleIsGuestsModalOpen}
            isGuestsModalOpen={isGuestsModalOpen}
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            toggleIsConfirmTripModalOpen={toggleIsConfirmTripModalOpen}
            isConfirmTripModalOpen={isConfirmTripModalOpen}
            isLoading={isLoading}
          />
        )}
      </form>
    </FormProvider >
  )
}