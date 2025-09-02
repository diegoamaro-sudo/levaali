import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { User, Building, MapPin, Mail, Lock, Upload, LogOut, Edit } from 'lucide-react';
import { EstablishmentUser } from '../../types/User';

export default function EstablishmentProfile() {
  const { user, logout } = useAuth() as { user: EstablishmentUser; logout: () => void };
  const { addNotification } = useNotification();
  const [editMode, setEditMode] = useState<'none' | 'info' | 'address' | 'credentials'>('none');
  const [formData, setFormData] = useState({
    responsibleName: user.name,
    establishmentName: user.establishmentName,
    address: user.address,
    houseNumber: user.houseNumber,
    referencePoint: user.referencePoint || '',
    neighborhood: user.neighborhood,
    city: user.city,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveInfo = () => {
    if (!formData.responsibleName.trim() || !formData.establishmentName.trim()) {
      addNotification({
        title: 'Erro',
        message: 'Nome do responsável e estabelecimento são obrigatórios',
        type: 'error'
      });
      return;
    }

    addNotification({
      title: 'Informações atualizadas!',
      message: 'Dados do estabelecimento salvos com sucesso',
      type: 'success'
    });
    setEditMode('none');
  };

  const handleSaveAddress = () => {
    if (!formData.address.trim() || !formData.houseNumber.trim() || !formData.neighborhood.trim() || !formData.city.trim()) {
      addNotification({
        title: 'Erro',
        message: 'Todos os campos de endereço são obrigatórios',
        type: 'error'
      });
      return;
    }

    addNotification({
      title: 'Endereço atualizado!',
      message: 'Endereço do estabelecimento salvo com sucesso',
      type: 'success'
    });
    setEditMode('none');
  };

  const handleSaveCredentials = () => {
    if (!formData.currentPassword) {
      addNotification({
        title: 'Erro',
        message: 'Digite sua senha atual',
        type: 'error'
      });
      return;
    }

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

    addNotification({
      title: 'Credenciais atualizadas!',
      message: 'Email e senha alterados com sucesso',
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

  const handleLogoUpload = () => {
    addNotification({
      title: 'Logo atualizada!',
      message: 'Nova logo do estabelecimento salva',
      type: 'success'
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
        <p className="text-gray-400">{user.establishmentName}</p>
      </div>

      {/* Logo Section */}
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">{user.establishmentName}</h2>
        <button 
          onClick={handleLogoUpload}
          className="text-green-400 hover:text-green-300 text-sm flex items-center justify-center space-x-2 mx-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Alterar logo</span>
        </button>
      </div>

      {/* Establishment Info */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <Building className="w-5 h-5 text-green-400" />
            <span>Informações do Estabelecimento</span>
          </h3>
          <button
            onClick={() => setEditMode(editMode === 'info' ? 'none' : 'info')}
            className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>{editMode === 'info' ? 'Cancelar' : 'Editar'}</span>
          </button>
        </div>

        {editMode === 'info' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Nome do responsável</label>
              <input
                type="text"
                value={formData.responsibleName}
                onChange={(e) => setFormData({...formData, responsibleName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Nome do estabelecimento</label>
              <input
                type="text"
                value={formData.establishmentName}
                onChange={(e) => setFormData({...formData, establishmentName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <button
              onClick={handleSaveInfo}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Salvar informações
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Responsável:</span>
              <span className="text-gray-300">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estabelecimento:</span>
              <span className="text-gray-300">{user.establishmentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">CPF/CNPJ:</span>
              <span className="text-gray-300">{user.cpfCnpj}</span>
            </div>
          </div>
        )}
      </div>

      {/* Address Info */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <span>Endereço do Estabelecimento</span>
          </h3>
          <button
            onClick={() => setEditMode(editMode === 'address' ? 'none' : 'address')}
            className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>{editMode === 'address' ? 'Cancelar' : 'Editar'}</span>
          </button>
        </div>

        {editMode === 'address' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Endereço completo</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                placeholder="Rua, Avenida..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Número</label>
                <input
                  type="text"
                  value={formData.houseNumber}
                  onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Bairro</label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Cidade</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Ponto de referência</label>
              <input
                type="text"
                value={formData.referencePoint}
                onChange={(e) => setFormData({...formData, referencePoint: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                placeholder="Próximo ao..."
              />
            </div>
            <button
              onClick={handleSaveAddress}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Salvar endereço
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-300">
            <p>{user.address}, {user.houseNumber}</p>
            <p>{user.neighborhood}, {user.city}</p>
            {user.referencePoint && <p className="text-gray-500">Ref: {user.referencePoint}</p>}
          </div>
        )}
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
            className="text-green-400 hover:text-green-300 text-sm flex items-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span>{editMode === 'credentials' ? 'Cancelar' : 'Alterar'}</span>
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
                required
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
              <label className="block text-gray-300 text-sm mb-1">Nova senha (mínimo 8 caracteres)</label>
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

      {/* Account Statistics */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-4">Estatísticas da Conta</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-xs text-gray-400">Entregas solicitadas</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-400">R$ {user.balance.toFixed(2)}</p>
            <p className="text-xs text-gray-400">Saldo atual</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-purple-400">-</p>
            <p className="text-xs text-gray-400">Avaliação média</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <p className="text-2xl font-bold text-yellow-400">
              {new Date(user.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <p className="text-xs text-gray-400">Membro desde</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>SAIR DA CONTA</span>
      </button>
    </div>
  );
}