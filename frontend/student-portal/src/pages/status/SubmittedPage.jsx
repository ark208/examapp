import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { CheckCircleIcon } from '../../components/common/Icons';

export const SubmittedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <Card>
          <CardBody style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircleIcon size={32} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Assessment Submitted!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
              Your examination responses have been saved and delivered to the teacher portal.
              You may now safely close your browser or return to the dashboard.
            </p>
            <div style={{ marginTop: '12px' }}>
              <Button variant="primary" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
