import React from 'react';

function Favorites({userData}) {

  if (!userData || !userData.user_movies) {
    return <p>No data available</p>;
  }

  const filteredMovies = userData.user_movies.filter(movie => movie.favorite)

  return (
    <div>
      <h1 className="user-list-header">My favorite movies...</h1>
      <ul className="user-list-container">
        {filteredMovies.map(watchedMovies => (
          <li key={watchedMovies.movie.id}>
            <img src={watchedMovies.movie.image} alt="movie" className="user-list-image"/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;

