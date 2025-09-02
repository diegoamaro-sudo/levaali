import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Upload } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EstablishmentAuth() {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<'select' | 'login' | 'register'>('select');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    responsibleName: '',
    establishmentName: '',
    cpfCnpj: '',
    address: '',
    houseNumber: '',
    referencePoint: '',
    neighborhood: '',
    city: '',
    logo: null as File | null
  });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.email, formData.password, 'establishment');
    if (success) {
      navigate('/estabelecimento/dashboard');
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
    
    const success = await register(formData, 'establishment');
    if (success) {
      navigate('/estabelecimento/dashboard');
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
          <h1 className="text-2xl font-bold text-white">Estabelecimento</h1>
        </div>

        {mode === 'select' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('login')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              ACESSAR SUA CONTA
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
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Nome completo do responsável *</label>
              <input
                type="text"
                value={formData.responsibleName}
                onChange={(e) => setFormData({...formData, responsibleName: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
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
            <div>
              <label className="block text-gray-300 mb-2">Nome do estabelecimento *</label>
              <input
                type="text"
                value={formData.establishmentName}
                onChange={(e) => setFormData({...formData, establishmentName: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">CPF ou CNPJ *</label>
              <input
                type="text"
                value={formData.cpfCnpj}
                onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Endereço completo *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                placeholder="Rua, Avenida..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Número *</label>
                <input
                  type="text"
                  value={formData.houseNumber}
                  onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Bairro *</label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Cidade *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Ponto de referência</label>
              <input
                type="text"
                value={formData.referencePoint}
                onChange={(e) => setFormData({...formData, referencePoint: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                placeholder="Próximo ao..."
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Logo do estabelecimento</label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Clique para fazer upload</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, logo: e.target.files?.[0] || null})}
                  className="hidden"
                />
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
        )}
      </div>
    </div>
  );
}