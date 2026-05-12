import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QUESTIONS = [
  {
    step: 1,
    title: 'Fear of the Dentist',
    question: 'How scared are you about coming to the dentist today?',
    icon: '😰',
    options: [
      { value: 1, label: 'Not at all scared', emoji: '😊' },
      { value: 2, label: 'A little scared', emoji: '🙂' },
      { value: 3, label: 'Somewhat scared', emoji: '😐' },
      { value: 4, label: 'Very scared', emoji: '😟' },
      { value: 5, label: 'Extremely scared', emoji: '😱' },
    ],
  },
  {
    step: 2,
    title: 'Reaction to Tools',
    question: 'How do you feel when you see the dentist tools (drill, needle)?',
    icon: '🔧',
    options: [
      { value: 1, label: 'No problem at all', emoji: '😎' },
      { value: 2, label: 'A bit uncomfortable', emoji: '🙂' },
      { value: 3, label: 'Nervous', emoji: '😬' },
      { value: 4, label: 'Want to run away', emoji: '😨' },
      { value: 5, label: 'Very frightened', emoji: '😱' },
    ],
  },
  {
    step: 3,
    title: 'Past Experience',
    question: 'How was your last visit to the dentist?',
    icon: '🕰️',
    options: [
      { value: 1, label: 'Great, no problem', emoji: '🌟' },
      { value: 2, label: 'Okay', emoji: '👍' },
      { value: 3, label: 'A bit unpleasant', emoji: '😐' },
      { value: 4, label: 'Bad, it hurt', emoji: '😢' },
      { value: 5, label: 'Never been / Very scary', emoji: '😱' },
    ],
  },
];

// Store answers in sessionStorage during assessment
const SESS_KEY = 'assessment_answers';

export default function QuestionScreen() {
  const { id, step } = useParams();
  const navigate = useNavigate();
  const stepNum = parseInt(step);
  const q = QUESTIONS.find(q => q.step === stepNum);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Load existing answer if navigating back
    const saved = JSON.parse(sessionStorage.getItem(SESS_KEY) || '[]');
    setSelected(saved[stepNum - 1] ?? null);
  }, [stepNum]);

  if (!q) { navigate(`/patients/${id}/assessment/start`); return null; }

  function choose(val) {
    setSelected(val);
    const saved = JSON.parse(sessionStorage.getItem(SESS_KEY) || '[]');
    saved[stepNum - 1] = val;
    sessionStorage.setItem(SESS_KEY, JSON.stringify(saved));
  }

  function next() {
    if (!selected) return;
    if (stepNum < 3) navigate(`/patients/${id}/assessment/q/${stepNum + 1}`);
    else navigate(`/patients/${id}/assessment/summary`);
  }

  const progress = (stepNum / 3) * 100;

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => stepNum > 1 ? navigate(`/patients/${id}/assessment/q/${stepNum - 1}`) : navigate(`/patients/${id}/assessment/instructions`)}>← Back</button>
        <span className="topbar-title">Question {stepNum} of 3</span>
        <div />
      </div>

      <div className="page-content fade-in">
        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#9BA3C7', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Progress</span>
            <span style={{ color: '#6C63FF', fontSize: 12, fontWeight: 700 }}>{stepNum}/3</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          {/* Step dots */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center' }}>
            {QUESTIONS.map(qq => (
              <div key={qq.step} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: qq.step <= stepNum ? '#6C63FF' : '#1E2035',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="card" style={{ textAlign: 'center', padding: '28px 20px', marginBottom: 20 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }} className="float">{q.icon}</div>
          <span className="badge badge-primary" style={{ marginBottom: 14 }}>{q.title}</span>
          <h2 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.5, color: '#F0F2FF' }}>{q.question}</h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {q.options.map(opt => (
            <button key={opt.value} onClick={() => choose(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                background: selected === opt.value ? 'rgba(108,99,255,0.2)' : '#161828',
                border: selected === opt.value ? '2px solid #6C63FF' : '1px solid rgba(108,99,255,0.2)',
                borderRadius: 14, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: 'inherit',
                transform: selected === opt.value ? 'scale(1.02)' : 'scale(1)',
              }}>
              <span style={{ fontSize: 28 }}>{opt.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F0F2FF', fontWeight: 600, fontSize: 15 }}>{opt.label}</div>
                <div style={{ color: '#5A6080', fontSize: 12, marginTop: 2 }}>Level {opt.value}</div>
              </div>
              {selected === opt.value && <span style={{ color: '#6C63FF', fontSize: 22 }}>✓</span>}
            </button>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={next} disabled={!selected}>
          {stepNum < 3 ? `Next Question →` : 'See Summary →'}
        </button>
      </div>
    </div>
  );
}
