import React from "react";
import { Card } from "semantic-ui-react";

function UserCard({ id, username, profile_picture }) {
  return (
    <Card
      style={{
        boxShadow: "5px 3px 3px rgb(54, 29, 29)",
        width: "20%",
      }}
      className="card"
    >
      <div className="project-card">
        <div className="image-container">
          <img
            src={profile_picture}
            alt={`Profile of ${username}`}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="card-content">
          <div className="card-header">{username}</div>
        </div>
      </div>
    </Card>
  );
}

export default UserCard;

