import React, { useEffect, useState } from 'react';
import { user } from '../join/join';
import "./chat.css";
import socketIo from "socket.io-client";
import sendlogo from "../../images/send.png";
import Message from '../message/message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;
const ENDPOINT = "http://localhost:3000/";

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message,id });
        document.getElementById('chatInput').value = "";
    }

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ["websocket"] });
        socket.on("connect", () => {
            alert("Connected");
            setId(socket.id);
        });
        console.log(socket);
        socket.emit('joined', { user });
        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });
        socket.on('userjoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });
        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });
        return () => {
            socket.disconnect();
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message,data.id);
        })
      return () => {
          socket.off();
      };
    }, [messages]);

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>C CHAT</h2>
                   <a href="/"> <img src={closeIcon} alt="..." /> </a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id='chatInput' />
                    <button onClick={send} className='sendBtn'><img src={sendlogo} alt="..." /></button>
                </div>
            </div>
        </div>
    );
}
export default Chat;