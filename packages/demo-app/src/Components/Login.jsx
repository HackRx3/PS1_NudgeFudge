const Header = () => {
  return (
    <div className="loginForm">
      <h2>Login Portal</h2>
      <br></br>
      {/* add email id and password */}
      <h4>
        Email ID: <input />
      </h4>
      <h4>
        Password: <input />
      </h4>
      <button className="btn">Log In</button>
      <button>New? Sign Up here</button> <br></br>
    </div>
  );
};

export default Header;
