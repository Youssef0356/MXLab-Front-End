import React, { useState } from 'react';
import Layout from '../../../Components/Common/Layout';
import { Search, Eye, RotateCcw, Printer } from 'lucide-react';
import interventionListData from '../../../api/json-simulations/interventionList.json';

// Infer types from JSON data
type InterventionRequest = typeof interventionListData[0];
type FilterStatus = 'Toutes les demandes' | 'En attente' | 'Approuvées' | 'Rejetées';

const InterventionList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterStatus>('Toutes les demandes');
    const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);
    
    // Column width state for resizable columns
    const [columnWidths, setColumnWidths] = useState({
        checkbox: 48,    // 12 * 4 = 48px
        id: 64,          // 16 * 4 = 64px  
        description: 256, // 64 * 4 = 256px
        equipment: 320,   // 80 * 4 = 320px
        site: 128,        // 32 * 4 = 128px
        type: 128,        // 32 * 4 = 128px
        priority: 96,     // 24 * 4 = 96px
        date: 192,        // 48 * 4 = 192px
        technician: 128,  // 32 * 4 = 128px
        status: 128,      // 32 * 4 = 128px
        actions: 128      // 32 * 4 = 128px
    });
    
    // Resize state
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const [startX, setStartX] = useState(0);
    const [startWidth, setStartWidth] = useState(0);

    // TODO: Replace with actual API call to fetch interventions
    // const { data: interventions, isLoading, error } = useQuery('interventions', fetchInterventions);

    // Load data from JSON simulation directly
    const [interventions] = useState(interventionListData);

    const filteredInterventions = interventions.filter(intervention => {
        const matchesSearch = intervention.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intervention.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intervention.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intervention.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intervention.dateCreation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intervention.technicien.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intervention.etat.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = activeFilter === 'Toutes les demandes' ||
            (activeFilter === 'En attente' && intervention.etat === 'En Attente') ||
            (activeFilter === 'Approuvées' && intervention.etat === 'Approuvé') ||
            (activeFilter === 'Rejetées' && intervention.etat === 'Rejeté');

        return matchesSearch && matchesFilter;
    });

    // Status badge styling
    const getStatusBadge = (status: InterventionRequest['etat']) => {
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
    const handleStatusChange = (interventionId: string, newStatus: InterventionRequest['etat']) => {
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

    // Resize handlers
    const handleMouseDown = (e: React.MouseEvent, columnKey: string) => {
        e.preventDefault();
        setIsResizing(columnKey);
        setStartX(e.clientX);
        setStartWidth(columnWidths[columnKey as keyof typeof columnWidths]);
    };

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(50, startWidth + deltaX); // Minimum width of 50px
        
        setColumnWidths(prev => ({
            ...prev,
            [isResizing]: newWidth
        }));
    }, [isResizing, startX, startWidth]);

    const handleMouseUp = React.useCallback(() => {
        setIsResizing(null);
    }, []);

    // Cleanup event listeners on unmount and when dependencies change
    React.useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp]);

    // Resize handle component
    const ResizeHandle: React.FC<{ columnKey: string }> = ({ columnKey }) => (
        <div
            className={`absolute right-0 top-0 bottom-0 w-2 cursor-col-resize group transition-colors ${
                isResizing === columnKey 
                    ? 'bg-blue-500' 
                    : 'bg-transparent hover:bg-blue-400'
            }`}
            onMouseDown={(e) => handleMouseDown(e, columnKey)}
            title={`Resize ${columnKey} column`}
        >
            <div className={`w-full h-full transition-colors ${
                isResizing === columnKey 
                    ? 'bg-blue-500' 
                    : 'group-hover:bg-blue-400'
            }`} />
        </div>
    );

    return (
        <Layout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        liste des ordres d'interventions
                    </h1>
                    <p className="text-slate-600">
                        Aperçu Toutes les interventions créées et validées
                    </p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-left">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher les ordres d'intervention"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-1">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Eye className="w-4 h-4" />
                                Voir
                            </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
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
                </div>

                {/* Interventions Table */}
                <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${
                    isResizing ? 'select-none' : ''
                }`}>
                    {/* Horizontal Scroll Container */}
                    <div className="overflow-x-auto">
                        <div className="min-w-max">
                            {/* Table Header */}
                            <div className="flex bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                                <div className="relative flex-shrink-0 p-4 flex items-center justify-center" style={{ width: `${columnWidths.checkbox}px` }}>
                                    <span className="text-center">-</span>
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.id}px` }}>
                                    Id
                                    <ResizeHandle columnKey="id" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.description}px` }}>
                                    Description
                                    <ResizeHandle columnKey="description" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.equipment}px` }}>
                                    Equipement
                                    <ResizeHandle columnKey="equipment" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.site}px` }}>
                                    Site
                                    <ResizeHandle columnKey="site" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.type}px` }}>
                                    Type
                                    <ResizeHandle columnKey="type" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.priority}px` }}>
                                    Priorité
                                    <ResizeHandle columnKey="priority" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.date}px` }}>
                                    Date de soumission
                                    <ResizeHandle columnKey="date" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.technician}px` }}>
                                    Technicien
                                    <ResizeHandle columnKey="technician" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.status}px` }}>
                                    État
                                    <ResizeHandle columnKey="status" />
                                </div>
                                <div className="relative flex-shrink-0 p-4" style={{ width: `${columnWidths.actions}px` }}>
                                    Actions
                                </div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-200">
                                {filteredInterventions.map((intervention) => (
                                    <div key={intervention.id} className="flex hover:bg-gray-50 transition-colors">
                                        {/* Checkbox */}
                                        <div className="flex-shrink-0 p-4 flex items-center justify-center" style={{ width: `${columnWidths.checkbox}px` }}>
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 w-8 h-8"
                                                checked={selectedInterventionId === intervention.id}
                                                onChange={() => handleCheckboxChange(intervention.id)}
                                            />
                                        </div>

                                        {/* ID */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.id}px` }}>
                                            <span className="text-sm font-medium truncate">{intervention.id}</span>
                                        </div>

                                        {/* Description */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.description}px` }}>
                                            <div className="flex items-start gap-2 w-full">
                                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${intervention.priority === 'Haute' ? 'bg-red-500' :
                                                    intervention.priority === 'Moyenne' ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`} />
                                                <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">{intervention.description}</p>
                                            </div>
                                        </div>

                                        {/* Equipment */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.equipment}px` }}>
                                            <span className="text-sm text-gray-900 truncate w-full">{intervention.equipment}</span>
                                        </div>

                                        {/* Site */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.site}px` }}>
                                            <span className="text-sm text-gray-600 truncate w-full">{intervention.site}</span>
                                        </div>

                                        {/* Type */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.type}px` }}>
                                            <span className="text-sm text-gray-600 truncate w-full">{intervention.type}</span>
                                        </div>

                                        {/* Priority */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.priority}px` }}>
                                            <span className="text-sm text-gray-600 truncate">{intervention.priority}</span>
                                        </div>

                                        {/* Date */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.date}px` }}>
                                            <span className="text-sm text-gray-600 truncate">{intervention.dateCreation}</span>
                                        </div>

                                        {/* Technician */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.technician}px` }}>
                                            <span className="text-sm text-gray-600 truncate w-full">{intervention.technicien}</span>
                                        </div>

                                        {/* Status */}
                                        <div className="flex-shrink-0 p-4 flex items-center" style={{ width: `${columnWidths.status}px` }}>
                                            <span className={getStatusBadge(intervention.etat)}>
                                                {intervention.etat}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex-shrink-0 p-4 flex items-center gap-2" style={{ width: `${columnWidths.actions}px` }}>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
        </Layout>
    );
};

export default InterventionList;