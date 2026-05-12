import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelectionScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const roles = [
    { id: 'dentist', icon: '🦷', title: 'Dentist', sub: 'Manage patients, run assessments, view full analytics' },
    { id: 'parent', icon: '👨‍👧', title: 'Parent / Guardian', sub: `Track your child's dental health and anxiety profile` },
  ];

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400 }}>
        <button className="back-btn" onClick={() => navigate('/welcome')} style={{ marginBottom: 24 }}>← Back</button>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Who are you?</h1>
        <p style={{ color: '#9BA3C7', marginBottom: 28, fontSize: 15 }}>Choose your role to get the right experience.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {roles.map(r => (
            <div key={r.id}
              onClick={() => setSelected(r.id)}
              className="card"
              style={{
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 18,
                border: selected === r.id ? '2px solid #6C63FF' : '1px solid rgba(108,99,255,0.2)',
                boxShadow: selected === r.id ? '0 0 24px rgba(108,99,255,0.3)' : 'none',
                transition: 'all 0.2s',
              }}>
              <div style={{ fontSize: 42, lineHeight: 1 }}>{r.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>{r.title}</div>
                <div style={{ color: '#9BA3C7', fontSize: 13, marginTop: 2 }}>{r.sub}</div>
              </div>
              {selected === r.id && <div style={{ marginLeft: 'auto', color: '#6C63FF', fontSize: 22 }}>✓</div>}
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          style={{ marginTop: 28 }}
          disabled={!selected}
          onClick={() => navigate(`/register?role=${selected}`)}
        >
          Continue as {selected ? roles.find(r => r.id === selected).title : '...'}
        </button>
      </div>
    </div>
  );
}
