import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StudentLayout } from '../layouts/StudentLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { MyExamsPage } from '../pages/exams/MyExamsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { InstructionsPage } from '../pages/exam/InstructionsPage';
import { ExamRoomPage } from '../pages/exam/ExamRoomPage';
import { SubmittedPage } from '../pages/status/SubmittedPage';
import { TerminatedPage } from '../pages/status/TerminatedPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Verifying examination session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes with Sidebar Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="exams" element={<MyExamsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Fullscreen Protected Exam Routes (NO sidebar) */}
      <Route
        path="/exam/:examId/instructions"
        element={
          <ProtectedRoute>
            <InstructionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam/:attemptId"
        element={
          <ProtectedRoute>
            <ExamRoomPage />
          </ProtectedRoute>
        }
      />

      {/* Completion & Termination status screens (NO sidebar) */}
      <Route
        path="/submitted"
        element={
          <ProtectedRoute>
            <SubmittedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/terminated"
        element={
          <ProtectedRoute>
            <TerminatedPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
