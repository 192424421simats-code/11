import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function BehaviourReportScreen() {
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
        <div /><span className="topbar-title">Behaviour Analysis</span><div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        <div className="card" style={{ marginBottom: 16, padding: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🧠</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Behavioural Profile</h2>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.6 }}>
            Based on the AI scan and mismatch analysis, here is the predicted behavioural profile for the patient.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 16, padding: '16px' }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#A89BFF' }}>Observation</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.6 }}>
            {mismatch 
              ? 'The patient is exhibiting masking behavior. While their self-reported anxiety is different from their facial expression, we anticipate hidden stress during the procedure.' 
              : 'The patient\'s expressed anxiety aligns with their facial cues. Their behavior is straightforward and predictable.'}
          </p>
        </div>

        <div className="card" style={{ marginBottom: 24, padding: '16px' }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#A89BFF' }}>Actionable Strategy</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.6 }}>
            {mismatch
              ? 'Use frequent check-ins and the tell-show-do method to build trust and uncover hidden anxieties. Look for subtle non-verbal cues of discomfort.'
              : 'Maintain steady communication. The current anxiety level provides a reliable indicator for proceeding with the planned treatment.'}
          </p>
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/result`)}>
          View Prediction Result →
        </button>
      </div>
    </div>
  );
}
