import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function ReportDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment, getPatient } = useApp();
  const a = getAssessment(id);
  const patient = getPatient(a?.patientId);

  if (!a) return (
    <div className="screen-centered"><div style={{color:'#9BA3C7'}}>Report not found</div></div>
  );

  const riskColor = { Low: '#34D399', Medium: '#FBBF24', High: '#F87171' }[a.riskLevel];
  const qLabels = ['Fear of Dentist', 'Reaction to Tools', 'Past Experience'];

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/history')}>← History</button>
        <span className="topbar-title">Report Details</span>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/history/${id}/export`)}>Export</button>
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ marginBottom: 16, padding: '20px' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 22 }}>{patient?.name?.[0] || '?'}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{patient?.name || 'Unknown'}</div>
              <div style={{ color: '#9BA3C7', fontSize: 13 }}>{patient?.age} yrs · {patient?.gender}</div>
              <div style={{ color: '#5A6080', fontSize: 12 }}>Date: {a.date}</div>
            </div>
            <span className="badge" style={{ marginLeft: 'auto', background: `${riskColor}20`, color: riskColor }}>{a.riskLevel} Risk</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Anxiety', value: `${a.anxietyScore}%`, color: '#6C63FF' },
            { label: 'Emotion', value: a.emotion, color: '#43E8D8' },
            { label: 'Cooperation', value: a.cooperationLevel, color: riskColor },
            { label: 'Risk', value: a.riskLevel, color: riskColor },
          ].map(m => (
            <div key={m.label} className="card" style={{ textAlign: 'center', padding: '14px' }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: m.color }}>{m.value}</div>
              <div style={{ color: '#5A6080', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {a.answers?.length > 0 && (
          <div className="card" style={{ marginBottom: 16, padding: '16px' }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase' }}>Questions</div>
            {a.answers.map((ans, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#9BA3C7', fontSize: 12 }}>{qLabels[i]}</span>
                  <span style={{ fontWeight: 700, color: ans <= 2 ? '#34D399' : ans <= 3 ? '#FBBF24' : '#F87171', fontSize: 12 }}>{ans}/5</span>
                </div>
                <div className="progress-bar-wrap" style={{ height: 5 }}>
                  <div className="progress-bar-fill" style={{ width: `${(ans/5)*100}%`, background: ans <= 2 ? '#34D399' : ans <= 3 ? '#FBBF24' : '#F87171' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card" style={{ marginBottom: 16, padding: '14px 16px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}>
          <div style={{ fontWeight: 700, color: '#A89BFF', marginBottom: 6 }}>💡 Recommendation</div>
          <p style={{ color: '#9BA3C7', fontSize: 13, lineHeight: 1.7 }}>{a.recommendation}</p>
        </div>

        {a.notes && (
          <div className="card" style={{ marginBottom: 16, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>📝 Dentist Notes</div>
            <p style={{ color: '#9BA3C7', fontSize: 13, lineHeight: 1.7 }}>{a.notes}</p>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={() => navigate(`/history/${id}/export`)}>📤 Export PDF</button>
      </div>
    </div>
  );
}
