import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from "../../Components/Common/Layout";
import { User, Mail, Phone, MapPin, Shield, Calendar, Save, X, ArrowLeft } from 'lucide-react';
import usersData from '../../api/json-simulations/users.json';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  privilege: string;
  location: string;
}

const UserCreate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Get initial form data - either empty for create mode or pre-filled for edit mode
  const getInitialFormData = (): UserFormData => {
    if (isEditMode && id) {
      const user = usersData.find(u => u.id === id);
      if (user) {
        return {
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          privilege: user.privilege,
          location: user.location
        };
      }
    }
    // Default empty form for create mode
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      privilege: 'employee',
      location: ''
    };
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    defaultValues: getInitialFormData()
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Generate new user ID
  const generateUserId = () => {
    const existingIds = usersData.map(user => parseInt(user.id.split('-')[1]));
    const maxId = Math.max(...existingIds);
    return `EMP-${String(maxId + 1).padStart(4, '0')}`;
  };

  // This function is no longer needed as React Hook Form handles input changes automatically

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditMode) {
        // Update existing user
        console.log('Updating user:', id, data);
        // In a real app, you would make an API call here
        setTimeout(() => {
          setShowSuccess(true);
          setTimeout(() => {
            navigate(`/userView/${id}`);
          }, 1500);
        }, 1000);
      } else {
        // Create new user object
        const newUser = {
          id: generateUserId(),
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          dateCreation: new Date().toLocaleDateString('fr-FR').replace(/\//g, '/'),
          privilege: data.privilege,
          location: data.location,
        };

        // In a real app, you would send this to an API
        // For now, we'll simulate the process and log to console
        console.log('New user created:', newUser);
        
        // Show success message
        setShowSuccess(true);
        
        // Reset form
        reset();

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error creating/updating user:', error);
    }
  };

  const handleReset = () => {
    // Reset to initial form data (either original user data or empty form)
    reset(getInitialFormData());
  };

  const handleBack = () => {
    if (isEditMode) {
      navigate(`/userView/${id}`);
    } else {
      navigate('/userList');
    }
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
            {isEditMode ? 'Retour au profil' : 'Retour à la liste'}
          </button>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {isEditMode ? 'Modifier le profil utilisateur' : 'Création d\'un utilisateur'}
          </h1>
          <p className="text-slate-600">
            {isEditMode 
              ? 'Modifiez les informations de l\'utilisateur ci-dessous.'
              : 'Remplissez le formulaire ci-dessous pour créer un nouvel utilisateur dans le système.'
            }
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="font-medium">
                {isEditMode ? 'Profil mis à jour avec succès!' : 'Utilisateur créé avec succès!'}
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    {...register('name', { required: 'Le nom complet est requis' })}
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Entrez le nom complet"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Adresse email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'L\'adresse email est requise',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Adresse email invalide'
                      }
                    })}
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="exemple@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Numéro de téléphone *
                  </label>
                  <input
                    {...register('phone', { required: 'Le numéro de téléphone est requis' })}
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+216 XX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <input
                    {...register('password', { 
                      required: 'Le mot de passe est requis',
                      minLength: {
                        value: 6,
                        message: 'Le mot de passe doit contenir au moins 6 caractères'
                      }
                    })}
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Minimum 6 caractères"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Work Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Informations professionnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Privilege */}
                <div>
                  <label htmlFor="privilege" className="block text-sm font-medium text-gray-700 mb-2">
                    Privilège *
                  </label>
                  <select
                    {...register('privilege', { required: 'Le privilège est requis' })}
                    id="privilege"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="employee">Employé</option>
                    <option value="Superviseur">Superviseur</option>
                  </select>
                  {errors.privilege && (
                    <p className="text-red-500 text-sm mt-1">{errors.privilege.message}</p>
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
                    placeholder="Site de Production Site A"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
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
                {isSubmitting 
                  ? (isEditMode ? 'Mise à jour en cours...' : 'Création en cours...')
                  : (isEditMode ? 'Mise à jour' : 'Créer l\'utilisateur')
                }
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
        {!isEditMode && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Note:</p>
                <p>
                  L'ID utilisateur sera généré automatiquement et la date de création sera définie à aujourd'hui. 
                  Le nouvel utilisateur sera activé par défaut.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserCreate;