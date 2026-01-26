interface BaseProps {
  className?: string;
}

interface InputProps extends BaseProps {
  label?: string;
  value: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export type { InputProps };
