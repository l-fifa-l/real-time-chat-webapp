import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/default';
import EVENTS from '../config/events';

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: any[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [mesages, setMessages] = useState([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    setMessages([]);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        roomId,
        rooms,
        mesages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
