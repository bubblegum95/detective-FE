import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Participant, Room, useChat } from '../../context/chat.provider';
import styles from '../../styles/ChatWindow.module.css';

interface ChatWindowProps {
  roomId: Room['id'];
  me: Participant['id'];
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ roomId, me, onClose }) => {
  const {
    messages,
    receiveNow,
    updated,
    leave,
    sendMessage,
    getMessages,
    readMessage,
    clearReceiveNow,
  } = useChat();
  const [content, setContent] = useState('');
  const [page, setPage] = useState(1);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const chatBottom = useRef<HTMLDivElement | null>(null);

  // 메시지 보내기
  const handleSendMessage = useCallback(() => {
    if (content.trim()) {
      sendMessage(roomId, content);
      setContent('');
    }
  }, [roomId, content, sendMessage]);

  // 말풍선 생성
  const createSpeechBulloon = useCallback(
    (
      id: number,
      sender: string,
      senderId: number,
      content: string,
      timestamp: string,
      notRead: Array<number>
    ) => {
      const bulloon = document.createElement('div');
      bulloon.className = styles.message;
      bulloon.id = id.toString();
      bulloon.dataset.messageId = id.toString();
      bulloon.dataset.notRead = notRead.join(',');

      const senderDiv = document.createElement('div');
      senderDiv.className = styles.sender;
      if (senderId === me) {
        senderDiv.textContent = '나';
      } else {
        senderDiv.textContent = sender;
      }

      const contentSpan = document.createElement('span');
      contentSpan.textContent = content;
      contentSpan.className = styles.content;

      const timestampSpan = document.createElement('span');
      timestampSpan.textContent = timestamp;
      timestampSpan.className = styles.timestamp;

      const notReadSpan = document.createElement('span');
      notReadSpan.textContent = notRead.length.toString();
      notReadSpan.className = styles.notRead;

      bulloon.append(senderDiv, contentSpan, timestampSpan, notReadSpan);

      return bulloon;
    },
    []
  );

  const updateNotRead = useCallback(
    (messageId: number, newNotRead: number[]) => {
      // 1. 부모 div 찾기
      const bulloon = document.querySelector(
        `[data-message-id="${messageId}"]`
      );
      if (!bulloon) return;

      // 2. dataset 업데이트
      (bulloon as HTMLDivElement).dataset.notRead = newNotRead.join(',');

      // 3. 내부의 notRead span 찾아서 텍스트 수정
      const notReadSpan = bulloon.querySelector('.notRead');
      if (notReadSpan) {
        const length = newNotRead.length.toString();
        if (length === '0') return;
        notReadSpan.textContent = length;
      }
    },
    []
  );

  // 실시간 수신 메시지 말풍선 생성
  const handleReceiveMessage = useCallback(() => {
    if (receiveNow) {
      const { id, sender, senderId, content, timestamp, notRead } = receiveNow;
      const newBulloon = createSpeechBulloon(
        id,
        sender,
        senderId,
        content,
        timestamp,
        notRead
      );
      chatContainer.current?.appendChild(newBulloon);
      clearReceiveNow();
    }
  }, [receiveNow, chatContainer.current]);

  const handleScroll = useCallback(() => {
    if (chatContainer.current?.scrollTop === 0 && messages) {
      console.log('채팅창이 맨 위에 도달!');
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    getMessages(roomId, page, 10);
  }, [page]);

  useEffect(() => {
    messages &&
      chatContainer.current &&
      messages.map(({ id, content, sender, senderId, timestamp, notRead }) => {
        const bulloon = createSpeechBulloon(
          id,
          sender,
          senderId,
          content,
          timestamp,
          notRead
        );
        chatContainer.current?.prepend(bulloon);
      });
  }, [messages]);

  useEffect(() => {
    // 창 오픈시 스크롤 아래로
    chatBottom.current &&
      chatBottom.current.scrollIntoView({ behavior: 'instant' });
  }, [chatBottom.current]);

  useEffect(() => {
    receiveNow && handleReceiveMessage(); // 실시간 메시지 수신시
    chatBottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [receiveNow, chatBottom.current]);

  useEffect(() => {
    if (!chatContainer.current) return;
    chatContainer.current.addEventListener('scroll', handleScroll); // 스크롤 맨 위에 도달 시
  }, []);

  useEffect(() => {
    const container = chatContainer.current;
    if (!container) return;

    const messageElements = container.querySelectorAll('[data-message-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const messageId = el.dataset.messageId;
            if (!messageId) return;

            const notRead = el.dataset.notRead?.split(',');
            if (notRead && notRead.includes(me.toString())) {
              readMessage(+messageId, +me);
            }
          }
        });
      },
      { threshold: 1.0 }
    );

    messageElements.forEach((el) => {
      observer.observe(el);
    });
  }, [me, chatContainer.current]);

  useEffect(() => {
    console.log('update!', updated);
    if (!updated) return;

    updateNotRead(updated.id, updated.notRead);
  }, [updated]);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h2 className="chatName">채팅방</h2>
        <button
          onClick={() => {
            leave(roomId);
            onClose();
          }}
        >
          ❌
        </button>
      </div>
      <div className={styles.chatContent} ref={chatContainer}>
        <div ref={chatBottom} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.inputField}
          autoFocus
          placeholder="message"
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default memo(ChatWindow);
