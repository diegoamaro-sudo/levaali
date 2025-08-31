import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { User, Mail, Lock, LogOut, FileText, Shield } from 'lucide-react';
import { DriverUser } from '../../types/User';

export default function DriverProfile() {
  const { user, logout } = useAuth() as { user: DriverUser; logout: () => void };
  const { addNotification } = useNotification();
  const [editMode, setEditMode] = useState<'none' | 'credentials'>('none');
  const [formData, setFormData] = useState({
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveCredentials = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      addNotification({
        title: 'Erro',
        message: 'As senhas não coincidem',
        type: 'error'
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      addNotification({
        title: 'Erro',
        message: 'A nova senha deve ter pelo menos 8 caracteres',
        type: 'error'
      });
      return;
    }

    // Mock save operation
    addNotification({
      title: 'Credenciais atualizadas!',
      message: 'Suas credenciais foram alteradas com sucesso',
      type: 'success'
    });
    
    setEditMode('none');
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-400">Perfil</h1>
        <p className="text-gray-400">{user.name}</p>
      </div>

      {/* Profile Avatar */}
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">{user.name}</h2>
        <p className="text-gray-400">Entregador verificado</p>
        <div className="flex items-center justify-center mt-2">
          <Shield className="w-4 h-4 text-green-400 mr-1" />
          <span className="text-green-400 text-sm">Conta aprovada</span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-white flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-green-400" />
          <span>Informações Pessoais</span>
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Nome completo:</span>
            <span className="text-gray-300">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">CPF:</span>
            <span className="text-gray-300">{user.cpf}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Data de nascimento:</span>
            <span className="text-gray-300">
              {new Date(user.dateOfBirth).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cadastro:</span>
            <span className="text-gray-300">
              {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
          <p className="text-yellow-200 text-xs">
            ⚠️ Não é possível alterar fotos ou documentos após a aprovação. 
            Entre em contato com o suporte se necessário.
          </p>
        </div>
      </div>

      {/* Login Credentials */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-green-400" />
            <span>Credenciais de Acesso</span>
          </h3>
          <button
            onClick={() => setEditMode(editMode === 'credentials' ? 'none' : 'credentials')}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            {editMode === 'credentials' ? 'Cancelar' : 'Alterar'}
          </button>
        </div>

        {editMode === 'credentials' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Senha atual</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Nova senha</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                minLength={8}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Confirmar nova senha</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSaveCredentials}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Salvar credenciais
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="text-gray-300">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Senha:</span>
              <span className="text-gray-300">••••••••</span>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-4">Estatísticas</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-xs text-gray-400">Entregas totais</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-400">-</p>
            <p className="text-xs text-gray-400">Avaliação média</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-purple-400">-</p>
            <p className="text-xs text-gray-400">Taxa de sucesso</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-yellow-400">0</p>
            <p className="text-xs text-gray-400">Dias ativos</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>SAIR</span>
      </button>
    </div>
  );
}