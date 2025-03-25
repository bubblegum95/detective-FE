'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function ChatPage() {
  const [token, setToken] = useState<string | null>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socketInstance = io('http://127.0.0.1:3400', {
      withCredentials: true,
      transports: ['websocket'],
      auth: { authorization: token },
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('authorization');
    if (!token) {
      alert('로그인을 다시 시도해주세요.');
    }
    setToken(token);
  }, [token]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('ping', 'world');
    }
  };
  const setRooms = () => {
    if (socket) {
      socket.emit('findMyRoom');
    }
  };

  return (
    <div>
      <h1>채팅 목록</h1>
      <button onClick={sendMessage}>메시지 보내기</button>
    </div>
  );
}
