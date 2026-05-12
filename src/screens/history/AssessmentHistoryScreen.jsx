import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/BottomNav';

export default function AssessmentHistoryScreen() {
  const navigate = useNavigate();
  const { getAllAssessments, getPatient } = useApp();
  const [filter, setFilter] = useState('All');
  const all = getAllAssessments().sort((a, b) => b.date.localeCompare(a.date));
  const filters = ['All', 'Low', 'Medium', 'High'];
  const filtered = filter === 'All' ? all : all.filter(a => a.riskLevel === filter);

  const riskColor = { Low: '#34D399', Medium: '#FBBF24', High: '#F87171' };

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="topbar-title">History</span>
        <div />
      </div>

      <div className="page-content content-padded" style={{ overflowY: 'auto', flex: 1 }}>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px',
                background: filter === f ? '#6C63FF' : '#1E2035',
                color: filter === f ? '#fff' : '#9BA3C7',
                transition: 'all 0.2s',
              }}>{f}</button>
          ))}
        </div>

        <div style={{ color: '#5A6080', fontSize: 13, marginBottom: 10 }}>{filtered.length} records</div>

        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40, color: '#5A6080' }}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>📋</div>
            <div>No assessments found</div>
          </div>
        ) : (
          filtered.map(a => {
            const patient = getPatient(a.patientId);
            return (
              <div key={a.id} className="list-item" onClick={() => navigate(`/history/${a.id}`)}>
                <div className="avatar" style={{ background: `${riskColor[a.riskLevel]}30`, color: riskColor[a.riskLevel], fontSize: 18 }}>
                  {patient?.name?.[0] || '?'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{patient?.name || 'Unknown Patient'}</div>
                  <div style={{ color: '#9BA3C7', fontSize: 13 }}>{a.date} · {a.cooperationLevel} Cooperation</div>
                  <div style={{ color: '#5A6080', fontSize: 12 }}>Anxiety: {a.anxietyScore}% · Emotion: {a.emotion}</div>
                </div>
                <span className="badge" style={{ background: `${riskColor[a.riskLevel]}20`, color: riskColor[a.riskLevel] }}>{a.riskLevel}</span>
              </div>
            );
          })
        )}
      </div>
      <BottomNav active="history" />
    </div>
  );
}
