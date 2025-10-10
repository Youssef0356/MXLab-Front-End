import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../../Components/Common/Layout";
import { MapPin, Plus, Search, Building, Calendar, User } from 'lucide-react';
import sitesData from '../../../api/json-simulations/Sites.json';
import { utils, ROUTES } from '../../../services';

// Local interface matching the JSON data structure
interface SiteData {
  id: string;
  name: string;
  location: string;
  address: string;
  manager: string;
  status: 'bon etat' | 'en panne' | 'en cours de maintenance';
  dateCreated: string;
}

const SiteList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sites] = useState<SiteData[]>(sitesData as SiteData[]);

  // Filter sites based on search term
  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bon etat':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'en cours de maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en panne':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status;
  };

  const handleCreateSite = () => {
    navigate('/siteCreate');
  };

  const handleViewMap = () => {
    navigate('/siteCart');
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Liste des sites
              </h1>
              <p className="text-slate-600">
                Gérez et surveillez tous les sites de production
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleViewMap}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Carte globale
              </button>
              <button 
                onClick={handleCreateSite}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter nouveau site
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher des sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="relative group"
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/80">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-gray-50/30 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Site Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Site Name */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {site.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      ID: {site.id}
                    </p>
                  </div>

                  {/* Site Details */}
                  <div className="space-y-3 mb-6">
                    {/* Location */}
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 truncate">{site.location}</span>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600">{site.manager}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600">{site.dateCreated}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(site.status)}`}>
                      <div className={`w-2 h-2 rounded-full ${site.status === 'bon etat' ? 'bg-green-500' : site.status === 'en cours de maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      {getStatusText(site.status)}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Voir détails
                  </button>
                </div>

                {/* Glassmorphism Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSites.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun site trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Essayez de modifier votre recherche' 
                : 'Aucun site enregistré pour le moment'
              }
            </p>
            <button 
              onClick={handleCreateSite}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Créer le premier site
            </button>
          </div>
        )}

        {/* Results Summary */}
        {filteredSites.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Affichage de {filteredSites.length} site(s) sur {sites.length} au total
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SiteList;