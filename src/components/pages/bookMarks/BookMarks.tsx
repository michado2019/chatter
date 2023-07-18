import React, { useEffect, useState } from "react";
import "./BookMarks.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../loadingPage/Loading";
import { PostData } from "../pagesDataType/PagesDataType";

const BookMarks = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        setIsLoading(true); // Start loading

        // Retrieve the user's bookmarked posts from the database
        const user = localStorage.getItem("user");
        if (user) {
          const { uid } = JSON.parse(user);
          const q = query(collection(db, "posts"), where("bookmarks", "array-contains", uid));
          const querySnapshot = await getDocs(q);
          const posts: PostData[] = querySnapshot.docs.map((doc) => doc.data() as PostData);
          setBookmarkedPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchBookmarkedPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="bookMarks-wrapper">
        <Loading />
      </div>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return (
      <div className="bookMarks-wrapper">
        <p>No bookmarked posts found.</p>
      </div>
    );
  }

  return (
    <div className="bookMarks-wrapper">
      {bookmarkedPosts.map((post) => (
        <div key={post.id} className="bookMarks-post">
          <h2 className="bookMarks-post-title">{post.title}</h2>
          {/* Render other post details */}
        </div>
      ))}
    </div>
  );
};

export default BookMarks;
