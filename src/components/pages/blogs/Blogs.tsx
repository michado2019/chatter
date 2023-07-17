import BlogNavbar from "../blogNavbar/BlogNavbar";
import BlogSidebar from "../blogSidebar/BlogSidebar";
import { Routes, Route } from "react-router-dom";
import Feed from "../feed/Feed";
import BookMarks from "../bookMarks/BookMarks";
import ForYou from "../forYou/ForYou";
import Analytics from "../analytics/Analytics";
import Post from "../post/Post";
import { AllPostsType } from "../forYou/ForYou";
import FootLinks from "../../layouts/footLinks/FootLinks";
import Notifications from "../notifications/Notifications";

const Blogs = (props: AllPostsType) => {
  return (
    <div className="blogsWrapper">
      <div className="blogsContents">
        <BlogNavbar />
        <BlogSidebar />
        <Routes>
          <Route path="/" element={<Feed />}>
            <Route index element={<ForYou allPosts={props.allPosts}/>} />
          </Route>
          <Route path="/feed/*" element={<Feed />}>
            <Route index element={<ForYou  allPosts={props.allPosts}/>} />
            <Route path="/feed/*/forYou" element={<ForYou allPosts={props.allPosts}/>} />
          </Route>
          <Route path="/bookMarks" element={<BookMarks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/post" element={<Post />} />
        </Routes>
        <FootLinks />
      </div>
    </div>
  );
};

export default Blogs;
