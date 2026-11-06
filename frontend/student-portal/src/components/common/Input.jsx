import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './Icons';
import './Input.css';

export const Input = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  isPassword = false,
  required = false,
  disabled = false,
  icon: Icon = null,
  error = '',
  helper = '',
  className = '',
  ...props
}) => {
  const [showPwd, setShowPwd] = useState(false);
  const inputType = isPassword ? (showPwd ? 'text' : 'password') : type;

  return (
    <div className={`input-field-group ${error ? 'has-error' : ''} ${Icon ? 'has-prefix-icon' : ''} ${isPassword ? 'has-suffix-action' : ''} ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required-star">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && (
          <span className="input-prefix-icon">
            <Icon size={15} />
          </span>
        )}
        <input
          type={inputType}
          className="input-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="input-suffix-btn"
            onClick={() => setShowPwd((v) => !v)}
            tabIndex={-1}
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
          </button>
        )}
      </div>
      {error && <span className="input-error-msg">{error}</span>}
      {!error && helper && <span className="input-helper-msg">{helper}</span>}
    </div>
  );
};
