import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  toggleIsGuestsModalOpen: () => void
  toggleIsConfirmTripModalOpen: () => void
  emailsToInvite: string[]
}

export const InviteGuestsStep = ({
  toggleIsGuestsModalOpen,
  emailsToInvite,
  toggleIsConfirmTripModalOpen
}: InviteGuestsStepProps) => {
  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" onClick={toggleIsGuestsModalOpen} className="flex items-center gap-2 flex-1">
        <UserRoundPlus className="size-5 text-zinc-400" />
        <span className="flex-1 text-lg text-left text-zinc-400 truncate">
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1">
              {emailsToInvite.length} pessoa{emailsToInvite.length > 1 && 's'} convidada{emailsToInvite.length > 1 && 's'}
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1">
              Quem estará na viagem?
            </span>
          )}
        </span>
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={toggleIsConfirmTripModalOpen}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
