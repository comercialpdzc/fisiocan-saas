import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './lib/auth';
import { isPortalAuthenticated } from './lib/portalAuth';

// Admin
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import TutorsPage from './pages/TutorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import RoutinesPage from './pages/RoutinesPage';
import ChatPage from './pages/ChatPage';
import PlansPage from './pages/PlansPage';

// Portal del cliente
import PortalLoginPage from './pages/portal/PortalLoginPage';
import PortalLayout from './pages/portal/PortalLayout';
import PortalDashboard from './pages/portal/PortalDashboard';
import PortalPatients from './pages/portal/PortalPatients';
import PortalAppointments from './pages/portal/PortalAppointments';
import PortalRoutines from './pages/portal/PortalRoutines';
import PortalPlans from './pages/portal/PortalPlans';
import PortalChat from './pages/portal/PortalChat';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
}

function PortalRoute({ children }: { children: React.ReactNode }) {
  return isPortalAuthenticated() ? <>{children}</> : <Navigate to="/portal" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Admin ── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard"    element={<DashboardPage />} />
          <Route path="patients"     element={<PatientsPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="tutors"       element={<TutorsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="routines"     element={<RoutinesPage />} />
          <Route path="plans"        element={<PlansPage />} />
          <Route path="chat"         element={<ChatPage />} />
          <Route path="chat/:tutorId" element={<ChatPage />} />
        </Route>

        {/* ── Portal cliente ── */}
        <Route path="/portal" element={<PortalLoginPage />} />
        <Route path="/portal" element={<PortalRoute><PortalLayout /></PortalRoute>}>
          <Route path="dashboard"    element={<PortalDashboard />} />
          <Route path="patients"     element={<PortalPatients />} />
          <Route path="appointments" element={<PortalAppointments />} />
          <Route path="routines"     element={<PortalRoutines />} />
          <Route path="plans"        element={<PortalPlans />} />
          <Route path="chat"         element={<PortalChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
