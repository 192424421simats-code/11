import { useNavigate, useParams } from 'react-router-dom';

export default function CameraPermissionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  function allow() { navigate(`/patients/${id}/emotion/capture`); }

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 80 }} className="float">📸</div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Camera Access</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>
            We need access to the camera to capture the child's facial expression and detect their emotional state in real time.
          </p>
        </div>

        <div className="card" style={{ width: '100%', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)' }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#A89BFF' }}>🔒 Privacy Notice</div>
          <p style={{ color: '#9BA3C7', fontSize: 13, lineHeight: 1.6 }}>
            Images are processed locally and are NOT stored or transmitted to any server. Your child's privacy is our top priority.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          {['Captures a single photo', 'Analyzes emotion on-device', 'No images saved permanently'].map(f => (
            <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#9BA3C7', fontSize: 14 }}>
              <span style={{ color: '#34D399' }}>✓</span> {f}
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={allow}>
          📷 Allow Camera Access
        </button>
        <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/assessment/summary`)}>
          ← Back to Summary
        </button>
      </div>
    </div>
  );
}
