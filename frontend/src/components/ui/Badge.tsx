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
    blue: 'bg-[#1A1A1A] text-[#00E5FF] border border-[#00E5FF]',
    green: 'bg-[#1A1A1A] text-accent-green border border-accent-green',
    yellow: 'bg-[#1A1A1A] text-accent-yellow border border-[#FFB800]',
    red: 'bg-[#1A1A1A] text-[#FF5500] border border-[#FF5500]',
    gray: 'bg-[#1A1A1A] text-text-muted border border-border',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
