import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [name, setName] = useState('');
  const [display, setDisplay] = useState([]);
  const [online, setOnline] = useState([]);
  const [room, setRoom] = useState('');
  const [id, setId] = useState('');
  const [privateMsg, setPrivateMsg] = useState([]);
  const isRender = useRef(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const socket = io(ENDPOINT);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const joinChat = () => {
    socket.emit('new-user', name, id);
  };

  const leaveChat = () => {
    socket.emit('leave', id);
    socket.disconnect();
    setName('');
  };

  const sendMessage = () => {
    if (!name) return alert('Please enter your name');
    if (room) {
      socket.emit('room-message', message, name, room);
    }
    else {
      socket.emit('receive-message', message, name);
    }
    setMessage('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`connected ${socket.id}`);
      setId(socket.id);
    });

    socket.on('receive-message', (message) => {
      if (message.type === 'Name') {
        setDisplay((prevDisplay) => [...prevDisplay, message.message]);
      } else if (message.type === 'Message') {
        setReceivedMessage((prevMessages) => [...prevMessages, message]);
      }
    });
    
    socket.on('room-message', (message) => {
      console.log(message);
      setPrivateMsg((prevMessages) => [...prevMessages, message]);
    });

    socket.on('online', ({ message }) => {
      console.log(message);
      setOnline(message);
    });
    return () => {
      socket.off('connect');
      socket.off('receive-message');
      socket.off('online');
      socket.off('new-user');
      socket.off('leave');
      socket.off('join-room');
    };
  }, []);

  return (
    <div>
      <h1>{id}</h1>
      <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
      <button onClick={joinChat}>Join</button>
      <button onClick={leaveChat}>Leave</button>
      <br />
      <input type="text" placeholder="Enter your Room" value={room} onChange={(e) => setRoom(e.target.value)} />
      <button onClick={()=>socket.emit('join-room', room,name)}>Join Room</button>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
      <br />
      <p>
        Online:
        {online.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </p>

      <p>Received Messages:</p>
      {receivedMessage.map((message, index) => (
        <p key={index}>{`${message.name}: ${message.message}`}</p>
      ))}

      <p>Joined the chat:</p>
      {display.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <p>Private Messages:</p>
      {privateMsg.map((message, index) => (
        <p key={index}>{`${message.name}: ${message.message}`}</p>
      ))}

    </div>
  );
}

export default App;
