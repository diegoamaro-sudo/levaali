import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { MapPin, CreditCard, DollarSign, Clock, MessageCircle } from 'lucide-react';
import { Order } from '../../types/Order';
import { EstablishmentUser } from '../../types/User';

export default function EstablishmentOrders() {
  const { user } = useAuth() as { user: EstablishmentUser };
  const { addNotification, playSound } = useNotification();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [needsCardMachine, setNeedsCardMachine] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [needsChange, setNeedsChange] = useState(false);
  const [cashDetails, setCashDetails] = useState({
    orderValue: '',
    customerPayment: '',
    change: ''
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [onlineDrivers] = useState(0); // Limpo - sem entregadores online

  const calculatePrice = () => {
    const distance = 2.3; // Mock distance calculation
    const basePrice = distance * 1.50;
    const returnPrice = needsCardMachine ? distance * 1.50 : 0;
    return basePrice + returnPrice;
  };

  const handleRequestDelivery = () => {
    if (!deliveryAddress.trim()) {
      addNotification({
        title: 'Endereço obrigatório',
        message: 'Por favor, informe o endereço de entrega',
        type: 'error'
      });
      return;
    }

    if (isCash && needsChange) {
      if (!cashDetails.orderValue || !cashDetails.customerPayment) {
        addNotification({
          title: 'Informações incompletas',
          message: 'Preencha os dados do pagamento em dinheiro',
          type: 'error'
        });
        return;
      }
    }

    const totalPrice = calculatePrice();
    
    if (user.balance < totalPrice) {
      addNotification({
        title: 'Saldo insuficiente',
        message: 'Adicione saldo à sua conta para solicitar entregas',
        type: 'error'
      });
      return;
    }

    // Mock order creation
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      establishmentId: user.id,
      establishmentName: user.establishmentName,
      establishmentAddress: user.address,
      deliveryAddress,
      deliveryNeighborhood: 'Centro', // Mock
      deliveryCity: user.city,
      distance: 2.3,
      basePrice: 3.45,
      returnTrip: needsCardMachine,
      returnPrice: needsCardMachine ? 3.45 : 0,
      totalPrice,
      commission: totalPrice * 0.10,
      driverEarnings: totalPrice * 0.90,
      paymentMethod: isPaid ? 'paid' : isCash ? 'cash' : 'card_machine',
      cashDetails: isCash && needsChange ? {
        orderValue: parseFloat(cashDetails.orderValue),
        customerPayment: parseFloat(cashDetails.customerPayment),
        change: parseFloat(cashDetails.customerPayment) - parseFloat(cashDetails.orderValue)
      } : undefined,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Reset form
    setDeliveryAddress('');
    setNeedsCardMachine(false);
    setIsPaid(false);
    setIsCash(false);
    setNeedsChange(false);
    setCashDetails({ orderValue: '', customerPayment: '', change: '' });

    addNotification({
      title: 'Pedido enviado!',
      message: 'Procurando entregadores disponíveis...',
      type: 'success'
    });
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: 'Procurando entregador',
      accepted: 'Entregador a caminho',
      picked_up: 'Pedido coletado',
      in_transit: 'Em rota para entrega',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colorMap = {
      pending: 'text-yellow-400',
      accepted: 'text-blue-400',
      picked_up: 'text-purple-400',
      in_transit: 'text-green-400',
      delivered: 'text-green-500',
      cancelled: 'text-red-400'
    };
    return colorMap[status];
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-400">LEVA ALI!</h1>
        <p className="text-gray-400">Olá, {user.establishmentName}</p>
        <p className="text-sm text-gray-500">{onlineDrivers} entregadores online</p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center border border-gray-700">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <p className="text-gray-400">Mapa em tempo real</p>
          <p className="text-sm text-gray-500">Entregadores disponíveis na área</p>
        </div>
      </div>

      {/* Delivery Request Form */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold text-green-400">QUERO ENTREGAR ALGO</h3>
        
        <div>
          <label className="block text-gray-300 mb-2">Para onde será a entrega?</label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Digite o endereço completo..."
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        {/* Payment Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-white">Opções de pagamento:</h4>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={needsCardMachine}
              onChange={(e) => setNeedsCardMachine(e.target.checked)}
              className="form-checkbox text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
            />
            <span className="text-gray-300">Minha entrega vai precisar levar sua maquineta?</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="form-checkbox text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
            />
            <span className="text-gray-300">MEU PEDIDO ESTÁ PAGO</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isCash}
              onChange={(e) => {
                setIsCash(e.target.checked);
                if (!e.target.checked) {
                  setNeedsChange(false);
                  setCashDetails({ orderValue: '', customerPayment: '', change: '' });
                }
              }}
              className="form-checkbox text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
            />
            <span className="text-gray-300">MEU PEDIDO SERÁ EM DINHEIRO</span>
          </label>

          {isCash && (
            <div className="ml-6 space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsChange}
                  onChange={(e) => setNeedsChange(e.target.checked)}
                  className="form-checkbox text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-300">Seu pedido precisa levar troco?</span>
              </label>
              
              {needsChange && (
                <textarea
                  value={`Valor do pedido: R$ ${cashDetails.orderValue}\nCliente pagará: R$ ${cashDetails.customerPayment}\nTroco: R$ ${cashDetails.change}`}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    setCashDetails({
                      orderValue: lines[0]?.replace(/[^\d.,]/g, '') || '',
                      customerPayment: lines[1]?.replace(/[^\d.,]/g, '') || '',
                      change: lines[2]?.replace(/[^\d.,]/g, '') || ''
                    });
                  }}
                  placeholder="Valor do pedido: R$ 25,00&#10;Cliente pagará: R$ 30,00&#10;Troco: R$ 5,00"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none resize-none"
                  rows={3}
                />
              )}
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-green-400 font-semibold">
            Valor estimado: R$ {calculatePrice().toFixed(2)}
          </p>
          {needsCardMachine && (
            <p className="text-sm text-gray-400">Inclui volta para devolver maquineta</p>
          )}
        </div>

        <button
          onClick={handleRequestDelivery}
          disabled={!deliveryAddress}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
        >
          CHAMAR UM ENTREGADOR
        </button>
      </div>

      {/* Active Orders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Seus Pedidos</h3>
        {orders.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <Clock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">Nenhum pedido ativo</p>
            <p className="text-sm text-gray-500">Seus pedidos aparecerão aqui</p>
          </div>
        ) : (
          orders.slice(0, 10).map((order) => (
            <div key={order.id} className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-white">#{order.id.slice(-6)}</p>
                  <p className="text-sm text-gray-400">{order.deliveryAddress}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} bg-gray-800`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>R$ {order.totalPrice.toFixed(2)}</span>
                <div className="flex items-center space-x-2">
                  {order.paymentMethod === 'card_machine' && <CreditCard className="w-4 h-4" />}
                  {order.paymentMethod === 'cash' && <DollarSign className="w-4 h-4" />}
                  {['accepted', 'picked_up', 'in_transit'].includes(order.status) && (
                    <button className="text-green-400 hover:text-green-300">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}