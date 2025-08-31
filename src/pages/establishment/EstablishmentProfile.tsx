import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { User, Building, MapPin, Mail, Lock, Upload, LogOut } from 'lucide-react';
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

  const handleSave = (section: string) => {
    // Mock save operation
    addNotification({
      title: 'Dados atualizados!',
      message: 'Suas informações foram salvas com sucesso',
      type: 'success'
    });
    setEditMode('none');
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

      {/* Profile Picture / Logo */}
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-10 h-10 text-green-400" />
        </div>
        <button className="text-green-400 hover:text-green-300 text-sm flex items-center justify-center space-x-2 mx-auto">
          <Upload className="w-4 h-4" />
          <span>Alterar logo</span>
        </button>
      </div>

      {/* Information Sections */}
      
      {/* Personal & Business Info */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <User className="w-5 h-5 text-green-400" />
            <span>Informações Pessoais</span>
          </h3>
          <button
            onClick={() => setEditMode(editMode === 'info' ? 'none' : 'info')}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            {editMode === 'info' ? 'Cancelar' : 'Editar'}
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
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">Nome do estabelecimento</label>
              <input
                type="text"
                value={formData.establishmentName}
                onChange={(e) => setFormData({...formData, establishmentName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleSave('info')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Salvar alterações
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">
              <span className="text-gray-500">Responsável:</span> {user.name}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-500">Estabelecimento:</span> {user.establishmentName}
            </p>
            <p className="text-gray-300">
              <span className="text-gray-500">CPF/CNPJ:</span> {user.cpfCnpj}
            </p>
          </div>
        )}
      </div>

      {/* Address Info */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <span>Endereço</span>
          </h3>
          <button
            onClick={() => setEditMode(editMode === 'address' ? 'none' : 'address')}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            {editMode === 'address' ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        {editMode === 'address' ? (
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Endereço</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
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
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Bairro</label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
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
              />
            </div>
            <button
              onClick={() => handleSave('address')}
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
            <span>Credenciais</span>
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
              onClick={() => handleSave('credentials')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              Salvar credenciais
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-300">
            <p>
              <span className="text-gray-500">Email:</span> {user.email}
            </p>
            <p className="text-gray-500">Senha: ••••••••</p>
          </div>
        )}
      </div>

      {/* Add Balance Modal */}
      {showAddBalance && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Adicionar Saldo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Valor (mínimo R$ 15,00)</label>
                <input
                  type="number"
                  step="0.01"
                  min="15"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddBalance(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddBalance}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
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