'use client';

import { useState, useEffect } from 'react';
import { Participant, useChat } from '../../context/chat.provider';
import ChatWindow from '../util/chatWindow.component';
import Pagenation from '../util/Pagenation.component';

const ChatComponent = () => {
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
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

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
    <div>
      <div>
        <div className="room-list">
          {roomLists?.rooms.map((list) => (
            <div
              key={list.roomId}
              onClick={() => {
                setIsOpen(true);
                setSelectedRoom(list.roomId);
                setMe(list.me);
              }}
            >
              <p>참여자: {list.participants.join(', ')}</p>
              <p>
                {list.latestMessage?.sender.user?.nickname}:{' '}
                {list.latestMessage?.content}
              </p>
            </div>
          ))}
        </div>
        <Pagenation
          page={page}
          limit={limit}
          total={roomLists.total}
          handlePageChange={setPage}
        />
      </div>

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

export default ChatComponent;
