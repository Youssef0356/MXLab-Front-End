// Common Types and Interfaces for the CMMS Application

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'manager' | 'operator';
  department?: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: User['role'];
  department?: string;
  phone?: string;
  password?: string;
}

// Equipment related types
export interface Equipment {
  id: string;
  name: string;
  reference: string;
  location: string;
  status: 'active' | 'maintenance' | 'inactive' | 'broken';
  type: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  installationDate?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  image?: string;
  qrCode?: string;
  description: PartDescription[];
  parts: Parts[];
  createdAt: string;
  updatedAt: string;
}

export interface Parts {
  id: string;
  description: PartDescription[];
  video: File | null;
  image: File | null;
  datasheetUrl: string;
  buttons: PartButton[];
}

export interface PartDescription {
  key: string;
  value: string;
}

export interface PartButton {
  name: string;
  images: File | null;
}

export interface EquipmentFormData {
  name: string;
  reference: string;
  location: string;
  image: File | null;
  qrCode: File | null;
  qrCodeName: string;
  videoUrl: File | null;
  datasheet: File | null;
  description: PartDescription[];
  parts: Parts[];
}

// Site related types
export interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  manager?: string;
  phone?: string;
  email?: string;
  equipmentCount: number;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

export interface SiteFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  manager?: string;
  phone?: string;
  email?: string;
}

// Intervention related types
export interface Intervention {
  id: string;
  title: string;
  description: string;
  type: 'preventive' | 'corrective' | 'emergency' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  equipmentId: string;
  equipmentName?: string;
  siteId: string;
  siteName?: string;
  assignedTo?: string;
  requestedBy: string;
  scheduledDate?: string;
  startDate?: string;
  endDate?: string;
  estimatedDuration?: number; // in hours
  actualDuration?: number; // in hours
  cost?: number;
  notes?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface InterventionFormData {
  title: string;
  description: string;
  type: Intervention['type'];
  priority: Intervention['priority'];
  equipmentId: string;
  siteId: string;
  assignedTo?: string;
  scheduledDate?: string;
  estimatedDuration?: number;
  notes?: string;
}

// Maintenance related types
export interface MaintenanceRecord {
  id: string;
  description: string;
  equipement: string;
  site: string;
  dateDebut: string;
  dateFin: string;
  technicien: string;
  status: 'completed' | 'in_progress' | 'planned';
  type: 'preventive' | 'corrective' | 'emergency';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  cost?: number;
  duration?: string;
  notes?: string;
}

// Dashboard related types
export interface DashboardStats {
  totalDemandes: number;
  enAttente: number;
  approuvees: number;
  ordresActifs: number;
  equipementsActifs: number;
  equipementsEnMaintenance: number;
}

export interface KPICard {
  title: string;
  value: number;
  icon: any; // Lucide icon component
  color: string;
  trend: string;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: any; // Lucide icon component
  color: string;
  route: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// File upload types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  status?: string;
  type?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
  assignedTo?: string;
  site?: string;
  equipment?: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Theme and UI types
export interface Theme {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}
