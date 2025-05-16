
import React from 'react';
import { cn } from '@/lib/utils';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  className,
  variant = 'primary',
  icon,
  fullWidth = true,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-colors text-sm md:text-base',
        fullWidth && 'w-full',
        variant === 'primary' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};

export default AuthButton;
