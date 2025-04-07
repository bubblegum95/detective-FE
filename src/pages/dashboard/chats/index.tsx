'use client';

import { useEffect, useState } from 'react';
import SideBar from '../../../components/sideBar.component';
import { Participant, useChat } from '../../../context/chat.provider';
import ChatWindow from '../../../components/util/chatWindow.component';

const Chats = () => {
  const {
    socket,
    getMyRooms,
    roomLists,
    selectedRoom,
    join,
    leave,
    setSelectedRoom,
  } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [me, setMe] = useState<Participant['id'] | null>(null);

  useEffect(() => {
    if (!socket) return;
    getMyRooms();
  }, [socket]);

  useEffect(() => {
    if (!selectedRoom) return;

    setIsOpen(true);
    join(selectedRoom);
    const previousRoom = selectedRoom;

    return () => {
      leave(previousRoom);
    };
  }, [selectedRoom]);

  return (
    <div className="chats dashboard">
      <div>
        <SideBar />
        <div className="room-list">
          {roomLists?.map((list) => (
            <div
              key={list.roomId}
              onClick={() => {
                setIsOpen(true);
                setSelectedRoom(list.roomId);
                setMe(list.me);
              }}
            >
              <p>{list.participants.join(', ')}</p>
              {/* <p>
                {list.latestMessage.sender}: {list.latestMessage.content}
              </p> */}
            </div>
          ))}
        </div>
      </div>

      {/* 채팅 창 */}
      {isOpen && selectedRoom && me && (
        <ChatWindow
          roomId={selectedRoom}
          me={me}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Chats;
