import { useNavigate, useParams } from 'react-router-dom';

export default function InstructionsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>📝</div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>Instructions</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14, marginTop: 8, lineHeight: 1.7 }}>
            Please explain the following to the child before starting:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            { n: '1', text: 'We will ask you some simple questions about visiting the dentist.', icon: '💬' },
            { n: '2', text: 'There are no right or wrong answers — just tell us how you really feel!', icon: '💡' },
            { n: '3', text: 'Pick the face or number that shows how you feel.', icon: '😊' },
            { n: '4', text: 'The dentist will use your answers to help make your visit more comfortable.', icon: '🦷' },
          ].map(step => (
            <div key={step.n} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '14px 16px' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6C63FF, #43E8D8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 800, flexShrink: 0, color: '#fff',
              }}>{step.n}</div>
              <div>
                <span style={{ fontSize: 18, marginRight: 8 }}>{step.icon}</span>
                <span style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.6 }}>{step.text}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/assessment/q/1`)}>
          Begin Questions →
        </button>
        <button className="btn btn-secondary btn-full" style={{ marginTop: 10 }} onClick={() => navigate(`/patients/${id}/assessment/start`)}>
          ← Back
        </button>
      </div>
    </div>
  );
}
