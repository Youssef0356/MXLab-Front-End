// Maintenance related interfaces

export interface MaintenanceRecord {
  id: string;
  description: string;
  equipement: string;
  statut: string;
  dateDebut: string;
  dateFin: string;
  technicien: string;
  site: string;
  type: 'preventive' | 'corrective' | 'emergency';
}
