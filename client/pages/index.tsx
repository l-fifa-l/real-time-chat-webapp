import MessagesContainer from '../components/messages';
import RoomsContainer from '../components/Rooms';
import { useSockets } from '../context/socket.context';
import { useRef } from 'react';

export default function Home() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      return;
    }

    setUsername(value);

    localStorage.setItem('username', value);
  }

  return (
    <div>
      <RoomsContainer />
      <MessagesContainer />
    </div>
  );
}
