import { forwardRef } from 'react';
import type { ButtonProps } from '../types';

export const Button = forwardRef<any, ButtonProps>(
  ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = '',
    type = 'button',
    icon,
    iconPosition = 'left',
    as: Component = 'button',
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50',
      secondary: 'bg-elevated text-primary hover:bg-surface border border-border focus:ring-accent/50',
      ghost: 'bg-transparent text-secondary hover:bg-elevated hover:text-primary focus:ring-accent/50',
      danger: 'bg-error text-white hover:bg-error/90 focus:ring-error/50',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5',
    };

    const rounded = 'rounded-md';

    const extraProps = Component === 'button' ? { type, disabled } : {};

    return (
      <Component
        ref={ref}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${rounded} ${className}`}
        {...extraProps}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="flex items-center">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="flex items-center">{icon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';
