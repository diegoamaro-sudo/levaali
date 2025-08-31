import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverOrders from './DriverOrders';
import DriverBalance from './DriverBalance';
import DriverProfile from './DriverProfile';
import BottomNavigation from '../../components/BottomNavigation';

export default function DriverDashboard() {
  return (
    <div className="min-h-screen bg-black pb-20">
      <Routes>
        <Route path="/" element={<DriverOrders />} />
        <Route path="/pedidos" element={<DriverOrders />} />
        <Route path="/saldo" element={<DriverBalance />} />
        <Route path="/perfil" element={<DriverProfile />} />
      </Routes>
      
      <BottomNavigation 
        userType="driver"
        items={[
          { key: 'pedidos', label: 'PEDIDOS', path: '/entregador/dashboard/pedidos' },
          { key: 'saldo', label: 'SALDO', path: '/entregador/dashboard/saldo' },
          { key: 'perfil', label: 'PERFIL', path: '/entregador/dashboard/perfil' }
        ]}
      />
    </div>
  );
}