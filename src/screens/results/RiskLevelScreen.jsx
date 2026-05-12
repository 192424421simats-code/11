import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const RISK_INFO = {
  Low: {
    color: '#34D399', icon: '✅', gradient: 'linear-gradient(135deg,rgba(52,211,153,0.2),rgba(52,211,153,0.05))',
    title: 'Low Risk',
    desc: 'The child shows minimal anxiety and is expected to be cooperative throughout the dental visit. Standard protocols apply.',
    steps: ['Proceed with planned treatment', 'Maintain positive reinforcement', 'Use tell-show-do technique', 'Praise and reward cooperation'],
  },
  Medium: {
    color: '#FBBF24', icon: '🟡', gradient: 'linear-gradient(135deg,rgba(251,191,36,0.2),rgba(251,191,36,0.05))',
    title: 'Medium Risk',
    desc: 'Moderate anxiety detected. Some behavior management will likely be needed. Proceed carefully with close monitoring.',
    steps: ['Use distraction techniques (music/video)', 'Allow child to hold comfort object', 'Take frequent breaks if needed', 'Consider mild anxiolytic if appropriate'],
  },
  High: {
    color: '#F87171', icon: '🔴', gradient: 'linear-gradient(135deg,rgba(248,113,113,0.2),rgba(248,113,113,0.05))',
    title: 'High Risk',
    desc: 'Significant anxiety and low cooperation predicted. Specialized behavior management or sedation consultation strongly recommended.',
    steps: ['Consult with pediatric behavior specialist', 'Evaluate sedation options', 'Consider postponing non-urgent treatment', 'Parental coaching session recommended'],
  },
};

export default function RiskLevelScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id');
  const a = getAssessment(aId);

  if (!a) return null;
  const info = RISK_INFO[a.riskLevel] || RISK_INFO.Medium;

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}/result`)}>← Result</button>
        <span className="topbar-title">Risk Level</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ textAlign: 'center', padding: '36px 24px', marginBottom: 20, background: info.gradient }}>
          <div style={{ fontSize: 72, marginBottom: 10 }}>{info.icon}</div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: info.color, marginBottom: 8 }}>{info.title}</h1>
          <p style={{ color: '#9BA3C7', fontSize: 15, lineHeight: 1.7 }}>{info.desc}</p>
        </div>

        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recommended Actions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {info.steps.map((s, i) => (
            <div key={i} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${info.color}20`, border: `1px solid ${info.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: info.color, fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.5, paddingTop: 4 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate(`/patients/${id}/report`)}>📋 Full Detailed Report</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/result`)}>← Back</button>
        </div>
      </div>
    </div>
  );
}
