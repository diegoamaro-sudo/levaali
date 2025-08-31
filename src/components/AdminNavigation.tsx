import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Users, Settings, DollarSign, LogOut, Shield } from 'lucide-react';

export default function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
    { key: 'usuarios', label: 'Usuários', path: '/admin/dashboard/usuarios', icon: Users },
    { key: 'financeiro', label: 'Financeiro', path: '/admin/dashboard/financeiro', icon: DollarSign },
    { key: 'configuracoes', label: 'Configurações', path: '/admin/dashboard/configuracoes', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-gray-700">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="text-xl font-bold text-white">LEVA ALI!</h1>
            <p className="text-green-400 text-sm">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (location.pathname === '/admin/dashboard' && item.key === 'dashboard');

            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  isActive 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}