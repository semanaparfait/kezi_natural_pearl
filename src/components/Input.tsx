
import type { InputProps } from "@/types/InputTypes"
import { useId } from "react"

interface EnhancedInputProps extends InputProps {
  error?: string
  helperText?: string
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const baseClass =
  "block outline-none rounded-2xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)] transition w-full disabled:opacity-60 disabled:cursor-not-allowed px-4 py-2 text-sm "

const Input: React.FC<EnhancedInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  error,
  helperText,
  fullWidth,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const id = useId()
  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-gray-400 pointer-events-none">{leftIcon}</span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={[
            baseClass,
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            error ? "border-[var(--error-red)] focus:ring-[var(--error-red)]" : "",
            className ?? "",
          ].filter(Boolean).join(" ")}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...rest}
        />
        {rightIcon && (
          <span className="absolute right-3 text-gray-400 pointer-events-none">{rightIcon}</span>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-[var(--error-red)]">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

export default Input

