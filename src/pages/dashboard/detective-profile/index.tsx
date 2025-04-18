'use client';

import SideBarComponent from '../../../components/sideBar.component';
import DetectiveProfileComponent from '../../../components/detective/DetectiveProfile.component';
import styles from '../../../styles/dashboard.module.css';

const DetectiveProfile = () => {
  return (
    <div className={styles.dashboard}>
      <div>
        <SideBarComponent />
      </div>
      <div>
        <DetectiveProfileComponent />
      </div>
    </div>
  );
};

export default DetectiveProfile;
