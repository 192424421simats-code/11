import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from 'recharts';

export default function GraphScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessments } = useApp();
  const assessments = getAssessments(id);

  if (!assessments.length) return (
    <div className="screen">
      <div className="topbar"><button className="back-btn" onClick={() => navigate(`/patients/${id}`)}>← Back</button><span className="topbar-title">Charts</span><div /></div>
      <div className="screen-centered"><div style={{color:'#9BA3C7'}}>No assessment data to chart.</div></div>
    </div>
  );

  const a = assessments[0];
  const qLabels = ['Fear', 'Tools', 'Past Exp.', 'Pain', 'Anxiety'];

  const barData = a.answers?.map((val, i) => ({
    name: qLabels[i], score: val * 20, fill: val <= 2 ? '#34D399' : val <= 3 ? '#FBBF24' : '#F87171',
  })) || [];

  const radarData = a.answers?.map((val, i) => ({ subject: qLabels[i], value: val * 20 })) || [];

  const historyData = assessments.slice(0, 6).reverse().map(a2 => ({
    date: a2.date.slice(5), anxiety: a2.anxietyScore,
    cooperation: a2.cooperationLevel === 'High' ? 80 : a2.cooperationLevel === 'Moderate' ? 50 : 20,
  }));

  const CustomTooltip = ({ active, payload, label }) => active && payload ? (
    <div style={{ background: '#1E2035', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ color: '#F0F2FF', fontWeight: 700 }}>{label}</div>
      {payload.map(p => <div key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}%</div>)}
    </div>
  ) : null;

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}/report`)}>← Report</button>
        <span className="topbar-title">Charts</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ paddingBottom: 32 }}>
        {/* Anxiety per question bar chart */}
        <div className="card" style={{ marginBottom: 16, padding: '16px 10px' }}>
          <div style={{ fontWeight: 700, marginBottom: 14, paddingLeft: 6 }}>📊 Anxiety by Question</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,99,255,0.1)" />
              <XAxis dataKey="name" tick={{ fill: '#9BA3C7', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9BA3C7', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Score" radius={[4, 4, 0, 0]}>
                {barData.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="card" style={{ marginBottom: 16, padding: '16px 10px' }}>
          <div style={{ fontWeight: 700, marginBottom: 14, paddingLeft: 6 }}>🕸️ Anxiety Radar</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(108,99,255,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9BA3C7', fontSize: 11 }} />
              <Radar name="Anxiety" dataKey="value" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* History trend */}
        {historyData.length > 1 && (
          <div className="card" style={{ marginBottom: 16, padding: '16px 10px' }}>
            <div style={{ fontWeight: 700, marginBottom: 14, paddingLeft: 6 }}>📈 Trend Over Time</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={historyData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,99,255,0.1)" />
                <XAxis dataKey="date" tick={{ fill: '#9BA3C7', fontSize: 11 }} />
                <YAxis tick={{ fill: '#9BA3C7', fontSize: 11 }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#9BA3C7', fontSize: 12 }} />
                <Bar dataKey="anxiety" name="Anxiety %" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cooperation" name="Cooperation %" fill="#43E8D8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/report`)}>← Back to Report</button>
      </div>
    </div>
  );
}
