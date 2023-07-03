import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Blogs from "../pages/blogs/Blogs";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import { UserContext } from "../context/userContext/UserContext";
import { useContext } from "react";
import Login from "../pages/logIn/Login";
import Register from "../pages/register/Register";
import Feed from "../pages/feed/Feed";
import BookMarks from "../pages/bookMarks/BookMarks";
import ForYou from "../pages/forYou/ForYou";
import Analytics from "../pages/analytics/Analytics";
import Post from "../pages/post/Post";

const AppRouter = () => {
  //UseContexts
  const userContext = useContext(UserContext); //Context for authenticated user

  return (
    <div className="appRouter-wrapper">
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/"
          element={
            userContext?.user === null ? <Home /> : <Navigate to="/blogs" />
          }
        />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route
          path="/blogs/*"
          element={
            userContext?.user !== null ? <Blogs /> : <Navigate to="/sign-in" />
          }
        >
          <Route index element={<Feed />} />
          <Route path="/blogs/*/feed" element={<Feed />}>
            <Route path="/blogs/*/feed/forYou" element={<ForYou />} />
          </Route>
          <Route path="/blogs/*/bookMarks" element={<BookMarks />} />
          <Route path="/blogs/*/analytics" element={<Analytics />} />
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
      </Routes>
    </div>
  );
};
export default AppRouter;
