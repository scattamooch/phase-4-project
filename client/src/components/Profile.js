import React, { useState, useEffect } from "react";

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch Users
    fetch(`http://127.0.0.1:5555/users`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Fetch Favorites
    fetch("http://127.0.0.1:5555/users-movies")
    .then((response) => response.json())
    .then((data) => {
      console.log("All User Movies:", data);
      const userFavoriteMovies = data.filter((userMovie) => userMovie.favorite && userMovie.user.id === userId);
      console.log("User Favorite Movies:", userFavoriteMovies);
      setFavoriteMovies(userFavoriteMovies);
    })
    .catch((error) => {
      console.error("Error fetching favorite movies:", error);
    });

    // Fetch Watched
    fetch("http://127.0.0.1:5555/users-movies")
      .then((response) => response.json())
      .then((data) => {
        const userWatchedMovies = data.filter((userMovie) => userMovie.seen && userMovie.user.id === userId);
        setWatchedMovies(userWatchedMovies);
      })
      .catch((error) => {
        console.error("Error fetching watched movies:", error);
      });

    // Fetch Watchlist
    fetch("http://127.0.0.1:5555/users-movies")
      .then((response) => response.json())
      .then((data) => {
        const userWatchlist = data.filter((userMovie) => userMovie.wishlist && userMovie.user.id === userId);
        setWatchlist(userWatchlist);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile: {user.username}</h2>
      <h3>Favorite Movies</h3>
      <ul>
        {favoriteMovies.map((userMovie) => (
          <li key={userMovie.id}>{userMovie.movie.name}</li>
        ))}
      </ul>
      <h3>Watched Movies</h3>
      <ul>
        {watchedMovies.map((userMovie) => (
          <li key={userMovie.id}>{userMovie.movie.name}</li>
        ))}
      </ul>
      <h3>Watchlist</h3>
      <ul>
        {watchlist.map((userMovie) => (
          <li key={userMovie.id}>{userMovie.movie.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
