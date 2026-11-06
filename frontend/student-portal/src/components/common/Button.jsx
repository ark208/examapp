import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled || isLoading}
    onClick={onClick}
    className={`btn btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${className}`}
    {...props}
  >
    {isLoading && <span className="btn-spinner" aria-hidden="true" />}
    {!isLoading && Icon && iconPosition === 'left' && (
      <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="btn-icon-left" />
    )}
    <span className="btn-content">{children}</span>
    {!isLoading && Icon && iconPosition === 'right' && (
      <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="btn-icon-right" />
    )}
  </button>
);
