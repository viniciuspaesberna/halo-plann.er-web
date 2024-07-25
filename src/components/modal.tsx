import { X } from "lucide-react"
import type { ComponentProps, ReactElement, ReactNode } from "react"
import { cn } from "../utils/cn"

interface ModalProps extends ComponentProps<'div'>, ModalHeaderProps {
  isOpen?: boolean
  children: ReactNode
}

export const Modal = ({
  heading,
  description,
  onClose,
  isOpen = true,
  className,
  children
}: ModalProps) => {
  return isOpen ? (
    <>
      <div onClick={onClose} className="fixed inset-0 z-30 flex bg-black/60 items-center justify-center backdrop-blur-sm" />

      <div
        tabIndex={0}
        onKeyDown={e => e.code === "Escape" && onClose()}
        className={cn("fixed z-40 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", className)}
      >
        <ModalHeader
          heading={heading}
          description={description}
          onClose={onClose}
        />

        {children}
      </div>
    </>
  ) : null
}

interface ModalHeaderProps {
  heading: string
  description?: string | ReactElement<any, string | React.JSXElementConstructor<any>> | ReactNode
  onClose: () => void
}

const ModalHeader = ({
  heading,
  description,
  onClose
}: ModalHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{heading}</h2>

        <button
          onClick={onClose}
          className="size-8 rounded-lg flex items-center justify-center ring-white/60 hover:ring-1"
        >
          <X className="size-5 text-zinc-400" />
        </button>
      </div>

      {description && typeof description === "string" && (
        <p className="text-sm text-zinc-400 text-left">
          {description}
        </p>
      )}

      {description && typeof description !== "string" && description}
    </div>
  )
}