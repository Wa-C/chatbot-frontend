import React, {useState} from "react";
import './UserInput.css'

const UserInput = (props) => {
    /*
    Handle input text
    */
    const [inputText, setInputText] = useState("")

    function handleChange(e) {
        // console.log(e.target.value);
        setInputText(e.target.value);
    }

    function handleSubmit() {
        props.onSubmitMessage(inputText);
        setInputText("");
    }
    return (
        <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
                <input className="message_input" value={inputText} onChange={handleChange}
                       placeholder="Type your message here..."/>
            </div>
            <div className="send_message" onClick={handleSubmit}>
                <div className="icon"/>
                <div className="text">Send</div>
            </div>
        </div>
    );
};

export default UserInput;