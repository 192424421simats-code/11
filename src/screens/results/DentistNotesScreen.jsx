import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function DentistNotesScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment, getAssessments, updateAssessmentNotes, showToast } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id') || '';
  const a = getAssessment(aId) || getAssessments(id)[0];
  const [notes, setNotes] = useState(a?.notes || '');
  const [saving, setSaving] = useState(false);

  if (!a) return null;

  async function save() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    updateAssessmentNotes(a.id, notes);
    setSaving(false);
    showToast('Notes saved! ✓');
    navigate(`/patients/${id}/report`);
  }

  const templates = [
    'Child was cooperative throughout the visit.',
    'Mild resistance noted during injection.',
    'Parent coaching session completed.',
    'Sedation recommended for next visit.',
  ];

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}/report`)}>← Report</button>
        <span className="topbar-title">Dentist Notes</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ overflowY: 'auto', flex: 1, paddingBottom: 32 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#9BA3C7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Quick Templates</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {templates.map(t => (
              <button key={t} onClick={() => setNotes(n => n ? n + '\n' + t : t)}
                className="badge badge-primary" style={{ cursor: 'pointer', border: 'none', fontSize: 12, padding: '6px 12px' }}>
                + {t.slice(0, 30)}...
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Clinical Notes</label>
          <textarea className="input" value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Add clinical observations, behavior notes, treatment modifications..."
            style={{ minHeight: 200 }} />
        </div>

        <div style={{ color: '#5A6080', fontSize: 12, marginBottom: 20 }}>
          {notes.length} characters · Saved to patient record
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => navigate(`/patients/${id}/report`)}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={save} disabled={saving}>
            {saving ? 'Saving...' : '💾 Save Notes'}
          </button>
        </div>
      </div>
    </div>
  );
}
