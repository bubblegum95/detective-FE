'use client';

import SideBar from '../../../components/sideBar.component';
import {
  Category,
  Detective,
  User,
} from '../../../types/userInfoState.interface';
import dashboardStyle from '../../../styles/dashboard.module.css';
import ConsultationComponent from '../../../components/user/Consultation.component';

export interface Consultation {
  id: number;
  subject: string | undefined;
  content: string | undefined;
  status: string | undefined;
  createdAt: string | undefined;
  consumer: User;
  detective: Detective;
  category: Category;
}

const Consultations = () => {
  return (
    <div className={dashboardStyle.dashboard}>
      <div>
        <SideBar />
      </div>
      <div>
        <ConsultationComponent />
      </div>
    </div>
  );
};

export default Consultations;
