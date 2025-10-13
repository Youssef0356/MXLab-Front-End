// Site related interfaces

export interface SiteFormData {
  name: string;
  location: string;
  address: string;
  manager: string;
  status: 'bon etat' | 'en panne' | 'en cours de maintenance';
}

export interface SiteData {
  id: string;
  name: string;
  location: string;
  address: string;
  manager: string;
  status: 'bon etat' | 'en panne' | 'en cours de maintenance';
  dateCreated: string;
}
