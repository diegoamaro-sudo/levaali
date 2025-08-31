import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'establishment' | 'driver' | 'admin';
}

export default function ProtectedRoute({ children, userType }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || user.userType !== userType) {
    return <Navigate to="/" replace />;
  }

  // Check if driver is approved
  if (userType === 'driver' && user.userType === 'driver' && !user.isApproved) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 p-8 rounded-lg text-center max-w-md">
          <h2 className="text-xl font-bold text-green-400 mb-4">
            Documentos em Análise
          </h2>
          <p className="text-gray-300 leading-relaxed">
            ESTAMOS ANALISANDO SEUS DOCUMENTOS, POR FAVOR VOLTE AMANHÃ PARA VERIFICAR!
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 bg-green-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}