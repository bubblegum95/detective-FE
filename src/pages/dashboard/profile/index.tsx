'use client';

import SideBar from '../../../components/sideBar.component';
import UserData from '../../../components/user/userData.component';

const Profile = () => {
  return (
    <div className="profile dashboard">
      <div>
        <SideBar />
      </div>
      <div>
        <UserData />
      </div>
    </div>
  );
};

export default Profile;
