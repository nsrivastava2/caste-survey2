import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginPage from './components/auth/LoginPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import StateDashboard from './components/dashboards/StateDashboard';
import DistrictDashboard from './components/dashboards/DistrictDashboard';
import WardDashboard from './components/dashboards/WardDashboard';
import SurveyorDashboard from './components/dashboards/SurveyorDashboard';
import UserManagement from './components/users/UserManagement';
import SurveyManagement from './components/surveys/SurveyManagement';
import Monitoring from './components/monitoring/Monitoring';
import GeoStatistics from './components/statistics/GeoStatistics';
import Reports from './components/reports/Reports';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'state':
        return <StateDashboard />;
      case 'district':
        return <DistrictDashboard />;
      case 'ward':
        return <WardDashboard />;
      case 'surveyor':
        return <SurveyorDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={getDashboardComponent()} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/surveys" element={<SurveyManagement />} />
      <Route path="/monitoring" element={<Monitoring />} />
      <Route path="/statistics" element={<GeoStatistics />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;