export interface Profile {
  id: number;
  path: string;
}

export interface Role {
  id: number;
  name: 'client' | 'employee' | 'employer' | 'admin';
}

export interface User {
  name: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  createdAt: string;
  file: Profile;
}

export interface UserInfoState {
  nickname: string;
  role: Role;
}

export interface License {
  id: number;
  title: string;
  issuedAt: string;
  issuedBy: string;
}

export interface Career {
  id: number;
  company: string;
  position: string;
  job: string;
  start: string;
  end: string;
}

export interface Office {
  id: number;
  name: string;
  address: string;
  addressDetail: string;
  founded: string;
  phone: string;
  businessNum: string;
  employees?: Detective[];
  businessFile: ImageFile;
}

export interface Category {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface Detective {
  id: number;
  subject: string | null;
  intro: string | null;
  user: User;
  office: Partial<Office> | null;
  profile: Partial<Profile> | null;
  licenses: Array<License> | null;
  careers: Array<Career> | null;
  detectiveCategories: Array<Category>;
  detectiveEquipments: Array<Equipment>;
  detectiveRegions: Array<Region>;
}

export interface DetectiveCategory {
  id: number;
  category: Category;
  detective: Detective;
}

export interface DetectiveEquipment {
  id: number;
  equipment: Equipment;
  detective: Detective;
}

export interface DetectiveRegion {
  id: number;
  region: Region;
  detective: Detective;
}

export interface DetectiveProfile {
  id: number;
  subject: string | null;
  intro: string | null;
  office: Partial<Office> | null;
  profile: Partial<Profile> | null;
  licenses: Array<License>;
  careers: Array<Career>;
  detectiveCategories: Array<DetectiveCategory>;
  detectiveEquipments: Array<DetectiveEquipment>;
  detectiveRegions: Array<DetectiveRegion>;
}

export interface Review {
  id: number;
  comment: string;
  reliability: number;
  speed: number;
  accuracy: number;
  completion: number;
  createdAt: string;
  consumer: User;
}

export interface Wishlist {
  id: number;
  consumer: User;
  detective: Detective;
}

export interface ImageFile {
  id: number;
  path: string;
}
