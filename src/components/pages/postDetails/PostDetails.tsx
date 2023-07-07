import React, { useState, useEffect } from "react";
import { AllPostsType } from "../forYou/ForYou";
import "./PostDetails.css";
import { PostData } from "../pagesDataType/PagesDataType";
import { useParams } from "react-router-dom";
import BlogSidebar from "../blogSidebar/BlogSidebar";

const PostDetails = (props: AllPostsType) => {
  const { allPosts } = props;
  const { id } = useParams<{ id: string }>();
console.log(id);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  useEffect(() => {
    const post = allPosts.find((post) => post.id === id) || null;
    setSelectedPost(post);
  }, [allPosts, id]);

  return (
    <div className="postDetails-wrapper">
      <div className="postDetails-contents">
      <div className="postDetails-contents">
        <BlogSidebar />
        <div className="postDetails">
           <h2>{selectedPost?.title}</h2>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
