import React, { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'gray',
  className = '',
  ...props 
}) => {
  const variants = {
    blue: 'bg-blue-100 text-blue-800 ring-blue-600/20',
    green: 'bg-green-100 text-green-800 ring-green-600/20',
    yellow: 'bg-amber-100 text-amber-800 ring-amber-600/20',
    red: 'bg-red-100 text-red-800 ring-red-600/10',
    gray: 'bg-slate-100 text-slate-800 ring-slate-500/10',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide ring-1 ring-inset shadow-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
