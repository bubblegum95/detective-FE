export interface UserInfoState {
  name: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  createdAt: string;
  profile?: ProfileState | null;
  detective?: {} | null;
}

export interface ProfileState {
  id: number;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  nickname: string;
  phoneNumber: string;
}

export interface License {
  id: number;
  name: string;
}

export interface Career {
  id: number;
  startDate: string;
  endDate: string;
  businessDetails: string;
  corporateName: string;
  position: string;
}

export interface Office {
  id: number;
  name: string;
  address: string;
  addressDetail: string;
  founded: string;
  phone: string;
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
  user: Partial<User>;
  office: Partial<Office> | null;
  profile: Partial<ProfileState> | null;
  licenses: Array<Partial<License>>;
  careers: Array<Partial<Career>>;
  detectiveCategories: Array<Category>;
  detectiveEquipments: Array<Equipment>;
  detectiveRegions: Array<Region>;
}
