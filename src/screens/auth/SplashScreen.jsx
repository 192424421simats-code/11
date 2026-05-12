import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { currentUser } = useApp();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(currentUser ? '/dashboard' : '/welcome');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen-centered" style={{ background: 'linear-gradient(145deg, #0D0E1A 0%, #141630 100%)' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        {/* Logo */}
        <div className="float glow" style={{
          width: 110, height: 110, borderRadius: 32,
          background: 'linear-gradient(135deg, #6C63FF, #43E8D8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52,
          boxShadow: '0 0 60px rgba(108,99,255,0.5)',
        }}>🦷</div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 6 }}>
            <span style={{ color: '#6C63FF' }}>Pedi</span>
            <span style={{ color: '#F0F2FF' }}>Predict</span>
            <span style={{ color: '#43E8D8', fontSize: 20, fontWeight: 700 }}> AI</span>
          </div>
          <div style={{ color: '#9BA3C7', fontSize: 14, fontWeight: 500, letterSpacing: '0.3px' }}>
            Pediatric Cooperation Predictor
          </div>
        </div>

        {/* Loading dots */}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#6C63FF',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>

        <div style={{ color: '#5A6080', fontSize: 12, marginTop: 8, letterSpacing: '2px', textTransform: 'uppercase' }}>
          Loading...
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, color: '#5A6080', fontSize: 12 }}>
        v1.0 · AI Powered · Secure
      </div>
    </div>
  );
}
