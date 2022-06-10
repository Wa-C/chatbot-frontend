import React from 'react';
import './Message.css'

const Message = (props) => {
    return (
        <div>
            <li className={"message appeared " + props.position}>
            <div className="avatar"/>
            <div className="text_wrapper">
                <div className="text">{props.text}</div>
            </div>
        </li>
        </div>
    );
};

export default Message;