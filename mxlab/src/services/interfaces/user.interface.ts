// User related interfaces

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  privilege: string;
  location: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  privilege: string;
  location: string;
  password: string;
  dateCreation: string;
}
