// Application wide constants

export const APP_NAME = 'MX Lab CMMS';

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';

export const STATUS_COLORS = {
  'bon etat': 'bg-green-100 text-green-800',
  'en panne': 'bg-red-100 text-red-800',
  'en cours de maintenance': 'bg-yellow-100 text-yellow-800',
} as const;

export const PRIORITY_LEVELS = {
  HIGH: 'élevée',
  MEDIUM: 'moyenne',
  LOW: 'faible',
} as const;

export const INTERVENTION_TYPES = {
  CORRECTIVE: 'corrective',
  PREVENTIVE: 'préventive',
  EMERGENCY: 'urgente',
} as const;

export const USER_PRIVILEGES = {
  EMPLOYEE: 'employee',
  SUPERVISOR: 'Superviseur',
  ADMIN: 'admin',
} as const;

export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  
  // Equipment routes
  EQUIPMENT_LIST: '/equipmentsView',
  EQUIPMENT_CREATE: '/create',
  EQUIPMENT_IOT: '/iot',
  
  // User routes
  USER_LIST: '/userList',
  USER_VIEW: (id: string) => `/userView/${id}`,
  USER_CREATE: '/userCreate',
  USER_EDIT: (id: string) => `/userCreate/${id}`,
  
  // Site routes
  SITE_VIEW: '/siteView',
  SITE_LIST: '/sitesList',
  SITE_CREATE: '/createSite',
  
  // Intervention routes
  INTERVENTION_LIST: '/interventionsList',
  INTERVENTION_CREATE: '/interventionsCreate',
  INTERVENTION_DETAILS: (id: string) => `/interventionDetails/${id}`,
  INTERVENTION_APPROVAL: (id: string) => `/interventionApproval/${id}`,
  INTERVENTION_REQUESTS: '/interventionRequests',
  
  // Maintenance routes
  MAINTENANCE_CALENDAR: '/calender',
  MAINTENANCE_PREVENTIVE: '/previntive',
  MAINTENANCE_HISTORY: '/historiques',
  
  // Visualizations
  VISUALIZATIONS: '/visualizations',
} as const;
