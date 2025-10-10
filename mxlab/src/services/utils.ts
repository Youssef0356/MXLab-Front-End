// Utility Functions for the CMMS Application

import { 
  VALIDATION_RULES, 
  DATE_FORMATS, 
  ALLOWED_FILE_TYPES, 
  MAX_FILE_SIZES,
  STATUS_COLORS,
  PRIORITY_COLORS,
  EQUIPMENT_STATUS_COLORS,
  INTERVENTION_TYPE_COLORS
} from './constants';
import type { ValidationError } from './types';

// Date Utilities
export const dateUtils = {
  /**
   * Format date to display format
   */
  formatDate: (date: string | Date, format: string = DATE_FORMATS.DISPLAY): string => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    
    switch (format) {
      case DATE_FORMATS.DISPLAY:
        return `${day}/${month}/${year}`;
      case DATE_FORMATS.DISPLAY_WITH_TIME:
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      case DATE_FORMATS.API:
        return `${year}-${month}-${day}`;
      case DATE_FORMATS.API_WITH_TIME:
        return d.toISOString();
      default:
        return `${day}/${month}/${year}`;
    }
  },

  /**
   * Parse date from string
   */
  parseDate: (dateString: string): Date | null => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime: (date: string | Date): string => {
    const now = new Date();
    const targetDate = new Date(date);
    const diffMs = now.getTime() - targetDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return dateUtils.formatDate(date);
  },

  /**
   * Check if date is today
   */
  isToday: (date: string | Date): boolean => {
    const today = new Date();
    const targetDate = new Date(date);
    return today.toDateString() === targetDate.toDateString();
  },

  /**
   * Add days to date
   */
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
};

// Validation Utilities
export const validationUtils = {
  /**
   * Validate email address
   */
  validateEmail: (email: string): boolean => {
    return VALIDATION_RULES.EMAIL_REGEX.test(email);
  },

  /**
   * Validate phone number
   */
  validatePhone: (phone: string): boolean => {
    return VALIDATION_RULES.PHONE_REGEX.test(phone);
  },

  /**
   * Validate password strength
   */
  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      errors.push(`Le mot de passe doit contenir au moins ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caractères`);
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une minuscule');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un caractère spécial');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  /**
   * Validate required field
   */
  validateRequired: (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  /**
   * Validate string length
   */
  validateLength: (value: string, min: number, max: number): boolean => {
    const length = value ? value.trim().length : 0;
    return length >= min && length <= max;
  },

  /**
   * Validate form data
   */
  validateForm: <T extends Record<string, any>>(
    data: T,
    rules: Record<keyof T, (value: any) => string | null>
  ): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = data[field];
      const error = rule(value);
      
      if (error) {
        errors.push({ field, message: error });
      }
    });
    
    return errors;
  }
};

// File Utilities
export const fileUtils = {
  /**
   * Validate file type and size
   */
  validateFile: (file: File, allowedTypes: string[], maxSize: number): { isValid: boolean; error?: string } => {
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`
      };
    }
    
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `Fichier trop volumineux. Taille maximale: ${fileUtils.formatFileSize(maxSize)}`
      };
    }
    
    return { isValid: true };
  },

  /**
   * Format file size in human readable format
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Get file extension
   */
  getFileExtension: (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  },

  /**
   * Check if file is image
   */
  isImage: (file: File): boolean => {
    return ALLOWED_FILE_TYPES.IMAGES.includes(file.type as any);
  },

  /**
   * Check if file is video
   */
  isVideo: (file: File): boolean => {
    return ALLOWED_FILE_TYPES.VIDEOS.includes(file.type as any);
  },

  /**
   * Create file preview URL
   */
  createPreviewUrl: (file: File): string => {
    return URL.createObjectURL(file);
  },

  /**
   * Revoke file preview URL
   */
  revokePreviewUrl: (url: string): void => {
    URL.revokeObjectURL(url);
  }
};

// String Utilities
export const stringUtils = {
  /**
   * Capitalize first letter
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Convert to title case
   */
  toTitleCase: (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Truncate string
   */
  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (str.length <= length) return str;
    return str.substring(0, length) + suffix;
  },

  /**
   * Generate random string
   */
  generateRandomString: (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  /**
   * Slugify string
   */
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Remove accents
   */
  removeAccents: (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
};

// Array Utilities
export const arrayUtils = {
  /**
   * Remove duplicates from array
   */
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  /**
   * Group array by key
   */
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  /**
   * Sort array by multiple keys
   */
  sortBy: <T>(array: T[], ...keys: (keyof T)[]): T[] => {
    return array.sort((a, b) => {
      for (const key of keys) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
};

// UI Utilities
export const uiUtils = {
  /**
   * Get status color class
   */
  getStatusColor: (status: string): string => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || 'bg-gray-100 text-gray-800';
  },

  /**
   * Get priority color class
   */
  getPriorityColor: (priority: string): string => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || 'bg-gray-100 text-gray-800';
  },

  /**
   * Get equipment status color class
   */
  getEquipmentStatusColor: (status: string): string => {
    return EQUIPMENT_STATUS_COLORS[status as keyof typeof EQUIPMENT_STATUS_COLORS] || 'bg-gray-100 text-gray-800';
  },

  /**
   * Get intervention type color class
   */
  getInterventionTypeColor: (type: string): string => {
    return INTERVENTION_TYPE_COLORS[type as keyof typeof INTERVENTION_TYPE_COLORS] || 'bg-gray-100 text-gray-800';
  },

  /**
   * Generate avatar initials
   */
  getInitials: (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  },

  /**
   * Generate random color
   */
  generateColor: (): string => {
    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
      '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
};

// Number Utilities
export const numberUtils = {
  /**
   * Format number with thousands separator
   */
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num);
  },

  /**
   * Format currency
   */
  formatCurrency: (amount: number, currency: string = 'EUR'): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  /**
   * Format percentage
   */
  formatPercentage: (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Clamp number between min and max
   */
  clamp: (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  },

  /**
   * Round to decimal places
   */
  round: (num: number, decimals: number = 2): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
};

// URL Utilities
export const urlUtils = {
  /**
   * Build URL with query parameters
   */
  buildUrl: (baseUrl: string, params: Record<string, any>): string => {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, String(params[key]));
      }
    });
    return url.toString();
  },

  /**
   * Parse query parameters from URL
   */
  parseQuery: (search: string): Record<string, string> => {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },

  /**
   * Get file name from URL
   */
  getFileNameFromUrl: (url: string): string => {
    return url.split('/').pop() || '';
  }
};

// Debounce and Throttle Utilities
export const performanceUtils = {
  /**
   * Debounce function
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Export all utilities
export const utils = {
  date: dateUtils,
  validation: validationUtils,
  file: fileUtils,
  string: stringUtils,
  array: arrayUtils,
  ui: uiUtils,
  number: numberUtils,
  url: urlUtils,
  performance: performanceUtils
};
