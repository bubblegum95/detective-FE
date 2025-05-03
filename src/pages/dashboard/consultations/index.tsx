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
  status: 'pending' | 'rejected' | 'accepted' | 'completed';
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
      <div className={dashboardStyle.dashboardContent}>
        <h1>My Consulting</h1>
        <ConsultationComponent />
      </div>
    </div>
  );
};

export default Consultations;
