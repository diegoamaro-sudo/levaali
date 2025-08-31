import React, { useState } from 'react';
import { TrendingUp, Calendar, DollarSign, Users, Bike, Store, Download } from 'lucide-react';

export default function AdminFinancial() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const financialData = {
    today: {
      revenue: 0,
      commission: 0,
      deliveries: 0,
      establishments: 0,
      drivers: 0
    },
    week: {
      revenue: 0,
      commission: 0,
      deliveries: 0,
      establishments: 0,
      drivers: 0
    },
    month: {
      revenue: 0,
      commission: 0,
      deliveries: 0,
      establishments: 0,
      drivers: 0
    }
  };

  const data = financialData[selectedPeriod as keyof typeof financialData];

  const recentTransactions: any[] = [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Relatórios Financeiros</h1>
        <p className="text-gray-400">Acompanhe receitas e comissões da plataforma</p>
      </div>

      {/* Period Selection */}
      <div className="flex space-x-1 bg-slate-800 rounded-lg p-1 w-fit">
        <button
          onClick={() => setSelectedPeriod('today')}
          className={`py-2 px-4 rounded-md transition-colors ${
            selectedPeriod === 'today' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Hoje
        </button>
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`py-2 px-4 rounded-md transition-colors ${
            selectedPeriod === 'week' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Esta Semana
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`py-2 px-4 rounded-md transition-colors ${
            selectedPeriod === 'month' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Este Mês
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-center">
          <DollarSign className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Receita Total</p>
          <p className="text-3xl font-bold text-white">R$ {data.revenue.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-center">
          <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Comissão Arrecadada</p>
          <p className="text-3xl font-bold text-white">R$ {data.commission.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Entregas Realizadas</p>
          <p className="text-3xl font-bold text-white">{data.deliveries}</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Estatísticas Detalhadas</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Store className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Estabelecimentos ativos</span>
              </div>
              <span className="text-white font-semibold">{data.establishments}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bike className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Entregadores ativos</span>
              </div>
              <span className="text-white font-semibold">{data.drivers}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ticket médio por entrega</span>
              <span className="text-green-400 font-semibold">
                R$ {data.deliveries > 0 ? (data.revenue / data.deliveries).toFixed(2) : '0.00'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Comissão por entrega</span>
              <span className="text-blue-400 font-semibold">
                R$ {data.deliveries > 0 ? (data.commission / data.deliveries).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Transações Recentes</h3>
          
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Nenhuma transação ainda</p>
              <p className="text-gray-500 text-sm">As transações aparecerão aqui quando houver atividade</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-medium">R$ {txn.amount.toFixed(2)}</p>
                      <p className="text-gray-400 text-sm">{txn.description}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(txn.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      txn.type === 'commission' 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-blue-900 text-blue-200'
                    }`}>
                      {txn.type === 'commission' ? 'Comissão' : 'Taxa'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span>Evolução da Receita</span>
          </h3>
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
        
        <div className="bg-slate-700 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-gray-400">Gráfico de evolução da receita</p>
            <p className="text-sm text-gray-500">Os dados aparecerão quando houver transações</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">R$ {data.revenue.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">Receita total</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{data.deliveries}</p>
            <p className="text-gray-400 text-sm">Entregas realizadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">R$ {data.commission.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">Comissão total</p>
          </div>
        </div>
      </div>
    </div>
  );
}