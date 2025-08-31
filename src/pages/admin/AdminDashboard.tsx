import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOverview from './AdminOverview';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import AdminFinancial from './AdminFinancial';
import AdminNavigation from '../../components/AdminNavigation';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-900">
      <AdminNavigation />
      
      <div className="pl-64">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/usuarios" element={<AdminUsers />} />
          <Route path="/configuracoes" element={<AdminSettings />} />
          <Route path="/financeiro" element={<AdminFinancial />} />
        </Routes>
      </div>
    </div>
  );
}