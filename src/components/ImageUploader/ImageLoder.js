import React, { useState } from "react";
import "./ImageLoder.css";
// import { firebase } from "firebase";
import { Button } from "@mui/material";
import { db, firebase, storage } from "../../firebase";
// import firebase from "firebase/compat/app";

function ImageLoder({ user }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uplaodTask = storage.ref(`images/${image.name}`).put(image);
    // const uploadTask = storage.ref(`images/${image.name}`).put(image);
    // console.log("hello imae", image);
    // const imageRef = storage.ref("images").child(image.name);
    // const uploadTask = imageRef.put(image);
    uplaodTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("/")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image to db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div className="imageloader">
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>post</Button>
    </div>
  );
}

export default ImageLoder;
