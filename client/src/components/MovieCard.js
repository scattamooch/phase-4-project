import React from "react";
import { Card } from "semantic-ui-react";

function MovieCard({id, name, image, description, genres}) {

    return (
        <Card style={{
            boxShadow: "5px 3px 3px rgb(54, 29, 29)",
            width: "20%",
            }}
            className="card">
        <div className="project-card">
            <div className="image-container">
                <img src = {image} alt={name} 
                style={{
                    width: "50%", 
                    height: "auto",
                    }}/>
            </div>
            <div className="card-content">
                <div className="card-header">{name}</div>
                <p className="card__text">A description can go here. But naturally, we're gonna' start with some filler.</p>
                <button className="go-button">Filler Button?</button>
            </div>
        </div>
    </Card>
    )
}

export default MovieCard;