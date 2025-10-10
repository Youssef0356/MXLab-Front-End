import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../../../Components/Common/Layout";
import { Plus, QrCode, Search } from 'lucide-react';
import equipmentsData from '../../../api/json-simulations/Equipments.json';

interface Button {
  name: string;
  images: string;
  modelPartName: string;
}

interface PartDescription {
  key: string;
  value: string;
}

interface Parts {
  id: string;
  description: PartDescription[];
  video: string;
  datasheetUrl: string;
}

interface EquipmentData {
  id: string;
  name: string;
  reference: string;
  location: string;
  Images: string;
  qrCode: string;
  Videos?: string;
  datasheet?: string;
  description: PartDescription[];
  dateCreated: string;
  buttons?: Button[];
  parts?: Parts[];
}

const ListeEquipment: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [equipments] = useState<EquipmentData[]>(equipmentsData as EquipmentData[]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData | null>(null);

  // Filter equipments based on search term
  const filteredEquipments = equipments.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEquipment = () => {
    navigate('/equipmentsCreate');
  };

  const handleShowQR = (equipment: EquipmentData) => {
    setSelectedEquipment(equipment);
    setShowQRModal(true);
  };

  const closeQRModal = () => {
    setShowQRModal(false);
    setSelectedEquipment(null);
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Liste des équipements
              </h1>
              <p className="text-slate-600">
                Liste complète et détaillée des équipements
              </p>
            </div>
            
            <button 
              onClick={handleCreateEquipment}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter nouveau équipement
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher des équipements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipments.map((equipment) => (
            <div
              key={equipment.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {/* Equipment Image */}
              <div className="mb-4">
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={equipment.Images || "/api/placeholder/300/200"}
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Equipment Info */}
              <div className="space-y-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {equipment.name}
                </h3>
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Référence:</span> {equipment.reference}</p>
                  <p><span className="font-medium">Localisation:</span> {equipment.location}</p>
                  {equipment.parts && equipment.parts.length > 0 && (
                    <p><span className="font-medium">Parties:</span> {equipment.parts.map(p => p.id).join(', ')}</p>
                  )}
                  {equipment.buttons && equipment.buttons.length > 0 && (
                    <p><span className="font-medium">Fonction:</span> {equipment.buttons[0].name}</p>
                  )}
                </div>
              </div>

              {/* QR Code Button */}
              <button
                onClick={() => handleShowQR(equipment)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                Voir QR
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEquipments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun équipement trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Essayez de modifier votre recherche' 
                : 'Aucun équipement enregistré pour le moment'
              }
            </p>
            <button 
              onClick={handleCreateEquipment}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Créer le premier équipement
            </button>
          </div>
        )}

        {/* Results Summary */}
        {filteredEquipments.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Affichage de {filteredEquipments.length} équipement(s) sur {equipments.length} au total
            </p>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedEquipment.name}
              </h3>
              
              {/* QR Code Display */}
              <div className="mb-6">
                <div className="w-64 h-64 mx-auto bg-white border-4 border-blue-500 rounded-lg p-4 flex items-center justify-center">
                  {/* QR Code Placeholder - In real app, you'd generate actual QR codes */}
                  <div className="w-full h-full bg-black" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23fff'/%3E%3Crect x='30' y='10' width='10' height='10' fill='%23fff'/%3E%3Crect x='50' y='10' width='10' height='10' fill='%23fff'/%3E%3Crect x='70' y='10' width='10' height='10' fill='%23fff'/%3E%3Crect x='10' y='30' width='10' height='10' fill='%23fff'/%3E%3Crect x='30' y='30' width='10' height='10' fill='%23fff'/%3E%3Crect x='50' y='30' width='10' height='10' fill='%23fff'/%3E%3Crect x='70' y='30' width='10' height='10' fill='%23fff'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover'
                  }}>
                  </div>
                </div>
              </div>

              {/* Equipment Info in Modal */}
              <div className="text-sm text-gray-600 mb-6">
                <p className="font-medium">{selectedEquipment.name}</p>
                <p>Référence: {selectedEquipment.reference}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={closeQRModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListeEquipment;