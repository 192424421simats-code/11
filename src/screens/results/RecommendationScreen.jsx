import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const STRATEGIES = {
  Low: [
    { icon: '👏', title: 'Positive Reinforcement', desc: 'Praise the child frequently. Use sticker charts or small rewards after the visit.' },
    { icon: '💬', title: 'Tell-Show-Do', desc: 'Explain each step before doing it. Show instruments and let the child touch them.' },
    { icon: '🎵', title: 'Distraction', desc: 'Allow the child to listen to music or watch a short video during the procedure.' },
  ],
  Medium: [
    { icon: '🗣️', title: 'Voice Control', desc: 'Use calm, controlled voice. Sudden firm voice changes can help redirect behavior.' },
    { icon: '🌬️', title: 'Breathing Exercises', desc: 'Teach the child simple breathing techniques to reduce in-chair anxiety.' },
    { icon: '🧸', title: 'Comfort Object', desc: 'Allow the child to bring a comfort toy or blanket to the appointment.' },
    { icon: '🎮', title: 'Active Distraction', desc: 'Use tablet games or storytelling to engage the child during treatment.' },
  ],
  High: [
    { icon: '💊', title: 'Sedation Consultation', desc: 'Consult with an anesthesiologist about nitrous oxide or oral sedation options.' },
    { icon: '🧠', title: 'Cognitive Behavioral Therapy', desc: 'Refer to a child psychologist for dental anxiety CBT before the next visit.' },
    { icon: '👨‍👩‍👦', title: 'Parent Coaching', desc: 'Coach parents on how to talk about dentistry positively at home.' },
    { icon: '📅', title: 'Staged Treatment', desc: 'Break treatment into multiple shorter visits to gradually desensitize the child.' },
    { icon: '🏥', title: 'Specialist Referral', desc: 'Consider referral to a pediatric dentistry specialist.' },
  ],
};

export default function RecommendationScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment, getAssessments } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id') || '';
  const a = getAssessment(aId) || getAssessments(id)[0];

  if (!a) return null;

  const strategies = STRATEGIES[a.riskLevel] || STRATEGIES.Medium;
  const riskColor = { Low: '#34D399', Medium: '#FBBF24', High: '#F87171' }[a.riskLevel];

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}/result`)}>← Result</button>
        <span className="topbar-title">Recommendations</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ marginBottom: 20, padding: '16px 18px', background: `${riskColor}10`, border: `1px solid ${riskColor}30` }}>
          <div style={{ fontSize: 13, color: riskColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>AI Recommendation</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>{a.recommendation}</p>
        </div>

        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Behavior Strategies for {a.riskLevel} Risk
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {strategies.map((s, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: 14, padding: '16px 16px' }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.title}</div>
                <p style={{ color: '#9BA3C7', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full" onClick={() => navigate(`/patients/${id}/notes`)}>📝 Add Dentist Notes</button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/report`)}>📋 Back to Report</button>
        </div>
      </div>
    </div>
  );
}
