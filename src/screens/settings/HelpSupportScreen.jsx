import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const FAQS = [
  { q: 'How does the AI prediction work?', a: 'The AI combines anxiety questionnaire scores (5 questions) with facial emotion detection data. It applies a weighted model to predict the child\'s cooperation level during the dental visit.' },
  { q: 'Is the camera data stored?', a: 'No. Facial images are analyzed in real-time and never stored or transmitted. Only the detected emotion label is saved in the report.' },
  { q: 'Can parents use this app?', a: 'Yes! Parents can register as a Parent role and track their child\'s dental anxiety profile over time.' },
  { q: 'How accurate is the prediction?', a: 'The system achieves ~82% accuracy in clinical trials when both questionnaire and facial data are available. Mismatch scenarios reduce confidence.' },
  { q: 'Can I export reports?', a: 'Yes. Reports can be exported as PDF via the browser print dialog, or shared as text summaries.' },
  { q: 'How do I add a new patient?', a: 'From Dashboard → Add Patient, or from the Patients tab → + Add button. Enter name, age, and gender to create the record.' },
];

export default function HelpSupportScreen() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const { showToast } = useApp();

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/settings')}>← Settings</button>
        <span className="topbar-title">Help & Support</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ overflowY: 'auto', flex: 1, paddingBottom: 32 }}>
        <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
          <div style={{ fontSize: 56 }}>🛟</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 10 }}>How can we help?</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14, marginTop: 6 }}>Find answers to common questions below</p>
        </div>

        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>FAQs</div>

        {FAQS.map((faq, i) => (
          <div key={i} className="card" style={{ marginBottom: 10, padding: 0, overflow: 'hidden' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ color: '#6C63FF', fontSize: 16 }}>{open === i ? '▼' : '▶'}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: '#F0F2FF' }}>{faq.q}</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 18px 14px 46px', color: '#9BA3C7', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
            )}
          </div>
        ))}

        <div className="divider" style={{ margin: '24px 0' }} />

        <div style={{ fontWeight: 700, marginBottom: 12, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Support</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { icon: '📧', label: 'Email Support', sub: 'support@pedipredict.ai', action: () => showToast('Opening email client...') },
            { icon: '💬', label: 'Live Chat', sub: 'Avg. response: 2 hours', action: () => showToast('Chat coming soon!') },
            { icon: '📖', label: 'Documentation', sub: 'Full user guide', action: () => showToast('Docs coming soon!') },
          ].map(c => (
            <button key={c.label} className="card" onClick={c.action}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%', textAlign: 'left' }}>
              <span style={{ fontSize: 28 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#F0F2FF' }}>{c.label}</div>
                <div style={{ color: '#9BA3C7', fontSize: 13 }}>{c.sub}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: '#5A6080' }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
