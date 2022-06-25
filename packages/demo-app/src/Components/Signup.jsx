import React from "react";

const Signup = () => {
  return (
    <div>
       <h2>Signup Portal</h2>
      <br></br>
      {/* add email id and password */}
      <h4>
        Email ID: <input />{" "}
      </h4>
      <h4>
        Password: <input />
      </h4>
      <h4>Confirm password: <input /> </h4>
      <button className="btn">Sign Up!</button>
    </div>
  );
};

export default Signup;
