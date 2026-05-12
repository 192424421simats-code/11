import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function EditPatientScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatient, updatePatient, showToast } = useApp();
  const patient = getPatient(id);
  const [form, setForm] = useState({ name: patient?.name || '', age: patient?.age || '', gender: patient?.gender || 'Male' });
  const [loading, setLoading] = useState(false);

  if (!patient) return null;

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    updatePatient(id, { ...form, age: parseInt(form.age) });
    setLoading(false);
    showToast('Patient updated! ✓');
    navigate(`/patients/${id}`);
  }

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}`)}>← Profile</button>
        <span className="topbar-title">Edit Patient</span>
        <div />
      </div>
      <div className="page-content fade-in" style={{ overflowY: 'auto' }}>
        <form onSubmit={submit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input className="input" name="name" value={form.name} onChange={handle} />
          </div>
          <div className="input-group">
            <label className="input-label">Age</label>
            <input className="input" type="number" name="age" min="1" max="18" value={form.age} onChange={handle} />
          </div>
          <div className="input-group">
            <label className="input-label">Gender</label>
            <select className="input" name="gender" value={form.gender} onChange={handle}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate(`/patients/${id}`)}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={loading}>
              {loading ? 'Saving...' : '✓ Update Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
