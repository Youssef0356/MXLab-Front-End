import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import logo from '../../assets/logo.png'

// Temporary demo credentials
const TEST_CREDENTIALS = {
  email: 'admin@cmms.fr',
  password: 'admin123',
};

// Define form data type
type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const loginMutation = useMutation<boolean, Error, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      if (data.email === TEST_CREDENTIALS.email && data.password === TEST_CREDENTIALS.password) {
        return true;
      } else {
        throw new Error('Adresse e-mail ou mot de passe incorrect');
      }
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(message);
    },
  });
  

  // Form submit handler
  const onSubmit = (data: LoginFormData) => {
    setError('');
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full mb-4">
            <img src={logo}/>
              
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Application MX Lab</h1>
          <p className="text-slate-600">Système de gestion de maintenance des équipements</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email est requis' })}
              placeholder="votre.email@exemple.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Mot de passe requis' })}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loginMutation.isPending ? 'Connexion...' : 'Se connecter au tableau de bord'}
          </button>
        </form>

        {/* Mutation error */}
        {error && (
          <div className="mt-4 text-center text-sm text-red-600" role="alert" aria-live="polite">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
