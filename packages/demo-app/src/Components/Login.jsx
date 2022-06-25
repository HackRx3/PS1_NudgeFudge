import "../styles/Login.css";
import React from "react";

const Header = () => {
  return (
    <div className="card">
      <div className="loginForm">
        <h2 className="title">Login Portal</h2>
        <br></br>
        {/* add email id and password */}
        <h4>
          Email ID:{" "}
          <input style={{ padding: 10, margin: 5, borderRadius: 10 }} />
        </h4>
        <h4>
          Password:{" "}
          <input style={{ padding: 10, margin: 5, borderRadius: 10 }} />
        </h4>
        <div>
          <button className="btn" id="rewards_logo">
            Log In
          </button>
          <br></br>
          <button className="btn">New? Sign Up here</button> <br></br>
        </div>
      </div>
    </div>
  );
};

export default Header;
