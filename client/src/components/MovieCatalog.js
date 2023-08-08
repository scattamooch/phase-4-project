import React from "react";
import {Card} from "semantic-ui-react"
import {useEffect, useState} from "react"
import MovieCard from "./MovieCard";

function MovieCatalog() {

    const [movies, setMovies] = useState([]);

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
                    />
    ));

    return(
        <div className="movies-list">
            <h1 className="movies-header">Movie Catalog Header</h1>
            <Card.Group itemsPerRow={4} className="card-group centered">
                {eachMovie}
            </Card.Group>
        </div>
    )
}



export default MovieCatalog;