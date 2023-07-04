import { feed } from "../forYou/ForYou";
import "./Analytics.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import bookMarksImg from "../blogSidebar/assets/VectorbookMarksImg.png";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useState, useContext } from "react";
import PostSummary from "../postSummary/PostSummary";
import { SwitchContext } from "../../context/switchContext/SwitchContext";
const Analytics = () => {
  // States
  const [page, setPage] = useState(1);

  //Pagination logic
  const perPage = 1;
  const pages = Math.ceil(feed.length / perPage);
  const skip = page * perPage - perPage;

  //useContext
  const switchContext = useContext(SwitchContext);
  return (
    <div className="analyticsWrapper">
      <div className="analyticsContents">
        <h1 className="analyticsTitle">Post analytics</h1>
        <p className="analyticsDate">
          May 2023, <span className="analyticsDays">25days so far</span>
        </p>
        <h3 className="analyticsPosts-highlights">Posts highlights</h3>
        <p className="analyticsTop-posts">
          Top posts <span>earned 2980 impressions</span>
        </p>
        <div className="analytics-div">
          {feed.slice(skip, skip + perPage).map((each) => {
            return (
              <div className="forYou-content" key={each.id}>
                <div className="forYou-content_flex1">
                  <img
                    src={each.userImg}
                    alt="img"
                    className="forYou-userImg"
                  />
                  <div className="forYou-content_flex2">
                    <h2 className="forYou-userName">{each.name}</h2>
                  </div>
                </div>
                <div className="forYou-content_flex3">
                  <h2 className="forYou-post_title">{each.title}</h2>
                  <p className="forYou-post_timing">
                    <img
                      src={timingImg}
                      alt="img"
                      className="forYou-timingImg"
                    />{" "}
                    {each.timing} mins read
                  </p>
                  <p className="forYou-post_content">{each.post}</p>
                  <img
                    src={each.postImg}
                    alt="img"
                    className="forYou-post_img"
                  />
                </div>
                <div className="forYou-post_reactions">
                  <div className="forYou-post_comment">
                    <img
                      src={bookMarksImg}
                      alt="img"
                      className="forYou-reactionsImg"
                    />
                  </div>
                  <div className="forYou-post_comment">
                    <img
                      src={commentImg}
                      alt="img"
                      className="forYou-reactionsImg"
                    />
                    200
                  </div>
                  <div className="forYou-post_love">
                    <img
                      src={loveImg}
                      alt="img"
                      className="forYou-reactionsImg"
                    />
                    120
                  </div>
                  <div className="forYou-post_views">
                    <img
                      src={viewsImg}
                      alt="img"
                      className="forYou-reactionsImg"
                    />
                    2000 views
                  </div>
                </div>
              </div>
            );
          })}
          <div className="nextPrev-arrow_div">
            <ArrowBackIosNew
              className="nextPrev-arrow"
              style={{ display: page <= 1 ? "none" : "block" }}
              onClick={() => setPage((prev) => prev - 1)}
            />
            <ArrowForwardIos
              style={{ display: page >= pages ? "none" : "block" }}
              className="nextPrev-arrow"
              onClick={() => setPage((prev) => prev + 1)}
            />
          </div>
        </div>
        <button
          className="analytics-post_viewBtn"
          onClick={() => switchContext?.setState((prev) => !prev)}
        >
          View post activity
        </button>
        {switchContext?.state && <PostSummary />}
      </div>
      ;
    </div>
  );
};
export default Analytics;
