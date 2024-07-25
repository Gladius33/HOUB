import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessages([
      { sender: 'User1', text: 'Hello' },
      { sender: 'User2', text: 'Hi, how are you?' },
    ]);
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    setMessages([...messages, { sender: 'Me', text: message }]);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}><strong>{msg.sender}:</strong> {msg.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
