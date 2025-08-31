import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Wallet, TrendingUp, DollarSign, Calendar, Key } from 'lucide-react';
import { DriverUser } from '../../types/User';

export default function DriverBalance() {
  const { user } = useAuth() as { user: DriverUser };
  const { addNotification } = useNotification();
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showPixSetup, setShowPixSetup] = useState(false);
  const [pixKey, setPixKey] = useState(user.pixKey || '');
  const [pixType, setPixType] = useState('cpf');

  const handleWithdraw = () => {
    if (!user.pixKey) {
      addNotification({
        title: 'Configure sua chave PIX',
        message: 'É necessário configurar uma chave PIX para sacar',
        type: 'error'
      });
      setShowPixSetup(true);
      return;
    }

    const today = new Date().getDay();
    const isWednesday = today === 3;
    const fee = isWednesday ? 0 : 5;
    const withdrawAmount = user.balance - fee;

    if (withdrawAmount <= 0) {
      addNotification({
        title: 'Saldo insuficiente',
        message: `Saldo mínimo necessário: R$ ${fee + 0.01}`,
        type: 'error'
      });
      return;
    }

    // Mock withdrawal
    addNotification({
      title: 'Saque realizado!',
      message: `R$ ${withdrawAmount.toFixed(2)} enviado para sua chave PIX`,
      type: 'success'
    });
    
    setShowWithdraw(false);
  };

  const handlePixSave = () => {
    if (!pixKey.trim()) {
      addNotification({
        title: 'Chave PIX obrigatória',
        message: 'Digite uma chave PIX válida',
        type: 'error'
      });
      return;
    }

    addNotification({
      title: 'Chave PIX salva!',
      message: 'Agora você pode fazer saques',
      type: 'success'
    });
    
    setShowPixSetup(false);
  };

  const balanceColor = user.balance >= 0 ? 'text-green-400' : 'text-red-400';
  const balanceGradient = user.balance >= 0 
    ? 'from-green-600 to-green-700' 
    : 'from-red-600 to-red-700';

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-400">Saldo</h1>
        <p className="text-gray-400">{user.name}</p>
      </div>

      {/* Current Balance */}
      <div className={`bg-gradient-to-r ${balanceGradient} rounded-lg p-6 text-center`}>
        <Wallet className="w-8 h-8 text-white mx-auto mb-2" />
        <p className="text-white/80 text-sm">Saldo atual</p>
        <p className={`text-3xl font-bold text-white`}>
          R$ {user.balance.toFixed(2)}
        </p>
      </div>

      {/* Balance Info */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <span>Informações do Saldo</span>
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Ganhos hoje:</span>
            <span className="text-green-400">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Ganhos esta semana:</span>
            <span className="text-green-400">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Entregas realizadas:</span>
            <span className="text-white">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Próximo pagamento:</span>
            <span className="text-blue-400">Quarta-feira às 8h</span>
          </div>
        </div>
      </div>

      {/* Withdrawal Info */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-green-400" />
          <span>Sistema de Pagamento</span>
        </h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Pagamentos automáticos às quartas-feiras às 8h</p>
          <p>• Saque antecipado: taxa de R$ 5,00</p>
          <p>• Quartas-feiras: saque gratuito</p>
          <p className="text-green-400">• Saldo negativo será descontado do próximo pagamento</p>
        </div>
      </div>

      {/* PIX Key Status */}
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white flex items-center space-x-2">
            <Key className="w-5 h-5 text-green-400" />
            <span>Chave PIX</span>
          </h3>
          <button
            onClick={() => setShowPixSetup(true)}
            className="text-green-400 hover:text-green-300 text-sm"
          >
            {user.pixKey ? 'Alterar' : 'Configurar'}
          </button>
        </div>
        <p className="text-sm text-gray-400">
          {user.pixKey || 'Nenhuma chave PIX configurada'}
        </p>
      </div>

      {/* Withdraw Button */}
      <button
        onClick={() => setShowWithdraw(true)}
        disabled={user.balance <= 0}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
      >
        <DollarSign className="w-5 h-5" />
        <span>SACAR</span>
      </button>

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar Saque</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Saldo atual:</span>
                <span className="text-white">R$ {user.balance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Taxa de saque:</span>
                <span className="text-red-400">R$ 5,00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-white">Valor a receber:</span>
                <span className="text-green-400">R$ {(user.balance - 5).toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500">
                💡 Saques às quartas-feiras são gratuitos!
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdraw(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIX Setup Modal */}
      {showPixSetup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Configurar Chave PIX</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Tipo da chave</label>
                <select
                  value={pixType}
                  onChange={(e) => setPixType(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                >
                  <option value="cpf">CPF</option>
                  <option value="email">Email</option>
                  <option value="phone">Telefone</option>
                  <option value="random">Chave aleatória</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Chave PIX</label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder={
                    pixType === 'cpf' ? '000.000.000-00' :
                    pixType === 'email' ? 'seu@email.com' :
                    pixType === 'phone' ? '(11) 99999-9999' :
                    'chave-aleatoria-123'
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPixSetup(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handlePixSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}