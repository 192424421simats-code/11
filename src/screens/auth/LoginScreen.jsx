import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login, showToast } = useApp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); }

  async function submit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = login(form.email, form.password);
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    showToast(`Welcome back, ${res.user.name.split(' ')[0]}! 👋`);
    navigate('/dashboard');
  }

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400 }}>
        <button className="back-btn" onClick={() => navigate('/welcome')} style={{ marginBottom: 24 }}>← Back</button>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>👋</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Welcome Back</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14 }}>Sign in to your PediPredict AI account</p>
        </div>

        {/* Demo credentials hint */}
        <div className="card" style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)' }}>
          <div style={{ fontSize: 12, color: '#A89BFF', fontWeight: 700, marginBottom: 6 }}>🧪 DEMO ACCOUNTS</div>
          <div style={{ fontSize: 12, color: '#9BA3C7' }}>Dentist: <b style={{color:'#F0F2FF'}}>dentist@demo.com</b> / demo123</div>
          <div style={{ fontSize: 12, color: '#9BA3C7' }}>Parent: <b style={{color:'#F0F2FF'}}>parent@demo.com</b> / demo123</div>
        </div>

        <form onSubmit={submit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input className="input" type="email" name="email" placeholder="your@email.com"
              value={form.email} onChange={handle} autoComplete="email" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type={showPass ? 'text' : 'password'} name="password"
                placeholder="Enter your password" value={form.password} onChange={handle}
                autoComplete="current-password" style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div style={{ color: '#F87171', fontSize: 13, marginBottom: 14, padding: '10px 14px', background: 'rgba(248,113,113,0.1)', borderRadius: 8, border: '1px solid rgba(248,113,113,0.3)' }}>⚠️ {error}</div>}

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? <><span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Signing In...</> : 'Sign In'}
          </button>
        </form>

        <div className="divider-text" style={{ margin: '24px 0' }}>or</div>

        <div style={{ textAlign: 'center', color: '#9BA3C7', fontSize: 14 }}>
          Don't have an account?{' '}
          <Link to="/role" style={{ color: '#A89BFF', fontWeight: 700, textDecoration: 'none' }}>Create Account</Link>
        </div>
      </div>
    </div>
  );
}
