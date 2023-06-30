import BlogNavbar from "../blogNavbar/BlogNavbar";
import BlogSidebar from "../blogSidebar/BlogSidebar";
import { Routes, Route } from "react-router-dom";
import Feed from "../feed/Feed";
import BookMarks from "../bookMarks/BookMarks";
const Blogs = () => {
  return (
    <div className="blogsWrapper">
      <div className="blogsContents">
        <BlogNavbar />
        <BlogSidebar />
        <Routes>
          <Route index element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/bookMarks" element={<BookMarks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Blogs;
