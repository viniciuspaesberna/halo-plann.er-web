import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
} from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'

interface InputProps extends ComponentProps<'input'> {
  errors?: FieldErrors<FieldValues>
  icon?: ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { errors, name, icon, ...rest },
  ref,
) => {
  return (
    <div className="flex h-14 items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
      {icon && icon}

      <input
        placeholder="Título do link"
        className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        ref={ref}
        {...rest}
      />

      {errors?.name && name && (
        <small className="text-sm text-zinc-400">
          {errors.name?.message?.toString()}
        </small>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)
