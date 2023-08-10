import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Watched from "./Watched.js"
import Watchlist from "./Watchlist.js"
import Favorites from "./Favorites.js"

function UserProfile({activeUser}) {

  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [selectedList, setSelectedList] = useState("watched")
  const [isEditing, setIsEditing] = useState(false)
  // const [handleFirstName, setFirstName] = useState("")
  // const [handleLastName, setLastName] = useState("")
  // const [handleUsername, setUsername] = useState("")
  // const [handleProfilePic, setProfilePic] = useState("")
  // const [handleAboutMe, setAboutMe] = useState("")

  function handleFirstNameChange(event) {
    setEditedData(prevData => ({
      ...prevData,
      first_name: event.target.value,
    }));
  };

  function handleLastNameChange(event) {
    setEditedData(prevData => ({
      ...prevData,
      last_name: event.target.value
    }));
  }

  function handleUsernameChange(event) {
    setEditedData(prevData => ({
      ...prevData,
      username: event.target.value
    }));
  };

  function handleProfPicChange(event) {
    setEditedData(prevData => ({
      ...prevData,
      profile_picture: event.target.value
    }));
  };

  function handleAboutMeChange(event) {
    setEditedData(prevData => ({
      ...prevData,
      about_me: event.target.value
    }));
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  function handleListChange(list) {
    setSelectedList(list);
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/users/${id}`)
    .then(r => r.json())
    .then(data => setUserData(data))
    .catch((error) => console.log("Error: could not fetch user data: ", error))
  }, []);

  const [editedData, setEditedData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username,
    profile_picture: userData.profile_picture,
    about_me: userData.about_me,
  })

// Delete Request
  function handleDeleteAccount() {

    fetch(`http://127.0.0.1:5555/users/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      if (response.ok) {
        console.log("User deleted successfully");
      } else {
        console.error("Error deleting user")
      }
    })
    .catch(error => {
      console.error("Error deleting user: ", error);
    })
  }

  // Patch request
  function handleEditProfile() {
    fetch(`http://127.0.0.1:5555/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData)
    })
    .then(response => {
      if (response.ok) {
        console.log("User profile updated successfully");
      } else {
        console.error("Error updating user profile");
      }
    })
    .catch(error => {
      console.error("Error updating user profile: ", error);
    })
  }
// Conditional info for whether or not patch/delete buttons render
  let profileButtons = null;
  if (activeUser == id) {
    profileButtons = (
      <div className="profile-button-container"> 
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={handleEditClick}>Edit Profile</button>
      </div>
    );
  }
  // Conditional variables for editForm versus userInfo
  const editForm = (
      <form onSubmit={handleEditProfile} className="edit-container">
        <input type="text" placeholder="First name*" onChange={handleFirstNameChange}/>
        <input type="text" placeholder="Last name*" onChange={handleLastNameChange}/>
        <input type="text" placeholder="Username*" onChange={handleUsernameChange}/>
        <input type="text" placeholder="Paste an image link for a profile picture..." onChange={handleProfPicChange}/>
        <textarea rows="6" cols="60" placeholder="Tell us anything about yourself that you might like to display on your profile page..." onChange={handleAboutMeChange}></textarea>
        <div className="submit-cancel-edit-container">
        <button className="submit-edit-button" type="submit">Submit</button>
        <button className="cance-edit-button" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
  )

  const userInfo = (
    <div className="user-profile-left">
    <img src={userData.profile_picture} alt={userData.username}/>
    <h1>Name: {userData.first_name} {userData.last_name}</h1>
    <h1>Username: {userData.username}</h1>
    <p>About me: {userData.about_me}</p>
    {profileButtons}
      </div>
  )

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="full-page-container">
      
        {isEditing ? editForm : userInfo}

      <div className="user-lists-right">
      <div className="lists-container">
        <button onClick={() => handleListChange("watched")} 
        className={selectedList === "watched" ? "selected-list" : ""}>Watched</button>

        <button onClick={() => handleListChange("favorites")} 
        className={selectedList === "favorites" ? "selected-list" : ""}>Favorites</button>
        
        <button onClick={() => handleListChange("watchlist")} 
        className={selectedList === "watchlist" ? "selected-list" : ""}>Watchlist</button>
      </div>
      <div>
        {selectedList === "watched" && <Watched userData={userData}/>}
        {selectedList === "favorites" && <Favorites userData={userData}/>}
        {selectedList === "watchlist" && <Watchlist userData={userData}/>}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
