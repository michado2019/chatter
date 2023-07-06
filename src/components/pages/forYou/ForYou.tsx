import React, { useEffect, useState } from "react";
import "./ForYou.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
import bookMarksImg from "../blogSidebar/assets/VectorbookMarksImg.png";
import { PostData } from "../pagesDataType/PagesDataType";
import { Favorite } from "@mui/icons-material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export type AllPostsType = {
  allPosts: PostData[];
};

const ForYou = (props: AllPostsType) => {
  const { allPosts } = props;
  const [user, setUser] = useState({
    photoURL: "", // A default value for photoURL
    displayName: "", // A default value for displayName
  });
  const [postData, setPostData] = useState(allPosts);
  const [isClicked, setIsClicked] = useState(false);

    const handleLove = async (id: number | string) => {
      const updatedPostData = postData.map((each) => {
        if (each.id === id) {
          if (isClicked) {
            return {
              ...each,
              love: each.love - 1,
            };
          } else {
            return {
              ...each,
              love: each.love + 1,
            };
          }
        }
        return each;
      });
    
      setPostData(updatedPostData);
      setIsClicked(!isClicked);

      //Update posts in the database
    
      try {
        const postRef = doc(db, "posts", id.toString());
        const foundPost = updatedPostData.find((each) => each.id === id);
        if (foundPost) {
          await updateDoc(postRef, {
            love: isClicked ? foundPost.love : foundPost.love,
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
                  <img src={timingImg} alt="img" className="forYou-timingImg" />{" "}
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
                      alt="img"
                      className="forYou-reactionsImg"
                      onClick={() => handleLove(each.id)}
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