import { useRef } from 'react';
import EVENTS from '../config/events';
import { useSockets } from '../context/socket.context';

function MessagesContainer() {
  const { socket, messages, roomId, username } = useSockets();
  const newMessageRef = useRef(null);

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });
  }

  if (!roomId) {
    return <div />;
  }

  return (
    <div>
      {messages.map((messages, index) => {
        return <p key={index}>{JSON.stringify(messages)}</p>;
      })}
      <div>
        <textarea
          rows={1}
          placeholder="enter your message here"
          ref={newMessageRef}
        ></textarea>
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
