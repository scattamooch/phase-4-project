import React, {useState} from 'react';

function Login() {

  const [handleUsername, setUsername] = useState("")
  const [handlePassword, setPassword] = useState("")

  function handleUsernameChange(event) {
    setUsername(event.target.value)
    console.log(event.target.value)
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value)
    console.log(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("You tried to submit...")
    console.log(`Username: ${handleUsername}`)
    console.log(`Password: ${handlePassword}`)
  }

  return (
    <div>
      <div className="login-container">
        <h1>Welcome Back</h1>
        <input type="text" placeholder="Username" onChange={handleUsernameChange}/>
        <input type="text" placeholder="Password" onChange={handlePasswordChange}/>
        
        <button className="login-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
