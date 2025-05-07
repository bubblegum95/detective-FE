import { useEffect, useState } from 'react';
import { useChat } from '../../context/chat.provider';
import styles from '../../styles/floatingChat.module.css';
import ChatWindow from './chatWindow.component';

export interface FloatingChatProps {
  email: string;
}

const FloatingChat = ({ email }: FloatingChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { socket, selectedRoom, me, invite, join, leave } = useChat();

  useEffect(() => {
    if (!selectedRoom) return;
    setIsOpen(true);
    join(selectedRoom);
    const previousRoom = selectedRoom;

    return () => {
      leave(previousRoom);
    };
  }, [selectedRoom, join, leave]);

  if (!socket) return;

  return (
    <div className={styles.floatingChat}>
      {/* 채팅 버튼 */}
      <button
        className={styles.chatButton}
        onClick={() => {
          invite(email);
          setIsOpen(!isOpen);
        }}
      >
        💬
      </button>

      {/* 채팅 창 */}
      {isOpen && selectedRoom && me && (
        <ChatWindow
          roomId={selectedRoom}
          me={me}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingChat;
