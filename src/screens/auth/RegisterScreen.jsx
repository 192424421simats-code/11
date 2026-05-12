import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { register, showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'dentist' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  function handle(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); }

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('All fields are required'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const res = register(form);
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    showToast(`Account created! Welcome, ${res.user.name.split(' ')[0]}! 🎉`);
    navigate('/dashboard');
  }

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div style={{ padding: '40px 24px', maxWidth: 440, width: '100%', margin: '0 auto' }} className="fade-in">
        <button className="back-btn" onClick={() => navigate('/welcome')} style={{ marginBottom: 24 }}>← Back</button>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>✨</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Create Account</h1>
          <p style={{ color: '#9BA3C7', fontSize: 14 }}>Join PediPredict AI</p>
        </div>

        <form onSubmit={submit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input className="input" name="name" placeholder="Dr. John Smith" value={form.name} onChange={handle} />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input className="input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handle} />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type={showPass ? 'text' : 'password'} name="password"
                placeholder="Min 6 characters" value={form.password} onChange={handle} style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input className="input" type="password" name="confirmPassword" placeholder="Repeat password"
              value={form.confirmPassword} onChange={handle} />
          </div>

          {error && <div style={{ color: '#F87171', fontSize: 13, marginBottom: 14, padding: '10px 14px', background: 'rgba(248,113,113,0.1)', borderRadius: 8, border: '1px solid rgba(248,113,113,0.3)' }}>⚠️ {error}</div>}

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? <><span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Creating Account...</> : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', color: '#9BA3C7', fontSize: 14, marginTop: 20 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#A89BFF', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
