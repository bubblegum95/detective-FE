'use client';

import { useEffect, useState } from 'react';
import { Wishlist } from '../../../types/userInfoState.interface';
import CreateConsulting from '../../../components/util/CreateConsulting.component';
import { useChat } from '../../../context/chat.provider';
import ChatWindow from '../../../components/util/chatWindow.component';
import WishlistComponent from '../../../components/wishlist/Wishlist.component';
import SideBarComponent from '../../../components/sideBar.component';
import dashboardStyle from '../../../styles/dashboard.module.css';
import consultingAppStyles from '../../../styles/ConsultingApp.module.css';

export async function getMyWishlists() {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) {
      throw new Error('토큰이 없습니다.');
    }
    const url = process.env.BASE_URL;
    const res = await fetch(`${url}/wishlist`, {
      headers: {
        authorization: token,
      },
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    const wishlists = data.data as Wishlist[];
    const total = data.total as number;

    return { wishlists, total };
  } catch (error) {
    alert(error);
    return {
      wishlists: [],
      total: 0,
    };
  }
}

const MyWishlists = () => {
  const [myWish, setMywish] = useState<{
    wishlists: Wishlist[];
    total: number;
  }>({ wishlists: [], total: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [consultingOpen, setConsultingOpen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const { socket, selectedRoom, me, invite, join, leave } = useChat();

  useEffect(() => {
    const handleWish = async () => {
      const result = await getMyWishlists();
      setMywish(result);
    };

    handleWish();
  }, []);

  useEffect(() => {
    if (!selectedRoom) return;

    setConsultingOpen(true);
    join(selectedRoom);
    const previousRoom = selectedRoom;

    return () => {
      leave(previousRoom);
    };
  }, [selectedRoom, leave, join]);

  if (!socket) return;

  return (
    <div className={dashboardStyle.dashboard}>
      <div>
        <SideBarComponent />
      </div>
      <div className={dashboardStyle.dashboardContent}>
        <h1>My Wishlists</h1>
        {myWish &&
          myWish.wishlists.map(({ id, detective }) => (
            <div key={id} className={dashboardStyle.wishItem}>
              <div className={dashboardStyle.wishHead}>
                <WishlistComponent detectiveId={detective.id} size={20} />
                <h4>{detective.user.name}</h4>
              </div>
              <div className={dashboardStyle.wishContent}>
                <div>
                  <div>연락처: {detective.user.phoneNumber}</div>
                  <div>이메일: {detective.user.email}</div>
                </div>
                <div className={dashboardStyle.wishItemBtns}>
                  <button
                    className={dashboardStyle.wishItemBtn}
                    onClick={() => {
                      setSelected(detective.id);
                      setConsultingOpen(!consultingOpen);
                    }}
                  >
                    상담하기
                  </button>
                  <button
                    className={dashboardStyle.wishItemBtn}
                    onClick={() => {
                      setChatOpen(!chatOpen);
                      invite(detective.user.email);
                    }}
                  >
                    채팅하기
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {consultingOpen && selected && (
        <div className={consultingAppStyles.container}>
          <button
            onClick={() => {
              setConsultingOpen(!setConsultingOpen);
            }}
          >
            ❌
          </button>
          <CreateConsulting detectiveId={selected} />
        </div>
      )}

      {chatOpen && selectedRoom && me && (
        <ChatWindow
          roomId={selectedRoom}
          me={me}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
};

export default MyWishlists;
