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
const AppRouter = () => {

  //UseContexts
  const userContext = useContext(UserContext) //Context for authenticated user
  
  

  return (
    <div className="appRouter-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/blogs" element={userContext?.user? <Blogs /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
