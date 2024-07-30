import { ComponentProps, forwardRef, ForwardRefRenderFunction, ReactElement } from "react"
import { FieldErrors, FieldValues } from "react-hook-form"

interface InputProps extends ComponentProps<'input'> {
  errors?: FieldErrors<FieldValues>
  icon?: ReactElement<any, string | React.JSXElementConstructor<any>>
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement, 
  InputProps
> = ({
  errors,
  name,
  icon,
  ...rest
}, ref) => {
  return (
    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-4">
      {icon && icon}

      <input
        placeholder="Título do link"
        className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
        ref={ref}
        {...rest}
      />

      {errors?.name && (
        <small className="text-zinc-400 text-sm">
          {errors.name.message?.toString()}
        </small>
      )}
    </div>
  )
}

export const Input = forwardRef(InputBase)