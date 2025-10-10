import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../../Components/Common/Layout";
import { User, Mail, Phone, MapPin, Shield, Calendar, ArrowLeft, Edit } from 'lucide-react';
import usersData from '../../api/json-simulations/users.json';


const UserView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Directly find the user from static data
  const user = usersData.find(u => u.id === id) || null;

  const handleBack = () => {
    navigate('/userList');
  };

  const handleEdit = () => {
    navigate(`/userCreate/${id}`);
  };

  const getPrivilegeColor = (privilege: string) => {
    switch (privilege.toLowerCase()) {
      case 'superviseur':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Utilisateur non trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                L'utilisateur avec l'ID "{id}" n'existe pas.
              </p>
              <button 
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à la liste
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
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
                  Profil de l'utilisateur
                </h1>
                <p className="text-slate-600">
                  Informations détaillées de l'utilisateur
                </p>
              </div>
            </div>
          </div>

          {/* User Profile Card with Glassmorphism */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-200/30 rounded-full blur-xl"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Header with Gradient */}
              <div className="relative bg-gradient-to-r from-blue-600/90 to-gray-600/90 p-8 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* User Basic Info */}
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                    <p className="text-blue-100 text-lg font-medium mb-2">ID: {user.id}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">{user.privilege}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      Informations de contact
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Email */}
                      <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Adresse e-mail</p>
                          <p className="text-gray-900 font-medium">{user.email}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Téléphone</p>
                          <p className="text-gray-900 font-medium">{user.phone}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Localisation</p>
                          <p className="text-gray-900 font-medium">{user.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-gray-600" />
                      Informations du compte
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Creation Date */}
                      <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Date de création</p>
                          <p className="text-gray-900 font-medium">{user.dateCreation}</p>
                        </div>
                      </div>

                      {/* Privilege */}
                      <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium">Privilège</p>
                          <div className="mt-1">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getPrivilegeColor(user.privilege)}`}>
                              <Shield className="w-3 h-3" />
                              {user.privilege}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* User ID */}
                      <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Identifiant utilisateur</p>
                          <p className="text-gray-900 font-medium font-mono">{user.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleEdit}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Modifier le profil
                    </button>
                    <button 
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Retour à la liste
                    </button>
                  </div>
                </div>
              </div>

              {/* Glassmorphism overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-500/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserView;