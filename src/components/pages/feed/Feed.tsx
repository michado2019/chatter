import "./Feed.css";
import { feedData } from "./feedData/FeedData";
import { CustomNavLink } from "../../hooks/CustomNavLinks";
import { Outlet } from "react-router-dom";
const Feed = () => {
  return (
    <div className="feedWrapper">
      <div className="feedContents">
        <div className="feedContents-top">
          <div className="feedContents-top_section1">
            <div className="feedContents-top_section1_1">
              <h1 className="feedContents-top_section1_title">Feed</h1>
              <p className="feedContents-top_section1_details">
                Explore different content you’d love
              </p>
            </div>
          </div>
          <div className="feedContents-top_section2">
            <div className="feedContents-top_section2_1">
              {feedData.map((each) => {
                return (
                  <div className="feedContent-top_section2_1" key={each.id}>
                    <CustomNavLink
                      to={`/blogs/feed/${each.path}`}
                      className="feedContent-top_link"
                    >
                      {each.link}
                    </CustomNavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="feedContents-bottom">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Feed;
