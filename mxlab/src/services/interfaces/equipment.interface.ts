// Equipment related interfaces

export interface Button {
  name: string;
  images: File | null;
}

export interface PartDescription {
  key: string;
  value: string;
}

export interface Parts {
  id: string;
  description: PartDescription[];
  video: File | null;
  image: File | null;
  datasheetUrl: string;
  buttons: Button[];
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
