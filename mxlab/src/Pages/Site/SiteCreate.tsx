import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from "../../Components/Common/Layout";
import { Building, MapPin, Users, Save, X, ArrowLeft, Calendar } from 'lucide-react';

interface SiteFormData {
  name: string;
  location: string;
  address: string;
  manager: string;
  status: 'bon etat' | 'en panne' | 'en cours de maintenance';
}

const SiteCreate: React.FC = () => {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SiteFormData>({
    defaultValues: {
      name: '',
      location: '',
      address: '',
      manager: '',
      status: 'bon etat'
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // This function is no longer needed as React Hook Form handles input changes automatically

  const onSubmit = async (data: SiteFormData) => {
    try {
      // Create new site object
      const newSite = {
        id: `SITE-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        ...data,
        dateCreated: new Date().toLocaleDateString('fr-FR').replace(/\//g, '/')
      };

      // In a real app, you would send this to an API
      console.log('New site created:', newSite);
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      reset();

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Error creating site:', error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleBack = () => {
    navigate('/siteView');
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la liste
          </button>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Création d'un nouveau site
          </h1>
          <p className="text-slate-600">
            Remplissez le formulaire ci-dessous pour ajouter un nouveau site de production.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">Site créé avec succès!</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Site Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Informations du site
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Site Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du site *
                  </label>
                  <input
                    {...register('name', { required: 'Le nom du site est requis' })}
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Site de Production A"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Localisation *
                  </label>
                  <input
                    {...register('location', { required: 'La localisation est requise' })}
                    type="text"
                    id="location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tunis, Tunisie"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse complète *
                  </label>
                  <input
                    {...register('address', { required: 'L\'adresse est requise' })}
                    type="text"
                    id="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Zone Industrielle, Tunis 1000"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Management Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Informations de gestion
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Manager */}
                <div>
                  <label htmlFor="manager" className="block text-sm font-medium text-gray-700 mb-2">
                    Responsable du site *
                  </label>
                  <input
                    {...register('manager', { required: 'Le responsable du site est requis' })}
                    type="text"
                    id="manager"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ahmed Ben Ali"
                  />
                  {errors.manager && (
                    <p className="text-red-500 text-sm mt-1">{errors.manager.message}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Statut du site *
                  </label>
                  <select
                    {...register('status', { required: 'Le statut est requis' })}
                    id="status"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="bon etat">Bon état</option>
                    <option value="en cours de maintenance">En cours de maintenance</option>
                    <option value="en panne">En panne</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Création en cours...' : 'Créer le site'}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </button>
            </div>
          </form>
        </div>

        {/* Information Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Note:</p>
              <p>
                L'ID du site sera généré automatiquement et la date de création sera définie à aujourd'hui. 
                Le nouveau site sera activé par défaut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SiteCreate;