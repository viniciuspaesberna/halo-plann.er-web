import { X } from 'lucide-react'
import type { ComponentProps, ReactElement, ReactNode } from 'react'

import { cn } from '../utils/cn'

interface ModalHeaderProps {
  heading: string
  description?:
    | string
    | ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | ReactNode
  onClose: () => void
}

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
  children,
}: ModalProps) => {
  return isOpen ? (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      />

      <div
        tabIndex={0}
        onKeyDown={(e) => e.code === 'Escape' && onClose()}
        className={cn(
          'fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape',
          className,
        )}
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

const ModalHeader = ({ heading, description, onClose }: ModalHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{heading}</h2>

        <button
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-lg ring-white/60 hover:ring-1"
        >
          <X className="size-5 text-zinc-400" />
        </button>
      </div>

      {description && typeof description === 'string' && (
        <p className="text-left text-sm text-zinc-400">{description}</p>
      )}

      {description && typeof description !== 'string' && description}
    </div>
  )
}
