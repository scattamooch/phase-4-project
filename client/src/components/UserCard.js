import React from "react";
import { Card } from "semantic-ui-react";
import {NavLink} from "react-router-dom";

function UserCard({ id, first_name, last_name, username, profile_picture, about_me }) {

  return (
        <Card style={{
            boxShadow: "5px 3px 3px rgb(54, 29, 29)",
            width: "20%",
            }}
            className="user-card">
        <div className="project-card-user">
            <div className="user-card-image-container">
                <img src = {profile_picture} alt={username} 
                style={{
                    width: "50%", 
                    height: "auto",
                    }}/>
            </div>
            <div className="card-content">
                <div className="user-card-header">{username}</div>
                <p className="card__text">{about_me}</p>
                <NavLink exact to={`profile/${id}`} className="view-profile-button">View Profile</NavLink>
            </div>
        </div>
    </Card>
    )
}

export default UserCard;

