import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="navBar">
      <span>홈</span>
      <span>목록1</span>
      <span>목록2</span>
      <span className="loginBtn">
        <Link href={'./sign-in'}>로그인</Link>
      </span>
    </div>
  );
};

export default NavBar;
