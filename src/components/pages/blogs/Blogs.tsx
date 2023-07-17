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
import { useState } from "react";
import SmallScreenBlogSidebar from "../smallScreenBlogSidebar/SmallScreenBlogSidebar";

const Blogs = (props: AllPostsType) => {
  //States
  const [display, setDisplay] = useState(false); //Toggle blog sidebar
  const [toggler, setToggler] = useState(false); //Toggle blog filter search
  return (
    <div className="blogsWrapper">
      <div className="blogsContents">
          <BlogNavbar
            display={display}
            setDisplay={setDisplay}
            toggler={toggler}
            setToggler={setToggler}
          />
        <BlogSidebar />
        <SmallScreenBlogSidebar display={display} setDisplay={setDisplay} />
          <Routes>
            <Route path="/" element={<Feed />}>
              <Route index element={<ForYou allPosts={props.allPosts} />} />
            </Route>
            <Route path="/feed/*" element={<Feed />}>
              <Route index element={<ForYou allPosts={props.allPosts} />} />
              <Route
                path="/feed/*/forYou"
                element={<ForYou allPosts={props.allPosts} />}
              />
            </Route>
            <Route path="/bookMarks" element={<BookMarks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        <div style={{ display: display ? "none" : "block" }}>
          <FootLinks display={display} />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
