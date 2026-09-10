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
    blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    green: 'bg-green-50 text-green-700 ring-green-600/20',
    yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    red: 'bg-red-50 text-red-700 ring-red-600/10',
    gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
