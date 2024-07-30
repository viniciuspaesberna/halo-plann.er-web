import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
} from 'react'

interface InputProps extends ComponentProps<'input'> {
  error?: string | undefined
  icon?: ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error, icon, ...rest },
  ref,
) => {
  return (
    <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
      {icon && icon}

      <input
        className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        ref={ref}
        {...rest}
      />

      {error && <small className="text-sm text-zinc-400">{error}</small>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
