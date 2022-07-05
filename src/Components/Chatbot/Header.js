import React from "react";
import './Header.css'
import image1 from "./images/AI-bot-1.jpg";
function Header() {
    return (
        <div className="top_menu">
            <div className="images">
            <div class="img_cont">
				   <img src={image1} class="rounded-circle user_img" alt =""/>
				   {/* <span class="online_icon"></span> */}
				 </div>
            </div>
            <div className="title">Doctor's Appointment Chatbot</div>
        </div>
        

    )
}

export default Header;
