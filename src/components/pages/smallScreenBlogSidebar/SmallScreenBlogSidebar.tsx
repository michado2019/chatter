import "./SmallScreenBlogSidebar.css";
import { Link, NavLink } from "react-router-dom";
import {
  blogSidebarDataOne,
  personalData,
} from "../blogSidebar/blogSidebarData";
import feedImg from "./assets/VectorfeedImg.png";
import bookMarksImg from "./assets/VectorbookMarksImg.png";
import teamBlogsImg from "./assets/VectorteamImg.png";
import draftsImg from "./assets/VectordraftsImg.png";
import analyticsImg from "./assets/VectoranalyticsImg.png";
import bellImg from "./assets/Vectorbell.png";
import accountImg from "./assets/VectorteamImg.png";
import { trendingTags } from "../blogSidebar/blogSidebarData";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getAuth, signOut } from "firebase/auth";
type BlogNavbarType = {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};
const SmallScreenBlogSidebar = (props: BlogNavbarType) => {
  const { display, setDisplay } = props;
  //States
  const [skip, setSkip] = useState(3);
  const [isSkip, setIsSkip] = useState(false);

  //Handle skip
  const handleSkip = () => {
    if (isSkip === true) {
      setSkip(trendingTags.length);
    }
    setIsSkip((prev) => !prev);
    if (isSkip === false) {
      setSkip(3);
    }
  };

  //Active link
  const activeStyle = {
    color: "#543ee0",
  };

  //In-active link
  const inActiveStyle = {
    color: "#3b3b3b",
  };

  //Sidebar title array
  const title = ["Overview", "Trending tags", "Personal"];

  //useContext
  const userContext = useContext(UserContext);

  //States
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

  //useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);
  return (
    <div
      className="smallScreenBlogSidebar"
      style={{ marginLeft: display ? "0" : "-3000px", transition: "all 0.3s" }}
    >
      <div className="blogSidebar-contents">
        <div className="blogSidebar-section">
          <Link
            to="/blogs/post"
            className="blogNavbar-post_btn"
            id="blogNavbar-post_btn"
            onClick={() => setDisplay((prev) => !prev)}
          >
            Create post
          </Link>
          <div className="blogSidebar-content">
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={feedImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={blogSidebarDataOne[0].path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                className="blogSidebar-contents_link"
              >
                {blogSidebarDataOne[0].link}
              </NavLink>
            </div>
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={bookMarksImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={blogSidebarDataOne[1].path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                className="blogSidebar-contents_link"
              >
                {blogSidebarDataOne[1].link}
              </NavLink>
            </div>
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={teamBlogsImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={blogSidebarDataOne[2].path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                className="blogSidebar-contents_link"
              >
                {blogSidebarDataOne[2].link}
              </NavLink>
            </div>
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={draftsImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={blogSidebarDataOne[3].path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                className="blogSidebar-contents_link"
              >
                {blogSidebarDataOne[3].link}
              </NavLink>
            </div>
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={analyticsImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={blogSidebarDataOne[4].path}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                className="blogSidebar-contents_link"
              >
                {blogSidebarDataOne[4].link}
              </NavLink>
            </div>
          </div>
        </div>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[1]}</h2>
          {trendingTags.slice(0, skip).map((each) => {
            return (
              <div
                className="blogSidebar-trending_tags"
                key={each.id}
                onClick={() => setDisplay((prev) => !prev)}
              >
                <NavLink
                  to={`/blogs/trendingTags/${each.id}/${each.path}`}
                  className="blogSidebar-contents_link2"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inActiveStyle
                  }
                >
                  {each.tag}
                </NavLink>
              </div>
            );
          })}
          <button onClick={handleSkip} className="blogSidebar-see_all">
            See all
          </button>
        </div>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[2]}</h2>
          <div className="blogSidebar-personal">
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={accountImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={personalData[0].path}
                className="blogSidebar-contents_link2"
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                {personalData[0].link}
              </NavLink>
            </div>
            <div
              className="blogSidebar-content_flex"
              onClick={() => setDisplay((prev) => !prev)}
            >
              <img
                src={bellImg}
                alt="img"
                className="blogSidebar-contents_img"
              />
              <NavLink
                to={personalData[1].path}
                className="blogSidebar-contents_link2"
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                {personalData[1].link}
              </NavLink>
            </div>
          </div>
          <div
            onClick={() => setDisplay((prev) => !prev)}
            className="blogSidebar-logout_div"
          >
            <h2 className="userNameAlp">{user?.displayName?.slice(0, 2)}</h2>
            <button className="blogSidebar-logout_btn" onClick={handleSignout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenBlogSidebar;
