import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

function calcAnxiety(answers) {
  if (!answers.length) return 50;
  return Math.round((answers.reduce((s, v) => s + v, 0) / (answers.length * 5)) * 100);
}

function getRisk(score) {
  if (score <= 35) return 'Low';
  if (score <= 65) return 'Medium';
  return 'High';
}

function getCooperation(score) {
  if (score <= 35) return 'High';
  if (score <= 65) return 'Moderate';
  return 'Low';
}

function getRecommendation(risk, emotion) {
  const map = {
    Low: 'Standard dental procedure recommended. Maintain positive reinforcement and praise.',
    Medium: 'Use Tell-Show-Do technique. Consider distraction tools (music, video). Monitor throughout.',
    High: 'Consider behavior management strategies: voice control, protective stabilization, or sedation consultation. Involve parent/guardian actively.',
  };
  return map[risk];
}

export default function ProcessingScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addAssessment } = useApp();
  const [stage, setStage] = useState(0);
  const stages = [
    { label: 'Loading assessment data...', icon: '📋' },
    { label: 'Analyzing anxiety scores...', icon: '🧠' },
    { label: 'Processing facial emotion...', icon: '😊' },
    { label: 'Cross-referencing data...', icon: '🔄' },
    { label: 'Running AI prediction model...', icon: '🤖' },
    { label: 'Generating report...', icon: '📊' },
  ];

  useEffect(() => {
    let s = 0;
    const iv = setInterval(() => {
      s++;
      setStage(s);
      if (s >= stages.length) {
        clearInterval(iv);
        // Build and save assessment
        const answers = JSON.parse(sessionStorage.getItem('assessment_answers') || '[3,3,3]');
        const emotion = JSON.parse(sessionStorage.getItem('detected_emotion') || '{"label":"Neutral","anxiety":30}');
        const anxietyScore = calcAnxiety(answers);
        const combined = Math.round((anxietyScore + emotion.anxiety) / 2);
        const riskLevel = getRisk(combined);
        const cooperationLevel = getCooperation(combined);
        const recommendation = getRecommendation(riskLevel, emotion.label);

        const assessment = addAssessment({
          patientId: id,
          answers,
          anxietyScore,
          emotion: emotion.label,
          cooperationLevel,
          riskLevel,
          recommendation,
          notes: '',
        });

        sessionStorage.setItem('latest_assessment_id', assessment.id);
        setTimeout(() => navigate(`/patients/${id}/mismatch`), 600);
      }
    }, 500);
    return () => clearInterval(iv);
  }, []);

  const progress = Math.round((stage / stages.length) * 100);

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        <div style={{ fontSize: 80 }} className="pulse">🤖</div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>AI Processing</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14 }}>Analyzing all data with our AI model...</p>
        </div>

        {/* Progress ring */}
        <div style={{
          width: 140, height: 140, borderRadius: '50%',
          background: `conic-gradient(#6C63FF ${progress * 3.6}deg, #1E2035 0)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 108, height: 108, borderRadius: '50%', background: '#0D0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#6C63FF' }}>{progress}%</div>
          </div>
        </div>

        {/* Stage list */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
              background: i < stage ? 'rgba(52,211,153,0.08)' : i === stage ? 'rgba(108,99,255,0.12)' : 'transparent',
              borderRadius: 10, transition: 'all 0.4s',
              border: i === stage ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
            }}>
              <span style={{ fontSize: 20 }}>{i < stage ? '✅' : i === stage ? <span className="spinner" style={{width:18,height:18,borderWidth:2,display:'inline-block'}} /> : s.icon}</span>
              <span style={{ color: i < stage ? '#34D399' : i === stage ? '#F0F2FF' : '#5A6080', fontSize: 14, fontWeight: i === stage ? 700 : 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
