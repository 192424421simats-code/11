import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

// ---------- helpers ----------
const STORAGE_KEY = 'pedipredict_data';

function loadStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---------- seed users (dentist + parent) ----------
const SEED_USERS = [
  { id: 'u1', name: 'Dr. Sarah Mitchell', email: 'dentist@demo.com', password: 'demo123', role: 'dentist', specialty: 'Pediatric Dentistry' },
  { id: 'u2', name: 'Emma Johnson', email: 'parent@demo.com', password: 'demo123', role: 'parent', children: [] },
];

// ---------- seed patients ----------
const SEED_PATIENTS = [
  { id: 'p1', name: 'Liam Carter', age: 7, gender: 'Male', parentId: 'u2', dentistId: 'u1', createdAt: '2025-11-10' },
  { id: 'p2', name: 'Sophia Ray', age: 9, gender: 'Female', parentId: 'u2', dentistId: 'u1', createdAt: '2025-12-05' },
  { id: 'p3', name: 'Noah Williams', age: 6, gender: 'Male', parentId: 'u2', dentistId: 'u1', createdAt: '2026-01-20' },
];

// ---------- seed assessments ----------
const SEED_ASSESSMENTS = [
  {
    id: 'a1', patientId: 'p1', date: '2026-03-15',
    answers: [3,2,4,3,2], anxietyScore: 70,
    emotion: 'Anxious', cooperationLevel: 'Moderate',
    riskLevel: 'Medium', recommendation: 'Use tell-show-do technique. Consider mild sedation.',
    notes: 'Child showed visible tension. Mother was supportive.',
  },
  {
    id: 'a2', patientId: 'p2', date: '2026-04-02',
    answers: [1,1,2,1,1], anxietyScore: 30,
    emotion: 'Calm', cooperationLevel: 'High',
    riskLevel: 'Low', recommendation: 'Standard procedure. No special interventions needed.',
    notes: 'Very cooperative. Smiled throughout.',
  },
];

export function AppProvider({ children }) {
  const [storage, setStorage] = useState(() => {
    const s = loadStorage();
    return {
      users: s.users || SEED_USERS,
      patients: s.patients || SEED_PATIENTS,
      assessments: s.assessments || SEED_ASSESSMENTS,
    };
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const s = loadStorage();
    return s.currentUser || null;
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveStorage({ ...storage, currentUser });
  }, [storage, currentUser]);

  // --- auth ---
  function login(email, password) {
    const u = storage.users.find(u => u.email === email && u.password === password);
    if (!u) return { error: 'Invalid email or password' };
    setCurrentUser(u);
    return { user: u };
  }

  function register({ name, email, password, role }) {
    if (storage.users.find(u => u.email === email)) return { error: 'Email already registered' };
    const newUser = { id: 'u' + Date.now(), name, email, password, role: role || 'dentist' };
    setStorage(s => ({ ...s, users: [...s.users, newUser] }));
    setCurrentUser(newUser);
    return { user: newUser };
  }

  function logout() { setCurrentUser(null); }

  // --- patients ---
  function getPatients() {
    if (!currentUser) return [];
    if (currentUser.role === 'dentist') return storage.patients;
    return storage.patients.filter(p => p.parentId === currentUser.id);
  }

  function addPatient({ name, age, gender }) {
    const p = {
      id: 'p' + Date.now(), name, age: parseInt(age), gender,
      parentId: currentUser?.role === 'parent' ? currentUser.id : null,
      dentistId: currentUser?.role === 'dentist' ? currentUser.id : null,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setStorage(s => ({ ...s, patients: [...s.patients, p] }));
    return p;
  }

  function updatePatient(id, data) {
    setStorage(s => ({ ...s, patients: s.patients.map(p => p.id === id ? { ...p, ...data } : p) }));
  }

  function getPatient(id) { return storage.patients.find(p => p.id === id); }

  // --- assessments ---
  function addAssessment(data) {
    const a = { id: 'a' + Date.now(), date: new Date().toISOString().slice(0, 10), ...data };
    setStorage(s => ({ ...s, assessments: [...s.assessments, a] }));
    return a;
  }

  function getAssessments(patientId) {
    return storage.assessments.filter(a => a.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date));
  }

  function getAssessment(id) { return storage.assessments.find(a => a.id === id); }

  function getAllAssessments() { return storage.assessments; }

  function updateAssessmentNotes(id, notes) {
    setStorage(s => ({ ...s, assessments: s.assessments.map(a => a.id === id ? { ...a, notes } : a) }));
  }

  // --- toast ---
  function showToast(msg, duration = 2500) {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  }

  return (
    <AppContext.Provider value={{
      currentUser, login, register, logout,
      getPatients, addPatient, updatePatient, getPatient,
      addAssessment, getAssessments, getAssessment, getAllAssessments, updateAssessmentNotes,
      toast, showToast,
      storage,
    }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
