import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Skeleton } from '../../components/common/Skeleton';
import {
  ExamIcon,
  MonitoringIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  AlertCircleIcon,
} from '../../components/common/Icons';
import * as api from '../../api/index.js';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Initial load + 10s polling
  useEffect(() => {
    let mounted = true;

    api.getExams()
      .then((data) => {
        if (mounted) {
          setExams(Array.isArray(data) ? data : []);
          setError('');
          setInitialLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || 'Failed to load examinations.');
          setInitialLoading(false);
        }
      });

    const interval = setInterval(() => {
      api.getExams()
        .then((data) => {
          if (mounted) {
            setExams(Array.isArray(data) ? data : []);
          }
        })
        .catch(() => {});
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [refreshTrigger]);

  // Compute stat card metrics
  const assignedCount = exams.length;
  const liveCount = exams.filter((e) => e.examStatus === 'live').length;
  const completedCount = exams.filter(
    (e) =>
      e.examStatus === 'ended' ||
      e.attemptStatus === 'submitted' ||
      e.attemptStatus === 'auto_submitted'
  ).length;

  const handleActionClick = (exam, action) => {
    if (action.disabled) return;
    if (action.isJoin) {
      navigate(`/exam/${exam.id}/instructions`);
    } else if (action.isResume) {
      if (exam.attemptId) {
        navigate(`/exam/${exam.attemptId}`);
      } else {
        navigate(`/exam/${exam.id}/instructions`);
      }
    }
  };

  function getExamAction(exam) {
    const { examStatus, attemptStatus } = exam;

    if (attemptStatus === 'submitted' || attemptStatus === 'auto_submitted') {
      return { label: 'Submitted', variant: 'secondary', disabled: true };
    }
    if (attemptStatus === 'terminated') {
      return { label: 'Terminated', variant: 'danger', disabled: true };
    }
    if (examStatus === 'upcoming') {
      return { label: 'Not started yet', variant: 'secondary', disabled: true };
    }
    if (examStatus === 'ended' && attemptStatus === 'none') {
      return { label: 'Missed', variant: 'secondary', disabled: true };
    }
    if (examStatus === 'live') {
      if (attemptStatus === 'in_progress') {
        return { label: 'Resume exam', variant: 'primary', disabled: false, isResume: true };
      }
      return { label: 'Join exam', variant: 'primary', disabled: false, isJoin: true };
    }
    return { label: 'Not started yet', variant: 'secondary', disabled: true };
  }

  function renderStatusPill(status) {
    if (status === 'live') {
      return (
        <Badge variant="danger" dot pulse size="sm">
          LIVE
        </Badge>
      );
    }
    if (status === 'upcoming') {
      return (
        <Badge variant="neutral" size="sm">
          UPCOMING
        </Badge>
      );
    }
    return (
      <Badge variant="neutral" size="sm">
        ENDED
      </Badge>
    );
  }

  return (
    <div className="dashboard-container">
      {/* 1. Hero Greeting */}
      <section className="dashboard-hero">
        <h1 className="dashboard-greeting">
          Welcome back, {user?.name || 'Student'}
        </h1>
        <p className="dashboard-sub">
          Roll No: <strong style={{ color: 'var(--text-primary)' }}>{user?.rollNo || '2025KUCP1032'}</strong> &bull; LAN Node Active
        </p>
      </section>

      {/* 2. 3 Stat Cards */}
      <section className="dashboard-stats-grid" aria-label="Overview Statistics">
        {initialLoading ? (
          <>
            <div className="card" style={{ padding: '20px', gap: '12px' }}>
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="32px" />
              <Skeleton width="50%" height="14px" />
            </div>
            <div className="card" style={{ padding: '20px', gap: '12px' }}>
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="32px" />
              <Skeleton width="50%" height="14px" />
            </div>
            <div className="card" style={{ padding: '20px', gap: '12px' }}>
              <Skeleton width="60%" height="16px" />
              <Skeleton width="40%" height="32px" />
              <Skeleton width="50%" height="14px" />
            </div>
          </>
        ) : (
          <>
            <StatCard
              title="Assigned Exams"
              value={assignedCount}
              subvalue="All allocated assessments"
              icon={ExamIcon}
            />
            <StatCard
              title="Live Now"
              value={liveCount}
              trend={liveCount > 0 ? "● ACTIVE NOW" : "0 in session"}
              trendDirection={liveCount > 0 ? "live" : "neutral"}
              icon={MonitoringIcon}
            />
            <StatCard
              title="Completed"
              value={completedCount}
              subvalue="Submitted or closed"
              icon={CheckCircleIcon}
            />
          </>
        )}
      </section>

      {/* Section Header */}
      <div className="dashboard-section-header">
        <h2 className="dashboard-section-title">Your Examinations</h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Auto-updates every 10s
        </span>
      </div>

      {/* Error state */}
      {error && (
        <div style={{
          padding: '12px 16px',
          background: 'var(--danger-light)',
          color: 'var(--danger-text)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--danger-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.875rem',
        }}>
          <AlertCircleIcon size={16} />
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => { setInitialLoading(true); setRefreshTrigger((v) => v + 1); }} style={{ marginLeft: 'auto' }}>
            Retry
          </Button>
        </div>
      )}

      {/* 3. List of Exam Cards from getExams() */}
      {initialLoading ? (
        <div className="exams-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="exam-card">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Skeleton width="80%" height="20px" />
                <Skeleton width="50%" height="14px" />
              </div>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
                <Skeleton width="100%" height="38px" />
              </div>
            </div>
          ))}
        </div>
      ) : exams.length === 0 ? (
        /* Empty State */
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <ExamIcon size={24} />
          </div>
          <h3 className="empty-state-title">No Examinations Found</h3>
          <p className="empty-state-desc">
            You do not have any exams scheduled or assigned to your roll number currently.
          </p>
        </div>
      ) : (
        <div className="exams-grid">
          {exams.map((exam) => {
            const action = getExamAction(exam);
            const isLive = exam.examStatus === 'live';

            return (
              <div
                key={exam.id}
                className={`exam-card ${isLive ? 'is-live' : ''}`}
              >
                <div>
                  <div className="exam-card-top">
                    <h3 className="exam-card-title">{exam.title}</h3>
                    {renderStatusPill(exam.examStatus)}
                  </div>

                  <div className="exam-card-meta-list" style={{ marginTop: '12px' }}>
                    <span className="exam-card-meta-item">
                      <ClockIcon size={14} color="var(--text-muted)" />
                      <span>{exam.durationMinutes} mins</span>
                    </span>

                    <span>&bull;</span>

                    <span className="exam-card-meta-item">
                      <span>Total: <strong>{exam.totalMarks} marks</strong></span>
                    </span>

                    <span>&bull;</span>

                    <span className="exam-card-meta-item">
                      <span>
                        {exam.negativeMarks > 0
                          ? `-${exam.negativeMarks} negative`
                          : 'No negative marking'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="exam-card-bottom">
                  <Button
                    variant={action.variant}
                    disabled={action.disabled}
                    className="exam-card-action-btn"
                    icon={action.isJoin || action.isResume ? ArrowRightIcon : null}
                    iconPosition="right"
                    onClick={() => handleActionClick(exam, action)}
                  >
                    {action.label}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
