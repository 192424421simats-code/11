import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/BottomNav';

export default function PatientListScreen() {
  const navigate = useNavigate();
  const { getPatients } = useApp();
  const [search, setSearch] = useState('');
  const patients = getPatients().filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="topbar-title">Patients</span>
        <button className="btn btn-primary btn-sm" onClick={() => navigate('/patients/add')}>+ Add</button>
      </div>

      <div className="page-content content-padded" style={{ overflowY: 'auto', flex: 1 }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 18 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input className="input" placeholder="Search patients..." value={search}
            onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
        </div>

        <div style={{ color: '#5A6080', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
          {patients.length} patient{patients.length !== 1 ? 's' : ''}
        </div>

        {patients.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40, color: '#5A6080' }}>
            <div style={{ fontSize: 50, marginBottom: 12 }}>👶</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              {search ? 'No patients match your search' : 'No patients yet'}
            </div>
            {!search && <button className="btn btn-primary" onClick={() => navigate('/patients/add')}>+ Add First Patient</button>}
          </div>
        ) : (
          patients.map(p => (
            <div key={p.id} className="list-item" onClick={() => navigate(`/patients/${p.id}`)}>
              <div className="avatar">{p.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{p.name}</div>
                <div style={{ color: '#9BA3C7', fontSize: 13 }}>{p.age} yrs · {p.gender}</div>
                <div style={{ color: '#5A6080', fontSize: 12 }}>Added {p.createdAt}</div>
              </div>
              <span style={{ color: '#6C63FF', fontSize: 18 }}>›</span>
            </div>
          ))
        )}
      </div>

      <BottomNav active="patients" />
    </div>
  );
}
