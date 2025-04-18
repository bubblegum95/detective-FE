import SideBarComponent from '../../../components/sideBar.component';
import ConsultationsForDetective from '../../../components/user/ConsultationsForDetective';
import styles from '../../../styles/dashboard.module.css';

const MyConsultations = () => {
  return (
    <div className={styles.dashboard}>
      <div>
        <SideBarComponent />
      </div>
      <div>
        <ConsultationsForDetective />
      </div>
    </div>
  );
};

export default MyConsultations;
