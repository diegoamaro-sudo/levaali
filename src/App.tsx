import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProfileSelection from './pages/ProfileSelection';
import EstablishmentAuth from './pages/establishment/EstablishmentAuth';
import DriverAuth from './pages/driver/DriverAuth';
import EstablishmentDashboard from './pages/establishment/EstablishmentDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              <Route path="/" element={<ProfileSelection />} />
              <Route path="/estabelecimento/auth" element={<EstablishmentAuth />} />
              <Route path="/entregador/auth" element={<DriverAuth />} />
              <Route 
                path="/estabelecimento/dashboard/*" 
                element={
                  <ProtectedRoute userType="establishment">
                    <EstablishmentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/entregador/dashboard/*" 
                element={
                  <ProtectedRoute userType="driver">
                    <DriverDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard/*" 
                element={
                  <ProtectedRoute userType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;