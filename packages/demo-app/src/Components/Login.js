const Header = () => {
    return (
      <header className="header">
        <h2
        
        >
          Admin Panel
        </h2 >
        <br></br>
        {/* add email id and password */}
        <h4>
          Email ID: <input />{' '}
        </h4>
        <h4>
          Password: <input />
        </h4>
        <button
          className="btn"
        >
          Log In
        </button>
        <button
         
        >
          New? Sign Up here
        </button>{' '}
        <br></br>
      </header>
    )
  }
  
  export default Header
  