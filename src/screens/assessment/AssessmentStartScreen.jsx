import { useNavigate, useParams } from 'react-router-dom';

export default function AssessmentStartScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 80 }} className="float">🧠</div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Anxiety Assessment</h1>
          <p style={{ color: '#9BA3C7', fontSize: 15, lineHeight: 1.7 }}>
            This 5-question assessment measures the child's dental anxiety level using validated psychological methods.
          </p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '⏱️', text: 'Takes about 3-5 minutes' },
            { icon: '🎯', text: '5 targeted questions' },
            { icon: '📊', text: 'Generates anxiety score (0-100%)' },
            { icon: '🔒', text: 'Child-friendly, stress-free process' },
          ].map(f => (
            <div key={f.text} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
              <span style={{ fontSize: 22 }}>{f.icon}</span>
              <span style={{ fontSize: 14, color: '#9BA3C7' }}>{f.text}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/assessment/instructions`)}>
          Start Assessment →
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}`)}>
          ← Back to Profile
        </button>
      </div>
    </div>
  );
}
