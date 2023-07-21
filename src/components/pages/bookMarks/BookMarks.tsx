import React, { useEffect, useState } from "react";
import "./BookMarks.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import { PostData } from "../pagesDataType/PagesDataType";
import { Favorite, BookmarkAddOutlined } from "@mui/icons-material";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import uniqid from "uniqid";
import Loading from "../loadingPage/Loading";
import { Link } from "react-router-dom";

type User = {
  photoURL: string;
  displayName: string;
  uid: string;
};

type Comment = {
  id: string;
  commentMsg: string;
};

const BookMarks = () => {
  // States
  const [user, setUser] = useState<User>({
    photoURL: "",
    displayName: "",
    uid: "",
  });
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [postData, setPostData] = useState<PostData[]>(allPosts);
  const [displayedCommentId, setDisplayedCommentId] = useState<string | null>(
    null
  );
  const [commentId, setCommentId] = useState<string>(uniqid());
  const [textarea, setTextarea] = useState<Comment>({
    id: "",
    commentMsg: "",
  });
  const initialBookmarkedPosts = localStorage.getItem("bookmarkedPosts");
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
    setPostData(newPostData);

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
      const parsedUser: User = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    setPostData(allPosts);
  }, [allPosts]);

  // Update the local storage whenever bookmarkedPosts change
  useEffect(() => {
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  //Fetch all posts
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
      setIsLoading(false); // Set loading state to false after data is loaded
    }
    getAllPosts();
  }, []);

  const convertToHTML = (textContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(textContent, "text/html");
    return doc.body.childNodes[0]?.nodeValue || "";
  };

  const compareDates = (a: PostData, b: PostData) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  };

  const sortedPosts = postData.sort(compareDates);

  if (isLoading) {
    return <Loading />; // Render a loading component while data is being fetched
  }

  if (bookmarkedPosts.length === 0) {
    return (
      <div className="bookmarkPage-no_post">
        <p>No bookmarked posts yet!</p>
        <Link to="/post" className="bookmarkPage-link">
          Create one
        </Link>
      </div>
    );
  }

  return (
    <div className="bookmarkPage-wrapper">
      <div className="bookmarkPage-contents">
        <div>
          {bookmarkedPosts.map((postId) => {
            const post = sortedPosts.find((each) => each.id === postId);
            if (post) {
              const textContent = convertToHTML(post.html);
              const wordCount = textContent.split(" ").length;
              const timingInMinutes = Math.ceil(wordCount / 30);
              return (
                <div className="bookmarkPage-content" key={post.id}>
                  <div className="bookmarkPage-content_flex1">
                    <img
                      src={post.userImg}
                      alt="img"
                      className="bookmarkPage-userImg"
                    />
                    <div className="bookmarkPage-content_flex2">
                      <h2 className="bookmarkPage-userName">{post.userName}</h2>
                      <div className="bookmarkPage-content_dateFlex">
                        <p className="bookmarkPage-date">{post.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bookmarkPage-content_flex3">
                    <h2 className="bookmarkPage-post_title">{post.title}</h2>
                    <p className="bookmarkPage-post_timing">
                      <img
                        src={timingImg}
                        alt="img"
                        className="bookmarkPage-timingImg"
                      />{" "}
                      {timingInMinutes} mins read
                    </p>
                    <div className="bookmarkPage-post_contentFlex">
                      <p
                        className="bookmarkPage-post_content"
                        dangerouslySetInnerHTML={{ __html: textContent }}
                      ></p>
                      <img
                        src={post.img}
                        alt="img"
                        className="bookmarkPage-post_img"
                      />
                    </div>
                  </div>
                  <div
                    className="bookmarkPage-comment"
                    style={{
                      display:
                        displayedCommentId === post.id.toString()
                          ? "flex"
                          : "none",
                    }}
                  >
                    <div className="bookmarkPage-comment_form">
                      <img
                        src={user.photoURL}
                        alt="img"
                        className="bookmarkPage-comment_userImg"
                      />
                      <textarea
                        className="bookmarkPage-comment_textarea"
                        name="textarea"
                        placeholder="Add a comment...."
                        onChange={(e) => handleChange(e, commentId)}
                        value={textarea.commentMsg}
                      />
                    </div>
                    <button
                      className="bookmarkPage-comment_btn"
                      style={{
                        display:
                          textarea.commentMsg.length > 0 ? "block" : "none",
                      }}
                      onClick={() => handlePostComment(post.id)}
                    >
                      Post
                    </button>
                  </div>
                  <div className="bookmarkPage-post_reactions">
                    <div className="bookmarkPage-post_bookMark">
                      <BookmarkAddOutlined
                        className="bookmarkPage-reactionsImg"
                        onClick={() => handleBookmark(post.id)}
                        style={{
                          color: bookmarkedPosts.includes(post.id.toString())
                            ? "#543ee0"
                            : "inherit",
                          transition: "all 0.3s",
                        }}
                      />
                    </div>
                    <div className="bookmarkPage-post_comment">
                      <img
                        src={commentImg}
                        alt="Comment"
                        className="bookmarkPage-reactionsImg"
                        onClick={() => handleDisplay(post.id)}
                      />
                      {post.comment.length}
                    </div>
                    <div className="bookmarkPage-post_love">
                      {post.isLiked ? (
                        <Favorite
                          className="bookmarkPage-reactionsImg"
                          onClick={() => handleFavorite(post.id)}
                          style={{ color: "#ffedcc" }}
                        />
                      ) : (
                        <img
                          src={loveImg}
                          alt="img"
                          onClick={() => handleFavorite(post.id)}
                          className="bookmarkPage-reactionsImg"
                        />
                      )}
                      {post.love}
                    </div>
                    <div className="bookmarkPage-post_views">
                      <img
                        src={viewsImg}
                        alt="img"
                        className="bookmarkPage-reactionsImg"
                      />
                      {post.views}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
