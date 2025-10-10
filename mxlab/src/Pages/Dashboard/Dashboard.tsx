import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Common/Layout';
import { TrendingUp, CheckCircle, Clock, Wrench, BarChart3, Plus, Users, Map, Package, ClipboardList } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [stats] = useState({
    totalDemandes: 18,
    enAttente: 5,
    approuvees: 10,
    ordresActifs: 3,
    equipementsActifs: 12,
    equipementsEnMaintenance: 2
  });

  // Quick action buttons data
  const quickActions = [
    {
      title: 'Créer Intervention',
      description: 'Nouvelle demande d\'intervention',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      route: '/interventionCreate'
    },
    {
      title: 'Gérer Utilisateurs',
      description: 'Ajouter ou modifier utilisateurs',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      route: '/userList'
    },
    {
      title: 'Surveillance Sites',
      description: 'Voir tous les sites',
      icon: Map,
      color: 'bg-purple-500 hover:bg-purple-600',
      route: '/siteView'
    },
    {
      title: 'Équipements',
      description: 'Gérer les équipements',
      icon: Package,
      color: 'bg-orange-500 hover:bg-orange-600',
      route: '/equipmentsView'
    },
    {
      title: 'Historique Maintenance',
      description: 'Voir l\'historique complet',
      icon: Wrench,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      route: '/maintenanceHistory'
    },
    {
      title: 'Ordres d\'Intervention',
      description: 'Liste des demandes',
      icon: ClipboardList,
      color: 'bg-red-500 hover:bg-red-600',
      route: '/interventionRequests'
    }
  ];

  const kpiCards = [
    { title: 'Total des demandes', value: stats.totalDemandes, icon: BarChart3, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Demandes en attente', value: stats.enAttente, icon: Clock, color: 'bg-orange-500', trend: '+5%' },
    { title: 'Demandes approuvées', value: stats.approuvees, icon: CheckCircle, color: 'bg-green-500', trend: '+8%' },
    { title: 'Ordres actifs', value: stats.ordresActifs, icon: Wrench, color: 'bg-purple-500', trend: '+3%' }
  ];
      return (
        <Layout>
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Tableau de bord</h1>
              <p className="text-slate-600">Vue d'ensemble de la maintenance</p>
            </div>
    
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="flex items-center text-sm font-medium text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {card.trend}
                  </span>
                </div>
                <h3 className="text-slate-600 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-slate-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Actions Rapides */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Actions Rapides</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.slice(0, 4).map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.route)}
                  className={`${action.color} text-white rounded-xl p-4 transition-all duration-200 hover:shadow-lg flex flex-col items-center gap-3 text-center`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
    
          {/* Equipment Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">État des équipements</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Équipements actifs</p>
                      <p className="text-sm text-slate-600">Fonctionnement normal</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats.equipementsActifs}</span>
                </div>
    
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">En maintenance</p>
                      <p className="text-sm text-slate-600">Intervention en cours</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{stats.equipementsEnMaintenance}</span>
                </div>
              </div>
            </div>
    
            {/* Priorité des interventions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Priorité des interventions</h3>
              <div className="space-y-3">
                {[
                  { color: 'red', label: 'Urgente', width: '25%', value: 2 },
                  { color: 'orange', label: 'Haute', width: '50%', value: 4 },
                  { color: 'yellow', label: 'Moyenne', width: '75%', value: 6 },
                  { color: 'blue', label: 'Basse', width: '40%', value: 3 }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                    <div className="flex-1 mx-4 bg-slate-200 rounded-full h-2">
                      <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: item.width }}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </Layout>
  )
}

export default Dashboard;