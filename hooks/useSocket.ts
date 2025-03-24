'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket(token: string): Socket | null {
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

  return socket;
}
