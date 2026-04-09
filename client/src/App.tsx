import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './lib/auth';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import TutorsPage from './pages/TutorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import RoutinesPage from './pages/RoutinesPage';
import ChatPage from './pages/ChatPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="tutors" element={<TutorsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="routines" element={<RoutinesPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="chat/:tutorId" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
