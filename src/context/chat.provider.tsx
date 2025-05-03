'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { User } from '../types/userInfoState.interface';

export interface Room {
  id: number;
  name: string;
  me: Participant['id'];
  createdAt: Date;
}

export interface Message {
  id: number;
  type: any;
  content: string;
  sender: Participant;
  senderId: Participant['id'];
  notRead: Array<Participant['id']>;
  timestamp: string;
}

export interface UpdatedMessage {
  id: Message['id'];
  notRead: Message['notRead'];
}

export interface Participant {
  id: number;
  user: User | undefined;
}

export interface RoomList {
  roomId: Room['id'];
  me: Participant['id'];
  latestMessage: Message | undefined;
  participants: string[];
}

export interface ChatContextType {
  socket: Socket | null;
  roomLists: { rooms: RoomList[]; total: number };
  selectedRoom: Room['id'] | null;
  me: Participant['id'] | null;
  messages: Message[];
  receiveNow: Message | null;
  updated: UpdatedMessage | null;
  invite: (email: string) => void;
  getOut: (roomId: Room['id']) => void;
  join: (roomId: number) => void;
  leave: (roomId: number) => void;
  getMyRooms: () => void;
  setSelectedRoom: (roomId: number | null) => void;
  sendMessage: (roomId: number, content: string) => void;
  getMessages: (roomId: number, page: number, limit: number) => void;
  readMessage: (id: Message['id'], reader: Participant['id']) => void;
  clearReceiveNow: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>( // 전역변수 초기값
  undefined
);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomLists, setRoomLists] = useState<{
    rooms: RoomList[];
    total: number;
  }>({ rooms: [], total: 0 });
  const [selectedRoom, setSelectedRoom] = useState<Room['id'] | null>(null);
  const [me, setMe] = useState<Participant['id'] | null>(null);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [receiveNow, setReceiveNow] = useState<Message | null>(null);
  const [updated, setUpdated] = useState<UpdatedMessage | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('authorization'));
  }, []);

  useEffect(() => {
    if (!token) return;
    const NEXT_PUBLIC_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
    const socketInstance = io(NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket'],
      auth: { authorization: token },
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  const invite = useCallback(
    (email: string) => {
      socket?.emit('invite', { email }); // event: room, dto: roomId
    },
    [socket]
  );

  const getOut = useCallback(
    (roomId: Room['id']) => {
      socket?.emit('getOut', { roomId });
    },
    [socket]
  );

  const getMyRooms = useCallback(() => {
    socket?.emit('getMyRooms');
  }, [socket]);

  const join = useCallback(
    (roomId: number) => {
      socket?.emit('join', { roomId });
    },
    [socket]
  );

  const leave = useCallback(
    (roomId: number) => {
      socket?.emit('leave', { roomId });
      setSelectedRoom(null);
      setMessages([]);
    },
    [socket]
  );

  const sendMessage = useCallback(
    (roomId: number, content: string) => {
      socket?.emit('sendMessage', { roomId, content });
    },
    [socket]
  );

  const getMessages = useCallback(
    (roomId: number, page: number, limit: number) => {
      socket?.emit('getMessages', { roomId, page, limit });
    },
    [socket]
  );

  const readMessage = useCallback(
    (id: Message['id'], reader: Participant['id']) => {
      socket?.emit('readMessage', { id, reader });
    },
    [socket]
  );

  const clearReceiveNow = useCallback(() => {
    setReceiveNow(null);
  }, []);

  // Event Listener
  socket?.on('rooms', (data: { rooms: RoomList[]; total: number }) => {
    setRoomLists(data);
  });

  socket?.on('room', (data: { roomId: number; me: number }) => {
    setSelectedRoom(data.roomId);
    setMe(data.me);
  });

  socket?.on('messages', (data: { messages: Message[] }) => {
    setMessages(data.messages);
  });

  socket?.on('receiveMessage', (data: Message) => {
    setReceiveNow(data);
  });

  socket?.on('updatedMessage', (data: UpdatedMessage) => {
    setUpdated(data);
  });

  socket?.on('error', (error) => {
    console.log(error);
  });

  return (
    <ChatContext.Provider
      value={{
        socket,
        roomLists,
        selectedRoom,
        me,
        messages,
        receiveNow,
        updated,
        getMyRooms,
        sendMessage,
        getMessages,
        readMessage,
        invite,
        getOut,
        join,
        leave,
        setSelectedRoom,
        clearReceiveNow,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
