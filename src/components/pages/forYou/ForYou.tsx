import { useEffect, useState, useContext, useRef } from "react";
import "./ForYou.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import bookMarksImg from "../blogSidebar/assets/VectorbookMarksImg.png";
import { PostData } from "../pagesDataType/PagesDataType";
import { Favorite } from "@mui/icons-material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { SwitchContext } from "../../context/switchContext/SwitchContext";

export type AllPostsType = {
  allPosts: PostData[];
};

const ForYou = (props: AllPostsType) => {
  const switchContext = useContext(SwitchContext);

  const { allPosts } = props;
  const [user, setUser] = useState({
    photoURL: "", // A default value for photoURL
    displayName: "", // A default value for displayName
  });
  const [postData, setPostData] = useState<PostData[]>(allPosts);
  const [isClicked, setIsClicked] = useState(true);
  const [eachCommentId, setEachCommentId] = useState<string | number>("");
  const [commentState, setCommentState] = useState({
    commentMsg: "",
  });

  //Handle comment
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentState({
      ...commentState,
      commentMsg: e.target.value,
    });
  };

  const handleCommentSubmit = async () => {
    //Handling comment submission to the database
    if (commentState.commentMsg !== "") {
      const dbRef = collection(db, "postComments"); //db ref
      await addDoc(dbRef, commentState);
      setCommentState({
        ...commentState,
        commentMsg: "",
      });
    }
  };

  // Handle comment box display
  const handleCommentBox = (id: string | number) => {
    setEachCommentId(id);
    switchContext?.setState((prev) => !prev);
  };

  // Handle favorite
  const handleLove = async (id: string | number) => {
    const updatedPostData = postData.map((each) => {
      if (each.id === id) {
        const updatedLove = isClicked ? each.love - 1 : each.love + 1;
        return {
          ...each,
          love: updatedLove,
        };
      }
      return each;
    });

    setPostData(updatedPostData);
    setIsClicked(!isClicked);

    // Update posts in the database
    try {
      const postRef = doc(db, "posts", id.toString());
      const foundPost = updatedPostData.find((each) => each.id === id);
      if (foundPost) {
        await updateDoc(postRef, {
          love: foundPost.love,
        });
      }
    } catch (error) {
      console.log("Error updating love field:", error);
    }
  };

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

  // Focus on comment textarea
  const commentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    commentRef?.current?.focus();
  });
  return (
    <div className="forYou-wrapper">
      <div className="forYou-contents">
        {postData.map((each, index) => {
          // To calculate the timing of the post
          const textContent = convertToHTML(each.html);
          const wordCount = textContent.split(" ").length;
          const timingInMinutes = Math.ceil(wordCount / 30);

          return (
            <div className="forYou-content" key={index}>
              <div className="forYou-content_flex1">
                <img src={user.photoURL} alt="img" className="forYou-userImg" />
                <div className="forYou-content_flex2">
                  <h2 className="forYou-userName">{user.displayName}</h2>
                  <div className="forYou-content_dateFlex">
                    <p className="forYou-date">{each.date}</p>
                  </div>
                </div>
              </div>
              <div className="forYou-content_flex3">
                <h2 className="forYou-post_title">{each.title}</h2>
                <p className="forYou-post_timing">
                  <img src={timingImg} alt="img" className="forYou-timingImg" />{" "}
                  {timingInMinutes} mins read
                </p>
                <Link
                  to={`/blogs/postDetails/${each.id}`}
                  className="forYou-post_more"
                >
                  <div className="forYou-post_contentFlex">
                    <div>
                      <p
                        className="forYou-post_content"
                        dangerouslySetInnerHTML={{
                          __html:
                            textContent.length > 250
                              ? textContent.slice(0, 250) + "..."
                              : textContent,
                        }}
                      ></p>
                      <button className="forYou-post_content_button">
                        more
                      </button>
                    </div>
                    <img src={each.img} alt="img" className="forYou-post_img" />
                  </div>
                </Link>
              </div>
              <div
                className="forYou-comment"
                style={{
                  display:
                    eachCommentId === each.id && switchContext?.state === true
                      ? "block"
                      : "none",
                  transition: "all 0.3s",
                }}
              >
                <div className="forYou-comment_form">
                  <img
                    src={user.photoURL}
                    alt="img"
                    className="forYou-comment_userImg"
                  />
                  <textarea
                    ref={commentRef}
                    className="forYou-comment_textarea"
                    name="textarea"
                    onChange={handleChange}
                    value={commentState.commentMsg}
                    placeholder="Add a comment...."
                  />
                </div>
                <button
                  style={{
                    display:
                      commentState.commentMsg.length > 0 ? "block" : "none",
                  }}
                  className="forYou-comment_btn"
                  onClick={handleCommentSubmit}
                >
                  Post
                </button>
              </div>
              <div className="forYou-post_reactions">
                <div className="forYou-post_bookMark">
                  <img
                    src={bookMarksImg}
                    alt="Bookmark"
                    className="forYou-reactionsImg"
                  />
                </div>
                <div className="forYou-post_comment">
                  <img
                    onClick={() => handleCommentBox(each.id)}
                    src={commentImg}
                    alt="Comment"
                    className="forYou-reactionsImg"
                  />
                  {each.comment}
                </div>
                <div className="forYou-post_love">
                  {isClicked ? (
                    <Favorite
                      className="forYou-reactionsImg"
                      onClick={() => handleLove(each.id)}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <img
                      src={loveImg}
                      alt="Love"
                      className="forYou-reactionsImg"
                      onClick={() => handleLove(each.id)}
                    />
                  )}
                  {each.love}
                </div>
                <div className="forYou-post_views">
                  <img
                    src={viewsImg}
                    alt="Views"
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
