'use client';

import SideBar from '../../components/sideBar.component';
import UserInfo from '../../components/user/userInfo.component';
import styles from '../../styles/dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
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
