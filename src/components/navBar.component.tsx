'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useUserInfo } from '../context/userInfo.provider';
import getParcialUserInfo from '../utils/getParcialUserInfo';
import styles from '../styles/navBar.module.css';

async function logout() {
  try {
    localStorage.removeItem('authorization');
  } catch (e) {
    alert(e);
  }
}

const NavBar = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserInfo();

  const handleSetUserInfo = useCallback(
    async (token: string) => {
      const data = await getParcialUserInfo(token);
      if (data) {
        setUserInfo(data);
      }
    },
    [setUserInfo]
  );

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    handleSetUserInfo(token);
  }, [handleSetUserInfo]);

  return (
    <nav className={styles.navBar}>
      <div className={styles.leftBtn}>
        <Link href={'/'} className={styles.link}>
          <div>홈</div>
        </Link>

        {/* <span>목록1</span>
        <span>목록2</span> */}
      </div>
      <div className={styles.rightBtn}>
        <Link
          href={'/sign-in'}
          className={styles.link}
          style={{
            display: userInfo ? 'none' : 'block',
          }}
        >
          <div>Login</div>
        </Link>

        <Link
          href={'/dashboard'}
          className={styles.link}
          style={{ display: userInfo ? 'block' : 'none' }}
        >
          <div className={styles.dashboardBtn}>{userInfo?.nickname}</div>
        </Link>

        <button
          className={styles.logout}
          style={{ display: userInfo ? 'block' : 'none' }}
          onClick={() => {
            logout();
            setUserInfo(undefined);
            router.push('/');
          }}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
