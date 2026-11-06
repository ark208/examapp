import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import * as api from '../../api/index.js';

export const ExamRoomPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.getPaper(attemptId)
      .then((data) => {
        if (mounted && data) {
          setPaper(data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Simple heartbeat check
    const interval = setInterval(async () => {
      try {
        const hb = await api.heartbeat(attemptId);
        if (hb) {
          if (hb.status === 'terminated') {
            navigate('/terminated');
          } else if (hb.status === 'submitted' || hb.status === 'auto_submitted') {
            navigate('/submitted');
          } else if (hb.endsAt && hb.serverNow) {
            const ends = new Date(hb.endsAt).getTime();
            const now = new Date(hb.serverNow).getTime();
            setTimeRemaining(Math.max(0, Math.floor((ends - now) / 1000)));
          }
        }
      } catch {
        // network issue
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [attemptId, navigate]);

  const handleSubmit = async () => {
    if (window.confirm('Are you sure you want to finish and submit your exam?')) {
      const res = await api.submit(attemptId);
      if (res) {
        navigate('/submitted');
      }
    }
  };

  const formatTime = (secs) => {
    if (secs == null) return '--:--';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Exam Navigation Bar */}
      <header
        style={{
          height: '60px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '1rem' }}>Active Examination Session</h3>
          <Badge variant="danger" pulse dot size="sm">LIVE</Badge>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary)' }}>
            ⏱ {formatTime(timeRemaining)}
          </div>
          <Button variant="danger" size="sm" onClick={handleSubmit}>
            Submit Exam
          </Button>
        </div>
      </header>

      {/* Main Room Body Placeholder */}
      <main style={{ flex: 1, padding: '24px 32px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <Card>
          <CardHeader
            title="Examination Workspace (Placeholder)"
            subtitle={`Attempt ID: ${attemptId} • ${paper?.questions?.length || 12} Questions in paper`}
          />
          <CardBody>
            {loading ? (
              <p>Loading assessment paper...</p>
            ) : (
              <div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Assessment questions loaded successfully. The complete test taking interface, question palette, and autosaving will be implemented here.
                </p>
                <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <h4>First Question Preview:</h4>
                  <p style={{ marginTop: '6px' }}>{paper?.questions?.[0]?.text}</p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </main>
    </div>
  );
};
