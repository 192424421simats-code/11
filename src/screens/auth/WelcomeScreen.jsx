import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-centered" style={{ padding: '40px 28px', justifyContent: 'space-between', minHeight: '100vh' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div />

      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 70 }}>🦷</div>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 10 }}>
            <span style={{ color: '#6C63FF' }}>AI</span> Pediatric<br/>Cooperation Predictor
          </h1>
          <p style={{ color: '#9BA3C7', fontSize: 15, lineHeight: 1.7 }}>
            Predict child cooperation during dental visits using advanced AI-powered anxiety assessment and real-time facial emotion analysis.
          </p>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {['🧠 AI Analysis','📸 Emotion Detection','📊 Risk Prediction','📋 Smart Reports'].map(f => (
            <span key={f} className="badge badge-primary">{f}</span>
          ))}
        </div>
      </div>

      <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate('/login')}>
          Sign In to Your Account
        </button>
        <button className="btn btn-secondary btn-full btn-lg" onClick={() => navigate('/register')}>
          Create New Account
        </button>
        <div style={{ textAlign: 'center', color: '#5A6080', fontSize: 12, marginTop: 8 }}>
          🔒 Your data is encrypted and secure
        </div>
      </div>
    </div>
  );
}
