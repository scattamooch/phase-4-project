import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Watched from "./Watched.js"
import Watchlist from "./Watchlist.js"
import Favorites from "./Favorites.js"

function UserProfile({userId}) {

  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [selectedList, setSelectedList] = useState("favorites")

  function handleListChange(list) {
    setSelectedList(list);
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/users/${id}`)
    .then(r => r.json())
    .then(data => setUserData(data))
    .catch((error) => console.log("Error: could not fetch user data: ", error))
  }, []);
  
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="full-page-container">
      <div className="user-profile-left">
        <img src={userData.profile_picture} alt={userData.username}/>
      <h1>Name: {userData.first_name} {userData.last_name}</h1>
      <h1>Username: {userData.username}</h1>
      <p>About me: {userData.about_me}</p>
      </div>
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
