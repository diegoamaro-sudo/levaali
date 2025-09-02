import React from 'react';
import { Users, Store, Bike, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function AdminOverview() {
  const stats = {
    totalEstablishments: 0,
    totalDrivers: 0,
    pendingApprovals: 0,
    todayRevenue: 0,
    monthRevenue: 0,
    activeDeliveries: 0,
    completedToday: 0
  };

  const recentActivity: any[] = [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
        <p className="text-gray-400">Visão geral da plataforma LEVA ALI!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Estabelecimentos</p>
              <p className="text-2xl font-bold text-white">{stats.totalEstablishments}</p>
            </div>
            <Store className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Entregadores</p>
              <p className="text-2xl font-bold text-white">{stats.totalDrivers}</p>
            </div>
            <Bike className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800 border border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Aprovações Pendentes</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingApprovals}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-slate-800 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Hoje</p>
              <p className="text-2xl font-bold text-green-400">R$ {stats.todayRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <span>Receita Mensal</span>
        </h3>
        
        <div className="bg-slate-700 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <p className="text-gray-400">Gráfico de receita</p>
            <p className="text-sm text-gray-500">Os dados aparecerão quando houver atividade na plataforma</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">R$ {stats.monthRevenue.toFixed(2)}</p>
            <p className="text-gray-400 text-sm">Este mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{stats.activeDeliveries}</p>
            <p className="text-gray-400 text-sm">Entregas ativas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{stats.completedToday}</p>
            <p className="text-gray-400 text-sm">Concluídas hoje</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Atividade Recente</h3>
        
        {recentActivity.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhuma atividade recente</p>
            <p className="text-gray-500 text-sm">As atividades da plataforma aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.title}</p>
                  <p className="text-gray-400 text-xs">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}