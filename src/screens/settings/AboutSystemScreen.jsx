import { useNavigate } from 'react-router-dom';

export default function AboutSystemScreen() {
  const navigate = useNavigate();

  const team = [
    { name: 'Dr. Aisha Patel', role: 'Lead Researcher – Pediatric Psychology', icon: '👩‍🔬' },
    { name: 'Dr. James Okon', role: 'AI/ML Engineer', icon: '👨‍💻' },
    { name: 'Dr. Sarah Chen', role: 'Pediatric Dental Specialist', icon: '🦷' },
    { name: 'Arjun Mehta', role: 'Frontend Developer', icon: '🖥️' },
  ];

  const tech = [
    { label: 'AI Framework', value: 'Convolutional Neural Network (CNN)', icon: '🧠' },
    { label: 'Facial Analysis', value: 'Real-time WebRTC + Emotion Classifier', icon: '📸' },
    { label: 'Anxiety Model', value: 'Modified CFSS-DS Scale', icon: '📊' },
    { label: 'Frontend', value: 'React + Vite + Recharts', icon: '⚛️' },
    { label: 'Storage', value: 'Encrypted LocalStorage', icon: '🔐' },
    { label: 'Platform', value: 'Web + Mobile (PWA)', icon: '📱' },
  ];

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/settings')}>← Settings</button>
        <span className="topbar-title">About System</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        {/* Hero */}
        <div className="card" style={{ textAlign: 'center', padding: '32px 24px', marginBottom: 20, background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(67,232,216,0.1))' }}>
          <div style={{ fontSize: 56, marginBottom: 10 }} className="float">🦷</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>
            <span style={{ color: '#6C63FF' }}>Pedi</span>Predict <span style={{ color: '#43E8D8', fontSize: 18 }}>AI</span>
          </h1>
          <div style={{ color: '#9BA3C7', fontSize: 14, marginBottom: 12 }}>AI Pediatric Cooperation Predictor</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <span className="badge badge-primary">v1.0.0</span>
            <span className="badge badge-success">Stable</span>
            <span className="badge" style={{ background: 'rgba(67,232,216,0.15)', color: '#43E8D8' }}>AI Powered</span>
          </div>
        </div>

        {/* Mission */}
        <div className="card" style={{ marginBottom: 16, padding: '16px 18px' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🎯 Mission</div>
          <p style={{ color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>
            PediPredict AI aims to revolutionize pediatric dental care by using artificial intelligence to predict child cooperation levels before treatment — reducing dental anxiety, improving outcomes, and enabling personalized care strategies.
          </p>
        </div>

        {/* Technology stack */}
        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Technology Stack</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {tech.map(t => (
            <div key={t.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{t.label}</div>
                <div style={{ color: '#9BA3C7', fontSize: 12 }}>{t.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Research team */}
        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Research Team</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {team.map(m => (
            <div key={m.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
              <span style={{ fontSize: 30 }}>{m.icon}</span>
              <div>
                <div style={{ fontWeight: 700 }}>{m.name}</div>
                <div style={{ color: '#9BA3C7', fontSize: 13 }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#5A6080', fontSize: 12, lineHeight: 2 }}>
          <div>© 2026 PediPredict AI Research Group</div>
          <div>All rights reserved · Built with ❤️ for children's wellbeing</div>
          <div style={{ marginTop: 4 }}>This system is intended for clinical support only.</div>
        </div>
      </div>
    </div>
  );
}
