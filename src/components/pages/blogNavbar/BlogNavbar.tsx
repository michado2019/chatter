import { CancelOutlined, MenuOutlined, Search } from "@mui/icons-material";
import "./BlogNavbar.css";
import bellImg from "./assets/Vectorbell.png";
import { UserContext } from "../../context/userContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

type BlogNavbarType = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  toggler: boolean
  setToggler: React.Dispatch<React.SetStateAction<boolean>>;
};
const BlogNavbar = (props: BlogNavbarType) => {
  const { display, setDisplay, toggler, setToggler } = props;
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
      <Link to="/" className="blogNavbar-blog_logo">
        CHATTER
      </Link>
      <div className="blogNavbar-contents">
        <Search 
        className="blogNavbar-search_toggler"
        onClick={() => setToggler((prev) => !prev)}
        />
        <div className="blogNavbar-input_search"  style={{display: toggler?"none":"block"}}>
          <input
            type="text"
            placeholder="Search chatter"
            className="blogNavbar-search"
          />
          <Search className="blogNavbar-search_icon" />
        </div>
        <div className="blogNavbar-user_div">
          <div className="feedContents-top_section2">
            <Link to="/blogs/post" className="blogNavbar-post_btn">
              Create post
            </Link>
          </div>
          <img src={bellImg} alt="img" className="blogNavbar-content_bell" />
          <div className="navbarUser-flex">
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
        <div className="navbarMenu-div">
          {display ? (
            <CancelOutlined
              className="navbarMenu"
              onClick={() => setDisplay((prev) => !prev)}
            />
          ) : (
            <MenuOutlined
              className="navbarMenu"
              onClick={() => setDisplay((prev) => !prev)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BlogNavbar;
