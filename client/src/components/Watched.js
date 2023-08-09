import React from 'react';

function Watched({userData}) {

  if (!userData || !userData.user_movies) {
    return <p>No data available</p>;
  }

// console.log(userData.user_movies)
const filteredMovies = userData.user_movies.filter(movie => movie.seen)

  return (
    <div>
      <h1 className="user-list-header">Watched</h1>
      <ul className="user-list-container">
        {filteredMovies.map(watchedMovies => (
          <li key={watchedMovies.movie.id}>
            <img src={watchedMovies.movie.image} alt="movie" className="user-list-image" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watched;
