'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

async function logout() {
  const url = process.env.BASE_URL;
  const path = process.env.LOGOUT;

  try {
    const response = await fetch(`${url}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('서버 요청 실패');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('로그아웃 실패');
    }

    alert('로그아웃 완료');
  } catch (e) {
    alert(e);
  }
}

const NavBar = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.userInfo);
  const [existingUser, setExistingUser] = useState(false);

  useEffect(
    () => (user.name ? setExistingUser(true) : setExistingUser(false)),
    [user]
  );

  return (
    <div className="navBar">
      <span>
        <Link href={'/'}>홈</Link>
      </span>
      <span>목록1</span>
      <span>목록2</span>
      <span className="rightBtn">
        <Link href={'./sign-in'}>Login</Link>
      </span>
      <span
        className="dashboardBtn"
        style={{ display: existingUser ? 'block' : 'none' }}
      >
        <Link href={'./dashboard'}>Dashboard</Link>
      </span>
      <span>
        <button
          onClick={() => {
            logout();
            router.push('./');
          }}
        >
          logout
        </button>
      </span>
    </div>
  );
};

export default NavBar;
