import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/BottomNav';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Profile Settings', action: () => navigate('/settings/profile'), arrow: true },
        { icon: '🔒', label: 'Change Password', action: () => {}, arrow: true },
        { icon: '🔔', label: 'Notifications', action: () => {}, arrow: true },
      ],
    },
    {
      title: 'App',
      items: [
        { icon: '🌗', label: 'Dark Mode', action: () => {}, toggle: true, value: true },
        { icon: '🌍', label: 'Language', action: () => {}, value: 'English' },
        { icon: '📏', label: 'Units', action: () => {}, value: 'Metric' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '❓', label: 'Help & Support', action: () => navigate('/settings/help'), arrow: true },
        { icon: 'ℹ️', label: 'About PediPredict AI', action: () => navigate('/settings/about'), arrow: true },
        { icon: '⭐', label: 'Rate the App', action: () => {}, arrow: true },
      ],
    },
  ];

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="topbar-title">Settings</span>
        <div />
      </div>

      <div className="page-content content-padded" style={{ overflowY: 'auto', flex: 1 }}>
        {/* User card */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '20px 20px' }}>
          <div className="avatar" style={{ width: 56, height: 56, fontSize: 24 }}>{currentUser?.name?.[0]}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{currentUser?.name}</div>
            <div style={{ color: '#9BA3C7', fontSize: 13 }}>{currentUser?.email}</div>
            <span className="badge badge-primary" style={{ marginTop: 4, fontSize: 11 }}>{currentUser?.role}</span>
          </div>
          <button onClick={() => navigate('/settings/profile')} className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>Edit</button>
        </div>

        {sections.map(s => (
          <div key={s.title} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: '#9BA3C7', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.title}</div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {s.items.map((item, i) => (
                <button key={item.label} onClick={item.action} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', width: '100%',
                  background: 'none', border: 'none', borderBottom: i < s.items.length - 1 ? '1px solid rgba(108,99,255,0.1)' : 'none',
                  cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', textAlign: 'left', transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(108,99,255,0.05)'}
                onMouseOut={e => e.currentTarget.style.background = 'none'}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{item.label}</span>
                  {item.toggle && <div style={{ width: 44, height: 24, background: item.value ? '#6C63FF' : '#2D2D4E', borderRadius: 99, position: 'relative', transition: 'all 0.2s' }}><div style={{ position: 'absolute', width: 18, height: 18, background: '#fff', borderRadius: '50%', top: 3, left: item.value ? 23 : 3, transition: 'all 0.2s' }} /></div>}
                  {item.value && !item.toggle && <span style={{ color: '#5A6080', fontSize: 13 }}>{item.value}</span>}
                  {item.arrow && <span style={{ color: '#5A6080' }}>›</span>}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="btn btn-danger btn-full" onClick={() => { logout(); navigate('/welcome'); }}>
          🚪 Sign Out
        </button>
      </div>
      <BottomNav active="settings" />
    </div>
  );
}
