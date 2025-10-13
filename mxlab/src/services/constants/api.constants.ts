// API related constants

export const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',
  
  // User endpoints
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  
  // Equipment endpoints
  EQUIPMENTS: '/api/equipments',
  EQUIPMENT_BY_ID: (id: string) => `/api/equipments/${id}`,
  
  // Site endpoints
  SITES: '/api/sites',
  SITE_BY_ID: (id: string) => `/api/sites/${id}`,
  
  // Intervention endpoints
  INTERVENTIONS: '/api/interventions',
  INTERVENTION_BY_ID: (id: string) => `/api/interventions/${id}`,
  
  // Maintenance endpoints
  MAINTENANCES: '/api/maintenances',
  MAINTENANCE_BY_ID: (id: string) => `/api/maintenances/${id}`,
  
  // Dashboard endpoints
  DASHBOARD_STATS: '/api/dashboard/stats',
};
