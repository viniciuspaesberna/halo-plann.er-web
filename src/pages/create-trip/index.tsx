import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { cn } from "../../utils/cn"

import { InviteGuestsModal } from "./invite-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"
import type { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"

export const CreateTripPage = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [tripStartAndEndDates, setTripStartAndEndDates] = useState<DateRange | undefined>()

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'viniciuspaesberna@gmail.com',
    'vini_berna2.0@hotmail.com',
    'vini_bern2.0@hotmail.com',
    'vini_berna4.0@hotmail.com',
    'halosara121@gmail.com'
  ])

  function toggleIsGuestsInputOpen() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  function toggleIsGuestsModalOpen() {
    setIsGuestsModalOpen(!isGuestsModalOpen)
  }

  function toggleIsConfirmTripModalOpen() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen)
  }

  function handleAddEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) {
      return event.currentTarget.reset()
    }

    setEmailsToInvite(prev => [...prev, email])

    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmails = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmails)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) return
    if (!tripStartAndEndDates?.from || !tripStartAndEndDates.to) return
    if (emailsToInvite.length === 0) return
    if (!ownerName || !ownerEmail) return

    setIsLoading(true)

    await api.post<{ tripId: string }>('trips', {
      destination,
      starts_at: tripStartAndEndDates.from,
      ends_at: tripStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
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
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

      <div className={cn(
        "max-w-3xl w-full px-6 text-center space-y-10",
        isGuestsModalOpen && "blur-sm"
      )}>
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            toggleIsGuestsInputOpen={toggleIsGuestsInputOpen}
            setDestination={setDestination}
            tripStartAndEndDates={tripStartAndEndDates}
            setTripStartAndEndDates={setTripStartAndEndDates}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
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
          emailsToInvite={emailsToInvite}
          handleAddEmailToInvite={handleAddEmailToInvite}
          removeEmailToInvite={removeEmailToInvite}
          toggleIsGuestsModalOpen={toggleIsGuestsModalOpen}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          toggleIsConfirmTripModalOpen={toggleIsConfirmTripModalOpen}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}