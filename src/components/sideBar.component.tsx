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
  const role = userInfo?.role.name;
  const [useManagement, setUseManagement] = useState<boolean>(false);

  useEffect(() => {
    const role = userInfo?.role.name;
    if (!role) return;

    const useManagement = handleRole(role);
    setUseManagement(useManagement);
  }, [userInfo]);

  return (
    <aside className={styles.sideBar}>
      <Link href={'/dashboard'} className={styles.link}>
        <div>대시보드</div>
      </Link>
      <Link href={'/dashboard/profile'} className={styles.link}>
        <div>프로필</div>
      </Link>
      <Link href={'/dashboard/chats'} className={styles.link}>
        <div>채팅</div>
      </Link>
      <Link href={'/dashboard/consultations'} className={styles.link}>
        <div>상담</div>
      </Link>
      <Link href={'/dashboard/my-wishlists'} className={styles.link}>
        <div>찜</div>
      </Link>
      <Link
        href={'/dashboard/my-consultations'}
        className={styles.link}
        style={{ display: useManagement ? 'block' : 'none' }}
      >
        <div>내 상담</div>
      </Link>
      <Link
        href={'/dashboard/detective-profile'}
        className={styles.link}
        style={{ display: useManagement ? 'block' : 'none' }}
      >
        <div>탐정프로필</div>
      </Link>
      <Link
        href={'/dashboard/office'}
        className={styles.link}
        style={{ display: role === 'employer' ? 'block' : 'none' }}
      >
        <div>탐정사무소</div>
      </Link>
    </aside>
  );
};

export default SideBar;
