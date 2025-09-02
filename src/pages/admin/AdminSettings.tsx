import React, { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { Settings, DollarSign, Percent, Calendar, CreditCard } from 'lucide-react';

export default function AdminSettings() {
  const { addNotification } = useNotification();
  const [settings, setSettings] = useState({
    pricePerKm: 1.50,
    commissionPercentage: 10,
    cancellationFee: 3.00,
    withdrawalFee: 5.00,
    paymentDay: 3, // Wednesday
    withdrawalFeeEnabled: true,
    appName: 'LEVA ALI!'
  });

  const handleSaveSettings = () => {
    // Mock save operation
    addNotification({
      title: 'Configurações salvas!',
      message: 'As alterações foram aplicadas com sucesso',
      type: 'success'
    });
  };

  const handleInjectBalance = () => {
    // Mock balance injection
    addNotification({
      title: 'Saldo injetado!',
      message: 'R$ 100,00 adicionados ao sistema para reembolsos',
      type: 'success'
    });
  };

  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Configurações do Sistema</h1>
        <p className="text-gray-400">Gerencie parâmetros da plataforma</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Settings */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            <span>Configurações de Preço</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Preço por KM (R$)</label>
              <input
                type="number"
                step="0.01"
                value={settings.pricePerKm}
                onChange={(e) => setSettings({...settings, pricePerKm: parseFloat(e.target.value)})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Comissão (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.commissionPercentage}
                onChange={(e) => setSettings({...settings, commissionPercentage: parseFloat(e.target.value)})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Taxa de Cancelamento (R$)</label>
              <input
                type="number"
                step="0.01"
                value={settings.cancellationFee}
                onChange={(e) => setSettings({...settings, cancellationFee: parseFloat(e.target.value)})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-green-400" />
            <span>Sistema de Pagamento</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Dia de Pagamento</label>
              <select
                value={settings.paymentDay}
                onChange={(e) => setSettings({...settings, paymentDay: parseInt(e.target.value)})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              >
                {dayNames.map((day, index) => (
                  <option key={index} value={index}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.withdrawalFeeEnabled}
                  onChange={(e) => setSettings({...settings, withdrawalFeeEnabled: e.target.checked})}
                  className="form-checkbox text-green-500 bg-slate-700 border-gray-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-300">Ativar taxa de saque antecipado</span>
              </label>
            </div>

            {settings.withdrawalFeeEnabled && (
              <div>
                <label className="block text-gray-300 mb-2">Taxa de Saque Antecipado (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.withdrawalFee}
                  onChange={(e) => setSettings({...settings, withdrawalFee: parseFloat(e.target.value)})}
                  className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Settings className="w-6 h-6 text-green-400" />
            <span>Configurações do App</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Nome do App</label>
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => setSettings({...settings, appName: e.target.value})}
                className="w-full bg-slate-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Financial Tools */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-green-400" />
            <span>Ferramentas Financeiras</span>
          </h3>
          
          <div className="space-y-4">
            <button
              onClick={handleInjectBalance}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Injetar R$ 100 para Reembolsos
            </button>
            
            <div className="text-xs text-gray-400 bg-slate-700 rounded p-3">
              💡 Use a injeção de saldo para processar reembolsos ou compensações especiais
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
        >
          SALVAR CONFIGURAÇÕES
        </button>
      </div>
    </div>
  );
}