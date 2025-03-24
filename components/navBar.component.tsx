'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserInfo, setUserInfo } from '../features/userInfoSlice';
import getUserInfo from '../utils/getUserInfo';

async function logout() {
  try {
    localStorage.removeItem('authorization');
  } catch (e) {
    alert(e);
  }
}

const NavBar = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();
  const dispatch = useDispatch();
  const [existingUser, setExistingUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (!token) return;
    const handleFetchUser = async () => {
      getUserInfo(token).then((data) => {
        if (data) {
          dispatch(setUserInfo({ ...data }));
        }
      });
    };
    handleFetchUser();
  }, []);

  useEffect(
    () => (user.name ? setExistingUser(true) : setExistingUser(false)),
    [user]
  );

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
            display: existingUser ? 'none' : 'block',
          }}
        >
          <Link href={'/sign-in'}>Login</Link>
        </span>
        <span
          className="dashboardBtn"
          style={{ display: existingUser ? 'block' : 'none' }}
        >
          <Link href={'/dashboard'}>{user.nickname}</Link>
        </span>
        <span>
          <button
            style={{ display: existingUser ? 'block' : 'none' }}
            onClick={() => {
              logout();
              dispatch(clearUserInfo());
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
