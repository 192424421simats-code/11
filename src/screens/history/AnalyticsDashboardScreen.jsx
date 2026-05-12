import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/BottomNav';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AnalyticsDashboardScreen() {
  const navigate = useNavigate();
  const { getAllAssessments, getPatients } = useApp();
  const assessments = getAllAssessments();
  const patients = getPatients();

  const riskCounts = { Low: 0, Medium: 0, High: 0 };
  const cooperationCounts = { High: 0, Moderate: 0, Low: 0 };
  assessments.forEach(a => {
    riskCounts[a.riskLevel] = (riskCounts[a.riskLevel] || 0) + 1;
    cooperationCounts[a.cooperationLevel] = (cooperationCounts[a.cooperationLevel] || 0) + 1;
  });

  const pieData = [
    { name: 'Low Risk', value: riskCounts.Low, color: '#34D399' },
    { name: 'Medium Risk', value: riskCounts.Medium, color: '#FBBF24' },
    { name: 'High Risk', value: riskCounts.High, color: '#F87171' },
  ].filter(d => d.value > 0);

  const coopData = [
    { name: 'High', value: cooperationCounts.High, fill: '#34D399' },
    { name: 'Moderate', value: cooperationCounts.Moderate, fill: '#FBBF24' },
    { name: 'Low', value: cooperationCounts.Low, fill: '#F87171' },
  ];

  const avgAnxiety = assessments.length ? Math.round(assessments.reduce((s, a) => s + a.anxietyScore, 0) / assessments.length) : 0;

  const CustomTooltip = ({ active, payload }) => active && payload?.length ? (
    <div style={{ background: '#1E2035', border: '1px solid rgba(108,99,255,0.3)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      {payload.map(p => <div key={p.name} style={{ color: p.fill || p.color }}>{p.name}: {p.value}</div>)}
    </div>
  ) : null;

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="topbar-title">Analytics</span>
        <div />
      </div>

      <div className="page-content content-padded" style={{ overflowY: 'auto', flex: 1 }}>
        {/* Top stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Total Patients', value: patients.length, icon: '👧', color: '#6C63FF' },
            { label: 'Total Assessments', value: assessments.length, icon: '📋', color: '#43E8D8' },
            { label: 'Avg Anxiety', value: `${avgAnxiety}%`, icon: '🧠', color: '#FF6584' },
            { label: 'High Risk Cases', value: riskCounts.High, icon: '⚠️', color: '#F87171' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {assessments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40, color: '#5A6080' }}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>📊</div>
            <div>No assessment data yet. Complete assessments to see analytics.</div>
          </div>
        ) : (
          <>
            {/* Risk distribution pie */}
            <div className="card" style={{ marginBottom: 16, padding: '16px 10px' }}>
              <div style={{ fontWeight: 700, marginBottom: 14, paddingLeft: 6 }}>🍩 Risk Distribution</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false}>
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Cooperation bar */}
            <div className="card" style={{ marginBottom: 16, padding: '16px 10px' }}>
              <div style={{ fontWeight: 700, marginBottom: 14, paddingLeft: 6 }}>📊 Cooperation Levels</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={coopData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(108,99,255,0.1)" />
                  <XAxis dataKey="name" tick={{ fill: '#9BA3C7', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9BA3C7', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                    {coopData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent assessments list */}
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#9BA3C7', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recent Assessments</div>
            {assessments.slice(0, 4).map(a => {
              const rc = { Low: '#34D399', Medium: '#FBBF24', High: '#F87171' }[a.riskLevel];
              return (
                <div key={a.id} className="list-item" onClick={() => navigate(`/history/${a.id}`)}>
                  <div style={{ fontSize: 22 }}>{a.riskLevel === 'Low' ? '✅' : a.riskLevel === 'High' ? '⚠️' : '🟡'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{a.cooperationLevel} Cooperation</div>
                    <div style={{ color: '#9BA3C7', fontSize: 13 }}>{a.date} · Anxiety: {a.anxietyScore}%</div>
                  </div>
                  <span style={{ color: rc, fontWeight: 700, fontSize: 13 }}>{a.riskLevel}</span>
                </div>
              );
            })}
          </>
        )}
      </div>
      <BottomNav active="analytics" />
    </div>
  );
}
