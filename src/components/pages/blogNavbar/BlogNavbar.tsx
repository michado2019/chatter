import {
  ArrowDropDown,
  CancelOutlined,
  MenuOutlined,
  Search,
} from "@mui/icons-material";
import "./BlogNavbar.css";
import { UserContext } from "../../context/userContext/UserContext";
import { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

type BlogNavbarType = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};
const BlogNavbar = (props: BlogNavbarType) => {
  const { display, setDisplay } = props;
  // useContext
  const userContext = useContext(UserContext);

  // States
  const [userDisplay, setUserDisplay] = useState(false);
  const [greetings, setGreetings] = useState("");
  const [user, setUser] = useState(userContext?.user);

  // Handle signout
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

  const defaultAvatarSrc = ""; // Default image

  // useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  const time = new Date().getHours();

  //useEffect to get time of the day
  useEffect(() => {
    function getTimeOfTheDay() {
      if (time < 12) {
        setGreetings("Morning");
      } else if (time >= 12 && time < 17) {
        setGreetings("Afternoon");
      } else {
        setGreetings("Evening");
      }
    }
    getTimeOfTheDay();
  }, [time]);

  return (
    <div className="blogNavbar-wrapper">
      <div className="smallScreenBlogSidebarMenu-div">
        {display ? (
          <CancelOutlined
            className="smallScreenBlogSidebarMenu"
            onClick={() => setDisplay((prev) => !prev)}
          />
        ) : (
          <MenuOutlined
            className="smallScreenBlogSidebarMenu"
            onClick={() => setDisplay((prev) => !prev)}
          />
        )}
      </div>
      <Link to="/" className="blogNavbar-blog_logo">
        CHATTER
      </Link>
      <div className="blogNavbar-contents">
        <div className="blogNavbar-input_search">
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
          <div className="blogNavbarUser-flex">
            <div className="blogNavbar-img_arrow">
              <img
                src={user?.photoURL || defaultAvatarSrc}
                alt="User"
                className="blogNavbarUser_avatar"
                onClick={() => setUserDisplay((prev) => !prev)}
              />
              <ArrowDropDown className="blogNavbarUser_avatarArrow" />
            </div>
            <div
              className="blogNavbarUser-acct_div"
              style={{ display: userDisplay ? "flex" : "none" }}
            >
              <CancelOutlined
                className="smallScreenBlogSidebarMenu"
                id="smallScreenBlogSidebarMenu"
                onClick={() => setUserDisplay((prev) => !prev)}
              />
              <div className="blogNavbarUser-acct_details">
                <img
                  src={user?.photoURL || defaultAvatarSrc}
                  alt="User"
                  className="blogNavbarUser_avatar"
                  id="blogNavbarUser_avatar"
                />
                <div>
                  <span>Good </span>
                  <span>{greetings}, </span>
                  <span className="blogNavbarUser_name">
                    {user?.displayName}
                  </span>
                </div>
              </div>
              <div>{user?.email}</div>
              <button
                className="blogNavbarLinksTwo-link"
                id="blogNavbarSignout"
                onClick={handleSignout}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogNavbar;
