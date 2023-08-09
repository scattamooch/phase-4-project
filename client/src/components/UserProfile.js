import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile({userId}) {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);

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
    <div>
        <img src={userData.profile_picture} alt={userData.username}/>
      <h1>Name: {userData.first_name} {userData.last_name}</h1>
      <h1>Username: {userData.username}</h1>
      <p>About me: {userData.about_me}</p>
      <p>Need to get the lists down here somewhere, but I'm gonna try to get the buttons working first.</p>
    </div>
  );
}

export default UserProfile;
