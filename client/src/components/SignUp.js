import React, {useState, useEffect} from 'react';
import TransitionsModal from "./ValidationModal"

function SignUp() {

  const [handleFirstName, setFirstName] = useState("")
  const [handleLastName, setLastName] = useState("")
  const [handleUsername, setUsername] = useState("")
  const [handlePassword, setPassword] = useState("")
  const [handleProfilePic, setProfilePic] = useState("")
  const [handleAboutMe, setAboutMe] = useState("")

  function handleFirstNameChange(event) {
    setFirstName(event.target.value)
  };

  function handleLastNameChange(event) {
    setLastName(event.target.value)
  };

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  function handleProfPicChange(event) {
    setProfilePic(event.target.value)
  };

  function handleAboutMeChange(event) {
    setAboutMe(event.target.value)
  }

  const newUserData = {}
  function handleSubmit(event, newUserData) {
    event.preventDefault();
    newUserData = {
      first_name: handleFirstName,
      last_name: handleLastName,
      username: handleUsername,
      password: handlePassword,
      profile_picture: handleProfilePic,
      about_me: handleAboutMe
    }

      fetch("http://127.0.0.1:5555/users", {
        method: "POST",
        body: JSON.stringify(newUserData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((r) => r.json())
        .then((result) => {
          console.log(result)
          }
        )
        .catch((err) => console.log("Error: something went wrong(front end)"))
  }

  return (
    <div>
    <div className="sign-up-container">
      <h1>Welcome to ?</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First name*" onChange={handleFirstNameChange}/>
        <input type="text" placeholder="Last name*" onChange={handleLastNameChange}/>
        <input type="text" placeholder="Username*" onChange={handleUsernameChange}/>
        <input type="password" placeholder="Password*" onChange={handlePasswordChange}/>
        <input type="text" placeholder="Paste an image link for a profile picture..." onChange={handleProfPicChange}/>
        <textarea rows="6" cols="60" placeholder="Tell us anything about yourself that you might like to display on your profile page..." onChange={handleAboutMeChange}></textarea>
        <button className="sign-up-button" type="submit">Submit</button>
      </form>
    </div>
  </div>
  );
}

export default SignUp;
