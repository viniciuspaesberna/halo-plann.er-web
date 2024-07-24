import { useState } from "react";

import { AtSign, Plus, UserPlus, X } from "lucide-react";

import { Button } from "../../components/button";
import { useFormContext } from "react-hook-form";
import { Modal } from "../../components/modal";

interface InviteGuestsModalProps {
  isGuestsModalOpen: boolean
  toggleIsGuestsModalOpen: () => void
}

export const InviteGuestsModal = ({
  toggleIsGuestsModalOpen,
  isGuestsModalOpen
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
    const newEmails = emailsToInvite.filter((email: string) => email !== emailToRemove)

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
            <div key={email + index} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>

              <X onClick={() => removeEmailToInvite(email)} className="size-4 text-zinc-400 cursor-pointer hover:scale-105" />
            </div>
          ))}

          {emailsToInvite.length === 0 && (
            <p className="text-sm text-zinc-400 my-4 gap-2 w-full flex items-center justify-center">
              <UserPlus className="size-5" />
              Convide amigos para sua viagem!
            </p>
          )}
        </div>

        <div className="h-px w-full bg-zinc-800" />

        <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <AtSign className="size-5 ml-2 text-zinc-400" />

          <input
            type="email"
            name="email"
            placeholder="Digite o email do convidado"
            className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />

          <Button onClick={addEmailToInvite}>
            Convidar
            <Plus className="size-5" />
          </Button>
        </div>

        <small className="text-xs w-full text-zinc-400 text-right">Não é necessario informar seu e-mail aqui!</small>
      </>
    </Modal>
  )
}
