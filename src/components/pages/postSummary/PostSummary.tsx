import "./PostSummary.css";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

type MonthlySummaryData = {
  month: string;
  year: string;
  posts: number;
  impressions: string;
  profileVisits: number;
  newFollowers: number;
};

const PostSummary = () => {
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummaryData>({
    month: "January",
    year: "2021",
    posts: 0,
    impressions: "0",
    profileVisits: 0,
    newFollowers: 0,
  });

  useEffect(() => {
    // Fetch the monthly summary data from the database
    async function fetchMonthlySummary() {
      try {
        const monthlySummaryRef = collection(db, "posts");
        const snapshot = await getDocs(monthlySummaryRef);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as MonthlySummaryData;
          setMonthlySummary(data); // Update the state with fetched data
        }
      } catch (error) {
        console.log("Error fetching monthly summary:", error);
      } finally {
        setLoading(false); // Update loading state when the fetch is complete
      }
    }

    fetchMonthlySummary();
  }, []);

  return (
    <div className="postSummary-wrapper">
      {loading ? (
        // Show a loading indicator while data is being fetched
        <div>Loading...</div>
      ) : (
        <>
          <div className="postSummary-contents">
            <div className="postSummary-content">
              <h2 className="postSummary-title">Posts summary</h2>
              <p className="postSummary-date">
                {monthlySummary.month} {monthlySummary.year} summary
              </p>
            </div>
          </div>
          <div className="postSummary-grid">
            <h3 className="postSummary-posts">
              Posts{" "}
              <span
                className="postSummary-posts_results"
                id="postSummary-posts_results"
              >
                {monthlySummary.posts}
              </span>
            </h3>
            <h3 className="postSummary-views">
              Posts Impressions{" "}
              <span className="postSummary-posts_results">
                {monthlySummary.impressions} views
              </span>
            </h3>
            <h3 className="postSummary-visits">
              Profile visits{" "}
              <span className="postSummary-posts_results">
                {monthlySummary.profileVisits}
              </span>
            </h3>
            <h3 className="postSummary-followers">
              New followers{" "}
              <span className="postSummary-posts_results">
                {monthlySummary.newFollowers}
              </span>
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default PostSummary;
