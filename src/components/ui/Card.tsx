import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  padding = 'md',
  bordered = true,
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
    : '';

  const borderStyles = bordered
    ? 'border border-slate-200 dark:border-slate-800'
    : '';

  return (
    <div
      className={`bg-white dark:bg-slate-900/90 rounded-xl shadow-xs ${paddingStyles[padding]} ${borderStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
