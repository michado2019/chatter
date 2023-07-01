import { Search } from "@mui/icons-material";
import "./BlogNavbar.css";
import bellImg from "./assets/Vectorbell.png";
import { UserContext } from "../../context/userContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

const BlogNavbar = () => {
  //useContext
  const userContext = useContext(UserContext);

  //States
  const [userDisplay, setUserDisplay] = useState(false);
  const [user, setUser] = useState(userContext?.user);

  //Handle signout
  const handleSignout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("user");
        userContext?.setUser(null);
        console.log("out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const defaultAvatarSrc = ""; //Default image

  //useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);
  return (
    <div className="blogNavbar-wrapper">
      <div className="blogNavbar-contents">
        <input
          type="text"
          placeholder="Search chatter"
          className="blogNavbar-search"
        />
        <Search className="blogNavbar-search_icon" />
        <div className="blogNavbar-user_div">
          <img src={bellImg} alt="img" className="blogNavbar-content_bell" />
          <div
            className="navbarUser-flex"
            style={{
              display: userContext?.user === null ? "none" : "",
              marginBottom: userDisplay ? "-40px" : "0",
            }}
          >
            <img
              src={user?.photoURL || defaultAvatarSrc} // Use the default image source if photoUrl is falsy
              alt="User"
              className="navbarUser_avatar"
              onClick={() => setUserDisplay((prev) => !prev)}
            />
            <button
              className="navbarLinksTwo-link"
              id="navbarSignout"
              onClick={handleSignout}
              style={{ display: userDisplay ? "block" : "none" }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogNavbar;
