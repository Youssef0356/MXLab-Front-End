import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../../Components/Common/Layout";
import { Building, ArrowLeft, Plus } from 'lucide-react';
import sitesData from '../../../api/json-simulations/Sites.json';

const SitesView: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/siteView');
  };

  const handleCreateSite = () => {
    navigate('/siteCreate');
  };

  // Site status management
  const [sites, setSites] = useState(sitesData.map(site => ({ ...site })));
  
  const statusTypes = [
    { id: 'en panne', label: 'En panne', color: 'bg-red-500', bgColor: 'bg-red-50' },
    { id: 'en cours de maintenance', label: 'En cours de maintenance', color: 'bg-yellow-500', bgColor: 'bg-yellow-50' },
    { id: 'bon etat', label: 'Bon état', color: 'bg-green-500', bgColor: 'bg-green-50' }
  ];

  const handleStatusChange = (siteId: string, newStatus: string) => {
    setSites(prevSites => 
      prevSites.map(site => 
        site.id === siteId ? { ...site, status: newStatus } : site
      )
    );
  };

  const handleDragStart = (e: React.DragEvent, statusType: string) => {
    e.dataTransfer.setData('text/plain', statusType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, siteId: string) => {
    e.preventDefault();
    const newStatus = e.dataTransfer.getData('text/plain');
    handleStatusChange(siteId, newStatus);
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Surveillance des sites
              </h1>
              <p className="text-slate-600">
                Gérez le statut de tous vos sites en temps réel
              </p>
            </div>
            
            <button 
              onClick={handleCreateSite}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter nouveau site
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Status Bar - Left Side */}
          <div className="w-80 bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              États des sites
            </h3>
            
            <div className="space-y-4">
              {statusTypes.map((statusType) => (
                <div
                  key={statusType.id}
                  className={`p-4 rounded-lg border-2 border-dashed border-gray-300 ${statusType.bgColor} cursor-move hover:border-gray-400 transition-colors`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, statusType.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${statusType.color}`}></div>
                    <span className="font-medium text-gray-900">{statusType.label}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Glissez-déposez sur un site pour changer son statut
                  </p>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="mt-8 space-y-4">
              <h4 className="font-semibold text-gray-900">Statistiques</h4>
              
              {statusTypes.map((statusType) => {
                const count = sites.filter(site => site.status === statusType.id).length;
                return (
                  <div key={statusType.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${statusType.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{statusType.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                );
              })}
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-t-2 border-blue-200">
                <span className="text-sm font-medium text-blue-700">Total des sites</span>
                <span className="text-sm font-bold text-blue-900">{sites.length}</span>
              </div>
            </div>
          </div>

          {/* Sites Grid - Right Side */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site: any) => {
                const statusType = statusTypes.find(st => st.id === site.status);
                return (
                  <div
                    key={site.id}
                    className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, site.id)}
                  >
                    {/* Site Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-gray-600 rounded-full flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        statusType?.id === 'bon etat' ? 'bg-green-100 text-green-800 border-green-200' :
                        statusType?.id === 'en cours de maintenance' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${statusType?.color || 'bg-gray-500'}`}></div>
                          {statusType?.label || site.status}
                        </div>
                      </div>
                    </div>

                    {/* Site Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{site.name}</h3>
                        <p className="text-sm text-gray-600 font-medium">ID: {site.id}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 text-gray-500">📍</div>
                          <span className="text-gray-600">{site.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 text-gray-500">👤</div>
                          <span className="text-gray-600">{site.manager}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 text-gray-500">📅</div>
                          <span className="text-gray-600">{site.dateCreated}</span>
                        </div>
                      </div>
                    </div>

                    {/* Drop Zone Indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        Déposez un statut ici pour modifier l'état du site
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SitesView;