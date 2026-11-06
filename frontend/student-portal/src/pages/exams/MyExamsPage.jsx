import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Skeleton } from '../../components/common/Skeleton';
import {
  ClockIcon,
  ArrowRightIcon,
  AlertCircleIcon,
} from '../../components/common/Icons';
import * as api from '../../api/index.js';
import './MyExamsPage.css';

export const MyExamsPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

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
  }, []);

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
    <div className="my-exams-container">
      <div>
        <h1 className="page-title" style={{ marginBottom: '4px' }}>My Examinations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Complete record of allocated assessments and examination states
        </p>
      </div>

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
        </div>
      )}

      <div className="table-card">
        <div className="table-header-strip">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>All Allocated Exams</h3>
            <Badge variant="primary" size="sm">{exams.length} Total</Badge>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-updating</span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="exams-table">
            <thead>
              <tr>
                <th>Exam Title</th>
                <th>Duration</th>
                <th>Total Marks</th>
                <th>Negative Marks</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialLoading ? (
                [1, 2, 3].map((row) => (
                  <tr key={row}>
                    <td><Skeleton width="75%" height="18px" /></td>
                    <td><Skeleton width="60px" height="16px" /></td>
                    <td><Skeleton width="50px" height="16px" /></td>
                    <td><Skeleton width="70px" height="16px" /></td>
                    <td><Skeleton width="65px" height="20px" /></td>
                    <td style={{ textAlign: 'right' }}>
                      <Skeleton width="100px" height="32px" style={{ display: 'inline-block' }} />
                    </td>
                  </tr>
                ))
              ) : exams.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No examinations available.
                  </td>
                </tr>
              ) : (
                exams.map((exam) => {
                  const action = getExamAction(exam);

                  return (
                    <tr key={exam.id}>
                      <td>
                        <span className="exam-table-title">{exam.title}</span>
                      </td>
                      <td>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <ClockIcon size={14} color="var(--text-muted)" />
                          <span>{exam.durationMinutes}m</span>
                        </div>
                      </td>
                      <td>{exam.totalMarks}</td>
                      <td>
                        {exam.negativeMarks > 0 ? (
                          <span style={{ color: 'var(--danger-text)' }}>-{exam.negativeMarks}</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>None</span>
                        )}
                      </td>
                      <td>{renderStatusPill(exam.examStatus)}</td>
                      <td className="exam-table-action-cell">
                        <Button
                          variant={action.variant}
                          size="sm"
                          disabled={action.disabled}
                          icon={action.isJoin || action.isResume ? ArrowRightIcon : null}
                          iconPosition="right"
                          onClick={() => handleActionClick(exam, action)}
                        >
                          {action.label}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
