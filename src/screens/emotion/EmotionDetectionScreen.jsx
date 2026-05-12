import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EMOTIONS = [
  { label: 'Calm', emoji: '😌', color: '#34D399', anxiety: 15, desc: 'The child appears relaxed and comfortable.' },
  { label: 'Neutral', emoji: '😐', color: '#9BA3C7', anxiety: 30, desc: 'No strong emotional signal detected.' },
  { label: 'Anxious', emoji: '😟', color: '#FBBF24', anxiety: 65, desc: 'Signs of anxiety visible in facial expression.' },
  { label: 'Fearful', emoji: '😨', color: '#F87171', anxiety: 85, desc: 'High fear level detected from expression.' },
  { label: 'Happy', emoji: '😊', color: '#43E8D8', anxiety: 10, desc: 'Child appears happy and at ease.' },
];

export default function EmotionDetectionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [detected, setDetected] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate AI emotion detection
    let p = 0;
    const iv = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        const em = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
        setDetected(em);
        setScanning(false);
        sessionStorage.setItem('detected_emotion', JSON.stringify(em));
      }
    }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Emotion Detection</h1>

        {scanning ? (
          <>
            <div style={{ fontSize: 64 }} className="pulse">🤖</div>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#9BA3C7', fontSize: 13 }}>Analyzing facial expression...</span>
                <span style={{ color: '#6C63FF', fontWeight: 700 }}>{progress}%</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {['Detecting landmarks...', 'Reading microexpressions...', 'AI classifying...', 'Computing score...'].map((t, i) => (
                <span key={t} className="badge badge-primary" style={{ opacity: progress > i * 25 ? 1 : 0.3, transition: 'opacity 0.5s' }}>{t}</span>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 80 }} className="float">{detected.emoji}</div>
            <div className="card" style={{ width: '100%', textAlign: 'center', padding: 28 }}>
              <div style={{ fontSize: 13, color: '#9BA3C7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Detected Emotion</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: detected.color, marginBottom: 6 }}>{detected.label}</div>
              <p style={{ color: '#9BA3C7', fontSize: 14 }}>{detected.desc}</p>
              <div style={{ marginTop: 16, background: '#1E2035', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ color: '#5A6080', fontSize: 12, marginBottom: 4 }}>Emotion Anxiety Index</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: detected.color }}>{detected.anxiety}%</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {EMOTIONS.map(e => (
                <span key={e.label} className="emotion-chip" style={{
                  borderColor: e.label === detected.label ? e.color : 'rgba(108,99,255,0.2)',
                  color: e.label === detected.label ? e.color : '#5A6080',
                  background: e.label === detected.label ? `${e.color}15` : 'transparent',
                  fontSize: 13,
                }}>{e.emoji} {e.label}</span>
              ))}
            </div>
            <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/emotion/confirm`)}>
              Continue →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
