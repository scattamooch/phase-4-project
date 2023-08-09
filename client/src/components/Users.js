import React, { useState, useEffect } from "react";
import {Card} from "semantic-ui-react"
import UserCard from "./UserCard";

function Users() {
  const [users, setUsers] = useState([]);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);
  // const [watchedMovies, setWatchedMovies] = useState([]);
  // const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
    }, [])

    const eachUser = users.map((user) => (
      <UserCard key = {user.id}
                id = {user.id}
                first_name = {user.first_name}
                last_name = {user.last_name}
                username = {user.username}
                profile_picture = {user.profile_picture}
                about_me = {user.about_me}
      />
    ))

    // Fetch Favorites
    // fetch("http://127.0.0.1:5555/users-movies")
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("All User Movies:", data);
    //   const userFavoriteMovies = data.filter((userMovie) => userMovie.favorite && userMovie.user.id === userId);
    //   console.log("User Favorite Movies:", userFavoriteMovies);
    //   setFavoriteMovies(userFavoriteMovies);
    // })
    // .catch((error) => {
    //   console.error("Error fetching favorite movies:", error);
    // });

    // Fetch Watched
    // fetch("http://127.0.0.1:5555/users-movies")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const userWatchedMovies = data.filter((userMovie) => userMovie.seen && userMovie.user.id === userId);
    //     setWatchedMovies(userWatchedMovies);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching watched movies:", error);
    //   });

    // Fetch Watchlist
  //   fetch("http://127.0.0.1:5555/users-movies")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const userWatchlist = data.filter((userMovie) => userMovie.wishlist && userMovie.user.id === userId);
  //       setWatchlist(userWatchlist);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching watchlist:", error);
  //     });
  // }, [userId]);

  return (
    <div className="users-list">
      <h1 className="users-header">Users Header</h1>
      <Card.Group itemsPerRow={4} className="card-group centered">
      {eachUser}
      </Card.Group>
    </div>
  )
}

export default Users;
