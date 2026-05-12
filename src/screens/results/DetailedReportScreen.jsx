import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DetailedReportScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment, getPatient } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id') || '';
  const assessments = useApp().getAssessments(id);
  const a = getAssessment(aId) || assessments[0];
  const patient = getPatient(id);

  if (!a || !patient) return (
    <div className="screen-centered"><div style={{color:'#9BA3C7'}}>No report available.</div></div>
  );

  const riskColor = { Low: '#34D399', Medium: '#FBBF24', High: '#F87171' }[a.riskLevel] || '#9BA3C7';
  const qLabels = ['Fear of Dentist', 'Reaction to Tools', 'Past Experience'];

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}`)}>← Profile</button>
        <span className="topbar-title">Detailed Report</span>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/patients/${id}/notes`)}>Notes</button>
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        {/* Header */}
        <div className="card" style={{ marginBottom: 16, padding: '20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 22 }}>{patient.name[0]}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{patient.name}</div>
              <div style={{ color: '#9BA3C7', fontSize: 13 }}>{patient.age} yrs · {patient.gender}</div>
              <div style={{ color: '#5A6080', fontSize: 12 }}>Report Date: {a.date}</div>
            </div>
            <span className="badge" style={{ marginLeft: 'auto', background: `${riskColor}20`, color: riskColor }}>{a.riskLevel} Risk</span>
          </div>
        </div>

        {/* Summary metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Anxiety Score', value: `${a.anxietyScore}%`, color: '#6C63FF', icon: '🧠' },
            { label: 'Emotion State', value: a.emotion, color: '#43E8D8', icon: '😊' },
            { label: 'Cooperation', value: a.cooperationLevel, color: riskColor, icon: '🤝' },
            { label: 'Risk Level', value: a.riskLevel, color: riskColor, icon: '⚠️' },
          ].map(m => (
            <div key={m.label} className="card" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: m.color }}>{m.value}</div>
              <div style={{ color: '#5A6080', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Q breakdown */}
        {a.answers?.length > 0 && (
          <>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Question Breakdown</div>
            <div className="card" style={{ marginBottom: 16, padding: '16px 16px' }}>
              {a.answers.map((ans, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: '#9BA3C7', fontSize: 13 }}>{qLabels[i]}</span>
                    <span style={{ fontWeight: 700, color: ans <= 2 ? '#34D399' : ans <= 3 ? '#FBBF24' : '#F87171', fontSize: 13 }}>Level {ans}/5</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ height: 6 }}>
                    <div className="progress-bar-fill" style={{ width: `${(ans / 5) * 100}%`, background: ans <= 2 ? '#34D399' : ans <= 3 ? '#FBBF24' : '#F87171' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Recommendation */}
        <div className="card" style={{ marginBottom: 16, padding: '16px 18px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)' }}>
          <div style={{ fontWeight: 700, color: '#A89BFF', marginBottom: 8 }}>💡 AI Recommendation</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>{a.recommendation}</p>
        </div>

        {/* Dentist notes */}
        {a.notes && (
          <div className="card" style={{ marginBottom: 16, padding: '16px 18px' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>📝 Dentist Notes</div>
            <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>{a.notes}</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full" onClick={() => { sessionStorage.setItem('latest_assessment_id', a.id); navigate(`/history/${a.id}/export`); }}>📤 Export Report</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/graph`)}>📊 View Charts</button>
        </div>
      </div>
    </div>
  );
}
