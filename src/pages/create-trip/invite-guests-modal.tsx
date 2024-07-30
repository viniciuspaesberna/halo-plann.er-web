import { AtSign, Plus, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '../../components/button'
import { Modal } from '../../components/modal'

interface InviteGuestsModalProps {
  isGuestsModalOpen: boolean
  toggleIsGuestsModalOpen: () => void
}

export const InviteGuestsModal = ({
  toggleIsGuestsModalOpen,
  isGuestsModalOpen,
}: InviteGuestsModalProps) => {
  const [email, setEmail] = useState('')

  const { setValue, watch } = useFormContext()

  const emailsToInvite = watch('emailsToInvite') as string[]

  function addEmailToInvite() {
    if (!email) return

    if (emailsToInvite.includes(email)) {
      return setEmail('')
    }

    const newEmails = [...emailsToInvite, email]

    setEmail('')
    setValue('emailsToInvite', newEmails)
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmails = emailsToInvite.filter(
      (email: string) => email !== emailToRemove,
    )

    setValue('emailsToInvite', newEmails)
  }

  return (
    <Modal
      heading="Adicionar convidados"
      description="Os convidados irão receber e-mails para confirmar a participação na viagem."
      isOpen={isGuestsModalOpen}
      onClose={toggleIsGuestsModalOpen}
      className="w-[640px]"
    >
      <>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email, index) => (
            <div
              key={email + index}
              className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
            >
              <span className="text-zinc-300">{email}</span>

              <X
                onClick={() => removeEmailToInvite(email)}
                className="size-4 cursor-pointer text-zinc-400 hover:scale-105"
              />
            </div>
          ))}

          {emailsToInvite.length === 0 && (
            <p className="my-4 flex w-full items-center justify-center gap-2 text-sm text-zinc-400">
              <UserPlus className="size-5" />
              Convide amigos para sua viagem!
            </p>
          )}
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

          <Button onClick={addEmailToInvite}>
            Convidar
            <Plus className="size-5" />
          </Button>
        </div>

        <small className="w-full text-right text-xs text-zinc-400">
          Não é necessario informar seu e-mail aqui!
        </small>
      </>
    </Modal>
  )
}
