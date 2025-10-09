import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../../Components/Common/Layout';
import { ChevronDown } from 'lucide-react';
// Types for form data
type InterventionFormData = {
  title: string;
  type: string;
  description: string;
  priority: string;
  technician: string;
  equipment: string;
  location: string;
};

const InterventionCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InterventionFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const technicians = [
    'Fahmi hadeji',
    'walid chebbi',
    'fatma',
    'anis'
  ];

  const equipments = [
    'vanne A-001',
    'Pompe B-002',
    'Générateur C-003',
    'Ventilateur D-004'
  ];

  const onSubmit = async (data: InterventionFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Intervention créée:', data);
      alert('Ordre d\'intervention créé avec succès!');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Êtes-vous sûr de vouloir annuler? Les données non sauvegardées seront perdues.')) {
      // Navigate back or reset form
      window.history.back();
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Créer un ordre d'intervention
          </h1>
          <p className="text-slate-600">
            Planifier un nouveau travail de maintenance et attribuer les ressources
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                {/* Priorité */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priorité
                  </label>
                  <div className="relative w-48">
                    <select
                      {...register('priority', { required: 'La priorité est requise' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Urgent</option>
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
                      <option value="">Fahmi</option>
                      {technicians.map((tech) => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.technician && (
                    <p className="text-red-500 text-sm mt-1">{errors.technician.message}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Création...' : 'Confirmer'}
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
        </form>
      </div>
    </Layout>
  );
};

export default InterventionCreate;