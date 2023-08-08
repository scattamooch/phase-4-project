import React, {useState, useEffect} from 'react';

function SignUp() {

  const [handleFirstName, setFirstName] = useState("")
  const [handleLastName, setLastName] = useState("")
  const [handleUsername, setUsername] = useState("")
  const [handlePassword, setPassword] = useState("")
  const [handleProfilePic, setProfilePic] = useState("")
  const [handleAboutMe, setAboutMe] = useState("")

  function handleFirstNameChange(event) {
    setFirstName(event.target.value)
    console.log(event.target.value)
  };

  function handleLastNameChange(event) {
    setLastName(event.target.value)
    console.log(event.target.value)
  };

  function handleUsernameChange(event) {
    setUsername(event.target.value)
    console.log(event.target.value)
  };

  function handlePasswordChange(event) {
    setPassword(event.target.value)
    console.log(event.target.value)
  }

  function handleProfPicChange(event) {
    setProfilePic(event.target.value)
    console.log(event.target.value)
  };

  function handleAboutMeChange(event) {
    setAboutMe(event.target.value)
    console.log(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newUserData = {
      first_name: handleFirstName,
      last_name: handleLastName,
      usename: handleUsername,
      password: handlePassword,
      profile_picture: handleProfilePic,
      about_me: handleAboutMe
    }
    console.log("You tried to submit")

    useEffect((event) => {
      fetch("http://127.0.0.1:5555/users", {
        method: "POST",
        body: JSON.stringify(newUserData),
      })
        .then((r) => r.json())
        .then((result) => {
          console.log(result)
        })
        .catch((err) => console.log("Error: something went wrong"))
    })
  }




  return (
    <div>
    <div className="sign-up-container">
      <h1>Welcome to ?</h1>
      <input type="text" placeholder="First name" onChange={handleFirstNameChange}/>
      <input type="text" placeholder="Last name" onChange={handleLastNameChange}/>
      <input type="text" placeholder="Username" onChange={handleUsernameChange}/>
      <input type="text" placeholder="Password"onChange={handlePasswordChange}/>
      <input type="text" placeholder="Paste an image link for a profile picture..." onChange={handleProfPicChange}/>
      <textarea rows="6" cols="60" placeholder="Tell us anything about yourself that you might like to display on your profile page..." onChange={handleAboutMeChange}></textarea>
      <button className="sign-up-button" onClick={handleSubmit}>Submit</button>
    </div>
  </div>
  );
}

export default SignUp;
