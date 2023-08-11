import React, {useEffect, useState} from "react";
import { Card } from "semantic-ui-react";

function MovieCard({id, name, image, description, genres, activeUser}) {
    
    const [userData, setUserData] = useState([])
    const [seenMovie, setSeenMovie] = useState(false)
    const [favoriteMovie, setFavoriteMovie] = useState(false)
    const [watchlistMovie, setWatchlistMovie] = useState(false)
    const [userMovieId, setUserMovieId] = useState()
    
    useEffect(() => {
        if (activeUser) {
          fetch(`http://127.0.0.1:5555/users/${activeUser}`)
            .then(r => r.json())
            .then(data => {
              const userMovie = data.user_movies.find(currUserMovie => currUserMovie.movie_id === id);
              setSeenMovie(userMovie.seen);
              setFavoriteMovie(userMovie.favorite);
              setWatchlistMovie(userMovie.wishlist);
              setUserMovieId(userMovie.id);
            })
            .catch((error) => console.log("Error: could not fetch user data: ", error));
        }
      }, [activeUser, id]);
      

    function updateUserMovie(event) {
        let payload = {}
        if (event.target.name === "seen"){
            payload = {seen: !seenMovie}
            setSeenMovie(!seenMovie)
        } else if (event.target.name === "favorite") {
            payload = {favorite: !favoriteMovie}
            setFavoriteMovie(!favoriteMovie)
        } else {
            payload = {wishlist: !watchlistMovie}
            setWatchlistMovie(!watchlistMovie)
        }

        fetch(`http://127.0.0.1:5555/users-movies/${userMovieId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                console.log("User movies updated successfully");
            } else {
                console.error("Error updating user movies")
            }
        })
        .catch(error => {
            console.error("Error updating user movies: ", error);
        })
    }

    const cardButtons = (
        <div className="movie-card-button-container">
        <button className="list-changer-buttons" name="seen" onClick={updateUserMovie}>{seenMovie ? "Mark not seen" : "Mark seen"}</button>
        <button className="list-changer-buttons" name="favorite" onClick={updateUserMovie}>{favoriteMovie ? "Unfavorite" : "Favorite"}</button>
        <button className="list-changer-buttons" name="wishlist"  onClick={updateUserMovie}>{watchlistMovie ? "Unlist" : "Watch Later"}</button>
        </div>
    )

    return (
        <Card style={{
            boxShadow: "5px 3px 3px rgb(54, 29, 29)",
            width: "20%",
            }}
            className="card">
        <div className="movie-card">
            <div className="image-container">
                <img src = {image} alt={name} 
                style={{
                    width: "50%", 
                    height: "auto",
                    }}/>
            </div>
            <div className="card-content">
                <div className="card-header">{name}</div>
                <p className="card__text"></p>
                    {activeUser ? cardButtons : null}
            </div>
        </div>
    </Card>
    )
}

export default MovieCard;