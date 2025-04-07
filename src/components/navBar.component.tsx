'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useUserInfo } from '../context/userInfo.provider';
import getUserInfo from '../utils/getUserInfo';

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
  const handleSetUserInfo = useCallback(async (token: string) => {
    if (token) {
      const data = await getUserInfo(token);
      setUserInfo(data);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    handleSetUserInfo(token);
  }, []);

  return (
    <div className="navBar">
      <span className="leftBtn">
        <span>
          <Link href={'/'}>홈</Link>
        </span>
        <span>목록1</span>
        <span>목록2</span>
      </span>
      <span className="rightBtn">
        <span
          style={{
            display: userInfo ? 'none' : 'block',
          }}
        >
          <Link href={'/sign-in'}>Login</Link>
        </span>
        <span
          className="dashboardBtn"
          style={{ display: userInfo ? 'block' : 'none' }}
        >
          <Link href={'/dashboard'}>{userInfo?.nickname}</Link>
        </span>
        <span>
          <button
            style={{ display: userInfo ? 'block' : 'none' }}
            onClick={() => {
              logout();
              setUserInfo(undefined);
              router.push('/');
            }}
          >
            logout
          </button>
        </span>
      </span>
    </div>
  );
};

export default NavBar;
