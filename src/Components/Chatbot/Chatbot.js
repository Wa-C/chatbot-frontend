import React, {useEffect, useState} from "react";
import './Chatbot.css';
import {io} from "socket.io-client";
import MessageArea from "./MessageArea";
import UserInput from "./UserInput";
const socket = io("http://localhost:5000");

const Chatbot = () => {
    /*
      Main State
     */
      const [messages, setMessages] = useState([{
        text: "Hello, i am the Internet Technologies Chatbot, how can i help you?",
        position: "left"
    }]);

    useEffect(() => {
        //if last message is a non-empty question, ask the server
        let lastMessage = messages[messages.length - 1]
        if (lastMessage.text !== "" && lastMessage.position === "right") {
            socket.emit('question', lastMessage.text);
        }

        //handle server responses
        socket.on("answer", (data) => {
            setMessages([...messages, {text: data, position: "left"}])
        });

    }, [messages]);

    function onSubmitMessage(inputText) {
        
        setMessages([...messages, {text: inputText, position: "right"}])
    }

    /*
      Render HTML
    */
    return (
        <div className="chat_window">
            
          
            <MessageArea messages={messages} /> 
            
            <UserInput onSubmitMessage={onSubmitMessage} />
        </div>
    );
};

export default Chatbot;