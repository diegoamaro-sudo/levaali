import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Bike } from 'lucide-react';

export default function ProfileSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-2">LEVA ALI!</h1>
          <p className="text-gray-400">Conectando estabelecimentos e entregadores</p>
        </div>

        {/* Profile Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            O que você é?
          </h2>

          <button
            onClick={() => navigate('/estabelecimento/auth')}
            className="w-full bg-gray-900 hover:bg-gray-800 border-2 border-green-500 text-white p-6 rounded-lg transition-all duration-200 hover:border-green-400 hover:scale-105 group"
          >
            <div className="flex items-center justify-center space-x-4">
              <Store className="w-8 h-8 text-green-400 group-hover:text-green-300" />
              <span className="text-xl font-semibold">SOU ESTABELECIMENTO</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/entregador/auth')}
            className="w-full bg-gray-900 hover:bg-gray-800 border-2 border-green-500 text-white p-6 rounded-lg transition-all duration-200 hover:border-green-400 hover:scale-105 group"
          >
            <div className="flex items-center justify-center space-x-4">
              <Bike className="w-8 h-8 text-green-400 group-hover:text-green-300" />
              <span className="text-xl font-semibold">SOU ENTREGADOR</span>
            </div>
          </button>
        </div>

        {/* Admin Access */}
        <div className="text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-gray-500 hover:text-gray-400 text-sm underline"
          >
            Acesso Administrativo
          </button>
        </div>
      </div>
    </div>
  );
}