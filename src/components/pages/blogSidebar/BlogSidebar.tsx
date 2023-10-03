import "./BlogSidebar.css";
import { NavLink } from "react-router-dom";
import { blogSidebarDataOne, personalData } from "./blogSidebarData";
import feedImg from "./assets/VectorfeedImg.png";
import bookMarksImg from "./assets/VectorbookMarksImg.png";
import teamBlogsImg from "./assets/VectorteamImg.png";
import draftsImg from "./assets/VectordraftsImg.png";
import analyticsImg from "./assets/VectoranalyticsImg.png";
import bellImg from "./assets/Vectorbell.png";
import accountImg from "./assets/VectorteamImg.png";
import { trendingTags } from "./blogSidebarData";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getAuth, signOut } from "firebase/auth";

const BlogSidebar = () => {
  //States
  const [skip, setSkip] = useState(3);
  const [isSkip, setIsSkip] = useState(true);

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
    <div className="blogSidebar-wrapper">
      <div className="blogSidebar-contents" id="blogSidebar-contents">
        <div className="blogSidebar-section">
          <h2
            className="blogSidebar-section_title"
            id="blogSidebar-section_title"
          >
            {title[0]}
          </h2>
          {blogSidebarDataOne.map((each) => {
            return (
              <div>
                <div className="blogSidebar-content">
                  <div className="blogSidebar-content_flex">
                    <img
                src={each.id===1?feedImg:""||each.id===2?bookMarksImg:""||each.id===3?teamBlogsImg:""||each.id===4?draftsImg:""||each.id===5?analyticsImg:""}
                alt="img"
                className="blogSidebar-contents_img"
              />
                    <NavLink
                      to={`/blogs/${each.path}`}
                      style={({ isActive }) =>
                        isActive ? activeStyle : inActiveStyle
                      }
                      className="blogSidebar-contents_link"
                    >
                      {each.link}
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[1]}</h2>
          {trendingTags.slice(0, skip).map((each) => {
            return (
              <div className="blogSidebar-trending_tags" key={each.id}>
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
            {isSkip ? "See more" : "See less"}
          </button>
        </div>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[2]}</h2>
          <div className="blogSidebar-personal">
          {personalData.map((each) => {
            return (
              <div>
                <div className="blogSidebar-content">
                  <div className="blogSidebar-content_flex">
                    <img
                src={each.id===1?bellImg:""||each.id===2?accountImg:""}
                alt="img"
                className="blogSidebar-contents_img"
              />
                    <NavLink
                      to={`/blogs/${each.path}`}
                      style={({ isActive }) =>
                        isActive ? activeStyle : inActiveStyle
                      }
                      className="blogSidebar-contents_link"
                    >
                      {each.link}
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          <div className="blogSidebar-logout_div">
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
export default BlogSidebar;
