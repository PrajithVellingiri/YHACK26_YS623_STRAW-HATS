import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-5 bg-slate-50 border-b border-slate-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`text-lg font-extrabold tracking-tight text-gov-navy ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
};
