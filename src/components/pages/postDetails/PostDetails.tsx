import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Favorite, BookmarkAddOutlined } from "@mui/icons-material";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import uniqid from "uniqid";
import Loading from "../loadingPage/Loading";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import { PostData } from "../pagesDataType/PagesDataType";
import BlogNavbar from "../blogNavbar/BlogNavbar";
import BlogSidebar from "../blogSidebar/BlogSidebar";
import SmallScreenBlogSidebar from "../smallScreenBlogSidebar/SmallScreenBlogSidebar";
import TwitterIcon from "react-share/lib/TwitterIcon";
import FacebookIcon from "react-share/lib/FacebookIcon";
import "./PostDetails.css";

type AllPostsType = {
  allPosts: PostData[];
};

const PostDetails = (props: AllPostsType) => {
  const { allPosts } = props;
  const { id } = useParams();

  //States
  const [user, setUser] = useState({
    photoURL: "",
    displayName: "",
    uid: "",
  });
  const [postData, setPostData] = useState(allPosts);
  const [display, setDisplay] = useState(false); //Toggle blog sidebar
  const [displayedCommentId, setDisplayedCommentId] = useState<string | null>(
    null
  );
  const [commentId, setCommentId] = useState<string>(uniqid());
  const [textarea, setTextarea] = useState({
    id: "",
    commentMsg: "",
  });
  const initialBookmarkedPosts = localStorage.getItem("bookmarkedPosts");
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>(
    initialBookmarkedPosts ? JSON.parse(initialBookmarkedPosts) : []
  );
  const [isLoading, setIsLoading] = useState(true); // Loading state

  //useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    setPostData(allPosts);
    setIsLoading(false); // Set loading state to false after data is loaded
  }, [allPosts]);

  useEffect(() => {
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  if (!allPosts) {
    return (
      <div className="postDetails-not_found">
        <p>Post not found!</p>
      </div>
    );
  }

  // Handler for sharing on social media
  const handleShare = (platform: "Twitter" | "Facebook") => {
    const text = "Check out this post!";
    const url = window.location.href;

    // Create the sharing URL based on the selected platform
    let sharingUrl = "";
    if (platform === "Twitter") {
      sharingUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
    } else if (platform === "Facebook") {
      sharingUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
    }

    // Open a new window with the sharing URL
    window.open(sharingUrl, "_blank");
  };
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

  const handleDisplay = (id: string | number) => {
    setDisplayedCommentId((prevId) =>
      prevId === id.toString() ? null : id.toString()
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
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
      <BlogNavbar display={display} setDisplay={setDisplay} />
      <div className="postDetails-contents">
        <BlogSidebar />
        <SmallScreenBlogSidebar display={display} setDisplay={setDisplay} />
      </div>
      <div className="forYou-contents">
          {allPosts
            .filter((each) => each.id === id)
            .map((each, index) => {
              const textContent = convertToHTML(each.html);
              const wordCount = textContent.split(" ").length;
              const timingInMinutes = Math.ceil(wordCount / 30);

              return (
                <div className="forYou-content" key={index}  id="postDetails-content">
                  <div>
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
                        id="postDetails-post_img"
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
                  <div className="postDetails-more_details">
                    <h3>Share post:</h3>
                    <p>Author</p>
                    <img
                      src={each.userImg}
                      alt="img"
                      className="postDetails-user_img"
                    />
                    <p>{each.userName}</p>
                    <div className="postDetails-share">
                      <button onClick={() => handleShare("Twitter")}>
                        <TwitterIcon />
                      </button>
                      <button onClick={() => handleShare("Facebook")}>
                        <FacebookIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PostDetails;
