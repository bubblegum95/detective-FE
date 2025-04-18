'use client';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import styles from '../styles/SideBar.module.css';
import { useUserInfo } from '../context/userInfo.provider';
import { Role } from '../types/userInfoState.interface';

function handleRole(role: Role['name']) {
  if (role !== 'client') {
    return true;
  } else {
    return false;
  }
}

const SideBar = () => {
  const { userInfo } = useUserInfo();
  const [useManagement, setUseManagement] = useState<boolean>(false);

  useEffect(() => {
    const role = userInfo?.role.name;
    if (!role) return;

    const useManagement = handleRole(role);
    setUseManagement(useManagement);
  }, [userInfo]);

  return (
    <aside className={styles.sideBar}>
      <div>
        <Link href={'/dashboard'}>대시보드</Link>
      </div>
      <div>
        <Link href={'/dashboard/profile'}>프로필</Link>
      </div>
      <div>
        <Link href={'/dashboard/chats'}>채팅</Link>
      </div>
      <div>
        <Link href={'/dashboard/consultations'}>상담</Link>
      </div>
      <div>
        <Link href={'/dashboard/my-wishlists'}>찜</Link>
      </div>
      <div style={{ display: useManagement ? 'block' : 'none' }}>
        <Link href={'/dashboard/my-consultations'}>내 상담</Link>
      </div>
      <div style={{ display: useManagement ? 'block' : 'none' }}>
        <Link href={'/dashboard/detective-profile'}>탐정프로필</Link>
      </div>
    </aside>
  );
};

export default memo(SideBar);
