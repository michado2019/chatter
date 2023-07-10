import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Blogs from "../pages/blogs/Blogs";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import { UserContext } from "../context/userContext/UserContext";
import { useContext, useState, useEffect } from "react";
import Login from "../pages/logIn/Login";
import Register from "../pages/register/Register";
import Feed from "../pages/feed/Feed";
import BookMarks from "../pages/bookMarks/BookMarks";
import ForYou from "../pages/forYou/ForYou";
import Analytics from "../pages/analytics/Analytics";
import Post from "../pages/post/Post";
// import { PostReactions } from "./routeData/RouteData";
import { getDocs, collection } from "firebase/firestore";
import { PostData } from "../pages/pagesDataType/PagesDataType";
import { db } from "../firebase";
import PostDetails from "../pages/postDetails/PostDetails";

const AppRouter = () => {

//  //States
const [allPosts, setAllPosts] = useState<PostData[]>([]);

  //UseContexts
  const userContext = useContext(UserContext); //Context for authenticated user

  // useEffect to fetch data from the database
  useEffect(() => {
    // Fetch data from the database
    async function getAllPosts() {
      const dbRef = collection(db, "posts");
      const posts = await getDocs(dbRef);
      if (!dbRef) {
        setAllPosts([]);
      }
      setAllPosts(
        posts.docs.map((doc) => ({
          ...(doc.data() as PostData),
          id: doc.id,
        }))
      );
    }
    getAllPosts();
  }, [allPosts]);

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
            userContext?.user !== null ? <Blogs allPosts={allPosts}/> : <Navigate to="/sign-in" />
          }
        >
          <Route index element={<Feed />} />
          <Route path="/blogs/*/feed/*" element={<Feed />}>
          <Route index element={<ForYou allPosts={allPosts}/>} />
          <Route path="/blogs/*/feed/*/forYou" element={<ForYou allPosts={allPosts} />} />
          </Route>
          <Route path="/blogs/*/bookMarks" element={<BookMarks />} />
          <Route path="/blogs/*/analytics" element={<Analytics />} />
          <Route path="/blogs/*/post" element={<Post />} />
        <Route path="/blogs/*postDetails/:id" element={<PostDetails allPosts={allPosts}/>} />
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
