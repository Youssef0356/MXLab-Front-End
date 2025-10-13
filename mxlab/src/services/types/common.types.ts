// Common types used across the application

export type LayoutProps = {
  children: React.ReactNode;
};

export type TopbarProps = {
  username: string;
};

export type StatusType = 'bon etat' | 'en panne' | 'en cours de maintenance';

export type MaintenanceType = 'preventive' | 'corrective' | 'emergency';

export type UserPrivilege = 'employee' | 'Superviseur' | 'admin';
