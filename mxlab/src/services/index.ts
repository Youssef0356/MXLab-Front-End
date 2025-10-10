// Services Index - Central export file for all services

// Types and Interfaces
export * from './types';
export * from './interfaces';
export * from './constants';
export * from './utils';

// Re-export commonly used types for convenience
export type {
  User,
  Equipment,
  Site,
  Intervention,
  MaintenanceRecord,
  DashboardStats,
  ApiResponse,
  PaginatedResponse,
  SearchFilters,
  ValidationError,
  FileUpload,
  Notification
} from './types';

// Re-export commonly used constants
export {
  API_ENDPOINTS,
  USER_ROLES,
  EQUIPMENT_STATUS,
  INTERVENTION_TYPES,
  PRIORITY_LEVELS,
  STATUS_TYPES,
  ROUTES,
  STORAGE_KEYS,
  VALIDATION_RULES
} from './constants';

// Re-export utility functions
export { utils } from './utils';

// Service interfaces for dependency injection
export type {
  ApiService,
  UserService,
  EquipmentService,
  SiteService,
  InterventionService,
  MaintenanceService,
  AuthService,
  FileService,
  NotificationService,
  DashboardService
} from './interfaces';
