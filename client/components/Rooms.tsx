import { useRef } from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context';

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomref = useRef(null);

  function handleCreateRoom() {
    // get room name
    const roomName = newRoomref.current.value || '';

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomref.current.value = '';
  }

  return (
    <nav>
      <div>
        <input ref={newRoomref} placeholder="Room Name" />
        <button onClick={handleCreateRoom}>CRETE ROOM</button>
      </div>
    </nav>
  );
}

export default RoomsContainer;
