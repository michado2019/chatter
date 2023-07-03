import BlogNavbar from "../blogNavbar/BlogNavbar";
import BlogSidebar from "../blogSidebar/BlogSidebar";
import { Routes, Route } from "react-router-dom";
import Feed from "../feed/Feed";
import BookMarks from "../bookMarks/BookMarks";
import ForYou from "../forYou/ForYou";
import Analytics from "../analytics/Analytics";
import Post from "../post/Post";

const Blogs = () => {
  return (
    <div className="blogsWrapper">
      <div className="blogsContents">
        <BlogNavbar />
        <BlogSidebar />
        <Routes>
          <Route path="/" element={<Feed />}>
            <Route index element={<ForYou />} />
          </Route>
          <Route path="/feed/*" element={<Feed />}>
            <Route index element={<ForYou />} />
            <Route path="/feed/*/forYou" element={<ForYou />} />
            <Route path="/feed/*/post" element={<Post />} />
          </Route>
          <Route path="/bookMarks" element={<BookMarks />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default Blogs;
