import { memo } from 'react';
import NavBar from './navBar.component';

const Header = () => {
  const MemoizedNavBar = memo(NavBar);
  return (
    <header className="header">
      <MemoizedNavBar />
    </header>
  );
};

export default Header;
