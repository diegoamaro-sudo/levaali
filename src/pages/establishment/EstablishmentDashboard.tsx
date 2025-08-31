import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import EstablishmentOrders from './EstablishmentOrders';
import EstablishmentBalance from './EstablishmentBalance';
import EstablishmentProfile from './EstablishmentProfile';
import BottomNavigation from '../../components/BottomNavigation';

export default function EstablishmentDashboard() {
  return (
    <div className="min-h-screen bg-black pb-20">
      <Routes>
        <Route path="/" element={<EstablishmentOrders />} />
        <Route path="/pedidos" element={<EstablishmentOrders />} />
        <Route path="/saldo" element={<EstablishmentBalance />} />
        <Route path="/perfil" element={<EstablishmentProfile />} />
      </Routes>
      
      <BottomNavigation 
        userType="establishment"
        items={[
          { key: 'pedidos', label: 'PEDIDOS', path: '/estabelecimento/dashboard/pedidos' },
          { key: 'saldo', label: 'SALDO', path: '/estabelecimento/dashboard/saldo' },
          { key: 'perfil', label: 'PERFIL', path: '/estabelecimento/dashboard/perfil' }
        ]}
      />
    </div>
  );
}