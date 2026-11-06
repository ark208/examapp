import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Skeleton } from '../../components/common/Skeleton';
import { UserIcon } from '../../components/common/Icons';

export const ProfilePage = () => {
  const { user, isLoading } = useAuth();

  const EXAM_RULES = [
    {
      title: 'Fullscreen is Mandatory',
      desc: 'All examinations must be taken in fullscreen mode. Leaving fullscreen will display a warning lock overlay and notify the invigilator.',
    },
    {
      title: 'Proctoring & Focus Tracking',
      desc: 'Switching browser tabs or minimizing the window triggers an automatic security violation recorded on the teacher portal.',
    },
    {
      title: 'Copy-Paste & Context Menu Disabled',
      desc: 'Clipboard operations (copy, cut, paste) and right-clicking are strictly blocked during active assessments.',
    },
    {
      title: 'Continuous Answer Autosave',
      desc: 'Every question answer change is saved immediately to the server. You do not risk losing progress if your browser refreshes.',
    },
    {
      title: 'Server-Controlled Timing',
      desc: 'Countdown timers operate strictly on server time. When the timer expires, assessments auto-submit automatically.',
    },
    {
      title: 'Crash Recovery',
      desc: 'In case of power failure or system restart, re-login from the laboratory terminal to resume your in-progress attempt.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '820px' }}>
      <div>
        <h1 className="page-title" style={{ marginBottom: '4px' }}>Profile & Help</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Candidate identity verification and examination conduct regulations
        </p>
      </div>

      {/* Student Identity Card */}
      <Card>
        <CardHeader
          title="Student Identity"
          subtitle="Registered institutional examinee credentials"
          badge={<Badge variant="success" dot>Active Session</Badge>}
        />
        <CardBody>
          {isLoading ? (
            <div style={{ display: 'flex', gap: '24px' }}>
              <Skeleton width="180px" height="40px" />
              <Skeleton width="180px" height="40px" />
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <UserIcon size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Student Name
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {user?.name || 'Arjun Sharma'}
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-muted)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>#</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Roll Number
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {user?.rollNo || '2025KUCP1032'}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Rules Card */}
      <Card>
        <CardHeader
          title="Examination Code of Conduct"
          subtitle="Mandatory rules for all computer-based lab assessments"
          badge={<Badge variant="warning">Strict Compliance</Badge>}
        />
        <CardBody noPadding>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {EXAM_RULES.map((rule, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  borderBottom: idx === EXAM_RULES.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {rule.title}
                  </h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
