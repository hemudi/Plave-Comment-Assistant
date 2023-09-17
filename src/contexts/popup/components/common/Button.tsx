import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  variant?: 'square' | 'circle';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ className = '', children, ...props }: ButtonProps) => (
  <button className={`h-full w-full p-3 text-white ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
