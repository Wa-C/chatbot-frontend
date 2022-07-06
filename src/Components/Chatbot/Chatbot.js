import React, {useEffect, useState} from "react";
import './Chatbot.css';

import Header from "./Header";
import UserInput from "./UserInput";
import MessageArea from "./MessageArea";

import {io} from "socket.io-client";
const socket = io("http://20.186.20.6:5000");

function Chatbot() {
    /*
      Main state to store messages
     */
    const [messages, setMessages] = useState([{
        text: "Hello, i am AI Chatbot, I help you to take doctor's appointment",
        position: "left"
    }]);
    // const [ luisMessages, setLuisMessages] = useState("");

    useEffect(() => {
        //if last message is a non-empty question, ask the server
        // let lastMessage = messages[messages.length - 1]
        // if (lastMessage.text !== "" && lastMessage.position === "right") {
        //     socket.emit('question', lastMessage.text);
        // }

        //handle server responses
        socket.on("answer", (data) => {
            setMessages([...messages, {text: data, position: "left"}])
        });

    }, [messages]);

    // useEffect(()=> {
    //         socket.emit('luis', luisMessages)
            
    // },[luisMessages]);

    function onSubmitMessage(inputText) {
        setMessages([...messages, {text: inputText, position: "right"}])
        const url = `https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/4f272b73-6926-4020-a07c-de69c3cba9e8/slots/staging/predict?verbose=true&show-all-intents=true&log=true&subscription-key=45c1c0b44f48483e843f24f355cce33c&query=${inputText}`
        fetch(url)
        .then(response => response.json())
        .then(data =>  socket.emit('luis', data.prediction.topIntent));
        
        
        
        
        // dataToLuis(inputText);

    }
//     const dataToLuis = data => {  
//         const url = `https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/4f272b73-6926-4020-a07c-de69c3cba9e8/slots/staging/predict?verbose=true&show-all-intents=true&log=true&subscription-key=45c1c0b44f48483e843f24f355cce33c&query=${data}`
//         fetch(url)
//         .then(response => response.json())
//         .then(data => console.log(data.prediction.topIntent))


//    }

    /*
      Render HTML
    */
    return (
        <div className="chat_window">
            
            <Header />
            <MessageArea messages={messages} />
            <UserInput onSubmitMessage={onSubmitMessage} />
        </div>
    );
}

export default Chatbot;
