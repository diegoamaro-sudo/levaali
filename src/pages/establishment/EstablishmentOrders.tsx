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
  const [paymentType, setPaymentType] = useState<'cash' | 'card_machine' | 'paid'>('cash');
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
    const pricePerKm = 1.50; // This would come from admin settings
    const basePrice = distance * pricePerKm;
    const returnPrice = (paymentType === 'cash' || paymentType === 'card_machine') ? distance * pricePerKm : 0;
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

    if (paymentType === 'cash' && needsChange) {
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
      returnTrip: paymentType === 'cash' || paymentType === 'card_machine',
      returnPrice: (paymentType === 'cash' || paymentType === 'card_machine') ? 3.45 : 0,
      totalPrice,
      commission: totalPrice * 0.10,
      driverEarnings: totalPrice * 0.90,
      paymentMethod: paymentType,
      cashDetails: paymentType === 'cash' && needsChange ? {
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
    setPaymentType('cash');
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
          <h4 className="font-medium text-white">Forma de pagamento:</h4>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === 'paid'}
              onChange={() => setPaymentType('paid')}
              className="form-radio text-green-500 bg-gray-800 border-gray-600 focus:ring-green-500"
            />
            <span className="text-gray-300">PEDIDO PAGO</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === 'cash'}
              onChange={() => setPaymentType('cash')}
              className="form-radio text-green-500 bg-gray-800 border-gray-600 focus:ring-green-500"
            />
            <span className="text-gray-300">PAGAMENTO DINHEIRO</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === 'card_machine'}
              onChange={() => setPaymentType('card_machine')}
              className="form-radio text-green-500 bg-gray-800 border-gray-600 focus:ring-green-500"
            />
            <span className="text-gray-300">PAGAMENTO CARTÃO</span>
          </label>

          {(paymentType === 'cash' || paymentType === 'card_machine') && (
            <div className="ml-6 p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <p className="text-yellow-200 text-sm">
                ⚠️ O entregador precisará retornar ao estabelecimento após a entrega.
                Será cobrado o valor de retorno baseado na distância.
              </p>
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-green-400 font-semibold">
            Valor estimado: R$ {calculatePrice().toFixed(2)}
          </p>
          {(paymentType === 'cash' || paymentType === 'card_machine') && (
            <p className="text-sm text-gray-400">Inclui valor de retorno ao estabelecimento</p>
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