'use client';

import SideBar from '../../../components/sideBar.component';
import UserData from '../../../components/user/userData.component';
import dashboardStyle from '../../../styles/dashboard.module.css';

const Profile = () => {
  return (
    <div className={dashboardStyle.dashboard}>
      <div>
        <SideBar />
      </div>
      <div className={dashboardStyle.dashboardContent}>
        <h1>My Page</h1>
        <UserData />
      </div>
    </div>
  );
};

export default Profile;
