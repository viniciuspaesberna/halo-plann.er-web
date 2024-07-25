import { useEffect, useState } from "react";

import { Link2, Plus } from "lucide-react";

import { api } from "../../lib/axios";
import { Button } from "../../components/button";
import { useTripDetails } from "../../contexts/trip-details-context";
import { CreateLinkModal } from "./create-link-modals";


type Link = {
  id: string;
  title: string;
  url: string;
}

export const ImportantLinks = () => {
  const [isCreateLinksModalOpen, setIsCreateLinksModalOpen] = useState(false)
  const [links, setLinks] = useState<Link[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api.get<{ links: Link[] }>(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links.map(link => (
          <a key={link.id} target="_blank" href={link.url} className="flex gap-4 group items-baseline justify-between">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{link.title}</span>
              <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">{link.url}</span>
            </div>

            <Link2 className="shrink-0 text-zinc-400 size-5 group-hover:text-zinc-200" />
          </a>
        ))}

        {links.length === 0 && (
          <span className="text-zinc-400 w-full flex items-center justify-center gap-2">
            Cadastre links importantes sobre a viagem.
          </span>
        )}
      </div>

      <Button onClick={() => setIsCreateLinksModalOpen(true)} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      <CreateLinkModal isOpen={isCreateLinksModalOpen} onClose={() => setIsCreateLinksModalOpen(false)} />
    </div>
  );
}
