import MessagesContainer from '../components/Messages';
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
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={usernameRef} />
            <button onClick={handleSetUsername}>START</button>
          </div>
        </div>
      )}

      {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
