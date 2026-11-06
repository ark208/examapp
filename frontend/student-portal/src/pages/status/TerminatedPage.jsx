import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ShieldAlertIcon } from '../../components/common/Icons';

export const TerminatedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <Card style={{ borderColor: 'var(--danger-border)' }}>
          <CardBody style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--danger-light)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlertIcon size={32} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--danger-text)' }}>Examination Session Terminated</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
              Your examination attempt was terminated by the invigilator due to policy violations or manual instructor intervention.
              Please report immediately to the laboratory proctor.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Button variant="secondary" onClick={() => navigate('/')}>
                Return to Dashboard
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
