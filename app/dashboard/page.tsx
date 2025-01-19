'use client';
import { useSelector } from 'react-redux';
import MyPage from '../../components/myPage.component';
import SideBar from '../../components/sideBar.component';
import { RootState } from '../../store';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();
  if (!user.name) {
    alert('로그인을 다시 진행해주세요.');
    router.push('/');
  }
  return (
    <div className="dashboard">
      <div>
        <SideBar />
      </div>
      <div>
        <MyPage />
      </div>
    </div>
  );
};

export default Dashboard;
