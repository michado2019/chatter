import { useEffect, useState } from "react";
import "./ForYou.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import bookMarksImg from "../blogSidebar/assets/VectorbookMarksImg.png";
import { getDocs, collection } from "firebase/firestore";
import { PostData } from "../pagesDataType/PagesDataType";
import { db } from "../../firebase";

const ForYou = () => {
  // States
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [user, setUser] = useState({
    photoURL: "", // Provide a default value for photoURL
    displayName: "", // Provide a default value for displayName
  });

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

  return (
    <div className="forYou-wrapper">
      <div className="forYou-contents">
        {allPosts.map((each, index) => {
          const wordCount = each.html.split(" ").length;
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
                  <h2 className="forYou-userName">{user?.displayName ?? ""}</h2>
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
                  <p className="forYou-post_content">{each.html}</p>
                  <img
                    src={each.img}
                    alt="img"
                    className="forYou-post_img"
                  />
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
                  {each.comment}
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
      </div>
    </div>
  );
};

export default ForYou;
