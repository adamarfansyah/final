import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '@utils/hookHelper';

const ChatRoom = () => {
  const { roomId } = useParams();

  const userLoggedIn = {
    id: 1,
    username: '@adamarfansyah',
  };

  const roomChatData = {
    id: 1,
    communityId: 1,
    name: 'Club Renang Puri',
    adminRoomId: 1,
    participants: [{ userId: 2 }, { userId: 1 }],
  };

  const { messages, sendMessage } = useChat(roomChatData, userLoggedIn);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-room-container">
      <h1>Room : {roomChatData.name}</h1>
      <div>
        <ol>
          {messages.map((message, i) => (
            <li key={i} className={`message-item ${message.ownedByCurrentUser ? 'my-message' : 'received-message'}`}>
              {message.body} {message.isAdminRoom && 'Admin'}
            </li>
          ))}
        </ol>
        <textarea
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="enter a message"
          className="new-message-input-field"
        />
        <button type="button" onClick={handleSendMessage} className="send-message-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
