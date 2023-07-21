import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Blogs from "../pages/blogs/Blogs";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import { useEffect, useState } from "react";
import Login from "../pages/logIn/Login";
import Register from "../pages/register/Register";
import Feed from "../pages/feed/Feed";
import BookMarks from "../pages/bookMarks/BookMarks";
import ForYou from "../pages/forYou/ForYou";
import Analytics from "../pages/analytics/Analytics";
import Post from "../pages/post/Post";
// import { PostReactions } from "./routeData/RouteData";
import Notifications from "../pages/notifications/Notifications";
import ErrorPage from "../pages/errorPage/ErrorPage";
const AppRouter = () => {

    // States
    const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);
  return (
    <div className="appRouter-wrapper">
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/"
          element={
            user === null ? <Home /> : <Navigate to="/blogs" />
          }
        />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route
          path="/blogs/*"
          element={
            user === null ? (
              <Navigate to="/sign-in" />
            ) : (
              <Blogs />
            )
          }
        >
          <Route index element={<Feed />} />
          <Route path="/blogs/*/feed" element={<Feed />}>
            <Route
              path="/blogs/*/feed/forYou"
              element={<ForYou />}
            />
          </Route>
          <Route
            path="/blogs/*/bookMarks"
            element={<BookMarks />}
          />
          <Route path="/blogs/*/analytics" element={<Analytics />} />
          <Route path="/blogs/*/notifications" element={<Notifications />} />
          <Route path="/blogs/*/post" element={<Post />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />}>
          <Route index element={<Login />} />
          <Route path="/sign-in/login" element={<Login />} />
          <Route path="/sign-in/register" element={<Register />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />}>
          <Route index element={<Register />} />
          <Route path="/sign-up/register" element={<Register />} />
          <Route path="/sign-up/login" element={<Login />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
export default AppRouter;
