import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import AIChatBot from './components/AIChatBot';

// Auth screens
import SplashScreen from './screens/auth/SplashScreen';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import RoleSelectionScreen from './screens/auth/RoleSelectionScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';

// Main screens
import DashboardScreen from './screens/main/DashboardScreen';
import PatientListScreen from './screens/main/PatientListScreen';
import AddPatientScreen from './screens/main/AddPatientScreen';
import PatientProfileScreen from './screens/main/PatientProfileScreen';
import EditPatientScreen from './screens/main/EditPatientScreen';

// Assessment screens
import AssessmentStartScreen from './screens/assessment/AssessmentStartScreen';
import InstructionsScreen from './screens/assessment/InstructionsScreen';
import QuestionScreen from './screens/assessment/QuestionScreen';
import AnxietySummaryScreen from './screens/assessment/AnxietySummaryScreen';

// Emotion screens
import CameraPermissionScreen from './screens/emotion/CameraPermissionScreen';
import FacialCaptureScreen from './screens/emotion/FacialCaptureScreen';
import LiveCaptureScreen from './screens/emotion/LiveCaptureScreen';
import EmotionDetectionScreen from './screens/emotion/EmotionDetectionScreen';
import CaptureConfirmScreen from './screens/emotion/CaptureConfirmScreen';

// Processing & AI screens
import ProcessingScreen from './screens/processing/ProcessingScreen';
import MismatchAnalysisScreen from './screens/processing/MismatchAnalysisScreen';
import AIPredictionScreen from './screens/processing/AIPredictionScreen';
import BehaviourReportScreen from './screens/processing/BehaviourReportScreen';

// Results screens
import PredictionResultScreen from './screens/results/PredictionResultScreen';
import RiskLevelScreen from './screens/results/RiskLevelScreen';
import DetailedReportScreen from './screens/results/DetailedReportScreen';
import GraphScreen from './screens/results/GraphScreen';
import RecommendationScreen from './screens/results/RecommendationScreen';
import DentistNotesScreen from './screens/results/DentistNotesScreen';

// History screens
import AssessmentHistoryScreen from './screens/history/AssessmentHistoryScreen';
import ReportDetailsScreen from './screens/history/ReportDetailsScreen';
import ExportReportScreen from './screens/history/ExportReportScreen';
import AnalyticsDashboardScreen from './screens/history/AnalyticsDashboardScreen';

// Settings screens
import SettingsScreen from './screens/settings/SettingsScreen';
import ProfileSettingsScreen from './screens/settings/ProfileSettingsScreen';
import HelpSupportScreen from './screens/settings/HelpSupportScreen';
import AboutSystemScreen from './screens/settings/AboutSystemScreen';

function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/welcome" replace />;
  return children;
}

function AppRoutes() {
  const { currentUser } = useApp();
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/role" element={<RoleSelectionScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><PatientListScreen /></ProtectedRoute>} />
      <Route path="/patients/add" element={<ProtectedRoute><AddPatientScreen /></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute><PatientProfileScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/edit" element={<ProtectedRoute><EditPatientScreen /></ProtectedRoute>} />

      <Route path="/patients/:id/assessment/start" element={<ProtectedRoute><AssessmentStartScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/assessment/instructions" element={<ProtectedRoute><InstructionsScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/assessment/q/:step" element={<ProtectedRoute><QuestionScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/assessment/summary" element={<ProtectedRoute><AnxietySummaryScreen /></ProtectedRoute>} />

      <Route path="/patients/:id/emotion/permission" element={<ProtectedRoute><CameraPermissionScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/emotion/capture" element={<ProtectedRoute><FacialCaptureScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/emotion/live" element={<ProtectedRoute><LiveCaptureScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/emotion/detect" element={<ProtectedRoute><EmotionDetectionScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/emotion/confirm" element={<ProtectedRoute><CaptureConfirmScreen /></ProtectedRoute>} />

      <Route path="/patients/:id/processing" element={<ProtectedRoute><ProcessingScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/mismatch" element={<ProtectedRoute><MismatchAnalysisScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/ai-prediction" element={<ProtectedRoute><AIPredictionScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/behaviour" element={<ProtectedRoute><BehaviourReportScreen /></ProtectedRoute>} />

      <Route path="/patients/:id/result" element={<ProtectedRoute><PredictionResultScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/risk" element={<ProtectedRoute><RiskLevelScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/report" element={<ProtectedRoute><DetailedReportScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/graph" element={<ProtectedRoute><GraphScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/recommendation" element={<ProtectedRoute><RecommendationScreen /></ProtectedRoute>} />
      <Route path="/patients/:id/notes" element={<ProtectedRoute><DentistNotesScreen /></ProtectedRoute>} />

      <Route path="/history" element={<ProtectedRoute><AssessmentHistoryScreen /></ProtectedRoute>} />
      <Route path="/history/:id" element={<ProtectedRoute><ReportDetailsScreen /></ProtectedRoute>} />
      <Route path="/history/:id/export" element={<ProtectedRoute><ExportReportScreen /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboardScreen /></ProtectedRoute>} />

      <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
      <Route path="/settings/profile" element={<ProtectedRoute><ProfileSettingsScreen /></ProtectedRoute>} />
      <Route path="/settings/help" element={<ProtectedRoute><HelpSupportScreen /></ProtectedRoute>} />
      <Route path="/settings/about" element={<ProtectedRoute><AboutSystemScreen /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <AIChatBot />
    </AppProvider>
  );
}
