import { memo } from 'react';
import NavBar from './navBar.component';

const Header = () => {
  console.log('header ...');
  const MemoizedNavBar = memo(NavBar);
  return (
    <div className="header">
      {/* <h1>head space</h1> */}
      <MemoizedNavBar />
    </div>
  );
};

export default Header;
