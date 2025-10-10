// Service Interfaces and API Contracts

import type { 
  User, 
  Equipment, 
  Site, 
  Intervention, 
  MaintenanceRecord,
  ApiResponse,
  PaginatedResponse,
  SearchFilters,
  SortOption,
  FileUpload,
  Notification
} from './types';

// API Service Interfaces
export interface ApiService {
  get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
  upload<T>(endpoint: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>>;
}

// User Service Interface
export interface UserService {
  getUsers(filters?: SearchFilters, sort?: SortOption, page?: number, limit?: number): Promise<PaginatedResponse<User>>;
  getUserById(id: string): Promise<User>;
  createUser(userData: Partial<User>): Promise<User>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  changePassword(id: string, oldPassword: string, newPassword: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

// Equipment Service Interface
export interface EquipmentService {
  getEquipment(filters?: SearchFilters, sort?: SortOption, page?: number, limit?: number): Promise<PaginatedResponse<Equipment>>;
  getEquipmentById(id: string): Promise<Equipment>;
  createEquipment(equipmentData: Partial<Equipment>): Promise<Equipment>;
  updateEquipment(id: string, equipmentData: Partial<Equipment>): Promise<Equipment>;
  deleteEquipment(id: string): Promise<void>;
  uploadEquipmentImage(id: string, file: File): Promise<string>;
  uploadEquipmentQR(id: string, file: File): Promise<string>;
  generateQRCode(id: string): Promise<string>;
  getEquipmentHistory(id: string): Promise<MaintenanceRecord[]>;
}

// Site Service Interface
export interface SiteService {
  getSites(filters?: SearchFilters, sort?: SortOption, page?: number, limit?: number): Promise<PaginatedResponse<Site>>;
  getSiteById(id: string): Promise<Site>;
  createSite(siteData: Partial<Site>): Promise<Site>;
  updateSite(id: string, siteData: Partial<Site>): Promise<Site>;
  deleteSite(id: string): Promise<void>;
  getSiteEquipment(id: string): Promise<Equipment[]>;
  getSiteStatistics(id: string): Promise<any>;
}

// Intervention Service Interface
export interface InterventionService {
  getInterventions(filters?: SearchFilters, sort?: SortOption, page?: number, limit?: number): Promise<PaginatedResponse<Intervention>>;
  getInterventionById(id: string): Promise<Intervention>;
  createIntervention(interventionData: Partial<Intervention>): Promise<Intervention>;
  updateIntervention(id: string, interventionData: Partial<Intervention>): Promise<Intervention>;
  deleteIntervention(id: string): Promise<void>;
  approveIntervention(id: string, notes?: string): Promise<Intervention>;
  rejectIntervention(id: string, reason: string): Promise<Intervention>;
  startIntervention(id: string): Promise<Intervention>;
  completeIntervention(id: string, notes?: string, attachments?: File[]): Promise<Intervention>;
  getInterventionsByUser(userId: string): Promise<Intervention[]>;
  getInterventionsByEquipment(equipmentId: string): Promise<Intervention[]>;
}

// Maintenance Service Interface
export interface MaintenanceService {
  getMaintenanceHistory(filters?: SearchFilters, sort?: SortOption, page?: number, limit?: number): Promise<PaginatedResponse<MaintenanceRecord>>;
  getMaintenanceById(id: string): Promise<MaintenanceRecord>;
  createMaintenanceRecord(maintenanceData: Partial<MaintenanceRecord>): Promise<MaintenanceRecord>;
  updateMaintenanceRecord(id: string, maintenanceData: Partial<MaintenanceRecord>): Promise<MaintenanceRecord>;
  deleteMaintenanceRecord(id: string): Promise<void>;
  getPreventiveMaintenanceSchedule(): Promise<MaintenanceRecord[]>;
  schedulePreventiveMaintenance(equipmentId: string, scheduleData: any): Promise<MaintenanceRecord>;
  getMaintenanceStatistics(): Promise<any>;
}

// File Service Interface
export interface FileService {
  uploadFile(file: File, onProgress?: (progress: number) => void): Promise<FileUpload>;
  deleteFile(fileId: string): Promise<void>;
  getFileUrl(fileId: string): string;
  validateFile(file: File, allowedTypes: string[], maxSize: number): boolean;
  compressImage(file: File, quality?: number): Promise<File>;
}

// Authentication Service Interface
export interface AuthService {
  login(email: string, password: string): Promise<{ user: User; token: string; refreshToken: string }>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }>;
  getCurrentUser(): Promise<User>;
  updateProfile(userData: Partial<User>): Promise<User>;
  changePassword(oldPassword: string, newPassword: string): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}

// Notification Service Interface
export interface NotificationService {
  getNotifications(page?: number, limit?: number): Promise<PaginatedResponse<Notification>>;
  markAsRead(notificationId: string): Promise<void>;
  markAllAsRead(): Promise<void>;
  deleteNotification(notificationId: string): Promise<void>;
  createNotification(notification: Partial<Notification>): Promise<Notification>;
  subscribeToNotifications(callback: (notification: Notification) => void): () => void;
}

// Dashboard Service Interface
export interface DashboardService {
  getDashboardStats(): Promise<any>;
  getKPIData(): Promise<any>;
  getRecentActivity(): Promise<any>;
  getUpcomingMaintenance(): Promise<MaintenanceRecord[]>;
  getEquipmentStatus(): Promise<any>;
  getInterventionPriorities(): Promise<any>;
}

// Search Service Interface
export interface SearchService {
  globalSearch(query: string): Promise<{
    users: User[];
    equipment: Equipment[];
    sites: Site[];
    interventions: Intervention[];
  }>;
  searchUsers(query: string, filters?: SearchFilters): Promise<User[]>;
  searchEquipment(query: string, filters?: SearchFilters): Promise<Equipment[]>;
  searchSites(query: string, filters?: SearchFilters): Promise<Site[]>;
  searchInterventions(query: string, filters?: SearchFilters): Promise<Intervention[]>;
  getSearchSuggestions(query: string): Promise<string[]>;
}

// Validation Service Interface
export interface ValidationService {
  validateEmail(email: string): boolean;
  validatePhone(phone: string): boolean;
  validatePassword(password: string): { isValid: boolean; errors: string[] };
  validateRequired(value: any): boolean;
  validateLength(value: string, min: number, max: number): boolean;
  validateFile(file: File, allowedTypes: string[], maxSize: number): { isValid: boolean; error?: string };
}

// Storage Service Interface
export interface StorageService {
  setItem(key: string, value: any): void;
  getItem<T>(key: string): T | null;
  removeItem(key: string): void;
  clear(): void;
  exists(key: string): boolean;
}

// Theme Service Interface
export interface ThemeService {
  getCurrentTheme(): 'light' | 'dark';
  setTheme(theme: 'light' | 'dark'): void;
  toggleTheme(): void;
  getThemeColors(): Record<string, string>;
}

// Export Service Interface
export interface ExportService {
  exportToCSV<T>(data: T[], filename: string, headers?: Record<keyof T, string>): void;
  exportToExcel<T>(data: T[], filename: string, sheetName?: string): void;
  exportToPDF(content: any, filename: string): void;
  generateReport(type: 'maintenance' | 'interventions' | 'equipment', filters?: any): Promise<Blob>;
}

// WebSocket Service Interface
export interface WebSocketService {
  connect(url: string): void;
  disconnect(): void;
  subscribe(event: string, callback: (data: any) => void): () => void;
  emit(event: string, data: any): void;
  isConnected(): boolean;
}

// Cache Service Interface
export interface CacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
  getOrSet<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T>;
}

// Logger Service Interface
export interface LoggerService {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: Error, data?: any): void;
  setLevel(level: 'debug' | 'info' | 'warn' | 'error'): void;
}

// Configuration Service Interface
export interface ConfigService {
  get(key: string): any;
  set(key: string, value: any): void;
  getApiConfig(): any;
  getFeatureFlags(): Record<string, boolean>;
  isFeatureEnabled(feature: string): boolean;
}
