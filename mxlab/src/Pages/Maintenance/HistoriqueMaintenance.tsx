import React, { useState, useEffect, useRef } from "react";
import Layout from "../../Components/Common/Layout";
import { Search, Filter, Calendar, User, Wrench, MapPin, GripVertical } from 'lucide-react';
import type { MaintenanceRecord } from '../../services/interfaces';

const HistoriqueMaintenance: React.FC = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MaintenanceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Column widths state
  const [columnWidths, setColumnWidths] = useState({
    id: 80,
    description: 250,
    equipement: 180,
    site: 80,
    dateDebut: 120,
    dateFin: 120,
    technicien: 120,
    type: 120,
    statut: 120
  });
  
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);

  // Load data from JSON file
  useEffect(() => {
    const loadMaintenanceData = async () => {
      try {
        const response = await fetch('/src/api/json-simulations/maintenanceHistory.json');
        const data = await response.json();
        setMaintenanceRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error('Error loading maintenance data:', error);
        // Fallback data if JSON fails to load
        const fallbackData: MaintenanceRecord[] = [
          {
            id: 'OI-001',
            description: 'Problème moteur du convoyeur',
            equipement: 'Moteur du convoyeur',
            site: 'A',
            dateDebut: '2023/10/02',
            dateFin: '2023/11/02',
            technicien: 'ALI',
            statut: 'completed',
            type: 'corrective'
          },
          {
            id: 'OI-002',
            description: 'Courroie du convoyeur usée',
            equipement: 'Courroie du convoyeur',
            site: 'B',
            dateDebut: '2023/09/15',
            dateFin: '2023/09/16',
            technicien: 'BACHIR',
            statut: 'completed',
            type: 'preventive'
          },
          {
            id: 'OI-003',
            description: 'Maintenance du capteur de position',
            equipement: 'Capteur de position',
            site: 'C',
            dateDebut: '2024/12/08',
            dateFin: '2025/01/01',
            technicien: 'FAHMI',
            statut: 'completed',
            type: 'corrective'
          }
        ];
        setMaintenanceRecords(fallbackData);
        setFilteredRecords(fallbackData);
      }
    };

    loadMaintenanceData();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = maintenanceRecords;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.equipement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.technicien.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(record => record.statut === filterStatus);
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(record => record.type === filterType);
    }

    setFilteredRecords(filtered);
  }, [searchTerm, filterStatus, filterType, maintenanceRecords]);

  // Column resizing functions
  const handleMouseDown = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    setIsResizing(columnKey);
    setStartX(e.clientX);
    setStartWidth(columnWidths[columnKey as keyof typeof columnWidths]);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const diff = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + diff); // Minimum width of 50px
    
    setColumnWidths(prev => ({
      ...prev,
      [isResizing]: newWidth
    }));
  };

  const handleMouseUp = () => {
    setIsResizing(null);
  };

  // Add event listeners for mouse move and up
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, startX, startWidth]);

  const getStatusBadge = (statut: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', text: 'Terminé' },
      in_progress: { color: 'bg-blue-100 text-blue-800', text: 'En cours' },
      planned: { color: 'bg-yellow-100 text-yellow-800', text: 'Planifié' }
    };
    const config = statusConfig[statut as keyof typeof statusConfig] || statusConfig.planned;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      preventive: { color: 'bg-blue-100 text-blue-800', text: 'Préventive' },
      corrective: { color: 'bg-orange-100 text-orange-800', text: 'Corrective' },
      emergency: { color: 'bg-red-100 text-red-800', text: 'Urgence' }
    };
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.corrective;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Historique de maintenance</h1>
          <p className="text-gray-600">Aperçu l'historique des maintenances</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="completed">Terminé</option>
                <option value="in_progress">En cours</option>
                <option value="planned">Planifié</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">Tous les types</option>
                <option value="preventive">Préventive</option>
                <option value="corrective">Corrective</option>
                <option value="emergency">Urgence</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-600">
                {filteredRecords.length} résultat(s) trouvé(s)
              </span>
            </div>
          </div>
        </div>

        {/* Maintenance Records Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table ref={tableRef} className="w-full table-fixed">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.id}px` }}
                    >
                      ID
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'id')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.description}px` }}
                    >
                      Description
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'description')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.equipement}px` }}
                    >
                      Équipement
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'equipement')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.site}px` }}
                    >
                      Site
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'site')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.dateDebut}px` }}
                    >
                      Date de début
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'dateDebut')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.dateFin}px` }}
                    >
                      Date de fin
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'dateFin')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.technicien}px` }}
                    >
                      Technicien
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'technicien')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                      style={{ width: `${columnWidths.type}px` }}
                    >
                      Type
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-300 flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, 'type')}
                      >
                        <GripVertical className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      style={{ width: `${columnWidths.statut}px` }}
                    >
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td 
                        className="px-6 py-4 text-sm font-medium text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.id}px` }}
                      >
                        <div className="truncate" title={record.id}>
                          {record.id}
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 text-sm text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.description}px` }}
                      >
                        <div className="truncate" title={record.description}>
                          {record.description}
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 text-sm text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.equipement}px` }}
                      >
                        <div className="flex items-center truncate">
                          <Wrench className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="truncate" title={record.equipement}>
                            {record.equipement}
                          </span>
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 text-sm text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.site}px` }}
                      >
                        <div className="flex items-center truncate">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="truncate" title={record.site}>
                            {record.site}
                          </span>
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 text-sm text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.dateDebut}px` }}
                      >
                        <div className="flex items-center truncate">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="truncate" title={record.dateDebut}>
                            {record.dateDebut}
                          </span>
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 text-sm text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.dateFin}px` }}
                      >
                        <div className="flex items-center truncate">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="truncate" title={record.dateFin}>
                            {record.dateFin}
                          </span>
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 text-sm text-gray-900 overflow-hidden"
                        style={{ width: `${columnWidths.technicien}px` }}
                      >
                        <div className="flex items-center truncate">
                          <User className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                          <span className="truncate" title={record.technicien}>
                            {record.technicien}
                          </span>
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 overflow-hidden"
                        style={{ width: `${columnWidths.type}px` }}
                      >
                        <div className="truncate">
                          {getTypeBadge(record.type)}
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 overflow-hidden"
                        style={{ width: `${columnWidths.statut}px` }}
                      >
                        <div className="truncate">
                          {getStatusBadge(record.statut)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune intervention planifiée pour le moment.
              </h3>
              <p className="text-gray-500">
                Les interventions de maintenance apparaîtront ici une fois planifiées.
              </p>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        {filteredRecords.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wrench className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Terminées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.filter(r => r.statut === 'completed').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Wrench className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En cours</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.filter(r => r.statut === 'in_progress').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Wrench className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Planifiées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.filter(r => r.statut === 'planned').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredRecords.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HistoriqueMaintenance;
