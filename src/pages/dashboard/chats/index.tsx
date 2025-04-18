'use client';

import SideBar from '../../../components/sideBar.component';
import dashboardStyle from '../../../styles/dashboard.module.css';
import ChatComponent from '../../../components/user/Chat.component';

const Chats = () => {
  return (
    <div className={dashboardStyle.dashboard}>
      <div>
        <SideBar />
      </div>
      <div>
        <ChatComponent />
      </div>
    </div>
  );
};

export default Chats;
