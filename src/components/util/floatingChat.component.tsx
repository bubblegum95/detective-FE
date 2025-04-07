import { useEffect, useState } from 'react';
import { useChat } from '../../context/chat.provider';
import styles from '../../styles/floatingChat.module.css';
import ChatWindow from './chatWindow.component';

export interface FloatingChatProps {
  email: string;
}

const FloatingChat: React.FC<FloatingChatProps> = ({ email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { socket, selectedRoom, invite, join, leave } = useChat();

  if (!socket) return;

  useEffect(() => {
    if (!selectedRoom) return;
    setIsOpen(true);
    const previousRoom = selectedRoom;

    return () => {
      leave(previousRoom);
      join(selectedRoom);
    };
  }, [selectedRoom]);

  return (
    <div className={styles.floatingChat}>
      {/* 채팅 버튼 */}
      <button
        className={styles.chatButton}
        onClick={() => {
          setIsOpen(!isOpen);
          invite(email);
        }}
      >
        💬
      </button>

      {/* 채팅 창 */}
      {isOpen && selectedRoom && (
        <ChatWindow roomId={selectedRoom} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default FloatingChat;
