import React from 'react';
import './Skeleton.css';

export const Skeleton = ({ width, height, borderRadius, className = '', style = {} }) => {
  return (
    <div
      className={`skeleton-box ${className}`}
      style={{
        width: width || '100%',
        height: height || '16px',
        borderRadius: borderRadius || 'var(--radius-md)',
        ...style,
      }}
    />
  );
};
