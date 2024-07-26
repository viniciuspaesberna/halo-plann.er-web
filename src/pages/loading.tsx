import { LoaderPinwheel } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <img src="/logo.svg" alt="" className="scale-125" />

        <p className="text-zinc-400 text-xl">Convide seus amigos e planeje sua próxima viagem!</p>

        <LoaderPinwheel className="animate-spin" />
      </div>
    </div>
  );
}