import "./Analytics.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import bookMarksImg from "../blogSidebar/assets/VectorbookMarksImg.png";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import PostSummary from "../postSummary/PostSummary";
import { SwitchContext } from "../../context/switchContext/SwitchContext";
import { PostData } from "../pagesDataType/PagesDataType";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
const Analytics = () => {
  // States
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [user, setUser] = useState({
    photoURL: "", // Provide a default value for photoURL
    displayName: "", // Provide a default value for displayName
  });

  //Pagination logic
  const perPage = 1;
  const pages = Math.ceil(allPosts.length / perPage);
  const skip = page * perPage - perPage;

  //useContext
  const switchContext = useContext(SwitchContext);

  // useEffect to fetch data from the database
  useEffect(() => {
    // Fetch data from the database
    async function getAllPosts() {
      const dbRef = collection(db, "posts");
      const posts = await getDocs(dbRef);
      if (!dbRef) {
        setAllPosts([]);
      }
      setAllPosts(
        posts.docs.map((doc) => ({
          ...(doc.data() as PostData),
          id: doc.id,
        }))
      );
    }
    getAllPosts();
  }, []);

  // useEffect to retrieve user data
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  // Helper function to convert HTML text content
  const convertToHTML = (textContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(textContent, "text/html");
    return doc.body.childNodes[0]?.nodeValue || "";
  };
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
          {allPosts.slice(skip, skip + perPage).map((each, index) => {
            //calculate timing
            const textContent = convertToHTML(each.html);
            const wordCount = textContent.split(" ").length;
            const timingInMinutes = Math.ceil(wordCount / 30);
            return (
              <div className="forYou-content" key={index}>
                <div className="forYou-content_flex1">
                  <img
                    src={user?.photoURL ?? ""}
                    alt="img"
                    className="forYou-userImg"
                  />
                  <div className="forYou-content_flex2">
                    <h2 className="forYou-userName">
                      {user?.displayName ?? ""}
                    </h2>
                    <div className="forYou-content_dateFlex">
                      <p className="forYou-date">{each.date}</p>
                    </div>
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
                    {timingInMinutes} mins read
                  </p>
                  <div className="forYou-post_contentFlex">
                    <p
                      className="forYou-post_content"
                      dangerouslySetInnerHTML={{ __html: textContent }}
                    ></p>
                    <img src={each.img} alt="img" className="forYou-post_img" />
                  </div>
                </div>
                <div className="forYou-post_reactions">
                  <div className="forYou-post_bookMark">
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
                    {each.comment.length}
                  </div>
                  <div className="forYou-post_love">
                    <img
                      src={loveImg}
                      alt="img"
                      className="forYou-reactionsImg"
                    />
                    {each.love}
                  </div>
                  <div className="forYou-post_views">
                    <img
                      src={viewsImg}
                      alt="img"
                      className="forYou-reactionsImg"
                    />
                    {each.views} views
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