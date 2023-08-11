import React from "react";
import {Card} from "semantic-ui-react"
import {useEffect, useState} from "react"
import MovieCard from "./MovieCard";
import {useHistory} from "react-router-dom"

function MovieCatalog({loginStatus, activeUser}) {

    const history = useHistory()
    const [movies, setMovies] = useState([]);
    const [isEditing, setIsEditing] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [newPoster, setNewPoster] = useState("")
    const [newGenres, setNewGenres] = useState("")
    const [newMovieError, setNewMovieError] = useState("")

    function handleEditClick() {
        setIsEditing(true)
    }

    function cancelEditClick() {
        setIsEditing(false)
    }

    function handleNewTitle(event) {
        setNewTitle(event.target.value)
      };

      function handleNewPoster(event) {
        setNewPoster(event.target.value)
      };
      
      function handleNewGenres(event) {
        setNewGenres(event.target.value)
      }

      function handleSubmit() {
        const newUserData = {
          name: newTitle,
          image: newPoster,
          genres: newGenres,
        }
    
          fetch("http://127.0.0.1:5555/movies", {
            method: "POST",
            body: JSON.stringify(newUserData),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then((r) => r.json())
            .then((result) => {
              console.log(result)
              if (result.errors) {
                setNewMovieError(result.errors.join(", "));
              } else {
                history.pushState("/movies")
              }
              }
            )
            .catch((err) => console.log("Error: something went wrong(front end)"))
      }

    useEffect(() => {
        fetch("http://127.0.0.1:5555/movies")
        .then(r => r.json())
        .then(data => setMovies(data))
    } ,[])

    const eachMovie = movies.map((movie) => (
        <MovieCard key = {movie.id}
                    id = {movie.id}
                    name = {movie.name}
                    image = {movie.image}
                    description = {movie.description}
                    genres = {movie.genres}
                    activeUser = {activeUser}
                    />
    ));

    const editForm = (
        <form onSubmit={handleSubmit} className="edit-container">
            {newMovieError ? (
                <h2 className="new-movie-error">{newMovieError}</h2>
            ) : null}
            <h2 className="edit-header">Add a movie!</h2>
          <input type="text" placeholder="Title*" onChange={handleNewTitle}/>
          <input type="text" placeholder="Paste an image link for a movie poster...*" onChange={handleNewPoster}/>
          <input type="text" placeholder="Genre(s)" onChange={handleNewGenres}/>
          <div className="submit-cancel-edit-container">
          <button className="submit-edit-button" type="submit">Submit</button>
          <button className="cance-edit-button" onClick={cancelEditClick}>Cancel</button>
          </div>
        </form>
    )

    return(
        <div className="movies-list">
            <h1 className="movies-header">Movie Catalog</h1>
            {loginStatus ? (
                <div className="add-movie-container">
                <h2 className="add-movie-header">Looking for a movie but can't find it? Try adding your own:</h2>
                <button className="add-movie" onClick={handleEditClick}>Add A Movie</button>
                </div>
            ) : null}
            {isEditing ? editForm : null}
            <Card.Group itemsPerRow={4} className="card-group centered">
                {eachMovie}
            </Card.Group>
        </div>
    )
}



export default MovieCatalog;