import React, { useState, useEffect } from "react";
import { AllPostsType } from "../forYou/ForYou";
import "./PostDetails.css";
import { PostData } from "../pagesDataType/PagesDataType";
import { useParams } from "react-router-dom";
import BlogSidebar from "../blogSidebar/BlogSidebar";

const PostDetails = (props: AllPostsType) => {
  const { allPosts } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <div className="postDetails-wrapper">
      <div className="postDetails-contents">
      <div className="postDetails-contents">
        <BlogSidebar />
        <div className="postDetails">
          {
            allPosts.filter((post) => post.id === id).map((post) => {
              return(
                <div className="postDetail" key={post.id}>
                {post.title}
                </div>
              )
            })
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
