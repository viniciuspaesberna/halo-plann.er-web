import { zodResolver } from '@hookform/resolvers/zod'
import { AtSign, CircleCheck, CircleDashed, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../components/button'
import { Modal } from '../../components/modal'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'
import { Participant } from './participants'

interface ManageGuestsModalProps {
  isOpen: boolean
  onClose: () => void
}

const manageGuestsFormSchema = z.object({
  newEmailsToInvite: z
    .array(z.string().email('Email inválido'))
    .min(1, 'Convide pelo menos mais um amigo para salvar.')
    .default([]),
})

export const ManageGuestsModal = ({
  isOpen,
  onClose,
}: ManageGuestsModalProps) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(manageGuestsFormSchema),
    defaultValues: {
      newEmailsToInvite: [] as string[],
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  const newEmailsToInvite = watch('newEmailsToInvite') as string[]

  function addEmailToInvite() {
    if (!email) return

    if (newEmailsToInvite.includes(email)) {
      return setEmail('')
    }

    if (participants.some((participant) => participant.email === email)) {
      return setEmail('')
    }

    const newEmails = [...newEmailsToInvite, email]

    setEmail('')
    setValue('newEmailsToInvite', newEmails)
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmails = newEmailsToInvite.filter(
      (email: string) => email !== emailToRemove,
    )

    setValue('newEmailsToInvite', newEmails)
  }

  async function inviteNewGuests() {
    setIsLoading(true)

    await api
      .post(`/trips/${tripId}/invites`, {
        emails_to_invite: newEmailsToInvite,
      })
      .then(() => {
        window.document.location.reload()
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {})
  }

  return (
    <Modal
      heading="Gerenciar convidados"
      description="Convide mais amigos para participar da sua viagem."
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-[640px]"
    >
      <form onSubmit={handleSubmit(inviteNewGuests)} className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {participants.map((participant, index) => {
            if (participant.is_owner) return null

            return (
              <div
                key={participant.email + index}
                className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
              >
                <span className="text-zinc-300">{participant.email}</span>

                {participant.is_confirmed ? (
                  <CircleCheck className="size-5 shrink-0 text-lime-300" />
                ) : (
                  <CircleDashed className="size-5 shrink-0 text-zinc-400" />
                )}
              </div>
            )
          })}

          {newEmailsToInvite?.map((email, index) => (
            <div
              key={email + index}
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
            >
              <span className="text-zinc-300">{email}</span>

              <X
                onClick={() => removeEmailToInvite(email)}
                className="size-5 cursor-pointer text-zinc-400 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
          <AtSign className="ml-2 size-5 text-zinc-400" />

          <input
            type="email"
            name="email"
            placeholder="Digite o email do convidado"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <Button disabled={isLoading} onClick={addEmailToInvite}>
            Convidar
            <Plus className="size-5" />
          </Button>
        </div>

        {errors.newEmailsToInvite && (
          <span className="text-xs text-red-500">
            {errors.newEmailsToInvite.message?.toString()}
          </span>
        )}

        <Button
          isLoading={isLoading}
          type="submit"
          onClick={addEmailToInvite}
          size="full"
        >
          Salvar convites
        </Button>
      </form>
    </Modal>
  )
}
