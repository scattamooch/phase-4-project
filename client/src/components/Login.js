import React, {useState} from 'react';
import {useHistory} from "react-router-dom"

function Login({loginStatus, handleLogin}) {

  const history = useHistory();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(null)

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("You tried to submit...")
    // console.log(`Username: ${handleUsername}`)
    // console.log(`Password: ${handlePassword}`)

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.message === "Login successful") {
          console.log("Login successful");
          setLoginError(null);
          handleLogin(data);
          history.push(`/profile/${data.user_id}`);
        } else {
          console.log("Login failed");
          setLoginError("Invalid username or password");
        }
      } else {
        console.log("HTTP request failed with status: " + response.status);
        setLoginError("HTTP request failed");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      setLoginError("An error occurred while logging in");
    }
}
  

  return (
    <div>
      <div className="login-container">
        {loginError ? (
          <h2 className="login-error">{loginError}</h2>
        ) : null}
        <h1 className='log-in-header'>Welcome Back</h1>
        <input type="text" placeholder="Username" onChange={handleUsernameChange}/>
        <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
        <button className="login-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
