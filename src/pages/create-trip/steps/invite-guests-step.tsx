import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '../../../components/button'

interface InviteGuestsStepProps {
  toggleIsGuestsModalOpen: () => void
  toggleIsConfirmTripModalOpen: () => void
}

export const InviteGuestsStep = ({
  toggleIsGuestsModalOpen,
  toggleIsConfirmTripModalOpen,
}: InviteGuestsStepProps) => {
  const { watch } = useFormContext()
  const [error, setError] = useState(false)

  const emailsToInvite = watch('emailsToInvite') as string[]

  function validateEmailsToInvite() {
    if (emailsToInvite.length < 1) {
      return setError(true)
    } else {
      setError(false)
    }

    toggleIsConfirmTripModalOpen()
  }

  return (
    <div className="relative flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button
        type="button"
        onClick={toggleIsGuestsModalOpen}
        className="flex flex-1 items-center gap-2"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        <span className="flex-1 truncate text-left text-lg text-zinc-400">
          {emailsToInvite?.length > 0 ? (
            <span className="flex-1 text-lg text-zinc-100">
              {emailsToInvite?.length} pessoa{emailsToInvite?.length > 1 && 's'}{' '}
              convidada{emailsToInvite?.length > 1 && 's'}
            </span>
          ) : (
            <span className="flex-1 text-lg text-zinc-400">
              Quem estará na viagem?
            </span>
          )}
        </span>
      </button>

      <div className="h-6 w-px bg-zinc-800" />

      <Button onClick={validateEmailsToInvite}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>

      {error && (
        <small className="absolute -bottom-6 text-rose-400">
          Convide pelo menos uma pessoa para a viagem
        </small>
      )}
    </div>
  )
}
