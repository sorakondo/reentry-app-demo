import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger';

interface BigButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-neutral-900 text-white active:bg-neutral-700',
  secondary: 'bg-neutral-100 text-neutral-900 active:bg-neutral-200 border border-neutral-300',
  outline: 'bg-white text-neutral-900 border-2 border-neutral-900 active:bg-neutral-100',
  danger: 'bg-red-600 text-white active:bg-red-700',
};

export default function BigButton({
  children,
  variant = 'primary',
  className = '',
  ...rest
}: BigButtonProps) {
  return (
    <button
      type="button"
      className={`tap-target w-full rounded-2xl px-6 py-4 text-lg font-bold leading-snug transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
