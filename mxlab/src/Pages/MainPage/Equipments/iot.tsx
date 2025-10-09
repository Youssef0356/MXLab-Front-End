import React from 'react';
import Layout from "../../../Components/Common/Layout";
import { Wifi, Activity, Thermometer, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const IOT: React.FC = () => {
  // Mock IOT data
  const iotDevices = [
    {
      id: "IOT-001",
      name: "Capteur Température",
      type: "Température",
      status: "online",
      value: "23.5°C",
      location: "Site A - Zone 1",
      lastUpdate: "Il y a 2 minutes",
      battery: 85
    },
    {
      id: "IOT-002", 
      name: "Capteur Vibration",
      type: "Vibration",
      status: "online",
      value: "0.2 mm/s",
      location: "Site B - Machine 3",
      lastUpdate: "Il y a 1 minute",
      battery: 92
    },
    {
      id: "IOT-003",
      name: "Capteur Pression",
      type: "Pression",
      status: "offline",
      value: "-- bar",
      location: "Site C - Ligne 2",
      lastUpdate: "Il y a 15 minutes",
      battery: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'offline':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'température':
        return <Thermometer className="w-5 h-5 text-blue-600" />;
      case 'vibration':
        return <Activity className="w-5 h-5 text-purple-600" />;
      case 'pression':
        return <Zap className="w-5 h-5 text-orange-600" />;
      default:
        return <Wifi className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            IOT - Surveillance des Équipements
          </h1>
          <p className="text-slate-600">
            Surveillance en temps réel des capteurs et équipements connectés
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Capteurs Actifs</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Capteurs Hors Ligne</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Capteurs</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <Wifi className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Batterie Faible</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* IOT Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {iotDevices.map((device) => (
            <div
              key={device.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Device Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(device.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.id}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(device.status)}`}>
                  {getStatusIcon(device.status)}
                  {device.status === 'online' ? 'En ligne' : 'Hors ligne'}
                </div>
              </div>

              {/* Device Value */}
              <div className="mb-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{device.value}</p>
                  <p className="text-sm text-gray-600">{device.type}</p>
                </div>
              </div>

              {/* Device Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Localisation:</span>
                  <span className="font-medium text-gray-900">{device.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière mise à jour:</span>
                  <span className="font-medium text-gray-900">{device.lastUpdate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Batterie:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          device.battery > 50 ? 'bg-green-500' : 
                          device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900">{device.battery}%</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Voir détails
              </button>
            </div>
          ))}
        </div>

        {/* Real-time Data Section */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Données en Temps Réel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Température Moyenne</p>
              <p className="text-xl font-bold text-blue-600">23.5°C</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Vibration Moyenne</p>
              <p className="text-xl font-bold text-purple-600">0.2 mm/s</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Consommation</p>
              <p className="text-xl font-bold text-orange-600">1.2 kW</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IOT;