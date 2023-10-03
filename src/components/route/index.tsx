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
import Notifications from "../pages/notifications/Notifications";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PostDetails from "../pages/postDetails/PostDetails";
import RetrievePassword from "../pages/retrievePassword/RetrievePassword";

const AppRouter = () => {
  //  //States
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //UseContexts
  const userContext = useContext(UserContext); //Context for authenticated user

  // useEffect to fetch data from the database
  useEffect(() => {
    // Fetch data from the database
    setIsLoading(true);
    async function getAllPosts() {
      const dbRef = collection(db, "posts");
      const posts = await getDocs(dbRef);
      if (!dbRef) {
        setAllPosts([]);
        setIsLoading(false);
      } else {
        if(posts.docs.length > 0){
          setAllPosts(
            posts.docs.map((doc) => ({
              ...(doc.data() as PostData),
              id: doc.id,
            }))
          );
        }
        setIsLoading(false);
      }
    }
    getAllPosts();
  }, []);

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
            userContext?.user === null ? (
              <Navigate to="/sign-in" />
            ) : (
              <Blogs allPosts={allPosts} isLoading={isLoading} setIsLoading={setIsLoading} />
            )
          }
        >
          <Route index element={<Feed />} />
          <Route path="/blogs/*/feed" element={<Feed />}>
            <Route
              path="/blogs/*/feed/forYou"
              element={<ForYou allPosts={allPosts} isLoading={isLoading} setIsLoading={setIsLoading} />}
            />
          </Route>
          <Route
            path="/blogs/*/bookMarks"
            element={<BookMarks allPosts={allPosts} />}
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
        <Route
          path="blogs/feed/forYou/:id"
          element={<PostDetails allPosts={allPosts} />}
        />
        <Route path="/retrievePassword" element={<RetrievePassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};
export default AppRouter;
