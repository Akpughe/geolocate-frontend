import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const URL = 'ws://localhost:8000';
const client = new W3CWebSocket(URL);

export default function Home() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(client);

  // const { sendMessage, lastMessage, readyState } = useWebSocket(ws);

  const submitMessage = () => {
    // const message = { user: usr, message: msg };
    client.send(JSON.stringify({ type: 'message', msg: message, usr: user }));
    setMessages([...messages]);
    // store message in local storage
    // localStorage.setItem('messages', JSON.stringify([...messages]));
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = message.data;
      console.log('got reply! ', dataFromServer);
      setMessages([...messages, dataFromServer]);
      console.log('messages', messages);
    };
  }, []);

  return (
    <>
      <main>
        <div>
          <label htmlFor="user">
            Name :
            <input
              type="text"
              id="user"
              placeholder="User"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>

          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <b>{user}</b>: <em>{message.msg}</em>
              </li>
            ))}
          </ul>

          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              submitMessage();
              // setMessage([]);
            }}
          >
            <input
              type="text"
              placeholder={'Type a message ...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type="submit" value={'Send'} />
          </form>
        </div>
      </main>
    </>
  );
}
