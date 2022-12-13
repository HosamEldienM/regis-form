import React from "react";
import welcomeImg from "../images/welcome.png";
import Button from "../UI/Button";
import  "./Welcome.css";

export const Welcome = (props) => {
  
  const sendState = () => {
  props.onDisplayCreateAccount("display")
}

  return (
    <div className="container-page">
      <div className="container">
        <img src={welcomeImg} alt=""></img>
        <div className="textContainer">
          <h2>Welcome</h2>
          <p>We're glad you're here! Sign up to start</p>
          <Button onClick={sendState}>Get Started</Button>
          {/* <button onClick={sendState}>Get Started</button> */}
        </div>
      </div>
    </div>
  );
};
