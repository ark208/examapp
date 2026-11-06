import React from 'react';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
}) => (
  <span className={`badge badge-${variant} badge-${size} ${className}`}>
    {dot && <span className={`badge-dot ${pulse ? 'badge-pulse' : ''}`} />}
    <span>{children}</span>
  </span>
);
