'use client';
import SideBar from '../../../components/sideBar.component';
import ChatPage from '../../../components/user/chat.component';

const Chats = () => {
  return (
    <div className="chats dashboard">
      <div>
        <SideBar />
      </div>
      <div>
        <ChatPage />
      </div>
    </div>
  );
};

export default Chats;
