import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function AddPatientScreen() {
  const navigate = useNavigate();
  const { addPatient, showToast } = useApp();
  const [form, setForm] = useState({ name: '', age: '', gender: 'Male' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Patient name is required'); return; }
    if (!form.age || form.age < 1 || form.age > 18) { setError('Age must be between 1 and 18'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const p = addPatient(form);
    setLoading(false);
    showToast(`${form.name} added successfully! 🎉`);
    navigate(`/patients/${p.id}`);
  }

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/patients')}>← Patients</button>
        <span className="topbar-title">Add Patient</span>
        <div />
      </div>

      <div className="page-content" style={{ overflowY: 'auto', flex: 1 }}>
        <div className="fade-in">
          <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>👶</div>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>New Patient</h2>
            <p style={{ color: '#9BA3C7', fontSize: 14 }}>Enter the child's details below</p>
          </div>

          <form onSubmit={submit}>
            <div className="input-group">
              <label className="input-label">Child's Full Name *</label>
              <input className="input" name="name" placeholder="e.g. Liam Carter"
                value={form.name} onChange={handle} autoFocus />
            </div>
            <div className="input-group">
              <label className="input-label">Age (years) *</label>
              <input className="input" type="number" name="age" placeholder="e.g. 7"
                min="1" max="18" value={form.age} onChange={handle} />
            </div>
            <div className="input-group">
              <label className="input-label">Gender</label>
              <select className="input" name="gender" value={form.gender} onChange={handle}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {error && <div style={{ color: '#F87171', fontSize: 13, marginBottom: 14, padding: '10px 14px', background: 'rgba(248,113,113,0.1)', borderRadius: 8 }}>⚠️ {error}</div>}

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/patients')}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>
                {loading ? 'Saving...' : '✓ Save Patient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
