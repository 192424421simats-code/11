import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SESS_KEY = 'assessment_answers';

function calcAnxiety(answers) {
  const total = answers.reduce((s, v) => s + v, 0);
  return Math.round((total / (5 * 5)) * 100);
}

function getAnxietyLabel(score) {
  if (score <= 30) return { label: 'Low Anxiety', color: '#34D399', icon: '😊', desc: 'The child appears calm and relaxed.' };
  if (score <= 60) return { label: 'Moderate Anxiety', color: '#FBBF24', icon: '😐', desc: 'Some anxiety present — monitor closely.' };
  return { label: 'High Anxiety', color: '#F87171', icon: '😰', desc: 'Significant anxiety — intervention recommended.' };
}

export default function AnxietySummaryScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(sessionStorage.getItem(SESS_KEY) || '[]');
    if (saved.length < 5) { navigate(`/patients/${id}/assessment/q/1`); return; }
    setAnswers(saved);
  }, []);

  if (!answers.length) return null;

  const score = calcAnxiety(answers);
  const info = getAnxietyLabel(score);

  const qLabels = ['Fear of Dentist', 'Reaction to Tools', 'Past Experience', 'Pain Expectation', 'General Anxiety'];

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <div />
        <span className="topbar-title">Anxiety Summary</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        {/* Score ring */}
        <div className="card" style={{ textAlign: 'center', padding: '32px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>{info.icon}</div>
          <div style={{
            width: 120, height: 120, borderRadius: '50%', margin: '0 auto 16px',
            background: `conic-gradient(${info.color} ${score * 3.6}deg, #1E2035 0)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#161828', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: info.color }}>{score}%</div>
              <div style={{ fontSize: 10, color: '#5A6080', textTransform: 'uppercase' }}>Anxiety</div>
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: info.color, marginBottom: 6 }}>{info.label}</div>
          <p style={{ color: '#9BA3C7', fontSize: 14 }}>{info.desc}</p>
        </div>

        {/* Per-question breakdown */}
        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Question Breakdown</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {answers.map((a, i) => (
            <div key={i} className="card" style={{ padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#9BA3C7', fontSize: 13, fontWeight: 600 }}>{qLabels[i]}</span>
                <span style={{ fontWeight: 800, color: a <= 2 ? '#34D399' : a <= 3 ? '#FBBF24' : '#F87171' }}>Level {a}/5</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${(a / 5) * 100}%`, background: a <= 2 ? '#34D399' : a <= 3 ? '#FBBF24' : '#F87171' }} />
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/emotion/permission`)}>
          📸 Proceed to Emotion Capture →
        </button>
        <button className="btn btn-secondary btn-full" style={{ marginTop: 10 }} onClick={() => navigate(`/patients/${id}/assessment/q/1`)}>
          ↺ Redo Assessment
        </button>
      </div>
    </div>
  );
}
