import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export const ImportantLinks = () => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <a target="_blank" href="https://airbnb.com" className="flex gap-4 group items-center justify-between">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">https://airbnb.com/asdfasdfasdfasdfasdfasdfasdf12341234123412341234</span>
          </div>

          <Link2 className="shrink-0 text-zinc-400 size-5 group-hover:text-zinc-200" />
        </a>

        <a target="_blank" href="https://airbnb.com" className="flex gap-4 group items-center justify-between">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">https://airbnb.com/asdfasdfasdfasdfasdfasdfasdf12341234123412341234</span>
          </div>

          <Link2 className="shrink-0 text-zinc-400 size-5 group-hover:text-zinc-200" />
        </a>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
