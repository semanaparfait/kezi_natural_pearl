interface BaseProps {
  className?: string;
}

interface InputProps extends BaseProps {
   label?: React.ReactNode; 
  value: string;
  accept?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "file";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
export type { InputProps };
