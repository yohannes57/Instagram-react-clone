import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import av from "../../Assets/img/photo.jpg";

function Post({ username, imageUrl, caption }) {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" src={av} alt={username} />z
        <h2>{username}</h2>
      </div>

      <img className="post_image" src={imageUrl} alt="imag" />
      <h3 className="post_text">{caption}</h3>
    </div>
  );
}

export default Post;
