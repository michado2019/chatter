import React, { useEffect, useState } from "react";
import "./PostDetails.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import { PostData } from "../pagesDataType/PagesDataType";
import { Favorite, BookmarkAddOutlined } from "@mui/icons-material";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import uniqid from "uniqid";
import Loading from "../loadingPage/Loading";
import { useParams } from "react-router-dom";
import BlogNavbar from "../blogNavbar/BlogNavbar";
import BlogSidebar from "../blogSidebar/BlogSidebar";
import SmallScreenBlogSidebar from "../smallScreenBlogSidebar/SmallScreenBlogSidebar";

type PostDetailsProps = {
  allPosts: PostData[];
};

const PostDetails = (props: PostDetailsProps) => {
  const { allPosts } = props;
  const { id } = useParams<{ id: string }>();

  // States
  const [user, setUser] = useState({
    photoURL: "",
    displayName: "",
    uid: "",
  });
  const [postData, setPostData] = useState(allPosts);
  const [displayedCommentId, setDisplayedCommentId] = useState<string | null>(
    null
  );
  const [commentId, setCommentId] = useState<string>(uniqid());
  const [textarea, setTextarea] = useState({
    id: "",
    commentMsg: "",
  });
  const initialBookmarkedPosts = localStorage.getItem("bookmarkedPosts");

  const [display, setDisplay] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>(
    initialBookmarkedPosts ? JSON.parse(initialBookmarkedPosts) : []
  );
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Handlers
  const handleBookmark = (id: string | number) => {
    if (bookmarkedPosts.includes(id.toString())) {
      // If the post is already bookmarked, remove it from the bookmarkedPosts array
      const updatedBookmarks = bookmarkedPosts.filter(
        (postId) => postId !== id.toString()
      );
      setBookmarkedPosts(updatedBookmarks);

      // Update the database
      const docRef = doc(db, "posts", id.toString());
      updateDoc(docRef, {
        bookMark: arrayRemove(user.uid),
      });
    } else {
      // If the post is not bookmarked, add it to the bookmarkedPosts array
      setBookmarkedPosts([...bookmarkedPosts, id.toString()]);

      // Update the database
      const docRef = doc(db, "posts", id.toString());
      updateDoc(docRef, {
        bookMark: arrayUnion(user.uid),
      });
    }
  };

  // Handle display
  const handleDisplay = (id: string | number) => {
    setDisplayedCommentId((prevId) =>
      prevId === id.toString() ? null : id.toString()
    );
  };

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
    setCommentId(uniqid());
    setTextarea({
      ...textarea,
      commentMsg: e.target.value,
      id: id,
    });
  };

  const handlePostComment = (id: string | number) => {
    const newPostData = postData.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          comment: [...each.comment, textarea],
        };
      }
      return each;
    });
    setPostData(newPostData as PostData[]);

    const docRef = doc(db, "posts", id.toString());
    updateDoc(docRef, {
      comment: newPostData.find((each) => each.id === id)?.comment,
    });
  };

  const handleFavorite = (id: string | number) => {
    const newPostData = postData.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          isLiked: !each.isLiked,
          love: each.isLiked ? each.love - 1 : each.love + 1,
        };
      }
      return each;
    });
    setPostData(newPostData);

    const docRef = doc(db, "posts", id.toString());
    updateDoc(docRef, {
      love: newPostData.find((each) => each.id === id)?.love,
      isLiked: newPostData.find((each) => each.id === id)?.isLiked,
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    setPostData(allPosts);
    setIsLoading(false); // Set loading state to false after data is loaded
  }, [allPosts]);

  // Update the local storage whenever bookmarkedPosts change
  useEffect(() => {
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  // Text stripping
  const convertToHTML = (textContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(textContent, "text/html");
    return doc.body.childNodes[0]?.nodeValue || "";
  };

  if (isLoading) {
    return <Loading />; // Render a loading component while data is being fetched
  }

  if (postData.length === 0) {
    return (
      <div className="forYou-no_post">
        <p>No post yet!</p>
      </div>
    );
  }

  return (
    <div className="postDetails-wrapper">
      <div className="postDetails-contents">
        <BlogNavbar display={display} setDisplay={setDisplay} />
        <BlogSidebar />
        <SmallScreenBlogSidebar display={display} setDisplay={setDisplay} />
        <div>
          {postData
            .filter((each) => each.id === id)
            .map((each, index) => {
              const textContent = convertToHTML(each.html);
              const wordCount = textContent.split(" ").length;
              const timingInMinutes = Math.ceil(wordCount / 30);
              return (
                <div className="forYou-content" key={index} id="postDetails-content">
                  <div className="forYou-content_flex1">
                    <img
                      src={each.userImg}
                      alt="img"
                      className="forYou-userImg"
                    />
                    <div className="forYou-content_flex2">
                      <h2 className="forYou-userName">{each.userName}</h2>
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
                      <img
                        src={each.img}
                        alt="img"
                        className="forYou-post_img"
                      />
                    </div>
                  </div>
                  <div
                    className="forYou-comment"
                    style={{
                      display:
                        displayedCommentId === each.id.toString()
                          ? "flex"
                          : "none",
                    }}
                  >
                    <div className="forYou-comment_form">
                      <img
                        src={user.photoURL}
                        alt="img"
                        className="forYou-comment_userImg"
                      />
                      <textarea
                        className="forYou-comment_textarea"
                        name="textarea"
                        placeholder="Add a comment...."
                        onChange={(e) => handleChange(e, commentId)}
                        value={textarea.commentMsg}
                      />
                    </div>
                    <button
                      className="forYou-comment_btn"
                      style={{
                        display:
                          textarea.commentMsg.length > 0 ? "block" : "none",
                      }}
                      onClick={() => handlePostComment(each.id)}
                    >
                      Post
                    </button>
                  </div>
                  <div className="forYou-post_reactions">
                    <div className="forYou-post_bookMark">
                      <BookmarkAddOutlined
                        className="forYou-reactionsImg"
                        onClick={() => handleBookmark(each.id)}
                        style={{
                          color: bookmarkedPosts.includes(each.id.toString())
                            ? "red"
                            : "inherit",
                          transition: "all 0.3s",
                        }}
                      />
                    </div>
                    <div className="forYou-post_comment">
                      <img
                        src={commentImg}
                        alt="Comment"
                        className="forYou-reactionsImg"
                        onClick={() => handleDisplay(each.id)}
                      />
                      {each.comment.length}
                    </div>
                    <div className="forYou-post_love">
                      {each.isLiked ? (
                        <Favorite
                          className="forYou-reactionsImg"
                          onClick={() => handleFavorite(each.id)}
                          style={{ color: "red" }}
                        />
                      ) : (
                        <img
                          src={loveImg}
                          alt="img"
                          onClick={() => handleFavorite(each.id)}
                          className="forYou-reactionsImg"
                        />
                      )}
                      {each.love}
                    </div>
                    <div className="forYou-post_views">
                      <img
                        src={viewsImg}
                        alt="img"
                        className="forYou-reactionsImg"
                      />
                      {each.views}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="postDetails-more_details">

        </div>
      </div>
    </div>
  );
};

export default PostDetails;
