export interface Profile {
  id: number;
  path: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  name: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  createdAt: string;
  profile: Profile;
}

export interface UserInfoState {
  nickname: string;
  role: Role;
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
  profile: Partial<Profile> | null;
  licenses: Array<Partial<License>>;
  careers: Array<Partial<Career>>;
  detectiveCategories: Array<Category>;
  detectiveEquipments: Array<Equipment>;
  detectiveRegions: Array<Region>;
}
