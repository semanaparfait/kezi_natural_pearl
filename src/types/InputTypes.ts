interface BaseProps {
  className?: string;
}

interface InputProps extends BaseProps {
  label?: string;
  value: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
export type { InputProps };
