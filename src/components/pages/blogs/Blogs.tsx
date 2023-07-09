import BlogNavbar from "../blogNavbar/BlogNavbar";
import BlogSidebar from "../blogSidebar/BlogSidebar";
import { Routes, Route } from "react-router-dom";
import Feed from "../feed/Feed";
import BookMarks from "../bookMarks/BookMarks";
import ForYou from "../forYou/ForYou";
import Analytics from "../analytics/Analytics";
import Post from "../post/Post";
import { AllPostsType } from "../forYou/ForYou";
import PostDetails from "../postDetails/PostDetails";

const Blogs = (props: AllPostsType) => {
  return (
    <div className="blogsWrapper">
      <div className="blogsContents">
        <BlogNavbar />
        <BlogSidebar />
        <Routes>
          <Route path="/" element={<Feed />}>
            <Route index element={<ForYou  allPosts={props.allPosts}/>} />
            <Route path="/feed/*/forYou" element={<ForYou allPosts={props.allPosts}/>} />
          </Route>
          <Route path="/bookMarks" element={<BookMarks />} />
          <Route path="/postDetails/:id" element={<PostDetails allPosts={props.allPosts}/>} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </div>
  );
};

export default Blogs;
