import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../Components/Common/Layout";
import { User, Mail, Phone, MapPin, Shield, Search, Plus } from 'lucide-react';
import usersData from '../../api/json-simulations/users.json';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  privilege: string;
  location: string;
  dateCreation: string;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<UserData[]>(usersData);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.privilege.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPrivilegeColor = (privilege: string) => {
    switch (privilege.toLowerCase()) {
      case 'superviseur':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  

  const handleCreateUser = () => {
    navigate('/userCreate');
  };

  const handleViewUser = (userId: string) => {
    navigate(`/userView/${userId}`);
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Liste des utilisateurs
              </h1>
              <p className="text-slate-600">
                Liste complète et détaillée des utilisateurs enregistrés
              </p>
            </div>
            
            <button 
              onClick={handleCreateUser}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Créer nouveau utilisateur
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher des utilisateurs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="relative group"
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/80">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-gray-50/30 rounded-2xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* User Name */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      ID: {user.id}
                    </p>
                  </div>

                  {/* User Details */}
                  <div className="space-y-3 mb-6">
                    {/* Email */}
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 truncate">{user.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 truncate">{user.location}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Privilege Badge */}
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getPrivilegeColor(user.privilege)}`}>
                      <Shield className="w-3 h-3" />
                      {user.privilege}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleViewUser(user.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Voir profil
                  </button>
                </div>

                {/* Glassmorphism Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun utilisateur trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Essayez de modifier votre recherche' 
                : 'Aucun utilisateur enregistré pour le moment'
              }
            </p>
            <button 
              onClick={handleCreateUser}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Créer le premier utilisateur
            </button>
          </div>
        )}

        {/* Results Summary */}
        {filteredUsers.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Affichage de {filteredUsers.length} utilisateur(s) sur {users.length} au total
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserList;