import "./BlogSidebar.css";
import { Link, NavLink } from "react-router-dom";
import { blogSidebarDataOne } from "./blogSidebarData";

const BlogSidebar = () => {

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
  return (
    <div className="blogSidebar-wrapper">
      <div className="blogSidebar-contents">
        <Link to="/blogs" className="blogLogo">
          CHATTER
        </Link>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[0]}</h2>
          {blogSidebarDataOne.map((each) => {
            return (
              <div className="blogSidebar-content" key={each.id}>
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
            );
          })}
        </div>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[1]}</h2>
        </div>
        <div className="blogSidebar-section">
          <h2 className="blogSidebar-section_title">{title[2]}</h2>
        </div>
      </div>
    </div>
  );
};
export default BlogSidebar;