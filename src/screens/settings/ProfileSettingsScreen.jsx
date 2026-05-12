import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ProfileSettingsScreen() {
  const navigate = useNavigate();
  const { currentUser, storage, showToast } = useApp();
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', specialty: currentUser?.specialty || '' });
  const [saving, setSaving] = useState(false);

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    setSaving(false);
    showToast('Profile updated! ✓');
    navigate('/settings');
  }

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/settings')}>← Settings</button>
        <span className="topbar-title">Profile Settings</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ overflowY: 'auto', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0 28px' }}>
          <div className="avatar" style={{ width: 80, height: 80, fontSize: 34, marginBottom: 10 }}>{currentUser?.name?.[0]}</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{currentUser?.name}</div>
          <span className="badge badge-primary" style={{ marginTop: 6 }}>{currentUser?.role}</span>
        </div>

        <form onSubmit={save}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input className="input" name="name" value={form.name} onChange={handle} />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input className="input" type="email" name="email" value={form.email} onChange={handle} />
          </div>
          {currentUser?.role === 'dentist' && (
            <div className="input-group">
              <label className="input-label">Specialty</label>
              <input className="input" name="specialty" placeholder="e.g. Pediatric Dentistry" value={form.specialty} onChange={handle} />
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Role</label>
            <input className="input" value={currentUser?.role} disabled style={{ opacity: 0.5 }} />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/settings')}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={saving}>
              {saving ? 'Saving...' : '✓ Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
