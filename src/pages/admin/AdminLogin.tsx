import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Shield } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.email, formData.password, 'admin');
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Credenciais inválidas');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <button
            onClick={() => navigate('/')}
            className="text-green-400 hover:text-green-300 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">Administração</h1>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800 border border-green-500/30 rounded-lg p-6">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-white">LEVA ALI! Admin</h2>
            <p className="text-gray-400 text-sm">Painel Administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email do Administrador</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                placeholder="admin@levaali.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              ACESSAR PAINEL
            </button>
          </form>

          <div className="mt-6 p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
            <p className="text-blue-200 text-xs">
              🔒 Acesso restrito apenas para administradores autorizados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}