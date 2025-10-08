import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../../Components/Common/Layout';
import { ChevronDown, Upload, X } from 'lucide-react';
import interventionRequestsData from '../../../api/json-simulations/interventionRequests.json';
import usersData from '../../../api/json-simulations/users.json';

// Types for form data
type InterventionFormData = {
  title: string;
  type: string;
  description: string;
  priority: string;
  technician: string;
  equipment: string;
  location: string;
  plannedDate?: string;
  rejectReason?: string;
};

const InterventionApproval: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action'); // 'approve' or 'reject'
  
  // Find the intervention data
  const intervention = React.useMemo(() => {
    const found = interventionRequestsData.find(item => item.id === id);
    if (found) {
      const user = usersData.find((u) => u.id === found.userId && u.privilege === 'employee');
      return {
        ...found,
        employee: user ? {
          name: user.name,
          id: user.id,
          email: user.email,
          phone: user.phone
        } : {
          name: 'Unknown Employee',
          id: found.userId,
          email: '',
          phone: ''
        }
      };
    }
    return null;
  }, [id]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InterventionFormData>({
    defaultValues: intervention ? {
      title: intervention.title,
      type: 'Préventive',
      description: intervention.description,
      priority: intervention.priority,
      technician: '',
      equipment: intervention.Equipement,
      location: intervention.location
    } : {}
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Mock data for dropdowns
  const interventionTypes = [
    'Préventive',
    'Corrective',
    'Urgente',
    'Planifiée'
  ];

  const priorities = [
    'Urgent',
    'Élevé',
    'Moyen',
    'Faible'
  ];

  // Get technicians from users with employee privilege
  const technicians = usersData.filter(user => user.privilege === 'employee');

  const equipments = [
    'vanne A-001',
    'Pompe B-002',
    'Générateur C-003',
    'Ventilateur D-004'
  ];

  const onSubmit = async (data: InterventionFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call to update intervention status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (action === 'approve') {
        console.log('Intervention approved:', data);
        console.log('Attachments:', attachments);
        console.log('Planned date:', data.plannedDate);
        
        // TODO: Update JSON files with new status 'Approuvé'
        // TODO: Create entry in interventionList.json
        
        alert('Intervention approuvée avec succès!');
      } else {
        console.log('Intervention rejected:', data);
        console.log('Reject reason:', data.rejectReason);
        
        // TODO: Update JSON files with new status 'Rejeté' and reason
        
        alert('Intervention rejetée avec succès!');
      }
      
      navigate('/interventionRequests');
    } catch (error) {
      console.error('Erreur:', error);
      alert(`Erreur lors de ${action === 'approve' ? 'l\'approbation' : 'le rejet'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/interventionDetails/${id}`);
  };

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.includes('pdf') || 
      file.type.includes('image') || 
      file.type.includes('video')
    );
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (!intervention) {
    return (
      <Layout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Intervention non trouvée</h2>
            <p className="text-gray-600 mt-2">L'intervention demandée n'existe pas.</p>
            <button
              onClick={() => navigate('/interventionRequests')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retour aux demandes
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {action === 'approve' ? 'Approuver un ordre d\'intervention' : 'Rejeter la demande'}
          </h1>
          <p className="text-slate-600">
            {action === 'approve' 
              ? 'Accepter un travail de maintenance et attribuer les ressources'
              : 'Rejeter la demande d\'intervention avec justification'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {action === 'reject' ? (
            // Reject Design - Simple layout with only reason field
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                  Raison du rejet
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Raison du rejet <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('rejectReason', { required: 'La raison du rejet est requise' })}
                    placeholder="Veuillez expliquer pourquoi cette demande d'intervention est rejetée..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                  />
                  {errors.rejectReason && (
                    <p className="text-red-500 text-sm mt-1">{errors.rejectReason.message}</p>
                  )}
                </div>

                {/* Action Buttons for Reject */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Rejet...' : 'Rejeter Demande'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Approve Design - Full layout
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Information basique */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                  Information basique
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Titre d'ordre */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Titre d'ordre
                    </label>
                    <input
                      type="text"
                      {...register('title', { required: 'Le titre est requis' })}
                      placeholder="Saisissez le titre"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Type d'intervention */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Type d'intervention
                    </label>
                    <div className="relative">
                      <select
                        {...register('type', { required: 'Le type est requis' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Préventive, corrective etc...</option>
                        {interventionTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.type && (
                      <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                    )}
                  </div>
                </div>

                {/* Description détaillée */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description détaillée
                  </label>
                  <textarea
                    {...register('description', { required: 'La description est requise' })}
                    placeholder="Fournir une description détaillée"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Priorité */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Priorité
                    </label>
                    <div className="relative">
                      <select
                        {...register('priority', { required: 'La priorité est requise' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Élevé</option>
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.priority && (
                      <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
                    )}
                  </div>

                  {/* Planifié */}
                  {action === 'approve' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Planifié <span className="text-gray-500">(Optionnel)</span>
                      </label>
                      <input
                        type="date"
                        {...register('plannedDate')}
                        placeholder="Entrer la date de planification"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actif et emplacement */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                  Actif et emplacement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Équipement/Actif */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Équipement/Actif
                    </label>
                    <div className="relative">
                      <select
                        {...register('equipment', { required: 'L\'équipement est requis' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Sélectionner l'équipement</option>
                        {equipments.map((equipment) => (
                          <option key={equipment} value={equipment}>{equipment}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.equipment && (
                      <p className="text-red-500 text-sm mt-1">{errors.equipment.message}</p>
                    )}
                  </div>

                  {/* Location/site */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Location/site
                    </label>
                    <input
                      type="text"
                      {...register('location', { required: 'La location est requise' })}
                      placeholder="Entrer la location ou site"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Affectation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                  Affectation
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom du technicien
                  </label>
                  <div className="relative">
                    <select
                      {...register('technician', { required: 'Le technicien est requis' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Sélectionner un technicien</option>
                      {technicians.map((tech) => (
                        <option key={tech.id} value={tech.id}>{tech.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.technician && (
                    <p className="text-red-500 text-sm mt-1">{errors.technician.message}</p>
                  )}
                </div>

                {/* Pièces jointes (facultatif) */}
                {action === 'approve' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Pièces jointes (facultatif)
                    </h3>
                    
                    {/* Upload Area */}
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        PDF, DOC, images, vidéos
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.avi"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Cliquer pour sélectionner des fichiers
                      </label>
                    </div>

                    {/* Uploaded Files List */}
                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {attachments.map((file, index) => (
                          <div
                            key={index}
                            className="p-2 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-700 truncate">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(1)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      action === 'approve' 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {isSubmitting 
                      ? (action === 'approve' ? 'Approbation...' : 'Rejet...') 
                      : (action === 'approve' ? 'Approuver' : 'Rejeter Demande')
                    }
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default InterventionApproval;