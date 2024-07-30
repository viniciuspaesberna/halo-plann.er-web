import { Link2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '../../components/button'
import { useTripDetails } from '../../contexts/trip-details-context'
import { api } from '../../lib/axios'

type Link = {
  id: string
  title: string
  url: string
}

interface ImportantLinksProps {
  onOpenCreateLinkModal: () => void
}

export const ImportantLinks = ({
  onOpenCreateLinkModal,
}: ImportantLinksProps) => {
  const [links, setLinks] = useState<Link[]>([])

  const { tripId } = useTripDetails()

  useEffect(() => {
    api
      .get<{ links: Link[] }>(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        {links.map((link) => (
          <a
            key={link.id}
            target="_blank"
            href={link.url}
            className="group flex items-baseline justify-between gap-4"
            rel="noreferrer"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <span className="block truncate text-xs text-zinc-400 group-hover:text-zinc-200">
                {link.url}
              </span>
            </div>

            <Link2 className="size-5 shrink-0 text-zinc-400 group-hover:text-zinc-200" />
          </a>
        ))}

        {links.length === 0 && (
          <span className="w-full text-left text-zinc-400">
            Cadastre links importantes para viagem.
          </span>
        )}
      </div>

      <Button onClick={onOpenCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}
