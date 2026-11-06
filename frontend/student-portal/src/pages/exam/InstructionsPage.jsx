import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { AlertTriangleIcon, CheckIcon } from '../../components/common/Icons';
import * as api from '../../api/index.js';

export const InstructionsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api.getExams()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          const found = data.find((e) => e.id === examId);
          setExam(found || null);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Failed to load exam details.');
      });
    return () => { mounted = false; };
  }, [examId]);

  const handleStart = async () => {
    if (!agreed) return;
    setIsJoining(true);
    setError('');
    try {
      const data = await api.joinExam(examId);
      if (data?.attemptId) {
        navigate(`/exam/${data.attemptId}`);
      } else {
        setError('Could not initialize examination attempt.');
      }
    } catch (err) {
      setError(err.message || 'Network error joining exam.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '720px', width: '100%' }}>
        <Card>
          <CardHeader
            title={exam ? exam.title : 'Examination Instructions'}
            subtitle={exam ? `Duration: ${exam.durationMinutes || exam.duration || 90} Minutes • Total Marks: ${exam.totalMarks || 48}` : 'Loading...'}
            badge={<Badge variant="warning">Pre-Exam Check</Badge>}
          />
          <CardBody>
            {error && (
              <div style={{ padding: '10px 14px', background: 'var(--danger-light)', color: 'var(--danger-text)', borderRadius: 'var(--radius-md)', marginBottom: '16px', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <h4 style={{ marginBottom: '10px' }}>General Guidelines & Anti-Cheat Policies:</h4>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li><strong>Fullscreen Mode:</strong> The assessment should be taken in fullscreen mode without navigating away.</li>
              <li><strong>Tab Switching:</strong> Switching tabs or windows is recorded as a security violation alert for the invigilator.</li>
              <li><strong>Autosave:</strong> Every question selection or numeric answer is committed automatically.</li>
              <li><strong>Timer:</strong> The test will automatically conclude when the countdown timer reaches 00:00.</li>
            </ul>

            <div style={{ marginTop: '24px', padding: '12px 16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                />
                <span>I have read all instructions and agree to adhere to the examination rules.</span>
              </label>
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="outline" onClick={() => navigate('/exams')}>
              Cancel & Back
            </Button>
            <Button
              variant="primary"
              disabled={!agreed}
              isLoading={isJoining}
              onClick={handleStart}
              icon={CheckIcon}
            >
              Start Examination
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
