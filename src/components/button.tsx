import { Loader2Icon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: 'flex items-center rounded-lg px-5 font-medium gap-2 justify-center transition-colors disabled:opacity-60',

  variants: {
    variant: {
      primary: 'bg-lime-500 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
    },
    size: {
      default: 'py-2',
      full: 'w-full h-11'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children?: ReactNode
  isLoading?: boolean
}

export const Button = ({
  children,
  variant,
  isLoading,
  size,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      type={type}
      className={buttonVariants({ variant, size })}
    >
      {isLoading && (
        <Loader2Icon className="animate-spin size-5" />
      )}

      {children && !isLoading && children}
    </button>
  );
}
