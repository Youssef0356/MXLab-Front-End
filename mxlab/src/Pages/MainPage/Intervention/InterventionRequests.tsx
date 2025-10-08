import React, { useState, useEffect } from 'react';
import Layout from '../../../Components/Common/Layout';
import { Search, Eye, RotateCcw, Clock, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import interventionRequestsData from '../../../api/json-simulations/interventionRequests.json';
// Types for intervention data
type InterventionStatus = 'En Attente' | 'Approuvé' | 'Rejeté';

type Employee = {
  name: string;
  id: string;
  email: string;
  phone: string;
};

type InterventionRequest = {
  id: string;
  title: string;
  description: string;
  employee: Employee;
  status: InterventionStatus;
  submittedDate: string;
  priority?: 'Haute' | 'Moyenne' | 'Basse';
};

// Filter types
type FilterStatus = 'Toutes les demandes' | 'En attente' | 'Approuvées' | 'Rejetées';

const InterventionRequests: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('Toutes les demandes');
  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);

  // TODO: Replace with actual API call to fetch interventions
  // const { data: interventions, isLoading, error } = useQuery('interventions', fetchInterventions);

  const [interventions, setInterventions] = useState<InterventionRequest[]>([]);

  useEffect(() => {
    // Load data from JSON simulation
    setInterventions(interventionRequestsData as InterventionRequest[]);
  }, []);

  const filteredInterventions = interventions.filter(intervention => {
    const matchesSearch = intervention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.employee.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === 'Toutes les demandes' ||
      (activeFilter === 'En attente' && intervention.status === 'En Attente') ||
      (activeFilter === 'Approuvées' && intervention.status === 'Approuvé') ||
      (activeFilter === 'Rejetées' && intervention.status === 'Rejeté');

    return matchesSearch && matchesFilter;
  });

  // Status badge styling
  const getStatusBadge = (status: InterventionStatus) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'En Attente':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Approuvé':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Rejeté':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  // Filter button styling
  const getFilterButtonClass = (filter: FilterStatus) => {
    const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
    if (filter === activeFilter) {
      return `${baseClasses} bg-blue-600 text-white`;
    }
    return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  // Handle checkbox selection (single selection only)
  const handleCheckboxChange = (interventionId: string) => {
    if (selectedInterventionId === interventionId) {
      // If clicking on already selected checkbox, unselect it
      setSelectedInterventionId(null);
    } else {
      // Select the new intervention (automatically unselects previous)
      setSelectedInterventionId(interventionId);
    }
  };

  // TODO: Implement these functions when connecting to backend
  const handleStatusChange = (interventionId: string, newStatus: InterventionStatus) => {
    // TODO: API call to update intervention status
    // updateInterventionStatus(interventionId, newStatus);
    console.log(`Updating intervention ${interventionId} to ${newStatus}`);
  };

  const handleViewDetails = (interventionId: string) => {
    // TODO: Navigate to intervention details page or open modal
    // navigate(`/intervention-details/${interventionId}`);
    console.log(`Viewing details for intervention ${interventionId}`);
  };

  const handlePrint = (interventionId: string) => {
    // TODO: Generate and print intervention report
    // generateInterventionReport(interventionId);
    console.log(`Printing intervention ${interventionId}`);
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Demandes d'intervention
          </h1>
          <p className="text-slate-600">
            Passez en revue et gérez les demandes de maintenance
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des demandes"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (selectedInterventionId) {
                    navigate(`/interventionDetails/${selectedInterventionId}`);
                  } else {
                    alert("Veuillez sélectionner une intervention avant de continuer.");
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Eye className="w-4 h-4" />
                Voir
              </button>
            </div>


        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {(['Toutes les demandes', 'En attente', 'Approuvées', 'Rejetées'] as FilterStatus[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={getFilterButtonClass(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Interventions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
          <div className="col-span-1">
            <h2 className='w-8 h-8 text-center'>-</h2>
          </div>
          <div className="col-span-4">Détails de la demande</div>
          <div className="col-span-2">Employé</div>
          <div className="col-span-2">État</div>
          <div className="col-span-2">Soumis</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {filteredInterventions.map((intervention) => (
            <div key={intervention.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
              {/* Checkbox */}
              <div className="col-span-1 ">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 w-8 h-8"
                  checked={selectedInterventionId === intervention.id}
                  onChange={() => handleCheckboxChange(intervention.id)}
                />
              </div>

              {/* Details */}
              <div className="col-span-4">
                <div className="flex items-start gap-3">
                  {/* Priority Indicator */}
                  <div className={`w-3 h-3 rounded-full mt-1 ${intervention.priority === 'Haute' ? 'bg-red-500' :
                      intervention.priority === 'Moyenne' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{intervention.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{intervention.description}</p>
                  </div>
                </div>
              </div>

              {/* Employee */}
              <div className="col-span-2 flex items-center">
                <span className="text-gray-900">{intervention.employee.name}</span>
              </div>

              {/* Status */}
              <div className="col-span-2 flex items-center">
                <span className={getStatusBadge(intervention.status)}>
                  {intervention.status}
                </span>
              </div>

              {/* Submitted Date */}
              <div className="col-span-2 flex items-center">
                <span className="text-sm text-gray-600">{intervention.submittedDate}</span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center gap-2">
                <button
                  onClick={() => handleViewDetails(intervention.id)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Voir les détails"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleStatusChange(intervention.id, 'Approuvé')}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Approuver"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePrint(intervention.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Imprimer"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Plus d'options"
                >
                  <Clock className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInterventions.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune demande trouvée</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Essayez de modifier votre recherche' : 'Aucune demande d\'intervention pour le moment'}
            </p>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredInterventions.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Affichage de {filteredInterventions.length} demande(s) sur {interventions.length} au total
        </div>
      )}
    </div>
    </Layout >
  );
};

export default InterventionRequests;