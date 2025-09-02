import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Upload } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function DriverAuth() {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'select' | 'login' | 'register'>('select');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    cpf: '',
    dateOfBirth: '',
    photoWithDoc: null as File | null,
    idCardFront: null as File | null,
    idCardBack: null as File | null
  });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.email, formData.password, 'driver');
    if (success) {
      navigate('/entregador/dashboard');
    } else {
      setError('Email ou senha incorretos');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    // Check age (18+)
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      setError('Você deve ter pelo menos 18 anos');
      return;
    }
    
    const success = await register(formData, 'driver');
    if (success) {
      navigate('/entregador/dashboard');
    } else {
      setError('Erro ao criar conta');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <button
            onClick={() => mode === 'select' ? navigate('/') : setMode('select')}
            className="text-green-400 hover:text-green-300 mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">Entregador</h1>
        </div>

        {mode === 'select' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('login')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              JÁ TENHO CONTA
            </button>
            <button
              onClick={() => setMode('register')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors border border-green-500"
            >
              CRIAR CONTA
            </button>
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Senha</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              ENTRAR
            </button>
          </form>
        )}

        {mode === 'register' && (
          <div className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Nome completo *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Data de nascimento * (18+ anos)</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">CPF *</label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Senha * (mínimo 8 caracteres)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  minLength={8}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Confirmar senha *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Document Upload Sections */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-green-400">Documentos Obrigatórios</h3>
                
                <div>
                  <label className="block text-gray-300 mb-2">Foto segurando documento *</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Clique para fazer upload</p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">RG - Frente *</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Clique para fazer upload</p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">RG - Verso *</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Clique para fazer upload</p>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                CRIAR CONTA
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}