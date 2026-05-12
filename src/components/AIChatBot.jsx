import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AIChatBot() {
  const { currentUser } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello Doctor! I am your AI assistant. How can I help you with your patients today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Only show for logged in users (dentists)
  if (!currentUser) return null;

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    setLoading(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      setLoading(false);
      let reply = "I'm sorry, I didn't quite catch that. Could you provide more details?";
      const lower = userMsg.toLowerCase();

      if (lower.includes('anxiety') || lower.includes('fear')) {
        reply = "When a patient shows high anxiety, I recommend the Tell-Show-Do technique. You can also check their specific 'Fear of Dentist' score in their latest assessment report to tailor your approach.";
      } else if (lower.includes('patient') || lower.includes('report')) {
        reply = "You can view detailed patient reports and AI predictions by selecting a patient from the Dashboard. The AI will cross-reference their questionnaire with real-time facial emotion scans.";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hello! Ready for your next patient? Feel free to ask me for behavior management strategies or app guidance.";
      } else if (lower.includes('mismatch')) {
        reply = "A mismatch occurs when a patient's self-reported anxiety differs from what their facial emotion shows. This usually indicates masking behavior, meaning they might be more anxious than they admit.";
      }

      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: reply }]);
    }, 1200);
  }

  return (
    <>
      <div className="chatbot-fab" onClick={() => setOpen(!open)}>
        {open ? '✕' : '🤖'}
      </div>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 24 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>PediPredict AI</div>
                <div style={{ color: '#34D399', fontSize: 12 }}>Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#9BA3C7', fontSize: 20, cursor: 'pointer' }}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot" style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '16px' }}>
                <span className="pulse" style={{ width: 6, height: 6, background: '#A89BFF', borderRadius: '50%', animationDelay: '0s' }}></span>
                <span className="pulse" style={{ width: 6, height: 6, background: '#A89BFF', borderRadius: '50%', animationDelay: '0.2s' }}></span>
                <span className="pulse" style={{ width: 6, height: 6, background: '#A89BFF', borderRadius: '50%', animationDelay: '0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
            />
            <button type="submit" disabled={!input.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
