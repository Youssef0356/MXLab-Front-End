// Application Constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001/api', // TODO: Configure environment variables properly
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Users
  USERS: {
    BASE: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    GET_BY_ID: (id: string) => `/users/${id}`,
  },
  
  // Equipment
  EQUIPMENT: {
    BASE: '/equipment',
    CREATE: '/equipment',
    UPDATE: (id: string) => `/equipment/${id}`,
    DELETE: (id: string) => `/equipment/${id}`,
    GET_BY_ID: (id: string) => `/equipment/${id}`,
    UPLOAD_IMAGE: (id: string) => `/equipment/${id}/image`,
    UPLOAD_QR: (id: string) => `/equipment/${id}/qr-code`,
  },
  
  // Sites
  SITES: {
    BASE: '/sites',
    CREATE: '/sites',
    UPDATE: (id: string) => `/sites/${id}`,
    DELETE: (id: string) => `/sites/${id}`,
    GET_BY_ID: (id: string) => `/sites/${id}`,
  },
  
  // Interventions
  INTERVENTIONS: {
    BASE: '/interventions',
    CREATE: '/interventions',
    UPDATE: (id: string) => `/interventions/${id}`,
    DELETE: (id: string) => `/interventions/${id}`,
    GET_BY_ID: (id: string) => `/interventions/${id}`,
    APPROVE: (id: string) => `/interventions/${id}/approve`,
    REJECT: (id: string) => `/interventions/${id}/reject`,
    START: (id: string) => `/interventions/${id}/start`,
    COMPLETE: (id: string) => `/interventions/${id}/complete`,
  },
  
  // Maintenance
  MAINTENANCE: {
    BASE: '/maintenance',
    HISTORY: '/maintenance/history',
    PREVENTIVE: '/maintenance/preventive',
    SCHEDULE: '/maintenance/schedule',
  },
  
  // Files
  FILES: {
    UPLOAD: '/files/upload',
    DELETE: (id: string) => `/files/${id}`,
  },
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TECHNICIAN: 'technician',
  MANAGER: 'manager',
  OPERATOR: 'operator',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrateur',
  [USER_ROLES.TECHNICIAN]: 'Technicien',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.OPERATOR]: 'Opérateur',
} as const;

// Equipment Status
export const EQUIPMENT_STATUS = {
  ACTIVE: 'active',
  MAINTENANCE: 'maintenance',
  INACTIVE: 'inactive',
  BROKEN: 'broken',
} as const;

export const EQUIPMENT_STATUS_LABELS = {
  [EQUIPMENT_STATUS.ACTIVE]: 'Actif',
  [EQUIPMENT_STATUS.MAINTENANCE]: 'En maintenance',
  [EQUIPMENT_STATUS.INACTIVE]: 'Inactif',
  [EQUIPMENT_STATUS.BROKEN]: 'En panne',
} as const;

export const EQUIPMENT_STATUS_COLORS = {
  [EQUIPMENT_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
  [EQUIPMENT_STATUS.MAINTENANCE]: 'bg-yellow-100 text-yellow-800',
  [EQUIPMENT_STATUS.INACTIVE]: 'bg-gray-100 text-gray-800',
  [EQUIPMENT_STATUS.BROKEN]: 'bg-red-100 text-red-800',
} as const;

// Intervention Types
export const INTERVENTION_TYPES = {
  PREVENTIVE: 'preventive',
  CORRECTIVE: 'corrective',
  EMERGENCY: 'emergency',
  INSPECTION: 'inspection',
} as const;

export const INTERVENTION_TYPE_LABELS = {
  [INTERVENTION_TYPES.PREVENTIVE]: 'Préventive',
  [INTERVENTION_TYPES.CORRECTIVE]: 'Corrective',
  [INTERVENTION_TYPES.EMERGENCY]: 'Urgence',
  [INTERVENTION_TYPES.INSPECTION]: 'Inspection',
} as const;

export const INTERVENTION_TYPE_COLORS = {
  [INTERVENTION_TYPES.PREVENTIVE]: 'bg-blue-100 text-blue-800',
  [INTERVENTION_TYPES.CORRECTIVE]: 'bg-orange-100 text-orange-800',
  [INTERVENTION_TYPES.EMERGENCY]: 'bg-red-100 text-red-800',
  [INTERVENTION_TYPES.INSPECTION]: 'bg-purple-100 text-purple-800',
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export const PRIORITY_LABELS = {
  [PRIORITY_LEVELS.LOW]: 'Basse',
  [PRIORITY_LEVELS.MEDIUM]: 'Moyenne',
  [PRIORITY_LEVELS.HIGH]: 'Haute',
  [PRIORITY_LEVELS.CRITICAL]: 'Critique',
} as const;

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: 'bg-blue-100 text-blue-800',
  [PRIORITY_LEVELS.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [PRIORITY_LEVELS.HIGH]: 'bg-orange-100 text-orange-800',
  [PRIORITY_LEVELS.CRITICAL]: 'bg-red-100 text-red-800',
} as const;

// Status Types
export const STATUS_TYPES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PLANNED: 'planned',
} as const;

export const STATUS_LABELS = {
  [STATUS_TYPES.PENDING]: 'En attente',
  [STATUS_TYPES.APPROVED]: 'Approuvé',
  [STATUS_TYPES.IN_PROGRESS]: 'En cours',
  [STATUS_TYPES.COMPLETED]: 'Terminé',
  [STATUS_TYPES.CANCELLED]: 'Annulé',
  [STATUS_TYPES.PLANNED]: 'Planifié',
} as const;

export const STATUS_COLORS = {
  [STATUS_TYPES.PENDING]: 'bg-yellow-100 text-yellow-800',
  [STATUS_TYPES.APPROVED]: 'bg-green-100 text-green-800',
  [STATUS_TYPES.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [STATUS_TYPES.COMPLETED]: 'bg-green-100 text-green-800',
  [STATUS_TYPES.CANCELLED]: 'bg-red-100 text-red-800',
  [STATUS_TYPES.PLANNED]: 'bg-purple-100 text-purple-800',
} as const;

// File Types
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  VIDEOS: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
} as const;

export const MAX_FILE_SIZES = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 50 * 1024 * 1024, // 50MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  SIDEBAR_STATE: 'sidebar_state',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  VISUALISATIONS: '/visualisations',
  
  // Interventions
  INTERVENTION_CREATE: '/interventionCreate',
  INTERVENTION_REQUESTS: '/interventionRequests',
  INTERVENTION_LIST: '/interventionList',
  INTERVENTION_APPROVAL: '/interventionApproval',
  INTERVENTION_DETAILS: '/interventionDetails',
  
  // Users
  USER_CREATE: '/userCreate',
  USER_LIST: '/userList',
  USER_VIEW: '/userView',
  
  // Sites
  SITE_VIEW: '/siteView',
  SITE_CREATE: '/siteCreate',
  SITE_CART: '/siteCart',
  
  // Equipment
  EQUIPMENT_VIEW: '/equipmentsView',
  EQUIPMENT_CREATE: '/equipmentsCreate',
  EQUIPMENT_IOT: '/equipmentsIOT',
  
  // Maintenance
  MAINTENANCE_HISTORY: '/maintenanceHistory',
  MAINTENANCE_PREVENTIVE: '/maintenance-view',
  MAINTENANCE_CALENDAR: '/calendar',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#6B7280',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
} as const;
