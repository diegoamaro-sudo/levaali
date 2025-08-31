import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { Clock, DollarSign, CreditCard, MapPin, MessageCircle } from 'lucide-react';
import { Order } from '../../types/Order';
import { DriverUser } from '../../types/User';

export default function DriverOrders() {
  const { user } = useAuth() as { user: DriverUser };
  const { addNotification, playSound } = useNotification();
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [acceptingOrder, setAcceptingOrder] = useState<string | null>(null);

  const handleAcceptOrder = (orderId: string) => {
    setAcceptingOrder(orderId);
    
    // Mock acceptance delay
    setTimeout(() => {
      const order = availableOrders.find(o => o.id === orderId);
      if (order) {
        const acceptedOrder = {
          ...order,
          status: 'accepted' as const,
          driverId: user.id,
          acceptedAt: new Date().toISOString()
        };
        
        setActiveOrders(prev => [acceptedOrder, ...prev]);
        setAvailableOrders(prev => prev.filter(o => o.id !== orderId));
        
        addNotification({
          title: 'Pedido aceito!',
          message: 'Dirija-se ao estabelecimento para coletar',
          type: 'success'
        });
      }
      setAcceptingOrder(null);
    }, 1000);
  };

  const handleCompleteDelivery = (orderId: string) => {
    setActiveOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'delivered', deliveredAt: new Date().toISOString() }
        : order
    ));

    const order = activeOrders.find(o => o.id === orderId);
    if (order) {
      playSound('money');
      addNotification({
        title: 'Entrega concluída!',
        message: `Você ganhou R$ ${order.driverEarnings.toFixed(2)}`,
        type: 'success'
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-400">LEVA ALI!</h1>
        <p className="text-gray-400">Olá, {user.name}</p>
        <p className="text-sm text-gray-500">
          Saldo: R$ {user.balance.toFixed(2)} • 
          Cancelamentos hoje: {user.cancellationsToday}
        </p>
      </div>

      {/* Available Orders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Pedidos Disponíveis</h3>
        
        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <Clock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-400">Nenhum pedido disponível</p>
          <p className="text-sm text-gray-500">Novos pedidos aparecerão aqui automaticamente</p>
        </div>
      </div>

      {/* Active Deliveries */}
      {activeOrders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Suas Entregas</h3>
          
          {activeOrders.map((order) => (
            <div key={order.id} className="bg-gray-900 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-white">{order.establishmentName}</h4>
                  <p className="text-sm text-gray-400">#{order.id.slice(-6)}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                    EM ROTA
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <p><strong>Destino:</strong> {order.deliveryAddress}</p>
                <p><strong>Valor:</strong> R$ {order.driverEarnings.toFixed(2)}</p>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>Ver Rota</span>
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              </div>

              <button
                onClick={() => handleCompleteDelivery(order.id)}
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                CONCLUIR ENTREGA
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}