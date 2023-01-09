import "./App.css";
import React, { useState, useEffect } from "react";
// import Loging from "./components/Login/Loging";
// import Instagram from "./Assets/img/instagram.png";
import Post from "./components/Post/Post";
import { db, auth } from "./firebase";
// import { ClassNames, ThemeContext } from "@emotion/react";
import { Button, Modal } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import makeStyles from "@emotion/styled";
import ImageLoder from "./components/ImageUploader/ImageLoder";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(${top}%,${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "abosolute",
    width: 400,
    backgroundColor: theme.palette.backgroundColor.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// //////////
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [opensingin, setOpenSignin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  //  db.collection("posts").onSnapshot((snashot) => {
  // setPost(snashot.docs?.map((doc) => doc.data()));
  // }); to access
  // to read from firebase db
  useEffect(() => {
    db.collection("posts").onSnapshot((snashot) => {
      setPost(
        snashot.docs?.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  // signup handler
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignin(false);
    setUsername("");
    setEmail("");
    setPassowrd("");
  };

  // signin handler
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)

      .catch((error) => alert(error.message));

    setOpenSignin(false);
    setEmail("");
    setPassowrd("");
  };

  return (
    <div className="app">
      {user?.displayName ? (
        <ImageLoder username={user.displayName} />
      ) : (
        <h3>sorry login to upload</h3>
      )}

      <Modal className="modals" open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_form">
            <center>
              <img
                className="app_header_image"
                src="https://th.bing.com/th/id/R.d8eb93c67c484072a75ab2e41e17c95b?rik=NgXg7JByrSq0Og&riu=http%3a%2f%2fwww.montanavintage.com%2fimages%2finstagram.jpg&ehk=Lpg3QhzEoQT5MFW5pbEtsN2fRwQSlLPjDxY3eoeQT2k%3d&risl=&pid=ImgRaw&r=0"
                alt="logo"
              />
            </center>
            <input
              type="text"
              placeholder="usename"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal
        className="modals"
        open={opensingin}
        onClose={() => setOpenSignin(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_form">
            <center>
              <img
                className="app_header_image"
                src="https://th.bing.com/th/id/R.d8eb93c67c484072a75ab2e41e17c95b?rik=NgXg7JByrSq0Og&riu=http%3a%2f%2fwww.montanavintage.com%2fimages%2finstagram.jpg&ehk=Lpg3QhzEoQT5MFW5pbEtsN2fRwQSlLPjDxY3eoeQT2k%3d&risl=&pid=ImgRaw&r=0"
                alt="logo"
              />
            </center>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
            />
            <Button onClick={signIn}>Sign in</Button>
          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img
          className="app_header_image"
          src="https://th.bing.com/th/id/R.d8eb93c67c484072a75ab2e41e17c95b?rik=NgXg7JByrSq0Og&riu=http%3a%2f%2fwww.montanavintage.com%2fimages%2finstagram.jpg&ehk=Lpg3QhzEoQT5MFW5pbEtsN2fRwQSlLPjDxY3eoeQT2k%3d&risl=&pid=ImgRaw&r=0"
          alt="header-imag"
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Log out</Button>
      ) : (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignin(true)}>Sign in</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      <div>
        {post?.map(({ id, post }) => (
          <Post
            key={id}
            user={user}
            postId={id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </div>
      {/* <Loging /> */}
    </div>
  );
}

export default App;
