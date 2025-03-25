'use client';

import SideBar from '../../components/sideBar.component';
import UserInfo from '../../components/user/userInfo.component';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div>
        <SideBar />
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Dashboard;
