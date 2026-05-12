import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function PatientProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPatient, getAssessments, currentUser } = useApp();
  const patient = getPatient(id);
  const assessments = getAssessments(id);

  if (!patient) return (
    <div className="screen-centered">
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 50 }}>❓</div>
        <div style={{ color: '#9BA3C7', marginTop: 12 }}>Patient not found</div>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/patients')}>Back to Patients</button>
      </div>
    </div>
  );

  const latest = assessments[0];

  const riskColor = (r) => ({ Low: '#34D399', Medium: '#FBBF24', High: '#F87171' }[r] || '#9BA3C7');

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/patients')}>← Patients</button>
        <span className="topbar-title">Profile</span>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/patients/${id}/edit`)}>Edit</button>
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        {/* Patient header */}
        <div className="card" style={{ textAlign: 'center', padding: 28, marginBottom: 16 }}>
          <div className="avatar" style={{ width: 70, height: 70, fontSize: 30, margin: '0 auto 12px' }}>{patient.name[0]}</div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>{patient.name}</h1>
          <div style={{ color: '#9BA3C7', fontSize: 14, marginTop: 4 }}>{patient.age} years old · {patient.gender}</div>
          <div style={{ color: '#5A6080', fontSize: 12, marginTop: 4 }}>Added {patient.createdAt}</div>
          {latest && (
            <div style={{ marginTop: 12 }}>
              <span className="badge" style={{ background: `${riskColor(latest.riskLevel)}20`, color: riskColor(latest.riskLevel), borderRadius: 99, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}>
                {latest.riskLevel} Risk
              </span>
            </div>
          )}
        </div>

        {/* Latest assessment summary */}
        {latest && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Latest Assessment</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Anxiety Score', value: `${latest.anxietyScore}%`, icon: '🧠' },
                { label: 'Emotion', value: latest.emotion, icon: '😊' },
                { label: 'Cooperation', value: latest.cooperationLevel, icon: '🤝' },
                { label: 'Date', value: latest.date, icon: '📅' },
              ].map(s => (
                <div key={s.label} style={{ background: '#1E2035', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{s.value}</div>
                  <div style={{ color: '#5A6080', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate(`/patients/${id}/assessment/start`)}>
            🧠 Start New Assessment
          </button>
          {latest && (
            <>
              <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/report`)}>
                📋 View Latest Report
              </button>
              <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/graph`)}>
                📊 View Charts
              </button>
            </>
          )}
        </div>

        {/* Assessment history */}
        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Assessment History ({assessments.length})
        </div>
        {assessments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 24, color: '#5A6080', fontSize: 14 }}>
            No assessments yet. Start one above!
          </div>
        ) : (
          assessments.map(a => (
            <div key={a.id} className="list-item" onClick={() => navigate(`/history/${a.id}`)}>
              <div style={{ fontSize: 22 }}>{a.riskLevel === 'Low' ? '✅' : a.riskLevel === 'High' ? '⚠️' : '🟡'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{a.cooperationLevel} Cooperation</div>
                <div style={{ color: '#9BA3C7', fontSize: 13 }}>{a.date} · Anxiety: {a.anxietyScore}%</div>
              </div>
              <span style={{ color: riskColor(a.riskLevel), fontWeight: 700, fontSize: 13 }}>{a.riskLevel}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
