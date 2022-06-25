import React from "react";

const Header = () => {
  return (
    <div className="loginForm">
      <h2 className="header">Login Portal</h2>
      <br></br>
      {/* add email id and password */}
      <h4>
        Email ID: <input />
      </h4>
      <h4>
        Password: <input />
      </h4>
      <button className="btn">Log In</button>
      <br></br>
      <button className="btn">New? Sign Up here</button> <br></br>
    </div>
  );
};

export default Header;
