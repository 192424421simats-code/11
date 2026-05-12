import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function MismatchAnalysisScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id');
  const a = getAssessment(aId);

  if (!a) return null;

  const diff = Math.abs(a.anxietyScore - (a.emotion === 'Calm' ? 15 : a.emotion === 'Happy' ? 10 : a.emotion === 'Neutral' ? 30 : a.emotion === 'Anxious' ? 65 : 85));
  const mismatch = diff > 25;

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <div /><span className="topbar-title">Mismatch Analysis</span><div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ textAlign: 'center', padding: '28px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>{mismatch ? '⚠️' : '✅'}</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
            {mismatch ? 'Data Mismatch Detected' : 'Data Consistent'}
          </h2>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.6 }}>
            {mismatch
              ? 'The child\'s self-reported anxiety and facial emotion show a significant difference. This may indicate masking behavior.'
              : 'The anxiety questionnaire and facial emotion analysis are consistent. Results are reliable.'}
          </p>
        </div>

        {/* Side by side comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>📋</div>
            <div style={{ color: '#9BA3C7', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 6 }}>Questionnaire</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#6C63FF', margin: '6px 0' }}>{a.anxietyScore}%</div>
            <div style={{ color: '#9BA3C7', fontSize: 12 }}>Anxiety Score</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>📸</div>
            <div style={{ color: '#9BA3C7', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 6 }}>Facial Emotion</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#43E8D8', margin: '8px 0' }}>{a.emotion}</div>
            <div style={{ color: '#9BA3C7', fontSize: 12 }}>Detected State</div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20, padding: '16px 18px' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔬 AI Interpretation</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>
            {mismatch
              ? `A ${diff}% gap between scores suggests the child may be hiding true anxiety. The AI model will weigh both signals and apply a mismatch penalty in the final prediction.`
              : `Both data sources align closely (${diff}% gap). The AI model will produce a high-confidence prediction.`}
          </p>
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/ai-prediction`)}>
          🤖 View AI Prediction →
        </button>
      </div>
    </div>
  );
}
