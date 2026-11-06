import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  LockIcon,
  UserIcon,
  ServerIcon,
  AlertCircleIcon,
} from '../../components/common/Icons';
import './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!rollNo.trim()) {
      setError('Please enter your roll number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    try {
      await login({ rollNo: rollNo.trim(), password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid roll number or password.');
    }
  };

  const fillDemo = () => {
    setRollNo('2025KUCP1032');
    setPassword('test123');
    setError('');
  };

  return (
    <div className="auth-simple-wrapper">
      <div className="auth-simple-card">
        {/* Brand Center */}
        <div className="auth-brand-center">
          <div className="auth-brand-icon">
            <ServerIcon size={20} color="#ffffff" />
          </div>
          <h1 className="auth-title">ExamLAN</h1>
          <p className="auth-subtitle">Student Examination Portal</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="auth-simple-error" role="alert">
            <AlertCircleIcon size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-simple-form">
          <Input
            label="Roll Number"
            type="text"
            placeholder="e.g. 2025KUCP1032"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            icon={UserIcon}
            required
            autoComplete="username"
          />

          <Input
            label="Password"
            type="password"
            isPassword
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={LockIcon}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="auth-btn-full"
            isLoading={isLoading}
          >
            Sign In to Portal
          </Button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="md"
            className="auth-btn-full"
            onClick={fillDemo}
          >
            ⚡ Fill Demo Credentials
          </Button>
        </form>

        <p className="auth-hint">
          Student credentials are provided by your laboratory instructor or department coordinator.
        </p>
      </div>

      <p className="auth-simple-bottom-note">
        ExamLAN &bull; LAN Laboratory Examination System
      </p>
    </div>
  );
};
