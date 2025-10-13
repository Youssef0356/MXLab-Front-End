// Intervention related interfaces

export interface InterventionFormData {
  title: string;
  type: string;
  description: string;
  equipment: string;
  priority: string;
  status: string;
  assignedTo: string;
  location: string;
  rejectReason?: string;
}
