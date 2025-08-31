import React, { useState } from 'react';
import { Check, X, Eye, Store, Bike, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

export default function AdminUsers() {
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<'establishments' | 'drivers' | 'pending'>('pending');

  const pendingDrivers: any[] = [];
  const establishments: any[] = [];
  const drivers: any[] = [];

  const handleApproveDriver = (driverId: string) => {
    addNotification({
      title: 'Entregador aprovado!',
      message: 'O entregador foi aprovado e pode começar a trabalhar',
      type: 'success'
    });
  };

  const handleRejectDriver = (driverId: string) => {
    addNotification({
      title: 'Entregador rejeitado',
      message: 'O entregador foi rejeitado e notificado',
      type: 'warning'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Gerenciamento de Usuários</h1>
        <p className="text-gray-400">Gerencie estabelecimentos e entregadores</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'pending' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Aprovações ({pendingDrivers.length})
        </button>
        <button
          onClick={() => setActiveTab('establishments')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'establishments' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4 inline mr-2" />
          Estabelecimentos
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            activeTab === 'drivers' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Bike className="w-4 h-4 inline mr-2" />
          Entregadores
        </button>
      </div>

      {/* Pending Approvals */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Entregadores Aguardando Aprovação</h3>
          
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-400">Nenhuma aprovação pendente</p>
            <p className="text-gray-500 text-sm">Novos cadastros de entregadores aparecerão aqui</p>
          </div>
        </div>
      )}

      {/* Establishments */}
      {activeTab === 'establishments' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Estabelecimentos Cadastrados</h3>
          
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <Store className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum estabelecimento cadastrado</p>
            <p className="text-gray-500 text-sm">Os estabelecimentos aparecerão aqui após o cadastro</p>
          </div>
        </div>
      )}

      {/* Drivers */}
      {activeTab === 'drivers' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Entregadores Ativos</h3>
          
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <Bike className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum entregador ativo</p>
            <p className="text-gray-500 text-sm">Os entregadores aprovados aparecerão aqui</p>
          </div>
        </div>
      )}
    </div>
  );
}