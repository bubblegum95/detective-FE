'use client';
import { createContext, useContext, useState } from 'react';

export interface UserInfoType {
  id: number;
  name: string;
  nickname: string;
  role: 'client' | 'employee' | 'employer';
}

export interface UserInfoContextType {
  userInfo: UserInfoType | undefined;
  setUserInfo: (data: UserInfoType | undefined) => void;
}

export const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UsrInfoProvider');
  }
  return context;
};
