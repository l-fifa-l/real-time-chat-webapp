import { createContext } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config/default';

const SocketContext = createContext({});

function SocketProvider(props: any) {
  return <SocketContext.Provider value={{}}>{...props}</SocketContext.Provider>;
}

export const useScokets = () => useContext(SocketContext);

export default SocketProvider;
