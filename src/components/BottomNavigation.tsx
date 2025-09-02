import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Package, Wallet, User } from 'lucide-react';

interface NavItem {
  key: string;
  label: string;
  path: string;
}

interface BottomNavigationProps {
  userType: 'establishment' | 'driver';
  items: NavItem[];
}

export default function BottomNavigation({ userType, items }: BottomNavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const getIcon = (key: string) => {
    switch (key) {
      case 'pedidos': return Package;
      case 'saldo': return Wallet;
      case 'perfil': return User;
      default: return Package;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
      <div className="flex">
        {items.map((item) => {
          const Icon = getIcon(item.key);
          const isActive = location.pathname === item.path || 
            (location.pathname.includes(`/${userType}/dashboard`) && item.key === 'pedidos' && location.pathname === `/${userType}/dashboard`);

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-green-400 bg-green-900/20' 
                  : 'text-gray-400 hover:text-green-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}