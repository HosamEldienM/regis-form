import React from "react";
import loggedImg from "../images/success.png";
import "./Logged.css";

export const Logged = (props) => {
  return (
    <div className="container-page">
      <div className="container">
        <img src={loggedImg} alt="" />
        <div className="logged-text">
          <h2>Successfully Logged In</h2>
          email: {props.email}
        </div>
      </div>
    </div>
  );
};
