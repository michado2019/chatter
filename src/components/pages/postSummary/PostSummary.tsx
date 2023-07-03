import "./PostSummary.css";

const PostSummary = () => {
  return (
    <div className="postSummary-wrapper">
      <div className="postSummary-contents">
        <div className="postSummary-content">
          <h2 className="postSummary-title">Posts summary</h2>
          <p className="postSummary-date">May 2023 summary</p>
        </div>
      </div>
      <div className="postSummary-grid">
        <h3 className="postSummary-posts">
          Posts <span className="postSummary-posts_results" id="postSummary-posts_results">3</span>
        </h3>
        <h3 className="postSummary-views">
          Posts Impressions{" "}
          <span className="postSummary-posts_results">2.98k views</span>
        </h3>
        <h3 className="postSummary-visits">
          Profile visits <span className="postSummary-posts_results">300</span>
        </h3>
        <h3 className="postSummary-followers">
          New followers <span className="postSummary-posts_results">300</span>
        </h3>
      </div>
    </div>
  );
};

export default PostSummary;
