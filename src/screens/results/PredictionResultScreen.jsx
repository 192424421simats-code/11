import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const COOPERATION_CONFIG = {
  High: { color: '#34D399', icon: '🌟', bar: 85, desc: 'The child is expected to cooperate fully during the dental procedure.' },
  Moderate: { color: '#FBBF24', icon: '🤝', bar: 55, desc: 'Some resistance possible. Gentle behavior management recommended.' },
  Low: { color: '#F87171', icon: '⚠️', bar: 25, desc: 'Low cooperation expected. Consider sedation or specialized techniques.' },
};

export default function PredictionResultScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment, getPatient } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id');
  const a = getAssessment(aId);
  const patient = getPatient(id);

  if (!a) return null;
  const cfg = COOPERATION_CONFIG[a.cooperationLevel] || COOPERATION_CONFIG.Moderate;

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <div /><span className="topbar-title">Prediction Result</span><div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        {/* Big result card */}
        <div className="card" style={{ textAlign: 'center', padding: '36px 24px', marginBottom: 16, background: `linear-gradient(145deg, ${cfg.color}10, var(--bg-card))` }}>
          <div style={{ fontSize: 72, marginBottom: 10 }} className="float">{cfg.icon}</div>
          <div style={{ fontSize: 13, color: '#9BA3C7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Cooperation Prediction</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: cfg.color, marginBottom: 6 }}>{a.cooperationLevel}</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.6 }}>{cfg.desc}</p>

          {/* Cooperation bar */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: '#5A6080', fontSize: 12 }}>Low</span>
              <span style={{ color: cfg.color, fontSize: 12, fontWeight: 700 }}>Cooperation Level: {cfg.bar}%</span>
              <span style={{ color: '#5A6080', fontSize: 12 }}>High</span>
            </div>
            <div className="progress-bar-wrap" style={{ height: 12 }}>
              <div className="progress-bar-fill" style={{ width: `${cfg.bar}%`, background: cfg.color }} />
            </div>
          </div>
        </div>

        {/* Patient & date */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div className="avatar">{patient?.name?.[0] || 'P'}</div>
          <div>
            <div style={{ fontWeight: 700 }}>{patient?.name}</div>
            <div style={{ color: '#9BA3C7', fontSize: 13 }}>Assessment Date: {a.date}</div>
          </div>
          <span className="badge" style={{ marginLeft: 'auto', background: `${cfg.color}20`, color: cfg.color }}>{a.riskLevel} Risk</span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate(`/patients/${id}/risk`)}>⚠️ View Risk Level</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/report`)}>📋 Full Report</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/recommendation`)}>💡 Recommendations</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/graph`)}>📊 Charts</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}`)}>← Back to Patient</button>
        </div>
      </div>
    </div>
  );
}
