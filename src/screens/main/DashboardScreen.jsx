import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/BottomNav';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { currentUser, getPatients, getAllAssessments, logout } = useApp();
  const patients = getPatients();
  const assessments = getAllAssessments();

  const stats = [
    { label: 'Patients', value: patients.length, icon: '👧', color: '#6C63FF' },
    { label: 'Assessments', value: assessments.length, icon: '📋', color: '#43E8D8' },
    { label: 'High Risk', value: assessments.filter(a => a.riskLevel === 'High').length, icon: '⚠️', color: '#F87171' },
    { label: 'Low Risk', value: assessments.filter(a => a.riskLevel === 'Low').length, icon: '✅', color: '#34D399' },
  ];

  const quickActions = [
    { icon: '➕', label: 'Add Patient', action: () => navigate('/patients/add'), color: '#6C63FF' },
    { icon: '📋', label: 'Patients', action: () => navigate('/patients'), color: '#43E8D8' },
    { icon: '📊', label: 'Analytics', action: () => navigate('/analytics'), color: '#FF6584' },
    { icon: '🕒', label: 'History', action: () => navigate('/history'), color: '#FBBF24' },
  ];

  const recentPatients = patients.slice(0, 3);

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="orb orb-1" />

      {/* Header */}
      <div style={{ padding: '50px 20px 20px', background: 'linear-gradient(180deg, rgba(108,99,255,0.1) 0%, transparent 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ color: '#9BA3C7', fontSize: 13, fontWeight: 600 }}>Good day,</div>
            <h1 style={{ fontSize: 22, fontWeight: 800 }}>{currentUser?.name?.split(' ').slice(0,2).join(' ')} 👋</h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('/settings')}
              style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)', fontSize: 20, cursor: 'pointer' }}>
              ⚙️
            </button>
            <div className="avatar">{currentUser?.name?.[0] || 'U'}</div>
          </div>
        </div>
        <span className="badge badge-primary" style={{ marginTop: 6 }}>
          {currentUser?.role === 'dentist' ? '🦷 Dentist' : '👨‍👧 Parent'}
        </span>
      </div>

      <div className="page-content content-padded">
        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#9BA3C7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {quickActions.map(a => (
            <button key={a.label} onClick={a.action} className="card" style={{
              cursor: 'pointer', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 16px',
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = a.color}
            onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(108,99,255,0.2)'}>
              <div style={{ fontSize: 30, width: 52, height: 52, borderRadius: 16, background: `${a.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#F0F2FF' }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Recent patients */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#9BA3C7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Patients</h2>
          <button onClick={() => navigate('/patients')} style={{ background: 'none', border: 'none', color: '#A89BFF', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>View All →</button>
        </div>
        {recentPatients.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32, color: '#5A6080' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>👶</div>
            <div>No patients yet. Add your first patient!</div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/patients/add')}>+ Add Patient</button>
          </div>
        ) : (
          recentPatients.map(p => (
            <div key={p.id} className="list-item" onClick={() => navigate(`/patients/${p.id}`)}>
              <div className="avatar" style={{ fontSize: 18 }}>{p.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ color: '#9BA3C7', fontSize: 13 }}>{p.age} yrs · {p.gender}</div>
              </div>
              <span style={{ color: '#6C63FF', fontSize: 18 }}>›</span>
            </div>
          ))
        )}
      </div>

      <BottomNav active="home" />
    </div>
  );
}
