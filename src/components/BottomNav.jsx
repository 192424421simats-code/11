import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/dashboard' },
  { id: 'patients', label: 'Patients', icon: '👧', path: '/patients' },
  { id: 'history', label: 'History', icon: '📋', path: '/history' },
  { id: 'analytics', label: 'Analytics', icon: '📊', path: '/analytics' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
];

export default function BottomNav({ active }) {
  const navigate = useNavigate();
  return (
    <div className="bottom-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`bottom-nav-item${active === tab.id ? ' active' : ''}`}
          onClick={() => navigate(tab.path)}
        >
          <span style={{ fontSize: 22 }}>{tab.icon}</span>
          <span>{tab.label}</span>
          {active === tab.id && (
            <div style={{
              position: 'absolute',
              bottom: -2,
              width: 20,
              height: 3,
              background: '#6C63FF',
              borderRadius: 99,
            }} />
          )}
        </button>
      ))}
    </div>
  );
}
