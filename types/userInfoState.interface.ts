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
  name: string;
  email: string;
  nickname: string;
  phoneNumber: string;
}

export interface Office {
  name: string;
  address: string;
  addressDetail: string;
  founded: string;
  phone: string;
}

export interface Detective {
  id: number;
  subject: string | null;
  intro: string | null;
  user: Partial<User>;
  office: Partial<Office> | null;
  profile: Partial<ProfileState> | null;
}
