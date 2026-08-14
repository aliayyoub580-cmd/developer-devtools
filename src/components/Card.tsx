import type { CardProps } from '../types';

export const Card = ({ children, className = '', hoverable = false, onClick }: CardProps) => {
  const baseStyles = 'bg-surface rounded-lg border border-border transition-colors duration-200';
  const hoverStyles = hoverable ? 'hover:bg-elevated hover:border-accent/20 cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
