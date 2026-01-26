import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	fullWidth?: boolean
	loading?: boolean
	leftIcon?: ReactNode
	rightIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"bg-[var(--gold-color)] text-[var(--primary)] hover:bg-emerald-700 focus-visible:outline-emerald-600",
	secondary:
		"bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:outline-gray-500",
	ghost:
		"bg-transparent text-emerald-700 hover:bg-emerald-50 focus-visible:outline-emerald-600",
}

const sizeClasses: Record<ButtonSize, string> = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-3 text-base",
}

const Button = ({
	children,
	variant = "primary",
	size = "md",
	fullWidth,
	loading = false,
	leftIcon,
	rightIcon,
	className,
	type,
	disabled,
	...rest
}: ButtonProps) => {
	const isDisabled = disabled || loading

	const classes = [
		"inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors",
		"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
		"disabled:opacity-60 disabled:cursor-not-allowed",
		variantClasses[variant],
		sizeClasses[size],
		fullWidth ? "w-full" : "",
		className ?? "",
	]
		.filter(Boolean)
		.join(" ")

	return (
		<button
			type={type ?? "button"}
			className={classes}
			disabled={isDisabled}
			aria-busy={loading}
			{...rest}
		>
			{loading && (
				<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
			)}
			{!loading && leftIcon}
			<span className="whitespace-nowrap">{children}</span>
			{!loading && rightIcon}
		</button>
	)
}

export default Button
