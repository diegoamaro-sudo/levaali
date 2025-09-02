import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Wallet, Plus, CreditCard, QrCode, Copy } from 'lucide-react';
import { EstablishmentUser } from '../../types/User';

export default function EstablishmentBalance() {
  const { user } = useAuth() as { user: EstablishmentUser };
  const { addNotification } = useNotification();
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'qr_code'>('pix');

  const handleAddBalance = () => {
    const amount = parseFloat(addAmount);
    if (amount < 15) {
      addNotification({
        title: 'Valor mínimo',
        message: 'O valor mínimo para adicionar saldo é R$ 15,00',
        type: 'error'
      });
      return;
    }

    // Mock payment process
    addNotification({
      title: 'Pagamento processado!',
      message: `R$ ${amount.toFixed(2)} adicionados ao seu saldo`,
      type: 'success'
    });

    setShowAddBalance(false);
    setAddAmount('');
  };

  const copyPixCode = () => {
    const pixCode = '00020126330014BR.GOV.BCB.PIX013614996e3c-a3e8-4c4e-9f7e-4b8d2a1c6f3952040000530398654040.155802BR5925LEVA ALI PAGAMENTOS LTDA6009SAO PAULO62070503***6304ABCD';
    navigator.clipboard.writeText(pixCode);
    addNotification({
      title: 'Código copiado!',
      message: 'Cole no seu app de pagamento',
      type: 'success'
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-400">Saldo</h1>
        <p className="text-gray-400">{user.establishmentName}</p>
      </div>

      {/* Current Balance */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-center">
        <Wallet className="w-8 h-8 text-white mx-auto mb-2" />
        <p className="text-white/80 text-sm">Saldo atual</p>
        <p className="text-3xl font-bold text-white">R$ {user.balance.toFixed(2)}</p>
      </div>

      {/* Add Balance Info */}
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2">Como funciona o saldo?</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          O saldo é usado para pagar entregas com status "paga pelo cliente". 
          Quando você marca que o pedido já está pago, o valor é descontado do seu saldo 
          e transferido automaticamente para o entregador.
        </p>
      </div>

      {/* Add Balance Button */}
      {!showAddBalance ? (
        <button
          onClick={() => setShowAddBalance(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>ADICIONAR SALDO</span>
        </button>
      ) : (
        <div className="bg-gray-900 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-white">Adicionar Saldo</h3>
          
          <div>
            <label className="block text-gray-300 mb-2">Valor (mínimo R$ 15,00)</label>
            <input
              type="number"
              step="0.01"
              min="15"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="0,00"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <p className="text-gray-300 font-medium">Forma de pagamento:</p>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'pix'}
                onChange={() => setPaymentMethod('pix')}
                className="form-radio text-green-500"
              />
              <span className="text-white">PIX (Copiar e colar)</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'qr_code'}
                onChange={() => setPaymentMethod('qr_code')}
                className="form-radio text-green-500"
              />
              <span className="text-white">QR Code</span>
            </label>
          </div>

          {paymentMethod === 'pix' && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Código PIX:</span>
                <button
                  onClick={copyPixCode}
                  className="flex items-center space-x-1 text-green-400 hover:text-green-300"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copiar</span>
                </button>
              </div>
              <div className="bg-gray-700 rounded p-2 text-xs text-gray-300 font-mono break-all">
                00020126330014BR.GOV.BCB.PIX0136...
              </div>
            </div>
          )}

          {paymentMethod === 'qr_code' && (
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <QrCode className="w-24 h-24 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">QR Code para pagamento</p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddBalance(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddBalance}
              disabled={!addAmount || parseFloat(addAmount) < 15}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}