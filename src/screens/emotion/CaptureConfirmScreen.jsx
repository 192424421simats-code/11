import { useNavigate, useParams } from 'react-router-dom';

export default function CaptureConfirmScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emotion = JSON.parse(sessionStorage.getItem('detected_emotion') || '{"label":"Calm","emoji":"😌","color":"#34D399"}');

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 80 }}>{emotion.emoji}</div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Capture Confirmed</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>
            The facial emotion has been successfully detected as <strong style={{ color: emotion.color }}>{emotion.label}</strong>. Would you like to proceed with AI analysis or retake?
          </p>
        </div>

        <div className="card" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 36 }}>✅</div>
          <div>
            <div style={{ fontWeight: 700 }}>Emotion Captured</div>
            <div style={{ color: '#9BA3C7', fontSize: 13 }}>Ready for AI processing</div>
          </div>
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/processing`)}>
          🤖 Start AI Analysis →
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/emotion/live`)}>
          ↺ Retake Photo
        </button>
      </div>
    </div>
  );
}
